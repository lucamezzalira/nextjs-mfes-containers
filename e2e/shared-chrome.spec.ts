import { expect, test } from '@playwright/test';

test.describe('shared chrome', () => {
  test('header brand and nav links render on home', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('link', { name: 'T-Shirt Shop' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Catalog' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'My Account' })).toBeVisible();
  });

  test('unsplash images load on home', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const hero = page.locator('img').first();
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute('src', /images\.unsplash\.com|\/_next\/image/);
  });
});
