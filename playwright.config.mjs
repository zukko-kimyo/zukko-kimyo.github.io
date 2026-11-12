// Playwright e2e testlari. Sayt "sinov rejimida" (mock) ishlaydi: Firebase'ga ulanmaydi,
// barcha ma'lumot brauzerning localStorage'ida saqlanadi (tests/e2e/fixtures.mjs ga qarang).
import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT || 8090);

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  expect: { timeout: 20_000 },
  workers: process.env.CI ? 2 : undefined,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  webServer: { command: `node tests/serve.mjs`, port: PORT, reuseExistingServer: !process.env.CI, env: { PORT: String(PORT) } },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1300, height: 850 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
