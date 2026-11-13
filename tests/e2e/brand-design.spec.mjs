import { test, expect, waitReady, gotoMock, bootstrapAdmin } from './fixtures.mjs';

/* Zukko brend dizayni (brand.css + icons.js) uchun brauzer testlari. */
const EMOJI_UI = /[🏠📚📘📖📄🧪✅🛡⚡🔥⭐📊🎯🚀🧩📜🏆⚙💡🎓📦⬇☁📥➕❓⚠]/u;

test('brand layer is loaded: teal hero, serif headings; login (brand-entry.css) keeps school logo', async ({ page }) => {
  await gotoMock(page);
  const gate = page.locator('.zk-gate');
  await expect(gate.locator('.mk img')).toHaveAttribute('src', /zukko-mark\.svg/);
  await page.goto('/index.html#home'); await waitReady(page);
  const s = await page.evaluate(() => ({
    hero: getComputedStyle(document.querySelector('.zk-hero-v3')).backgroundColor,
    h2: getComputedStyle(document.querySelector('.sec-h h2')).fontFamily,
    css: [...document.styleSheets].some((x) => /brand\.css/.test(x.href || '')),
  }));
  expect(s.css).toBe(true);
  expect(s.hero).toBe('rgb(2, 43, 46)');
  expect(s.h2).toMatch(/Fraunces/);
});

test('interface emojis are replaced by SVG icons (headings, quick links, bottom nav)', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  await page.waitForTimeout(300);
  const left = await page.evaluate((src) => {
    const re = new RegExp(src, 'u');
    return [...document.querySelectorAll('#app h1,#app h2,#app h3,#app h4,.zk-quick-ic,.fcard .ic,.zk-dash-icon,#bnav i,.btn')]
      .filter((e) => !e.closest('.th') && re.test(e.textContent)).map((e) => e.tagName + ':' + e.textContent.trim().slice(0, 20));
  }, EMOJI_UI.source);
  expect(left).toEqual([]);
  expect(await page.locator('.zk-quick-ic svg.zi').count()).toBe(3);
  expect(await page.locator('#bnav svg.zi').count()).toBeGreaterThanOrEqual(4);
});

test('lab cards show at most three lesson chips plus a "+N" chip', async ({ page }) => {
  await page.goto('/index.html#lab'); await waitReady(page);
  const counts = await page.$$eval('.xcard .tags', (els) => els.map((e) => e.querySelectorAll('.chip').length));
  test.skip(!counts.length, '3D modules are unavailable in this environment');
  expect(Math.max(...counts)).toBeLessThanOrEqual(4);
});

test('desktop: header is one row, floating lesson nav hidden, XP toast does not cover the title', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop-only layout');
  await page.goto('/index.html#home'); await waitReady(page);
  const hdr = await page.evaluate(() => {
    const h = document.querySelector('header.top').getBoundingClientRect();
    const n = document.querySelector('nav.main').getBoundingClientRect();
    const l = document.querySelector('.top .logo').getBoundingClientRect();
    return { h: h.height, navMid: n.top + n.height / 2, logoMid: l.top + l.height / 2, navVisible: n.width > 0 };
  });
  expect(hdr.navVisible).toBe(true);
  expect(hdr.h).toBeLessThan(90);
  expect(Math.abs(hdr.navMid - hdr.logoMid)).toBeLessThan(8);
  await page.evaluate(() => { location.hash = '#g6-2'; });
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect(page.locator('.fnav')).toBeHidden();
  const toast = page.locator('#xpToasts .xpt').first();
  await expect(toast).toBeVisible();
  const [t, h] = await Promise.all([toast.boundingBox(), page.locator('.lesson-top h1').boundingBox()]);
  const overlap = !(t.x > h.x + h.width || t.x + t.width < h.x || t.y > h.y + h.height || t.y + t.height < h.y);
  expect(overlap, 'XP toast must not cover the lesson title').toBe(false);
});

