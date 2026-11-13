import { test, expect, waitReady, gotoMock, bootstrapAdmin } from './fixtures.mjs';

/* Zukko brend dizayni (brand.css + icons.js) uchun brauzer testlari. */
const EMOJI_UI = /[🏠📚📘📖📄🧪✅🛡⚡🔥⭐📊🎯🚀🧩📜🏆⚙💡🎓📦⬇☁📥➕❓⚠]/u;

test('brand layer is loaded: teal hero, serif headings; login (brand-entry.css) keeps school logo', async ({ page }) => {
  await gotoMock(page);
  const gate = page.locator('.zk-gate');
  await expect(gate.locator('.mk img')).toHaveAttribute('src', /zukko-school-logo\.webp/);
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
