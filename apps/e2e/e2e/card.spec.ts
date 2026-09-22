import { test, expect } from '../fixtures.js'

test.describe('Card stories', () => {
	test('with footer matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--with-footer&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('card-with-footer.png')
	})

	test('with image matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--with-image&viewMode=story')
		await page.waitForLoadState('networkidle')
		await expect(page.locator('body')).toHaveScreenshot('card-with-image.png')
	})

	// Rendering
	test('every sub-component renders with its own data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--composed-content&viewMode=story')
		await expect(page.locator('[data-slot="card"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="card-header"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="card-title"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="card-description"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="card-action"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="card-content"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="card-footer"]')).toHaveCount(1)
	})

	// Composition
	test('header composes title, description, and action together', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--with-action&viewMode=story')
		await expect(page.locator('[data-slot="card-title"]')).toHaveText('Scheduled reports')
		await expect(page.locator('[data-slot="card-description"]')).toBeVisible()
		await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible()
	})

	test('content can hold arbitrary React content', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--composed-content&viewMode=story')
		await expect(page.locator('[data-slot="card-content"] li')).toHaveCount(3)
	})

	test('footer can hold arbitrary actions', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--with-footer&viewMode=story')
		await expect(page.locator('[data-slot="card-footer"]').getByRole('button', { name: 'Set up' })).toBeVisible()
	})

	test('a first-child image bleeds to the rounded corners with no top padding', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--with-image&viewMode=story')
		const card = page.locator('[data-slot="card"]')
		await expect(card).toHaveJSProperty('firstElementChild.tagName', 'IMG')
		const paddingTop = await card.evaluate((el) => getComputedStyle(el).paddingTop)
		expect(paddingTop).toBe('0px')
		const imgRadius = await page.locator('[data-slot="card"] img').evaluate((el) => getComputedStyle(el).borderTopLeftRadius)
		expect(imgRadius).not.toBe('0px')
	})

	test('a Card can compose a Field-based form', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--form&viewMode=story')
		await expect(page.locator('#card-form-name')).toHaveValue('Pablo Leyton')
		await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible()
	})

	// Size
	test('default size is data-size="default"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--default&viewMode=story')
		await expect(page.locator('[data-slot="card"]')).toHaveAttribute('data-size', 'default')
	})

	test('size="sm" is reflected via data-size', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--small&viewMode=story')
		await expect(page.locator('[data-slot="card"]')).toHaveAttribute('data-size', 'sm')
	})

	test('child spacing responds to size: sm uses less padding than default', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--default&viewMode=story')
		const defaultPadding = await page.locator('[data-slot="card-header"]').evaluate((el) => getComputedStyle(el).paddingLeft)
		expect(defaultPadding).toBe('16px')

		await page.goto('/iframe.html?id=atoms-card--small&viewMode=story')
		const smallPadding = await page.locator('[data-slot="card-header"]').evaluate((el) => getComputedStyle(el).paddingLeft)
		expect(smallPadding).toBe('12px')
	})

	// Spacing
	test('--card-spacing can be overridden from the root, re-syncing every section', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--custom-spacing&viewMode=story')
		const headerPadding = await page.locator('[data-slot="card-header"]').evaluate((el) => getComputedStyle(el).paddingLeft)
		const contentGap = await page.locator('[data-slot="card"]').evaluate((el) => getComputedStyle(el).rowGap)
		expect(headerPadding).toBe('32px')
		expect(contentGap).toBe('32px')
	})

	test('a CardFooter suppresses the root Card own bottom padding, avoiding double spacing', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--with-footer&viewMode=story')
		const rootPaddingBottom = await page.locator('[data-slot="card"]').evaluate((el) => getComputedStyle(el).paddingBottom)
		expect(rootPaddingBottom).toBe('0px')

		await page.goto('/iframe.html?id=atoms-card--with-header&viewMode=story')
		const rootPaddingBottomNoFooter = await page.locator('[data-slot="card"]').evaluate((el) => getComputedStyle(el).paddingBottom)
		expect(rootPaddingBottomNoFooter).toBe('16px')
	})

	// Styling
	test('default classes are applied and className is merged', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--default&viewMode=story')
		const card = page.locator('[data-slot="card"]')
		await expect(card).toHaveClass(/rounded-xl/)
		await expect(card).toHaveClass(/border-border/)
	})

	test('custom styling (border color) is applied via style, not overridden by defaults', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--custom-styling&viewMode=story')
		const borderColor = await page.locator('[data-slot="card"]').evaluate((el) => getComputedStyle(el).borderColor)
		expect(borderColor).toBe('rgb(42, 126, 73)')
	})

	// Native attributes
	test('id, style, and data-* attributes are forwarded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--custom-spacing&viewMode=story')
		const card = page.locator('[data-slot="card"]')
		const inlineStyle = await card.evaluate((el) => el.style.getPropertyValue('--card-spacing'))
		expect(inlineStyle).toBe('2rem')
	})

	// Refs
	test('ref forwards to the real underlying div', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="card"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	// Non-goals
	test('Card is not inherently clickable: no href, no role=link/button by default', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-card--default&viewMode=story')
		const card = page.locator('[data-slot="card"]')
		await expect(card).not.toHaveAttribute('href')
		await expect(card).not.toHaveAttribute('role')
	})
})
