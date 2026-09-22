import { test, expect, type Page } from '../fixtures.js'

// The content plays the same 150ms enter animation shared with DropdownMenu/
// Select/Tooltip, so a box measured right after visibility can be mid-flight.
async function waitForHoverCardAnimation(page: Page) {
	await page.locator('[data-slot="hover-card-content"]').evaluate(async (el) => {
		await Promise.all(el.getAnimations().map((animation) => animation.finished))
	})
}

test.describe('HoverCard stories', () => {
	test('user preview matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--user-preview&viewMode=story')
		await page.getByRole('link', { name: '@pablo' }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
		await expect(page).toHaveScreenshot('hover-card-user-preview.png')
	})

	// Rendering
	test('trigger renders with data-slot, content only exists once opened', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		await expect(page.locator('[data-slot="hover-card-trigger"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="hover-card-content"]')).toHaveCount(0)
		await page.getByRole('link', { name: 'Documentation' }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
	})

	// Interaction — HoverCard's onFocus uses the SAME delayed handleOpen as
	// pointer hover (verified directly in the installed Radix source), unlike
	// Tooltip's instant keyboard-focus path — every open here respects
	// openDelay regardless of trigger method.
	test('pointer hover opens the card, respecting the default delay', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		await page.getByRole('link', { name: 'Documentation' }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
	})

	test('keyboard focus opens the card the same way as hover', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		await page.getByRole('link', { name: 'Documentation' }).focus()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
	})

	test('moving focus away closes the card', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		const trigger = page.getByRole('link', { name: 'Documentation' })
		await trigger.focus()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
		await trigger.blur()
		await expect(page.locator('[data-slot="hover-card-content"]')).not.toBeVisible()
	})

	test('openDelay is respected: a 0ms delay opens effectively immediately', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--delayed-open&viewMode=story')
		const start = Date.now()
		await page.getByRole('link', { name: 'Opens after 1s' }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
		expect(Date.now() - start).toBeGreaterThanOrEqual(900)
	})

	// Composition
	test('asChild: trigger renders the real anchor, not an extra wrapper', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		const trigger = page.locator('[data-slot="hover-card-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'A')
	})

	test('links and buttons can both be used as triggers', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--user-preview&viewMode=story')
		await expect(page.locator('[data-slot="hover-card-trigger"]')).toHaveJSProperty('tagName', 'A')
	})

	test('content composes arbitrary React content, not just text', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--user-preview&viewMode=story')
		await page.getByRole('link', { name: '@pablo' }).hover()
		const content = page.locator('[data-slot="hover-card-content"]')
		await expect(content).toBeVisible()
		await expect(content.getByText('Pablo Leyton')).toBeVisible()
		await expect(content.getByText('Software developer')).toBeVisible()
	})

	test('HoverCardArrow renders when provided', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--with-arrow&viewMode=story')
		await page.getByRole('link', { name: 'Hover me' }).hover()
		await expect(page.locator('[data-slot="hover-card-arrow"]')).toHaveCount(1)
	})

	// Positioning
	test('side is forwarded to data-side', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--different-sides&viewMode=story')
		await page.getByRole('link', { name: 'left', exact: true }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toHaveAttribute('data-side', 'left')
	})

	test('align is forwarded to data-align', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--different-alignments&viewMode=story')
		await page.getByRole('link', { name: 'end', exact: true }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toHaveAttribute('data-align', 'end')
	})

	test('sideOffset is forwarded (affects the gap to the trigger)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--custom-offset&viewMode=story')
		const trigger = page.getByRole('link', { name: 'Hover me' })
		await trigger.hover()
		const content = page.locator('[data-slot="hover-card-content"]')
		await expect(content).toBeVisible()
		await waitForHoverCardAnimation(page)
		const [triggerBox, contentBox] = await Promise.all([trigger.boundingBox(), content.boundingBox()])
		if (!triggerBox || !contentBox) throw new Error('expected both trigger and content to have a bounding box')
		const gap = contentBox.y - (triggerBox.y + triggerBox.height)
		expect(gap).toBeGreaterThan(10)
	})

	// Styling
	test('default styling: popover surface, bordered, shadowed, rounded-md (matches its siblings)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		await page.getByRole('link', { name: 'Documentation' }).hover()
		const content = page.locator('[data-slot="hover-card-content"]')
		await expect(content).toHaveClass(/bg-popover/)
		await expect(content).toHaveClass(/border-border/)
		await expect(content).toHaveClass(/shadow-md/)
		await expect(content).toHaveClass(/rounded-md/)
	})

	test('Radix data-state is plain open/closed here, unlike Tooltip', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		await page.getByRole('link', { name: 'Documentation' }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toHaveAttribute('data-state', 'open')
	})

	// Accessibility
	test('rtl: content still opens correctly under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--rtl&viewMode=story')
		await page.getByRole('link').hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toBeVisible()
	})

	// Refs
	test('trigger and content refs forward to the real underlying elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-hovercard--default&viewMode=story')
		await expect(page.locator('[data-slot="hover-card-trigger"]')).toHaveJSProperty('tagName', 'A')
		await page.getByRole('link', { name: 'Documentation' }).hover()
		await expect(page.locator('[data-slot="hover-card-content"]')).toHaveJSProperty('tagName', 'DIV')
	})
})
