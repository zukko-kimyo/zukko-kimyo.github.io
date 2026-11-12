import { test, expect, bootstrapAdmin, waitReady } from './fixtures.mjs';

test('mobile bottom navigation groups grades and places personal panel at far right', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only controls');
  await page.goto('/index.html#home');
  await waitReady(page);
  const nav = page.locator('#bnav');
  await expect(nav).toBeVisible();
  await expect(nav.locator(':scope > a')).toHaveCount(4);
  await expect(nav.locator('#mobileGradesToggle')).toBeVisible();
  await expect(nav.locator('#mobilePanelLink')).toHaveAttribute('href', '#me');
  await expect(nav.locator('#mobilePanelLink')).toHaveText(/Profil|Profile/);
  await expect(nav.locator('#mobileGradesMenu')).toBeHidden();
  await nav.locator('#mobileGradesToggle').click();
  await expect(nav.locator('#mobileGradesToggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(nav.locator('#mobileGradesMenu')).toBeVisible();
  await expect(nav.locator('#mobileGradesMenu a')).toHaveCount(3);
  await nav.locator('#mobileGradesMenu a[href="#g7"]').click();
  await expect(page).toHaveURL(/#g7$/);
  await expect(nav.locator('#mobileGradesMenu')).toBeHidden();
  await expect(nav.locator('#mobileGradesToggle')).toHaveClass(/on/);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(over, 'no sideways scroll').toBeLessThanOrEqual(1);
});

test('mobile admin has right-side student drawer with search, close and no page overflow', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only admin drawer');
  await bootstrapAdmin(page);
  await page.evaluate(async () => {
    await ZKAuth.backend.set('users', 'mobile-admin-student', {
      name:'Mobil Sinov Oquvchi', login:'mobile.student', cls:'7A',
      role:'student', status:'active', created:Date.now()
    });
    await ZKAuth.backend.set('progress','mobile-admin-student',{xp:55,quizAvg:8,updated:Date.now()});
  });
  await page.goto('/index.html?mock#admin');
  await expect(page.locator('#adBody .ad-kpi [data-k]')).toHaveCount(10);
  await expect(page.locator('#mobilePanelLink')).toHaveAttribute('href','#admin');
  await expect(page.locator('#mobilePanelLink')).toHaveClass(/on/);
  await expect(page.locator('#adStudentsOpen')).toBeVisible();
  await expect(page.locator('#adBody .ad-students-panel')).toBeHidden();
  await expect(page.locator('#adStudentsDrawer')).toBeHidden();
  await page.locator('#adStudentsOpen').click();
  await expect(page.locator('#adStudentsDrawer')).toBeVisible();
  await expect(page.locator('#adStudentsRows')).toContainText('Mobil Sinov Oquvchi');
  await page.locator('#adStudentsSearch').fill('7A');
  await expect(page.locator('#adStudentsRows')).toContainText('Mobil Sinov Oquvchi');
  await page.locator('#adStudentsSearch').fill('mavjudemas');
  await expect(page.locator('#adStudentsRows')).not.toContainText('Mobil Sinov Oquvchi');
  const position = await page.evaluate(() => {
    const b = document.querySelector('#adStudentsDrawer').getBoundingClientRect();
    return { right:b.right, left:b.left, width:innerWidth };
  });
  expect(position.right).toBeLessThanOrEqual(position.width + 1);
  expect(position.left).toBeGreaterThan(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('#adStudentsDrawer')).toBeHidden();
  await expect(page.locator('#adStudentsOpen')).toBeFocused();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow,'admin screen must not overflow horizontally').toBeLessThanOrEqual(1);
});

test('mobile teacher student filter renders buttons and student cards', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only teacher result layout');
  await bootstrapAdmin(page);
  await page.evaluate(async () => {
    await ZKAuth.backend.set('users','mobile-teacher-student',{
      name:'Teacher Sinov Oquvchi',login:'teacher.student',cls:'6A',
      role:'student',status:'active',created:Date.now()
    });
  });
  await page.goto('/index.html?mock#teacher');
  await expect(page.locator('.tc-tabs button[data-t=res]')).toBeVisible();
  await expect(page.locator('#mobilePanelLink')).toHaveAttribute('href','#admin');
  await expect(page.locator('#tcBody .tc-chips button')).not.toHaveCount(0);
  await expect(page.locator('#tcBody .tc-chips button[data-c="6A"]')).toBeVisible();
  await page.locator('#tcBody .tc-chips button[data-c="6A"]').click();
  await expect(page.locator('#tcBody table.tc.resp tbody')).toContainText('Teacher Sinov Oquvchi');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow,'teacher page must not overflow horizontally').toBeLessThanOrEqual(1);
});

test('desktop administration keeps student directory in right column', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop-only layout');
  await bootstrapAdmin(page);
  await page.evaluate(async () => {
    await ZKAuth.backend.set('users','desktop-admin-student',{
      name:'Desktop Student',login:'desktop.student',cls:'8A',
      role:'student',status:'active',created:Date.now()
    });
  });
  await page.goto('/index.html?mock#admin');
  await expect(page.locator('.ad-directory .ad-students-panel')).toBeVisible();
  await expect(page.locator('#adStudentsOpen')).toBeHidden();
  const coordinates=await page.evaluate(()=>{
    const a=document.querySelector('.ad-directory .panel:first-child').getBoundingClientRect();
    const b=document.querySelector('.ad-directory .ad-students-panel').getBoundingClientRect();
    return {left:a.left,right:b.left};
  });
  expect(coordinates.right).toBeGreaterThan(coordinates.left);
});


test('admin page and 5-button mobile bar fit narrow 320, 360 and 390 pixel screens', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile viewport-only test');
  await bootstrapAdmin(page);
  await page.evaluate(() => { location.hash = '#admin'; });
  await expect(page.locator('#adBody .ad-kpi [data-k]')).toHaveCount(10);
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height: 720 });
    const layout = await page.evaluate(() => {
      const nav = document.querySelector('#bnav');
      const rect = nav.getBoundingClientRect();
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        navWidth: rect.width,
        buttons: [...nav.children].filter(el => el.matches('a,button')).length,
        panelVisible: !!document.querySelector('#adStudentsOpen')?.getClientRects().length
      };
    });
    expect(layout.scrollWidth - layout.viewport, 'no horizontal page overflow at ' + width + 'px').toBeLessThanOrEqual(1);
    expect(layout.navWidth, 'bottom bar fills the viewport').toBeGreaterThanOrEqual(width - 2);
    expect(layout.buttons).toBe(5);
    expect(layout.panelVisible).toBe(true);
  }
});