test('mobile: molecular lab is collapsed and opens on tap; header stays one row', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only layout');
  await page.goto('/index.html#home'); await waitReady(page);
  const tog = page.locator('#zkSceneToggle');
  await expect(tog).toBeVisible();
  await expect(tog).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#zkScene')).toBeHidden();
  expect(await page.locator('#heroLab canvas').count()).toBe(0);
  await tog.click();
  await expect(tog).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#zkScene')).toBeVisible();
  await tog.click();
  await expect(page.locator('#zkScene')).toBeHidden();
  const h = await page.evaluate(() => document.querySelector('header.top').getBoundingClientRect().height);
  expect(h).toBeLessThan(80);
  await expect(page.locator('.top .zk-subject')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('desktop: molecular lab stays visible without a toggle', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop-only layout');
  await page.goto('/index.html#home'); await waitReady(page);
  await expect(page.locator('#zkSceneToggle')).toBeHidden();
  await expect(page.locator('#zkScene')).toBeVisible();
});

test('new learner sees "3 steps" instead of an empty chart', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  await expect(page.locator('.zk-dash-new')).toBeVisible();
  await expect(page.locator('.zk-dash-new li')).toHaveCount(3);
  await expect(page.locator('.zk-bars')).toHaveCount(0);
});

test('mobile: teacher panel tabs all fit on screen', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only layout');
  await bootstrapAdmin(page);
  await page.evaluate(() => { location.hash = '#teacher'; });
  await expect(page.locator('.tc-tabs button').first()).toBeVisible();
  const out = await page.$$eval('.tc-tabs button', (bs) => bs.filter((b) => { const r = b.getBoundingClientRect(); return r.left < 0 || r.right > innerWidth + 1; }).length);
  expect(out).toBe(0);
});

