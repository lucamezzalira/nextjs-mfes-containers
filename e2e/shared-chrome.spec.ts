import { expect, test } from '@playwright/test';

test.describe('shared chrome', () => {
  test('header brand and nav links render on home', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.getByRole('link', { name: 'T-Shirt Shop' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Catalog' })).toHaveAttribute(
      'href',
      '/catalog',
    );
    await expect(page.getByRole('navigation').getByRole('link', { name: 'My Account' })).toHaveAttribute(
      'href',
      '/account',
    );
  });

  test('header catalog navigates through MFE proxy', async ({ page }) => {
    const proxyOrigin = process.env.MFE_PROXY_URL ?? 'http://localhost:3024';
    await page.goto(proxyOrigin);
    await page.getByRole('navigation').getByRole('link', { name: 'Catalog' }).click();
    await expect(page).toHaveURL(`${proxyOrigin}/catalog`);
    await expect(page.getByRole('heading', { name: 'Our T-Shirts' })).toBeVisible();
  });

  test('unsplash images load on home', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const hero = page.locator('img').first();
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute('src', /images\.unsplash\.com|\/_next\/image/);
  });
});
