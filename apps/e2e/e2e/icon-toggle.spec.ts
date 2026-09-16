import { test, expect } from '../fixtures.js'

test.describe('IconToggle stories', () => {
	test('default vs pressed matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-icontoggle--default-vs-pressed&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('icon-toggle-default-vs-pressed.png')
	})

	test('all tones matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-icontoggle--all-tones&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('icon-toggle-all-tones.png')
	})

	test('with label matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-icontoggle--with-label&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('icon-toggle-with-label.png')
	})

	test('hover shows transparent fill preview', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-icontoggle--default&viewMode=story')
		const toggle = page.getByRole('button', { name: 'Like' })
		await toggle.hover()
		await expect(page.locator('body')).toHaveScreenshot('icon-toggle-hover.png')
	})
})
