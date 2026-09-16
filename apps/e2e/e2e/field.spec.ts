import { test, expect } from '../fixtures.js'

test.describe('Field stories', () => {
	test('basic matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--basic&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('field-basic.png')
	})

	test('with description and error matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--with-description-and-error&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('field-with-description-and-error.png')
	})

	test('FieldError renders nothing when children is falsy', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--without-error&viewMode=story')
		await expect(page.locator('[data-slot="field-error"]')).toHaveCount(0)
		await expect(page.locator('body')).toHaveScreenshot('field-without-error.png')
	})

	test('different controls matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--different-controls&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('field-different-controls.png')
	})

	test('orientations matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--orientations&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('field-orientations.png')
	})

	test('data-orientation attribute reflects the orientation prop', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--orientations&viewMode=story')
		const fields = page.locator('[data-slot="field"]')
		await expect(fields.nth(0)).toHaveAttribute('data-orientation', 'vertical')
		await expect(fields.nth(1)).toHaveAttribute('data-orientation', 'horizontal')
	})

	test('clicking FieldLabel focuses its paired control (native htmlFor behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-field--basic&viewMode=story')
		await page.getByText('Email', { exact: true }).click()
		await expect(page.locator('#email-basic')).toBeFocused()
	})
})
