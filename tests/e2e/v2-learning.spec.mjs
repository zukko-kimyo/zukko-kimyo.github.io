/* Playwright integration checks: local mock backend, no production data. */
import { test, expect, bootstrapAdmin } from './fixtures.mjs';

test('home dashboard and personal certificate are available after sign-in', async ({ page }) => {
  await bootstrapAdmin(page);
  await expect(page.locator('.zk-dash')).toBeVisible();
  await expect(page.locator('.zk-dash-kpi')).toHaveCount(4);
  await expect(page.locator('.zk-quest')).toHaveCount(3);
  await page.locator('.zk-quick-actions a[href="#certificate"]').click();
  await expect(page.locator('.zk-cert-locked')).toBeVisible();
  await expect(page.locator('.zk-cert-locked')).toContainText('10');
});

test('admin can record and reload class attendance in mock Firestore', async ({ page }) => {
  await bootstrapAdmin(page);
  await page.evaluate(async () => {
    await ZKAuth.backend.set('users', 'attendance-test-student', {
      role: 'student', login: 'attendance.test', name: 'Test Oquvchi',
      cls: '6A', status: 'active', created: Date.now()
    });
  });
  await page.goto('/index.html?mock#admin');
  await expect(page.locator('#zkAttRows tr[data-uid="attendance-test-student"]')).toBeVisible();
  const row = page.locator('#zkAttRows tr[data-uid="attendance-test-student"]');
  await row.locator('button[data-value="present"]').click();
  await expect(page.locator('#zkAttSave')).toBeEnabled();
  await page.locator('#zkAttSave').click();
  await expect(page.locator('#zkAttMsg')).toContainText(/saqlandi|saved/i);
  await page.locator('#zkAttReload').click();
  await expect(row.locator('button[data-value="present"]')).toHaveAttribute('aria-pressed', 'true');
});

test('failed attendance read blocks save, preventing an accidental overwrite', async ({ page }) => {
  await bootstrapAdmin(page);
  await page.evaluate(async () => {
    await ZKAuth.backend.set('users', 'attendance-test-student', {
      role: 'student', login: 'attendance.test', name: 'Test Oquvchi',
      cls: '6A', status: 'active', created: Date.now()
    });
    const oldGet = ZKAuth.backend.get.bind(ZKAuth.backend);
    ZKAuth.backend.get = async (collection, id) => {
      if (collection === 'attendance') throw new Error('simulated read failure');
      return oldGet(collection, id);
    };
    location.hash = '#admin';
  });
  await expect(page.locator('#zkAttMsg')).toContainText(/yuklab bo‘lmadi|could not load/i);
  const row = page.locator('#zkAttRows tr[data-uid="attendance-test-student"]');
  await row.locator('button[data-value="present"]').click();
  await expect(page.locator('#zkAttSave')).toBeDisabled();
});

test('3D experiment provides selectable animation steps when WebGL is available', async ({ page }) => {
  test.slow(); // dasturiy WebGL (GPU'siz) parallel ishlaganda rAF sekinlashadi
  await bootstrapAdmin(page);
  const id = await page.evaluate(() => window.Lab?.list?.find((e) => e.id && e.build)?.id || '');
  test.skip(!id, '3D modules are unavailable in this environment');
  await page.evaluate((experimentId) => { location.hash = '#lab-' + experimentId; }, id);
  // Headless CI can expose Three.js data while denying WebGL context creation.
  // Only skip that explicitly unsupported renderer state, not any missing guide.
  await page.waitForFunction(() => {
    const lab = document.getElementById('bigLab');
    return lab && (lab.querySelector('.lab-err') || document.querySelector('.zk-lab-guide'));
  }, null, { timeout: 20_000 });
  const noRenderer = await page.locator('#bigLab .lab-err').count() > 0;
  test.skip(noRenderer, 'WebGL renderer is not supported by this CI browser');
  await expect(page.locator('.zk-lab-guide')).toBeVisible();
  const steps = page.locator('.zk-lab-guide .zk-step');
  const count = await steps.count();
  test.skip(count < 2, 'This experiment contains fewer than two steps');
  await steps.nth(1).click();
  await expect(steps.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#zkLabCounter')).toContainText(/2/);
});


// Simulated renderer validates timeline wiring even if CI has no GPU/WebGL.
test('3D walkthrough lets students select a step on mobile and desktop', async ({ page }) => {
  await bootstrapAdmin(page);
  const supported = await page.evaluate(() => {
    const id = window.Lab?.list?.find(e => e.id)?.id;
    if (!id) return false;
    const captions = [
      { uz: 'Boshlanish', en: 'Start' },
      { uz: 'Kimyoviy reaksiya', en: 'Reaction' }
    ];
    window.Lab.open = () => {
      let current = 0;
      return {
        steps: [{ start: 0, dur: 2, cap: captions[0] }, { start: 2, dur: 3, cap: captions[1], eq: 'H₂ + O₂ → H₂O' }],
        seek(v) { current = v >= 2 ? 1 : 0; },
        play() {},
        get stepIndex() { return current; },
        destroy() {}
      };
    };
    location.hash = '#lab-' + id;
    return true;
  });
  test.skip(!supported, 'No chemistry experiment is registered');
  await expect(page.locator('.zk-lab-guide')).toBeVisible();
  const steps = page.locator('.zk-lab-guide .zk-step');
  await expect(steps).toHaveCount(2);
  await steps.nth(1).click();
  await expect(steps.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#zkLabCaption')).toContainText(/reaksiya|reaction/i);
  await expect(page.locator('#zkLabEquation')).toContainText('H₂');
});
