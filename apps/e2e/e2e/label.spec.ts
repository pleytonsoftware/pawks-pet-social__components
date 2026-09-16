import { test, expect } from '../fixtures.js'

test.describe('Label stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('label-default.png')
	})

	test('custom styling matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--custom-styling&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('label-custom-styling.png')
	})

	test('with input matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--with-input&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('label-with-input.png')
	})

	test('clicking the label focuses its paired input (native htmlFor behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--with-input&viewMode=story')
		await page.getByText('Email', { exact: true }).first().click()
		await expect(page.locator('#email-enabled')).toBeFocused()
	})

	test('renders a native label element with data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--default&viewMode=story')
		const label = page.locator('[data-slot="label"]')
		await expect(label).toHaveAttribute('data-slot', 'label')
		await expect(label).toHaveJSProperty('tagName', 'LABEL')
	})

	test('htmlFor and id accessibility attributes pass through', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--with-accessibility-attributes&viewMode=story')
		const label = page.locator('#email-label')
		await expect(label).toHaveAttribute('for', 'email-a11y')
	})

	test('ref points at the real <label> node — clicking it via ref.current.click() focuses the paired input', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-label--ref-focus&viewMode=story')
		await page.getByRole('button', { name: 'Click label via ref' }).click()
		await expect(page.locator('#email-ref-demo')).toBeFocused()
	})
})
