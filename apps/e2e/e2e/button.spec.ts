import { test, expect } from '../fixtures.js'

test.describe('Button stories', () => {
	test('primary solid matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-button--primary&viewMode=story')
		const button = page.getByRole('button', { name: 'Click me' })
		await expect(button).toBeVisible()
		await expect(button).toHaveScreenshot('button-primary.png')
	})

	test('all variants grid matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-button--all-variants&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('button-all-variants.png')
	})
})
