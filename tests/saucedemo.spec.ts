import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Products')).toBeVisible();
  await expect(page).toHaveURL(/inventory/);
});

test('locked out user sees an error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // The error should appear, and we should still be on the login page
  await expect(page.getByText('Sorry, this user has been locked out.')).toBeVisible();
  await expect(page).not.toHaveURL(/inventory/);
});