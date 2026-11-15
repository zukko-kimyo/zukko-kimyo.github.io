#!/usr/bin/env python3
"""Generate theme-dark.css: dark-mode counterparts for every rule that paints a light
background, dark text or a light border. Light neutral surfaces become glass surfaces,
pastel tints keep their hue as a translucent tint, dark text becomes light text."""
import json, re, colorsys, sys, os
rules = json.load(open(os.path.join(os.path.dirname(__file__), 'rules.json')))
SKIP_SRC = {'theme.css', 'css2', None}
SKIP_SEL = re.compile(r'zk-hero-scene|zk-brand-loader|::view-transition|^\s*:root|canvas|\.fnav|footer|\.zoom\b|\.lab-modal \.mh|\.zk-hero-v3')

def parse(c):
    c = c.strip()
    if c in ('transparent', 'currentcolor', 'inherit', 'initial') or c.startswith('var(') or 'color-mix' in c:
        return None
    if c == 'white': return (255, 255, 255, 1.0)
    if c == 'black': return (0, 0, 0, 1.0)
    m = re.match(r'#([0-9a-f]{3,8})$', c, re.I)
    if m:
        h = m.group(1)
        if len(h) in (3, 4): h = ''.join(x * 2 for x in h)
        a = int(h[6:8], 16) / 255 if len(h) == 8 else 1.0
        return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), a)
    m = re.match(r'rgba?\(([^)]+)\)', c)
    if m:
        p = [x for x in re.split(r'[\s,/]+', m.group(1)) if x]
        try:
            r, g, b = [float(x) for x in p[:3]]
            a = float(p[3].rstrip('%')) / (100 if p[3].endswith('%') else 1) if len(p) > 3 else 1.0
            return (r, g, b, a)
        except ValueError:
            return None
    return None

def lum(c):
    v = [x / 255 for x in c[:3]]
    v = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in v]
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]

def hls(c):
    return colorsys.rgb_to_hls(*[x / 255 for x in c[:3]])

def tint(c, alpha):
    h, l, s = hls(c)
    r, g, b = colorsys.hls_to_rgb(h, 0.58, max(s, 0.55))
    return f'rgba({round(r*255)},{round(g*255)},{round(b*255)},{alpha})'

def light_text(c):
    h, l, s = hls(c)
    r, g, b = colorsys.hls_to_rgb(h, 0.78, min(1, max(s, 0.5)))
    return '#%02x%02x%02x' % (round(r*255), round(g*255), round(b*255))

def bg_for(c):
    """dark counterpart for a light background colour, or None to keep."""
    if c[3] < 0.04 or lum(c) < 0.5: return None
    h, l, s = hls(c)
    if s < 0.14 or l > 0.985:   # neutral white / grey
        if c[3] < 0.9: return f'rgba(255,255,255,{min(0.08, round(c[3]*0.12, 3))})'
        return 'var(--zk-surface-2)' if l > 0.965 else 'rgba(255,255,255,.06)'
    return tint(c, 0.16)

def fg_for(c, rule_bg):
    if c[3] < 0.2: return None
    L = lum(c); h, l, s = hls(c)
    if rule_bg is not None:     # text on its own colourful mid-tone background: keep
        bl = lum(rule_bg); bh, bll, bs = hls(rule_bg)
        if 0.08 < bl < 0.5 and bs > 0.25: return None
        if bl < 0.08: return None
    if L >= 0.32: return None
    if l < 0.22 or s < 0.22:
        return 'var(--zk-ink)' if l < 0.3 else 'var(--zk-muted)'
    return light_text(c)

def border_for(c):
    if c[3] < 0.04 or lum(c) < 0.45: return None
    h, l, s = hls(c)
    if s < 0.14: return 'var(--zk-hair)'
    return tint(c, 0.38)

def split_sel(sel):
    out, depth, cur = [], 0, ''
    for ch in sel:
        if ch in '([': depth += 1
        elif ch in ')]': depth -= 1
        if ch == ',' and depth == 0:
            out.append(cur.strip()); cur = ''
        else:
            cur += ch
    if cur.strip(): out.append(cur.strip())
    return out

