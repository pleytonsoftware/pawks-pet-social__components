import { test, expect } from '../fixtures.js'

test.describe('Input stories', () => {
	test('states matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--states&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('input-states.png')
	})

	test('focus shows a visible ring', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--default&viewMode=story')
		await page.getByPlaceholder('Pet name').focus()
		await expect(page.locator('body')).toHaveScreenshot('input-focus.png')
	})

	test('with label matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--with-label&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('input-with-label.png')
	})

	test('with error matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--with-error&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('input-with-error.png')
	})

	test('file input matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--file-input&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('input-file.png')
	})

	test('file input stays keyboard-focusable despite being visually hidden (sr-only, not display:none)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--file-input&viewMode=story')
		await page.locator('input[type="file"]').focus()
		await expect(page.locator('input[type="file"]')).toBeFocused()
	})

	test('file input reflects disabled state on the visible label via has-disabled', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--file-input&viewMode=story')
		await page.locator('input[type="file"]').evaluate((el: HTMLInputElement) => {
			el.disabled = true
		})
		await expect(page.locator('[data-slot="input"]')).toHaveCSS('opacity', '0.4')
	})

	test('file input reflects aria-invalid on the visible label via has-aria-invalid', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--file-input&viewMode=story')
		await page.locator('input[type="file"]').evaluate((el) => el.setAttribute('aria-invalid', 'true'))
		await expect(page.locator('[data-slot="input"]')).toHaveCSS('border-color', 'rgb(206, 55, 44)')
	})

	test('data-slot attribute is present', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--default&viewMode=story')
		await expect(page.locator('input')).toHaveAttribute('data-slot', 'input')
	})

	test('ref exposes the underlying DOM node for imperative focus', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-input--ref-focus&viewMode=story')
		await page.getByRole('button', { name: 'Focus' }).click()
		await expect(page.getByPlaceholder('Click the button to focus me')).toBeFocused()
	})
})