test('user chip ("A") sits in the bottom-right of the phone menu and opens upward', async ({ page, isMobile }) => {
  await bootstrapAdmin(page);
  const chip = page.locator('#uchip');
  if (!isMobile) {
    await expect(page.locator('header.top #uchip')).toHaveCount(1);
    return;
  }
  await expect(page.locator('#bnav #uchip')).toHaveCount(1);
  await expect(page.locator('header.top #uchip')).toHaveCount(0);
  await expect(page.locator('#mobilePanelLink')).toBeHidden();
  const box = await chip.boundingBox(); const vw = page.viewportSize().width, vh = page.viewportSize().height;
  expect(box.x + box.width).toBeGreaterThan(vw * 0.75);
  expect(box.y).toBeGreaterThan(vh * 0.8);
  await page.locator('#uchip > button').click();
  const menu = page.locator('#uchip .mn');
  await expect(menu).toBeVisible();
  await expect(menu.locator('a[href="#admin"]')).toHaveCount(1);
  const m = await menu.boundingBox();
  expect(m.y + m.height).toBeLessThanOrEqual(box.y + 2);
  expect(m.x + m.width).toBeLessThanOrEqual(vw);
  await menu.locator('a[href="#admin"]').click();
  await expect(page).toHaveURL(/#admin$/);
  await expect(menu).toBeHidden();
  await expect(chip).toHaveClass(/on/);
});

test('textbook unit colours are kept as before and carried into the lesson page', async ({ page }) => {
  await page.goto('/index.html#g6'); await waitReady(page);
  const units = await page.$$eval('.unit-h span', (els) => els.slice(0, 3).map((e) => getComputedStyle(e).backgroundColor));
  expect(units).toEqual(['rgb(255, 122, 26)', 'rgb(139, 92, 246)', 'rgb(34, 197, 94)']);
  await page.evaluate(() => { location.hash = '#g6-4'; }); // 2-bo'lim (binafsha)
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  const lnum = await page.locator('.lhead .lnum').evaluate((e) => getComputedStyle(e).backgroundColor);
  expect(lnum).toBe('rgb(139, 92, 246)');
  // dars tuzilishi o'zgarmagan: tablar va yon panel joyida
  await expect(page.locator('.lesson-top .tabs button')).toHaveCount(4);
  await expect(page.locator('.lesson-body .navl a')).not.toHaveCount(0);
});

test('glass surfaces: translucent header (and floating tab bar on phones)', async ({ page, isMobile }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const s = await page.evaluate(() => {
    const h = getComputedStyle(document.querySelector('header.top'));
    const b = getComputedStyle(document.getElementById('bnav'));
    return { hBlur: h.backdropFilter || h.webkitBackdropFilter, hBg: h.backgroundColor, bBlur: b.backdropFilter || b.webkitBackdropFilter, bBottom: parseFloat(b.bottom), bRadius: parseFloat(b.borderTopLeftRadius) };
  });
  expect(s.hBlur).toMatch(/blur/);
  expect(s.hBg).toMatch(/rgba\(255, 255, 255, 0\.\d+\)/);
  if (isMobile) { expect(s.bBlur).toMatch(/blur/); expect(s.bBottom).toBeGreaterThanOrEqual(6); expect(s.bRadius).toBeGreaterThanOrEqual(16); }
});

test('school name is shown in full ("ZUKKO XALQARO MAKTABI") together with "Kimyo" on every width', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  for (const width of [320, 360, 390, 1300]) {
    await page.setViewportSize({ width, height: 760 });
    await expect(page.locator('header.top .zk-school-name strong')).toBeVisible();
    await expect(page.locator('header.top .zk-school-name small')).toBeVisible();
    await expect(page.locator('header.top .zk-school-name small')).toHaveText('MAKTABI');
    await expect(page.locator('header.top .zk-subject')).toBeVisible();
    const ov = await page.evaluate(() => {
      const r = (s) => document.querySelector(s).getBoundingClientRect();
      const a = r('header.top .zk-school-name small'), b = r('header.top .zk-subject');
      return { overlap: !(a.bottom <= b.top + 1 || b.bottom <= a.top + 1 || a.right <= b.left || b.right <= a.left), sw: document.documentElement.scrollWidth - innerWidth };
    });
    expect(ov.overlap, 'MAKTABI and Kimyo must not overlap at ' + width).toBe(false);
    expect(ov.sw).toBeLessThanOrEqual(1);
  }
});

test('"MAKTABI" is centred under "ZUKKO XALQARO" and uses the same letter size', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  for (const width of [320, 390, 1300]) {
    await page.setViewportSize({ width, height: 760 });
    const m = await page.evaluate(() => {
      const a = document.querySelector('header.top .zk-school-name strong'), b = document.querySelector('header.top .zk-school-name small');
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return { fa: getComputedStyle(a).fontSize, fb: getComputedStyle(b).fontSize, ca: ra.left + ra.width / 2, cb: rb.left + rb.width / 2, below: rb.top >= ra.bottom - 1 };
    });
    expect(m.fb, 'same size at ' + width).toBe(m.fa);
    expect(Math.abs(m.ca - m.cb), 'centred at ' + width).toBeLessThanOrEqual(1.5);
    expect(m.below).toBe(true);
  }
});

test('desktop: content uses the full screen width (1440 / 1920 / 2560)', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop-only layout');
  await page.goto('/index.html#home'); await waitReady(page);
  for (const width of [1440, 1920, 2560]) {
    await page.setViewportSize({ width, height: Math.round(width * 0.5625) });
    const r = await page.evaluate(() => {
      const w = document.querySelector('#app .zk-hero-v3 > .wrap').getBoundingClientRect();
      return { width: w.width, left: w.left, sw: document.documentElement.scrollWidth - innerWidth };
    });
    expect(r.width, 'hero container spans the screen at ' + width).toBeGreaterThanOrEqual(width - 1);
    expect(r.sw).toBeLessThanOrEqual(1);
  }
});

