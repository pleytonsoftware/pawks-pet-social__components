import { test, expect } from '../fixtures.js'

test.describe('Text stories', () => {
	test('all variants matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-text--all-variants&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('text-all-variants.png')
	})
})
