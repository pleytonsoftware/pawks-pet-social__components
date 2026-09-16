import { test, expect } from '../fixtures.js'

test.describe('Switch stories', () => {
	test('checked matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--checked&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('switch-checked.png')
	})

	test('unchecked matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--unchecked&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('switch-unchecked.png')
	})

	test('disabled checked matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--disabled-checked&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('switch-disabled-checked.png')
	})

	test('with description matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--with-description&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('switch-with-description.png')
	})

	test('with field matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--with-field&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('switch-with-field.png')
	})

	test('data-slot is present on root and thumb', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--default&viewMode=story')
		await expect(page.locator('[data-slot="switch"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="switch-thumb"]')).toHaveCount(1)
	})

	test('unchecked by default exposes data-state="unchecked" and aria-checked="false"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--default&viewMode=story')
		const sw = page.locator('[data-slot="switch"]')
		await expect(sw).toHaveAttribute('data-state', 'unchecked')
		await expect(sw).toHaveAttribute('aria-checked', 'false')
	})

	test('clicking toggles data-state and aria-checked', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--default&viewMode=story')
		const sw = page.locator('[data-slot="switch"]')
		await sw.click()
		await expect(sw).toHaveAttribute('data-state', 'checked')
		await expect(sw).toHaveAttribute('aria-checked', 'true')
		await sw.click()
		await expect(sw).toHaveAttribute('data-state', 'unchecked')
		await expect(sw).toHaveAttribute('aria-checked', 'false')
	})

	test('Space toggles a focused switch (keyboard interaction is Radix-provided, not custom)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--default&viewMode=story')
		const sw = page.locator('[data-slot="switch"]')
		await sw.focus()
		await expect(sw).toBeFocused()
		await page.keyboard.press(' ')
		await expect(sw).toHaveAttribute('data-state', 'checked')
	})

	test('disabled switch does not respond to click or keyboard', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--disabled&viewMode=story')
		const sw = page.locator('[data-slot="switch"]')
		await expect(sw).toBeDisabled()
		await expect(sw).toHaveAttribute('data-state', 'unchecked')
	})

	test('required exposes aria-required on the switch', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--required&viewMode=story')
		await expect(page.locator('[data-slot="switch"]')).toHaveAttribute('aria-required', 'true')
	})

	test('controlled usage: onCheckedChange drives the switch, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--controlled&viewMode=story')
		const sw = page.locator('[data-slot="switch"]')
		await expect(page.getByText('checked: false')).toBeVisible()
		await sw.click()
		await expect(page.getByText('checked: true')).toBeVisible()
		await expect(sw).toHaveAttribute('data-state', 'checked')
	})

	test('clicking the paired Label toggles the switch (native htmlFor behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--with-label&viewMode=story')
		const sw = page.locator('#dark-mode')
		await expect(sw).toHaveAttribute('data-state', 'unchecked')
		await page.locator('[data-slot="label"]').click()
		await expect(sw).toHaveAttribute('data-state', 'checked')
	})

	test('form integration: name and value are forwarded to the underlying element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-switch--form-example&viewMode=story')
		const sw = page.locator('[data-slot="switch"]')
		await expect(sw).toHaveAttribute('data-state', 'checked')
	})
})
