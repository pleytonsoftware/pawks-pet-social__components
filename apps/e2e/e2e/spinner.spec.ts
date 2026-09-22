import { test, expect } from '../fixtures.js'

test.describe('Spinner stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('spinner-default.png')
	})

	test('sizes matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--sizes&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('spinner-sizes.png')
	})

	test('inherits text color matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--inherits-text-color&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('spinner-inherits-text-color.png')
	})

	test('renders as a real svg with data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--default&viewMode=story')
		const spinner = page.locator('[data-slot="spinner"]')
		await expect(spinner).toHaveCount(1)
		await expect(spinner).toHaveJSProperty('tagName', 'svg')
	})

	test('SVG structure: a track circle plus an animated arc path, stroked with currentColor', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--default&viewMode=story')
		const spinner = page.locator('[data-slot="spinner"]')
		await expect(spinner.locator('circle')).toHaveCount(1)
		await expect(spinner.locator('path')).toHaveCount(1)
		await expect(spinner.locator('circle')).toHaveAttribute('stroke', 'currentColor')
		await expect(spinner.locator('path')).toHaveAttribute('stroke', 'currentColor')
	})

	test('animate-spin class drives the rotation, no JS timers involved', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--default&viewMode=story')
		await expect(page.locator('[data-slot="spinner"]')).toHaveClass(/animate-spin/)
	})

	test('currentColor: spinner visually inherits its container text color', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--inherits-text-color&viewMode=story')
		const spinners = page.locator('[data-slot="spinner"]')
		const colors = await spinners.evaluateAll((els) => els.map((el) => getComputedStyle(el).color))
		// 4 spinners, each in a differently-colored context — all distinct.
		expect(new Set(colors).size).toBe(4)
	})

	test('defaults to an announced status with a default label', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--default&viewMode=story')
		const spinner = page.locator('[data-slot="spinner"]')
		await expect(spinner).toHaveAttribute('role', 'status')
		await expect(spinner).toHaveAttribute('aria-label', 'Loading')
	})

	test('aria-label is overridable', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--custom-label&viewMode=story')
		await expect(page.locator('[data-slot="spinner"]')).toHaveAttribute('aria-label', 'Fetching results')
	})

	test('decorative usage: aria-hidden overrides the default announced role', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--decorative&viewMode=story')
		await expect(page.locator('[data-slot="spinner"]')).toHaveAttribute('aria-hidden', 'true')
	})

	test('custom className merges with the default size and animation classes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--sizes&viewMode=story')
		const spinners = page.locator('[data-slot="spinner"]')
		await expect(spinners.nth(3)).toHaveClass(/size-8/)
		await expect(spinners.nth(3)).toHaveClass(/animate-spin/)
	})

	test('ref forwards to the real underlying svg element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="spinner"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	test('no loading prop: presence alone represents the loading state (composition, not an API)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-spinner--button-loading-state&viewMode=story')
		await expect(page.getByRole('button')).toHaveText('Save')
		await expect(page.locator('[data-slot="spinner"]')).toHaveCount(0)
		await page.getByRole('button').click()
		await expect(page.locator('[data-slot="spinner"]')).toHaveCount(1)
		await expect(page.getByRole('button')).toBeDisabled()
	})
})
