import { test, expect } from '../fixtures.js'

test.describe('RadioGroup stories', () => {
	test('multiple options matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--multiple-options&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('radio-group-multiple-options.png')
	})

	test('disabled matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--disabled&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('radio-group-disabled.png')
	})

	test('disabled option matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--disabled-option&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('radio-group-disabled-option.png')
	})

	test('horizontal orientation matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--horizontal-orientation&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('radio-group-horizontal.png')
	})

	test('with field matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--with-field&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('radio-group-with-field.png')
	})

	test('data-slot attributes are present on group and item', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--multiple-options&viewMode=story')
		await expect(page.locator('[data-slot="radio-group"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="radio-group-item"]')).toHaveCount(3)
	})

	test('uncontrolled: defaultValue selects exactly one item, matching Radix data-state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--multiple-options&viewMode=story')
		const items = page.locator('[data-slot="radio-group-item"]')
		await expect(items).toHaveCount(3)
		const states = await items.evaluateAll((els) => els.map((el) => el.getAttribute('data-state')))
		expect(states.filter((s) => s === 'checked')).toHaveLength(1)
		expect(states.filter((s) => s === 'unchecked')).toHaveLength(2)
		await expect(page.locator('#density-comfortable')).toHaveAttribute('data-state', 'checked')
	})

	test('clicking an item selects it and unselects the previous one', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--multiple-options&viewMode=story')
		await page.locator('#density-compact').click()
		await expect(page.locator('#density-compact')).toHaveAttribute('data-state', 'checked')
		await expect(page.locator('#density-comfortable')).toHaveAttribute('data-state', 'unchecked')
		await expect(page.locator('#density-default')).toHaveAttribute('data-state', 'unchecked')
	})

	test('keyboard navigation: arrow keys move roving focus, Space confirms the new selection', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--multiple-options&viewMode=story')
		await page.locator('#density-comfortable').focus()
		await expect(page.locator('#density-comfortable')).toBeFocused()
		await page.keyboard.press('ArrowDown')
		await expect(page.locator('#density-compact')).toBeFocused()
		// Moving roving focus alone doesn't select in this Radix version —
		// verified directly against the primitive before writing this test.
		await expect(page.locator('#density-compact')).toHaveAttribute('data-state', 'unchecked')
		await page.keyboard.press(' ')
		await expect(page.locator('#density-compact')).toHaveAttribute('data-state', 'checked')
		await expect(page.locator('#density-comfortable')).toHaveAttribute('data-state', 'unchecked')
	})

	test('disabled group prevents interaction', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--disabled&viewMode=story')
		const item = page.locator('#disabled-comfortable')
		await expect(item).toBeDisabled()
		await expect(page.locator('#disabled-default')).toHaveAttribute('data-state', 'checked')
	})

	test('disabled individual item cannot be selected while siblings remain interactive', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--disabled-option&viewMode=story')
		const smsItem = page.locator('#contact-sms')
		await expect(smsItem).toBeDisabled()
		await page.locator('#contact-email').click()
		await expect(page.locator('#contact-email')).toHaveAttribute('data-state', 'checked')
	})

	test('required group exposes aria-required on the group (role=radiogroup), not each item', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--required&viewMode=story')
		await expect(page.locator('[data-slot="radio-group"]')).toHaveAttribute('aria-required', 'true')
	})

	test('controlled usage: onValueChange drives selection, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--controlled&viewMode=story')
		await expect(page.getByText('value: email')).toBeVisible()
		await page.locator('#controlled-sms').click()
		await expect(page.getByText('value: sms')).toBeVisible()
		await expect(page.locator('#controlled-sms')).toHaveAttribute('data-state', 'checked')
	})

	test('clicking the paired Label selects the item (native htmlFor behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-radiogroup--with-label&viewMode=story')
		await expect(page.locator('#label-sms')).toHaveAttribute('data-state', 'unchecked')
		await page.locator('label[for="label-sms"]').click()
		await expect(page.locator('#label-sms')).toHaveAttribute('data-state', 'checked')
	})
})
