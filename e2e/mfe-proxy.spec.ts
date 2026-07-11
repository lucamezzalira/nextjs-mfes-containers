import { expect, test } from '@playwright/test';

const proxyOrigin = process.env.MFE_PROXY_URL ?? 'http://localhost:3024';

test.describe('microfrontends proxy composition', () => {
  test('catalog list via MFE proxy /catalog', async ({ page }) => {
    await page.goto(`${proxyOrigin}/catalog`);
    await expect(page.getByRole('heading', { name: 'Our T-Shirts' })).toBeVisible();
    await expect(page.getByText('Classic White T-Shirt')).toBeVisible();
  });

  test('catalog product via MFE proxy /catalog/product/1', async ({ page }) => {
    await page.goto(`${proxyOrigin}/catalog/product/1`);
    await expect(page.getByRole('heading', { name: 'Classic White T-Shirt' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('account via MFE proxy /account', async ({ page }) => {
    await page.goto(`${proxyOrigin}/account`);
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
    await expect(page.getByText('Personal Information')).toBeVisible();
  });

  test('home landing via MFE proxy /', async ({ page }) => {
    await page.goto(proxyOrigin);
    await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible();
  });
});
