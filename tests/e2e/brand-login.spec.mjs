import { test, expect, gotoMock, login, bootstrapAdmin, waitReady } from './fixtures.mjs';

test('school-logo login loads, with modern form styling and accessible show-password action', async ({ page }) => {
  await gotoMock(page);
  const card = page.locator('.zk-gate form.card');
  await expect(card).toBeVisible();
  await expect(card.locator('.mk img')).toBeVisible();
  await expect(card.locator('.zk-brand-kicker')).toContainText('ZUKKO XALQARO MAKTABI');
  const logo = await card.locator('.mk img').evaluate(el => ({
    complete: el.complete, width: el.naturalWidth, height: el.naturalHeight
  }));
  expect(logo.complete).toBe(true);
  expect(logo.width).toBeGreaterThan(50);
  expect(logo.height).toBeGreaterThan(50);
  const background = await page.locator('.zk-gate').evaluate(el => getComputedStyle(el).backgroundImage);
  expect(background).not.toContain('255, 224, 194'); // old orange login theme
  await page.locator('#zkL').fill('admin');
  await page.locator('#zkP').fill('test-password');
  const eye=page.locator('.zk-gate .eye');
  await eye.click();
  await expect(page.locator('#zkP')).toHaveAttribute('type','text');
  await expect(eye).toHaveAttribute('aria-pressed','true');
  await eye.click();
  await expect(page.locator('#zkP')).toHaveAttribute('type','password');
  await expect(eye).toHaveAttribute('aria-pressed','false');
  await expect(page.locator('#zkL')).toHaveValue('admin');
});

test('registration and language switch preserve the real school brand and existing login behavior', async ({ page }) => {
  await gotoMock(page);
  await page.locator('.zk-gate [data-reg]').click();
  await expect(page.locator('.zk-gate form .mk img')).toBeVisible();
  await expect(page.locator('#zkN')).toBeVisible();
  await expect(page.locator('#zkC')).toBeVisible();
  await page.locator('.zk-gate .lng button[data-l="en"]').click();
  await expect(page.locator('.zk-gate .zk-brand-kicker')).toContainText('ZUKKO INTERNATIONAL SCHOOL');
  await expect(page.locator('.zk-gate .eye')).toHaveAttribute('aria-label','Show password');
  await page.locator('.zk-gate [data-login]').click();
  await expect(page.locator('.zk-gate #zkL')).toBeVisible();
  await expect(page.locator('.zk-gate .zk-brand-kicker')).toContainText('ZUKKO INTERNATIONAL SCHOOL');
  await login(page, 'admin', 'wrong-password');
  await expect(page.locator('#zkE')).toBeVisible();
  await expect(page.locator('#zkE')).toHaveAttribute('role','alert');
});

test('brand loading animation uses original school logo and supports reduced motion', async ({ page }) => {
  await page.goto('/index.html?mock#home');
  const styles=await page.evaluate(async () => {
    const r=await fetch('brand-entry.css?v=20261112-brand-02');
    const stylesheet=await r.text();
    return {status:r.status,hasAnimation:stylesheet.includes('zkBrandOrbit'),reduced:stylesheet.includes('prefers-reduced-motion')};
  });
  expect(styles.status).toBe(200);
  expect(styles.hasAnimation).toBe(true);
  expect(styles.reduced).toBe(true);
  await waitReady(page);
  await expect(page.locator('.zk-gate form .mk img')).toBeVisible();
});

test('Android web app manifest and favicon reference the school, not the old beaker', async ({ page }) => {
  await page.goto('/index.html?mock#home');
  const icon=page.locator('link[rel="icon"][type="image/svg+xml"]');
  await expect(icon).toHaveAttribute('href',/zukko-school-app-icon\.svg/);
  const assets=await page.evaluate(async () => {
    const m=await (await fetch('manifest.webmanifest?v=20261112-brand-02')).json();
    const icon=await fetch('assets/zukko-school-app-icon.svg');
    const source=await icon.text();
    // 2026-11-13: yangi rasmiy logotip — vektor (teal #075860), ichiga raster joylanmagan
    return {m,iconStatus:icon.status,vectorLogo:/<path[^>]+fill="#075860"/.test(source)&&!source.includes('base64')};
  });
  expect(assets.iconStatus).toBe(200);
  expect(assets.vectorLogo).toBe(true);
  expect(assets.m.icons[0].src).toContain('zukko-school-app-icon.svg');
  expect(assets.m.icons.map(i=>i.src).join(' ')).not.toContain('icon-512.png');
});

test('login and school logo fit 320, 360 and 390 px phones without horizontal overflow', async ({ page, isMobile }) => {
  test.skip(!isMobile,'Mobile viewport test');
  await gotoMock(page);
  for(const width of [320,360,390]){
    await page.setViewportSize({width,height:700});
    const card=page.locator('.zk-gate form.card');
    await expect(card).toBeVisible();
    await expect(card.locator('.mk img')).toBeVisible();
    const size=await page.evaluate(()=>{
      const card=document.querySelector('.zk-gate form.card').getBoundingClientRect();
      return {left:card.left,right:card.right,width:innerWidth,scroll:document.documentElement.scrollWidth};
    });
    expect(size.left).toBeGreaterThanOrEqual(0);
    expect(size.right).toBeLessThanOrEqual(size.width+1);
    expect(size.scroll-size.width).toBeLessThanOrEqual(1);
  }
});

test('admin login keeps original authentication and shows authenticated site logo', async ({ page }) => {
  await bootstrapAdmin(page);
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await expect(page.locator('header.top .logo .mark img')).toBeVisible();
  await expect(page.locator('#uchip')).toBeVisible();
});


test('PWA icon paints the official teal school emblem on white (2026-11-13 logo)', async ({ page }) => {
  await page.goto('/index.html?mock#home');
  const px=await page.evaluate(async () => {
    const img=new Image();img.src='assets/zukko-school-app-icon.svg';
    await img.decode();
    const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    ctx.drawImage(img,0,0,128,128);
    // Markaziy ustun (qalam) — teal; burchak — oq fon.
    return { pillar:[...ctx.getImageData(64,42,1,1).data], corner:[...ctx.getImageData(4,4,1,1).data] };
  });
  expect(px.pillar[3]).toBeGreaterThan(200);
  expect(px.pillar[0], 'teal emblem (red channel low)').toBeLessThan(80);
  expect(px.pillar[1]).toBeGreaterThan(50); expect(px.pillar[2]).toBeGreaterThan(60);
  expect(Math.min(...px.corner.slice(0,3)), 'white background').toBeGreaterThan(235);
});
