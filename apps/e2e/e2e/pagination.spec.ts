import { test, expect } from '../fixtures.js'

test.describe('Pagination stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('pagination-default.png')
	})

	test('many pages with ellipsis matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--many-pages-with-ellipsis&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('pagination-many-pages.png')
	})

	// Semantic structure
	test('Pagination renders a nav landmark with a default aria-label', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		const nav = page.locator('[data-slot="pagination"]')
		await expect(nav).toHaveJSProperty('tagName', 'NAV')
		await expect(nav).toHaveAttribute('aria-label', 'pagination')
	})

	test('PaginationContent renders a ul containing PaginationItem li elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		const content = page.locator('[data-slot="pagination-content"]')
		await expect(content).toHaveJSProperty('tagName', 'UL')
		const items = page.locator('[data-slot="pagination-item"]')
		await expect(items).toHaveCount(5)
		await expect(items.first()).toHaveJSProperty('tagName', 'LI')
	})

	// PaginationLink
	test('PaginationLink renders a real anchor with href', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		const link = page.getByRole('link', { name: '2', exact: true })
		await expect(link).toHaveJSProperty('tagName', 'A')
		await expect(link).toHaveAttribute('href', '/users?page=2')
	})

	test('isActive applies active styling and aria-current="page"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--active-page&viewMode=story')
		const active = page.getByRole('link', { name: '2', exact: true })
		await expect(active).toHaveAttribute('aria-current', 'page')
		await expect(active).toHaveAttribute('data-active', 'true')
		const inactive = page.getByRole('link', { name: '1', exact: true })
		await expect(inactive).not.toHaveAttribute('aria-current', 'page')
		await expect(inactive).not.toHaveAttribute('data-active')
	})

	// PaginationPrevious / PaginationNext
	test('PaginationPrevious renders with a default accessible label and href', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		const previous = page.locator('[data-slot="pagination-previous"]')
		await expect(previous).toHaveAttribute('aria-label', 'Go to previous page')
		await expect(previous).toHaveAttribute('href', '/users?page=1')
		await expect(previous).toHaveText(/Previous/)
	})

	test('PaginationNext renders with a default accessible label and href', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		const next = page.locator('[data-slot="pagination-next"]')
		await expect(next).toHaveAttribute('aria-label', 'Go to next page')
		await expect(next).toHaveAttribute('href', '/users?page=2')
		await expect(next).toHaveText(/Next/)
	})

	test('custom text overrides the default Previous/Next labels', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--custom-previous-next-text&viewMode=story')
		await expect(page.locator('[data-slot="pagination-previous"]')).toHaveText(/Anterior/)
		await expect(page.locator('[data-slot="pagination-next"]')).toHaveText(/Siguiente/)
	})

	// PaginationEllipsis
	test('PaginationEllipsis is presentational and not focusable/clickable', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--many-pages-with-ellipsis&viewMode=story')
		const ellipsis = page.locator('[data-slot="pagination-ellipsis"]')
		await expect(ellipsis).toHaveCount(2)
		await expect(ellipsis.first()).toHaveAttribute('aria-hidden', 'true')
		await expect(ellipsis.first()).toHaveJSProperty('tagName', 'SPAN')
		await expect(page.getByRole('link', { name: '…' })).toHaveCount(0)
	})

	// Disabled presentation — no native <a disabled>, styling reacts to aria-disabled
	test('a disabled previous link uses aria-disabled, not a removed href fallback to <a disabled>', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--disabled-previous&viewMode=story')
		const previous = page.locator('[data-slot="pagination-previous"]')
		await expect(previous).toHaveAttribute('aria-disabled', 'true')
		await expect(previous).not.toHaveAttribute('href')
		await expect(previous).toHaveCSS('pointer-events', 'none')
	})

	test('a disabled next link is visually faded via opacity', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--disabled-next&viewMode=story')
		const next = page.locator('[data-slot="pagination-next"]')
		await expect(next).toHaveAttribute('aria-disabled', 'true')
		await expect(next).toHaveCSS('opacity', '0.4')
	})

	// className / aria-* / data-* passthrough
	test('className is merged with default classes on PaginationLink, not overridden', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--default&viewMode=story')
		await expect(page.getByRole('link', { name: '2', exact: true })).toHaveClass(/rounded-md/)
	})

	test('aria-* and data-* attributes are forwarded to Pagination', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="pagination"]')).toHaveAttribute('data-slot', 'pagination')
	})

	// Refs
	test('ref forwards to the real underlying nav element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--ref-forwarding&viewMode=story')
		const nav = page.locator('[data-slot="pagination"]')
		await expect(nav).toHaveAttribute('data-ref-forwarded', 'true')
		await expect(nav).toHaveJSProperty('tagName', 'NAV')
	})

	// RTL
	test('rtl: chevrons mirror and Previous/Next swap visual sides under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--rtl&viewMode=story')
		const previous = page.locator('[data-slot="pagination-previous"]')
		const next = page.locator('[data-slot="pagination-next"]')
		await expect(previous).toBeVisible()
		await expect(next).toBeVisible()
		const previousBox = await previous.boundingBox()
		const nextBox = await next.boundingBox()
		if (!previousBox || !nextBox) throw new Error('expected both previous and next to have a bounding box')
		// Under rtl, Previous (last in DOM) visually renders to the right of Next (first in DOM).
		expect(previousBox.x).toBeGreaterThan(nextBox.x)
	})

	// Responsive text behavior — sm: is a viewport media query, so this needs
	// an actual narrow viewport, not just a narrow wrapper element.
	test('responsive: Previous/Next text is hidden below the sm breakpoint but the accessible label remains', async ({ page }) => {
		await page.setViewportSize({ width: 380, height: 300 })
		await page.goto('/iframe.html?id=atoms-pagination--responsive-layout&viewMode=story')
		const previous = page.locator('[data-slot="pagination-previous"]')
		await expect(previous).toHaveAttribute('aria-label', 'Go to previous page')
		await expect(previous.locator('span')).toBeHidden()
	})

	test('responsive: Previous/Next text is visible at or above the sm breakpoint', async ({ page }) => {
		await page.setViewportSize({ width: 900, height: 500 })
		await page.goto('/iframe.html?id=atoms-pagination--responsive-layout&viewMode=story')
		await expect(page.locator('[data-slot="pagination-previous"] span')).toBeVisible()
	})

	// Framework-compatible polymorphic rendering (asChild)
	test('asChild renders the given element instead of an anchor, with no extra wrapper', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--custom-link-rendering&viewMode=story')
		const link = page.locator('[data-fake-router-link="true"]').first()
		await expect(link).toHaveAttribute('data-slot', 'pagination-link')
		await expect(link).toHaveJSProperty('tagName', 'A')
		await expect(link).toHaveAttribute('href', '/users?page=1')
	})

	// Cursor-style / icons-only usage
	test('previous/next-only composition works without any numbered page links', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pagination--previous-next-only&viewMode=story')
		await expect(page.locator('[data-slot="pagination-previous"]')).toBeVisible()
		await expect(page.locator('[data-slot="pagination-next"]')).toBeVisible()
		await expect(page.locator('[data-slot="pagination-link"]')).toHaveCount(0)
	})
})