def prefix(sel):
    parts = []
    for s in split_sel(sel):
        if re.match(r'^html\b', s): parts.append(re.sub(r'^html', 'html[data-theme="dark"]', s, count=1))
        elif s.startswith(':root'): return None
        else: parts.append('html[data-theme="dark"] ' + s)
    return ', '.join(parts)

def grad_bg(v):
    """light-only gradient -> a flat dark counterpart"""
    if 'gradient' not in v: return None
    cols = [parse(x) for x in re.findall(r'#[0-9a-fA-F]{3,8}\b|rgba?\([^)]+\)|\bwhite\b', v)]
    cols = [c for c in cols if c and c[3] > 0.05]
    if not cols: return None
    if all(lum(c) > 0.5 for c in cols):
        return bg_for(cols[0]) or 'var(--zk-surface-2)'
    return None

def norm(sel):
    return ', '.join(sorted(re.sub(r'^(html\s+)?(body(\.zk-v3)?\s+)', '', x.strip()) for x in split_sel(sel)))
# A later rule for the same selector + property (often tokenised with var()) supersedes an earlier literal one.
last = {}
for i, r in enumerate(rules):
    if 'err' in r or r.get('src') in ('css2', None): continue
    for k in r['pick']:
        last[(norm(r['sel']), r.get('media') or '', k)] = i
def superseded(i, r, k):
    return last.get((norm(r['sel']), r.get('media') or '', k), i) != i

by_media = {}
count = 0
for i, r in enumerate(rules):
    if 'err' in r or r.get('src') in SKIP_SRC: continue
    sel = r['sel']
    if SKIP_SEL.search(sel): continue
    pick = {k: v for k, v in r['pick'].items() if not superseded(i, r, k)}; decl = []
    rbg = parse(pick['background-color'][0]) if 'background-color' in pick else None
    if 'background-color' in pick and rbg:
        nb = bg_for(rbg)
        if nb: decl.append(f'background-color:{nb}' + (' !important' if pick['background-color'][1] else ''))
    if 'background-image' in pick:
        g = grad_bg(pick['background-image'][0])
        if g:
            imp = ' !important' if pick['background-image'][1] else ''
            decl.append('background-image:none' + imp)
            if not any(d.startswith('background-color') for d in decl): decl.append(f'background-color:{g}' + imp)
    if 'color' in pick:
        c = parse(pick['color'][0])
        if c:
            nf = fg_for(c, rbg)
            if nf: decl.append(f'color:{nf}' + (' !important' if pick['color'][1] else ''))
    for side in ('top', 'bottom', 'left', 'right'):
        k = f'border-{side}-color'
        if k in pick:
            c = parse(pick[k][0])
            if c:
                nb = border_for(c)
                if nb: decl.append(f'{k}:{nb}' + (' !important' if pick[k][1] else ''))
    for k in ('fill', 'stroke'):
        if k in pick:
            c = parse(pick[k][0])
            if c and lum(c) < 0.06 and hls(c)[2] < 0.22: decl.append(f'{k}:var(--zk-ink)')
    if not decl: continue
    ps = prefix(sel)
    if not ps: continue
    by_media.setdefault(r.get('media') or '', []).append(f'{ps} {{{";".join(decl)}}}')
    count += 1

out = ['/* Zukko Kimyo — tungi rejim: avtomatik hosil qilingan qatlam (2026-11-15).',
       '   Har bir och fon / to\'q matn / och chegara qoidasining tungi muqobili. Qo\'lda yozilgan',
       '   aniqlashtirishlar theme.css da (u keyin yuklanadi va ustun turadi).',
       '   Qayta hosil qilish: tools/dark-mode/README.md. */']
for media, lines in by_media.items():
    if media:
        out.append(f'@media {media} {{'); out += ['  ' + l for l in lines]; out.append('}')
    else:
        out += lines
open(sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', 'theme-dark.css'), 'w').write('\n'.join(out) + '\n')
print(count, 'rules generated')
