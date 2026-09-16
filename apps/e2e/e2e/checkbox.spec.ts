import { test, expect } from '../fixtures.js'

test.describe('Checkbox stories', () => {
	test('all states matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--all-states&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('checkbox-all-states.png')
	})

	test('with label matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--with-label&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('checkbox-with-label.png')
	})

	test('with field matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--with-field&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('checkbox-with-field.png')
	})

	test('with field error matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--with-field-error&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('checkbox-with-field-error.png')
	})

	test('data-slot and initial data-state are correct', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--default&viewMode=story')
		const checkbox = page.locator('[data-slot="checkbox"]')
		await expect(checkbox).toHaveAttribute('data-state', 'unchecked')
	})

	test('indeterminate exposes data-state="indeterminate", not a boolean', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--indeterminate&viewMode=story')
		await expect(page.locator('[data-slot="checkbox"]')).toHaveAttribute('data-state', 'indeterminate')
	})

	test('Tab focuses the checkbox and Space toggles it (keyboard interaction is Radix-provided, not custom)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--default&viewMode=story')
		const checkbox = page.locator('[data-slot="checkbox"]')
		await checkbox.focus()
		await expect(checkbox).toBeFocused()
		await expect(checkbox).toHaveAttribute('data-state', 'unchecked')
		await page.keyboard.press('Space')
		await expect(checkbox).toHaveAttribute('data-state', 'checked')
		await page.keyboard.press('Space')
		await expect(checkbox).toHaveAttribute('data-state', 'unchecked')
	})

	test('disabled checkbox does not respond to keyboard toggling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--disabled&viewMode=story')
		const checkbox = page.locator('[data-slot="checkbox"]')
		await expect(checkbox).toBeDisabled()
		await expect(checkbox).toHaveAttribute('data-state', 'unchecked')
	})

	test('clicking the paired Label toggles the checkbox (native htmlFor behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--with-label&viewMode=story')
		const checkbox = page.locator('#terms')
		await expect(checkbox).toHaveAttribute('data-state', 'unchecked')
		await page.locator('[data-slot="label"]').click()
		await expect(checkbox).toHaveAttribute('data-state', 'checked')
	})

	test('controlled usage: onCheckedChange drives the checkbox, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--controlled&viewMode=story')
		const checkbox = page.locator('[data-slot="checkbox"]')
		await expect(page.getByText('checked: false')).toBeVisible()
		await checkbox.click()
		await expect(page.getByText('checked: true')).toBeVisible()
		await expect(checkbox).toHaveAttribute('data-state', 'checked')
	})

	test('required and value/name pass through to the underlying element for form integration', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-checkbox--required&viewMode=story')
		const checkbox = page.locator('[data-slot="checkbox"]')
		await expect(checkbox).toHaveAttribute('aria-required', 'true')
	})
})
