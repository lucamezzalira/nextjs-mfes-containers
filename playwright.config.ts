import { defineConfig, devices } from '@playwright/test';

const zoneEnv = {
  NEXT_PUBLIC_HOME_URL: 'http://localhost:3000',
  NEXT_PUBLIC_CATALOG_URL: 'http://localhost:3001',
  NEXT_PUBLIC_ACCOUNT_URL: 'http://localhost:3002',
  NEXT_PUBLIC_CATALOG_BASE_PATH: '/catalog',
  NEXT_PUBLIC_ACCOUNT_BASE_PATH: '/account',
};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  timeout: 60_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    trace: 'on-first-retry',
    ...devices['Desktop Chrome'],
  },
  webServer: [
    {
      command: 'pnpm --filter home dev',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: zoneEnv,
    },
    {
      command: 'pnpm --filter catalog dev',
      url: 'http://localhost:3001/catalog',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: zoneEnv,
    },
    {
      command: 'pnpm --filter account dev',
      url: 'http://localhost:3002/account',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: zoneEnv,
    },
  ],
});
