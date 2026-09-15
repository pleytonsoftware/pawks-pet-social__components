import { test, expect } from '@playwright/test'

test.describe('Avatar stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-default.png')
	})

	test('fallback matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--fallback&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-fallback.png')
	})

	test('all sizes matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--all-sizes&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-all-sizes.png')
	})

	test('colored borders matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--colored-borders&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-colored-borders.png')
	})

	test('fallback variants matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--fallback-variants&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-fallback-variants.png')
	})

	test('group matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--group&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-group.png')
	})

	test('group custom max matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-avatar--group-custom-max&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('avatar-group-custom-max.png')
	})
})
