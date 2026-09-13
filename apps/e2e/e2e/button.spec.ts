import { test, expect } from '@playwright/test'

test.describe('Button stories', () => {
	test('primary variant matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-button--primary&viewMode=story')
		const button = page.getByRole('button', { name: 'Click me' })
		await expect(button).toBeVisible()
		await expect(button).toHaveScreenshot('button-primary.png')
	})

	test('muted variant matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-button--muted&viewMode=story')
		const button = page.getByRole('button', { name: 'Click me' })
		await expect(button).toBeVisible()
		await expect(button).toHaveScreenshot('button-muted.png')
	})
})
