import { test, expect } from '../fixtures.js'

test.describe('NativeSelect stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('native-select-default.png')
	})

	test('disabled matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--disabled&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('native-select-disabled.png')
	})

	test('option groups matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--option-groups&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('native-select-option-groups.png')
	})

	test('multiple matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--multiple&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('native-select-multiple.png')
	})

	test('with field matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--with-field&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('native-select-with-field.png')
	})

	test('renders an actual native <select> with data-slot, not an emulation', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--default&viewMode=story')
		const select = page.locator('[data-slot="native-select"]')
		await expect(select).toHaveJSProperty('tagName', 'SELECT')
	})

	test('uncontrolled: defaultValue sets the initial selection natively', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--selected&viewMode=story')
		await expect(page.locator('[data-slot="native-select"]')).toHaveValue('fr')
	})

	test('native option selection changes the value', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--default&viewMode=story')
		const select = page.locator('[data-slot="native-select"]')
		await select.selectOption('fr')
		await expect(select).toHaveValue('fr')
	})

	test('controlled usage: onChange (not onValueChange) drives the select, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--controlled&viewMode=story')
		await expect(page.getByText('value: es')).toBeVisible()
		await page.locator('[data-slot="native-select"]').selectOption('fr')
		await expect(page.getByText('value: fr')).toBeVisible()
	})

	test('disabled select cannot be changed', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--disabled&viewMode=story')
		await expect(page.locator('[data-slot="native-select"]')).toBeDisabled()
	})

	test('required select exposes the native required attribute', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--required&viewMode=story')
		await expect(page.locator('[data-slot="native-select"]')).toHaveAttribute('required', '')
	})

	test('multiple selection uses the native multiple attribute', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--multiple&viewMode=story')
		const select = page.locator('[data-slot="native-select"]')
		await expect(select).toHaveAttribute('multiple', '')
		await select.selectOption(['es', 'fr'])
		await expect(select).toHaveValues(['es', 'fr'])
	})

	test('option groups render as native optgroup elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--option-groups&viewMode=story')
		await expect(page.locator('[data-slot="native-select"] optgroup')).toHaveCount(2)
	})

	test('clicking the paired Label focuses the select (native htmlFor behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--with-label&viewMode=story')
		await page.locator('[data-slot="label"]').click()
		await expect(page.locator('[data-slot="native-select"]')).toBeFocused()
	})

	test('form integration: name is forwarded to the real underlying select', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--form-example&viewMode=story')
		await expect(page.locator('select[name="country"]')).toHaveValue('es')
	})

	test('custom className is merged with default styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-nativeselect--with-field&viewMode=story')
		const select = page.locator('[data-slot="native-select"]')
		await expect(select).toHaveClass(/w-full/)
		await expect(select).toHaveClass(/rounded-md/)
	})
})
