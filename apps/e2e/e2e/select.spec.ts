import { test, expect } from '../fixtures.js'

test.describe('Select stories', () => {
	test('closed trigger matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('select-closed.png')
	})

	// The open dropdown is a Radix portal, positioned fixed/absolute — it
	// doesn't expand `body`'s own layout-flow bounding box, so a `body`
	// element screenshot crops it to a sliver. `expect(page)` captures the
	// real rendered viewport instead, portal content included.
	test('open content matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--default&viewMode=story')
		await page.getByRole('combobox').click()
		await expect(page.getByRole('listbox')).toBeVisible()
		await expect(page).toHaveScreenshot('select-open.png')
	})

	test('groups with labels and separator match screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--groups&viewMode=story')
		await page.getByRole('combobox').click()
		await expect(page.getByRole('listbox')).toBeVisible()
		await expect(page).toHaveScreenshot('select-groups.png')
	})

	test('disabled item matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--disabled-item&viewMode=story')
		await page.getByRole('combobox').click()
		await expect(page.getByRole('listbox')).toBeVisible()
		await expect(page).toHaveScreenshot('select-disabled-item.png')
	})

	test('with field matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--with-field&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('select-with-field.png')
	})

	test('placeholder is shown via SelectValue, not a separate label prop', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--placeholder&viewMode=story')
		await expect(page.getByRole('combobox')).toHaveText('Choose one…')
	})

	test('uncontrolled defaultValue selects the matching item, exposed via data-state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--selected&viewMode=story')
		await expect(page.getByRole('combobox')).toHaveText('France')
		await page.getByRole('combobox').click()
		const selected = page.getByRole('option', { name: 'France' })
		await expect(selected).toHaveAttribute('data-state', 'checked')
		await expect(page.getByRole('option', { name: 'Spain' })).toHaveAttribute('data-state', 'unchecked')
	})

	test('clicking an item changes the value and closes the dropdown', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--default&viewMode=story')
		await page.getByRole('combobox').click()
		await page.getByRole('option', { name: 'Portugal' }).click()
		await expect(page.getByRole('listbox')).not.toBeVisible()
		await expect(page.getByRole('combobox')).toHaveText('Portugal')
	})

	test('keyboard: opens with Enter/Space, ArrowDown navigates, Enter selects', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--default&viewMode=story')
		const trigger = page.getByRole('combobox')
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('listbox')).toBeVisible()
		// Radix focuses the first item asynchronously after the listbox
		// mounts — listbox visibility alone doesn't guarantee that's settled
		// yet (verified directly: an ArrowDown fired too early is a no-op).
		await expect(page.getByRole('option', { name: 'Spain' })).toBeFocused()
		await page.keyboard.press('ArrowDown')
		await expect(page.getByRole('option', { name: 'France' })).toBeFocused()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('listbox')).not.toBeVisible()
		await expect(trigger).toHaveText('France')
	})

	test('Escape closes the dropdown without changing the value', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--selected&viewMode=story')
		const trigger = page.getByRole('combobox')
		await trigger.click()
		await expect(page.getByRole('listbox')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.getByRole('listbox')).not.toBeVisible()
		await expect(trigger).toHaveText('France')
	})

	test('disabled select cannot be opened', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--disabled&viewMode=story')
		const trigger = page.getByRole('combobox')
		await expect(trigger).toBeDisabled()
		await trigger.click({ force: true })
		await expect(page.getByRole('listbox')).not.toBeVisible()
	})

	test('disabled item cannot be selected while siblings remain interactive', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--disabled-item&viewMode=story')
		await page.getByRole('combobox').click()
		const disabledOption = page.getByRole('option', { name: 'France (unavailable)' })
		await expect(disabledOption).toHaveAttribute('data-disabled', '')
		await page.getByRole('option', { name: 'Portugal' }).click()
		await expect(page.getByRole('combobox')).toHaveText('Portugal')
	})

	test('required select exposes aria-required', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--required&viewMode=story')
		await expect(page.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
	})

	test('data-slot attributes are present on trigger, content, and items', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--default&viewMode=story')
		await expect(page.locator('[data-slot="select-trigger"]')).toHaveCount(1)
		await page.getByRole('combobox').click()
		await expect(page.locator('[data-slot="select-content"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="select-item"]')).toHaveCount(3)
	})

	test('controlled usage: onValueChange drives the select, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--controlled&viewMode=story')
		await expect(page.getByText('value: es')).toBeVisible()
		await page.getByRole('combobox').click()
		await page.getByRole('option', { name: 'France' }).click()
		await expect(page.getByText('value: fr')).toBeVisible()
	})

	test('form integration: name is forwarded to the underlying hidden select', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-select--form-example&viewMode=story')
		const hiddenSelect = page.locator('select[name="country"]')
		await expect(hiddenSelect).toHaveCount(1)
		await expect(hiddenSelect).toHaveValue('es')
	})
})
