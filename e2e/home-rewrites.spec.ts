import { expect, test } from '@playwright/test';

test.describe('home rewrites composition', () => {
  test('catalog list via home :3000/catalog', async ({ page }) => {
    await page.goto('http://localhost:3000/catalog');
    await expect(page.getByRole('heading', { name: 'Our T-Shirts' })).toBeVisible();
    await expect(page.getByText('Classic White T-Shirt')).toBeVisible();
  });

  test('catalog product via home :3000/catalog/product/1', async ({ page }) => {
    await page.goto('http://localhost:3000/catalog/product/1');
    await expect(page.getByRole('heading', { name: 'Classic White T-Shirt' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  test('account via home :3000/account', async ({ page }) => {
    await page.goto('http://localhost:3000/account');
    await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
    await expect(page.getByText('Personal Information')).toBeVisible();
  });
});