test('desktop: "Sinflar" opens a dropdown with grades 6, 7 and 8', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop header only (phones use the bottom "Sinflar" menu)');
  await page.goto('/index.html#home'); await waitReady(page);
  const btn = page.locator('#navGradesBtn'), menu = page.locator('#navGradesMenu');
  await expect(btn).toBeVisible();
  await expect(btn).toHaveText(/Sinflar/);
  await expect(menu).toBeHidden();
  await expect(page.locator('nav.main > a[href="#g6"]')).toHaveCount(0);
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.locator('a')).toHaveCount(3);
  await expect(menu.locator('a b')).toHaveText(['6-sinf', '7-sinf', '8-sinf']);
  const [b, m] = await Promise.all([btn.boundingBox(), menu.boundingBox()]);
  expect(m.y, 'menu opens downward').toBeGreaterThan(b.y + b.height - 1);
  await menu.locator('a[href="#g7"]').click();
  await expect(page).toHaveURL(/#g7$/);
  await expect(menu).toBeHidden();
  await expect(btn).toHaveClass(/\bon\b/);
  await btn.click(); await expect(menu).toBeVisible();
  await page.keyboard.press('Escape'); await expect(menu).toBeHidden();
  await btn.click(); await page.mouse.click(20, 400); await expect(menu).toBeHidden();
  await page.evaluate(() => { location.hash = '#tests'; });
  await expect(btn).not.toHaveClass(/\bon\b/);
});

test('narrow desktop (burger): "Sinflar" expands inside the menu', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop/tablet only');
  await page.setViewportSize({ width: 1024, height: 760 });
  await page.goto('/index.html#home'); await waitReady(page);
  await page.locator('#burger').click();
  await page.locator('#navGradesBtn').click();
  await expect(page.locator('#navGradesMenu a')).toHaveCount(3);
  await page.locator('#navGradesMenu a[href="#g8"]').click();
  await expect(page).toHaveURL(/#g8$/);
});

test('page transitions: one smooth transition, instant scroll to top, header stays in place', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const info = await page.evaluate(() => ({ vt: typeof document.startViewTransition === 'function',
    hdr: getComputedStyle(document.querySelector('header.top')).viewTransitionName }));
  if (info.vt) expect(info.hdr).toBe('zk-header');
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, 1500); document.documentElement.style.scrollBehavior = ''; });
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(500);
  await page.evaluate(() => { location.hash = '#g7'; });
  await expect(page.locator('#app .page-h.g7')).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY), { message: 'jumps to top instead of smooth-scrolling', timeout: 3000 }).toBeLessThanOrEqual(2);
  // stagger kaskadi yo'q: dars kartalari alohida kechikmaydi
  const lcAnim = await page.locator('.lcard').first().evaluate((e) => getComputedStyle(e).animationName);
  expect(lcAnim).toBe('none');
});

test('periodic table fits on one screen on laptops and desktops', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Phones scroll the table sideways by design');
  for (const [w, h] of [[1920, 991], [1366, 657]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/index.html#ptable'); await waitReady(page);
    await expect(page.locator('.ptcell[data-z="118"]')).toBeAttached();
    const r = await page.evaluate(() => { const g = document.querySelector('.ptgrid').getBoundingClientRect(); return { gh: g.height, gw: g.width, sw: document.querySelector('.ptscroll').scrollWidth - document.querySelector('.ptscroll').clientWidth }; });
    expect(r.gh, 'whole table height fits the viewport at ' + w).toBeLessThanOrEqual(h - 72);
    expect(r.gw).toBeLessThanOrEqual(1200);
    expect(r.sw, 'no sideways scroll needed on desktop').toBeLessThanOrEqual(1);
  }
});

test('home: molecular lab card is level (not rotated)', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop shows the card open');
  await page.goto('/index.html#home'); await waitReady(page);
  expect(await page.locator('.zk-hero-scene').evaluate((e) => getComputedStyle(e).transform)).toBe('none');
});

