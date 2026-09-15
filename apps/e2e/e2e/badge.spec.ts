import { test, expect } from '@playwright/test'

test.describe('Badge stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-default.png')
	})

	test('all tones matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--all-tones&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-all-tones.png')
	})

	test('all appearances matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--all-appearances&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-all-appearances.png')
	})

	test('all sizes matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--all-sizes&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-all-sizes.png')
	})

	test('with icon matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--with-icon&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-with-icon.png')
	})

	test('with dot matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--with-dot&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-with-dot.png')
	})

	test('combinations matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-badge--combinations&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('badge-combinations.png')
	})
})
