import { expect, test } from '@playwright/test';

test.describe('direct zone ports', () => {
  test('home serves landing content on :3000', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Shop Now' })).toBeVisible();
    await expect(page.locator('img').first()).toBeVisible();
  });

  test('catalog list serves on :3001/catalog', async ({ page }) => {
    await page.goto('http://localhost:3001/catalog');
    await expect(page.getByRole('heading', { name: 'Our T-Shirts' })).toBeVisible();
    await expect(page.getByText('Classic White T-Shirt')).toBeVisible();
  });

  test('catalog product detail serves on :3001/catalog/product/1', async ({ page }) => {
    await page.goto('http://localhost:3001/catalog/product/1');
    await expect(page.getByRole('heading', { name: 'Classic White T-Shirt' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('account UI serves on :3002/account', async ({ page }) => {
    await page.goto('http://localhost:3002/account');
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Orders' })).toBeVisible();
    await expect(page.getByText('Personal Information')).toBeVisible();
  });
});
