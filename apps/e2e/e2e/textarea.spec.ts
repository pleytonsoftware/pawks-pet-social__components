import { test, expect } from '../fixtures.js'

test.describe('Textarea stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('textarea-default.png')
	})

	test('disabled matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--disabled&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('textarea-disabled.png')
	})

	test('readonly matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--read-only&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('textarea-readonly.png')
	})

	test('invalid matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--invalid&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('textarea-invalid.png')
	})

	test('resize none matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--resize-none&viewMode=story')
		const resize = await page.locator('textarea').evaluate((el) => getComputedStyle(el).resize)
		expect(resize).toBe('none')
	})

	test('default resize is vertical only', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--default&viewMode=story')
		const resize = await page.locator('textarea').evaluate((el) => getComputedStyle(el).resize)
		expect(resize).toBe('vertical')
	})

	test('controlled typing updates the live character count with no state owned by Textarea', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--controlled&viewMode=story')
		await page.locator('textarea').fill('hello world')
		await expect(page.getByText('11 characters')).toBeVisible()
	})

	test('with field matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--with-field&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('textarea-with-field.png')
	})

	test('with field error matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--with-field-error&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('textarea-with-field-error.png')
	})

	test('clicking the paired Label focuses the textarea', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--with-label&viewMode=story')
		await page.locator('[data-slot="label"]').click()
		await expect(page.locator('#description-label')).toBeFocused()
	})

	test('data-slot attribute is present', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--default&viewMode=story')
		await expect(page.locator('textarea')).toHaveAttribute('data-slot', 'textarea')
	})

	test('native constraints (required/minLength/maxLength) are forwarded, not reimplemented', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-textarea--constrained&viewMode=story')
		const textarea = page.locator('textarea')
		await expect(textarea).toHaveAttribute('required', '')
		await expect(textarea).toHaveAttribute('minlength', '20')
		await expect(textarea).toHaveAttribute('maxlength', '500')
	})
})
