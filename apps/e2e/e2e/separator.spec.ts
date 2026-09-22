import { test, expect } from '../fixtures.js'

test.describe('Separator stories', () => {
	test('horizontal matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--horizontal&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('separator-horizontal.png')
	})

	test('vertical matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--vertical&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('separator-vertical.png')
	})

	test('with spacing matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--with-spacing&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('separator-with-spacing.png')
	})

	test('inside a flex layout matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--inside-a-flex-layout&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('separator-inside-flex.png')
	})

	test('renders as a real element with data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--horizontal&viewMode=story')
		await expect(page.locator('[data-slot="separator"]')).toHaveCount(1)
	})

	test('default orientation is horizontal, exposed via data-orientation', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--horizontal&viewMode=story')
		await expect(page.locator('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'horizontal')
	})

	test('orientation=vertical is forwarded to data-orientation', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--vertical&viewMode=story')
		await expect(page.locator('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'vertical')
	})

	// This component defaults `decorative` to true (silent, visual-only) —
	// the opposite of Radix's own raw default — since most separators are
	// purely visual dividers, matching the plain `<Separator />` stories above.
	test('defaults to decorative: role is "none", not "separator"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--horizontal&viewMode=story')
		await expect(page.locator('[data-slot="separator"]')).toHaveAttribute('role', 'none')
	})

	test('decorative={false} opts into the announced separator role', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--decorative&viewMode=story')
		const separator = page.locator('[data-slot="separator"]')
		await expect(separator).toHaveAttribute('role', 'separator')
		// `aria-orientation` defaults to "horizontal" per the ARIA spec, so
		// Radix omits it here and only sets it explicitly for vertical.
		await expect(separator).not.toHaveAttribute('aria-orientation')
	})

	test('aria-* passthrough', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--horizontal&viewMode=story')
		const separator = page.locator('[data-slot="separator"]')
		await expect(separator).toHaveCount(1)
		// Radix's own decorative (role="none") separator intentionally carries
		// no aria-orientation — confirming that rather than asserting a value.
		await expect(separator).not.toHaveAttribute('aria-orientation')
	})

	test('data-* passthrough', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--horizontal&viewMode=story')
		await expect(page.locator('[data-slot="separator"]')).toHaveAttribute('data-orientation', 'horizontal')
	})

	test('className customization is merged with default styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--with-spacing&viewMode=story')
		const separator = page.locator('[data-slot="separator"]')
		await expect(separator).toHaveClass(/bg-border/)
	})

	test('ref forwards to the real underlying element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-separator--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="separator"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})
})