test('new official logo: mark only in header, login and footer; app icons', async ({ page }) => {
  await gotoMock(page);
  // Login: faqat belgi (inglizcha "INTERNATIONAL SCHOOL" yozuvisiz), ostida o'zbekcha maktab nomi
  const mark = page.locator('.zk-gate .mk img');
  await expect(mark).toHaveAttribute('src', /assets\/zukko-mark\.svg/);
  const box = await mark.boundingBox(); expect(box.height).toBeGreaterThan(60);
  await expect(page.locator('.zk-gate .zk-brand-kicker')).toHaveText('ZUKKO XALQARO MAKTABI');
  await expect(page.locator('img[src*="zukko-logo"]')).toHaveCount(0);
  await page.goto('/index.html#home'); await waitReady(page);
  await expect(page.locator('header.top .logo .mark img')).toHaveAttribute('src', /zukko-mark\.svg/);
  await expect(page.locator('footer .zk-foot-logo')).toHaveAttribute('src', /zukko-mark-white\.svg/);
  const r = await page.evaluate(async () => {
    const m = await (await fetch('manifest.webmanifest')).json();
    const st = await Promise.all(m.icons.map((i) => fetch(i.src).then((x) => x.status)));
    const apple = document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href');
    return { st, srcs: m.icons.map((i) => i.src), apple, appleSt: (await fetch(apple)).status, mark: await (await fetch('assets/zukko-mark.svg')).text() };
  });
  expect(r.st.every((x) => x === 200)).toBe(true);
  expect(r.srcs.join(' ')).toContain('zukko-app-512.png');
  expect(r.apple).toContain('zukko-apple-180.png'); expect(r.appleSt).toBe(200);
  expect(r.mark).toContain('#075860');
});

test('speed: background is not repainted on scroll and hero 3D waits until the page is shown', async ({ page, isMobile }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const bg = await page.evaluate(() => ({ body: getComputedStyle(document.body).backgroundAttachment, layer: getComputedStyle(document.body, '::before').position }));
  expect(bg.body, 'no background-attachment:fixed (full repaint on every scroll step)').not.toContain('fixed');
  expect(bg.layer).toBe('fixed');
  // barcha skriptlar boshidan parallel yuklab olinadi
  expect(await page.locator('link[rel="preload"][as="script"]').count()).toBeGreaterThan(25);
  if (isMobile) return;
  await page.evaluate(() => { location.hash = '#tests'; });
  await expect(page.locator('#app .page-h.tests')).toBeVisible();
  await page.evaluate(() => { location.hash = '#home'; });
  await expect(page.locator('#heroLab')).toBeAttached();
  expect(await page.locator('#heroLab canvas').count(), 'hero 3D is deferred so navigation is instant').toBe(0);
});

test('speed: weak GPUs get the light 3D mode automatically; ?gfx=hq forces full quality', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const id = await page.evaluate(() => window.Lab?.list?.find((e) => e.build)?.id || '');
  test.skip(!id, '3D modules are unavailable in this environment');
  const tier = await page.evaluate(() => window.Lab.gpuTier && window.Lab.gpuTier());
  expect(['lite', 'hq']).toContain(tier);
  await page.evaluate((x) => { location.hash = '#lab-' + x; }, id);
  await page.waitForFunction(() => document.querySelector('#bigLab .lab-err') || document.querySelector('#bigLab[data-gfx]'), null, { timeout: 20_000 });
  test.skip(await page.locator('#bigLab .lab-err').count() > 0, 'No WebGL renderer');
  await expect(page.locator('#bigLab')).toHaveAttribute('data-gfx', tier);
  // test brauzeri dasturiy grafika (SwiftShader) — yengil rejim kutiladi
  const gpu = await page.evaluate(() => window.Lab.gpu || '');
  if (/SwiftShader|llvmpipe/i.test(gpu)) expect(tier).toBe('lite');
  await page.goto('/index.html?gfx=hq#home'); await waitReady(page);
  expect(await page.evaluate(() => window.Lab.gpuTier())).toBe('hq');
  await page.evaluate(() => localStorage.removeItem('zk_gfx'));
});
