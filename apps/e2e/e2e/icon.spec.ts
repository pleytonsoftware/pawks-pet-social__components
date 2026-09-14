import { test, expect } from '@playwright/test'

test.describe('Icon stories', () => {
	test('all sizes matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-icon--all-sizes&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('icon-all-sizes.png')
	})

	test('all sources matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-icon--all-sources&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('icon-all-sources.png')
	})
})
