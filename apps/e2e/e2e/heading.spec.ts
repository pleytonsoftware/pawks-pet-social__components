import { test, expect } from '../fixtures.js'

test.describe('Heading stories', () => {
	test('all variants matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-heading--all-variants&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('heading-all-variants.png')
	})
})
