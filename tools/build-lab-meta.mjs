// Zukko Kimyo — 3D tajribalar ro'yxatini (metama'lumot) alohida kichik faylga chiqaradi.
// Nega: bosh sahifa, darslar va qidiruv faqat tajriba nomi/ikonkasi/darslarini ishlatadi.
// three.js (~250 KB) va lab-exps*.js (~110 KB) endi faqat 3D ochilganda yuklanadi (index.html → ZKLazy.three).
//
// Ishlatish:  node tools/build-lab-meta.mjs          → lab-meta.js ni qayta yozadi
//             node tools/build-lab-meta.mjs --check  → eskirgan bo'lsa xato (unit testda)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILES = ['lab-core.js', ...[1, 2, 3, 4, 5, 6, 7].map((i) => `lab-exps${i}.js`)];
const KEEP = ['id', 'icon', 'grade', 'title', 'desc', 'lessons'];

export function buildMeta(root = ROOT) {
  // Soxta THREE/document: lab fayllari yuklanganda faqat Lab.def(...) chaqiruvlari kerak, 3D emas
  const P = new Proxy(function () {}, {
    get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : k === 'then' ? undefined : P),
    apply: () => P, construct: () => P, set: () => true,
  });
  const ctx = {
    THREE: P, document: P, navigator: { userAgent: '' }, matchMedia: () => ({ matches: false }),
    console, Math, JSON, Object, Array, Date, setTimeout, performance: { now: () => 0 }, devicePixelRatio: 1,
    requestAnimationFrame: () => 0, Float32Array, Uint8Array, Uint16Array, Map, Set, WeakMap, Symbol, Number,
    String, Boolean, Promise, Error, isFinite, parseInt, parseFloat,
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of FILES) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  const list = ctx.Lab.list.map((e) => Object.fromEntries(KEEP.filter((k) => e[k] !== undefined).map((k) => [k, JSON.parse(JSON.stringify(e[k]))])));
  return '/* AVTOMATIK YARATILGAN — qo\'lda o\'zgartirmang. Manba: lab-exps*.js. Yangilash: node tools/build-lab-meta.mjs */\n'
    + '(function () {\n'
    + '  if (window.Lab && window.Lab.ready) return;\n'
    + '  const list = ' + JSON.stringify(list) + ';\n'
    + '  const exps = {}; list.forEach((e) => { exps[e.id] = e; });\n'
    + '  const tr = (o) => (o == null ? \'\' : typeof o === \'string\' ? o : (o[window.Lab.lang] || o.uz || o.en || \'\'));\n'
    + '  // open() bu yerda yo\'q: 3D faqat ZKLazy.three() dan keyin (lab-core.js shu ro\'yxatni to\'ldiradi)\n'
    + '  window.Lab = { lang: \'uz\', meta: true, ready: false, list, exps, tr, open: () => null };\n'
    + '})();\n';
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const out = path.join(ROOT, 'lab-meta.js');
  const src = buildMeta();
  if (process.argv.includes('--check')) {
    const cur = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
    if (cur !== src) { console.error('lab-meta.js eskirgan: node tools/build-lab-meta.mjs'); process.exit(1); }
    console.log('lab-meta.js yangi');
  } else {
    fs.writeFileSync(out, src);
    console.log('lab-meta.js yozildi:', src.length, 'bayt');
  }
}
