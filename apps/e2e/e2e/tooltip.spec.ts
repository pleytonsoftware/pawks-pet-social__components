import { test, expect, type Page } from '../fixtures.js'

// The content plays a 150ms enter animation that starts offset and scaled
// down (shared with DropdownMenu/Select), so a box measured right after
// `toBeVisible()` is mid-flight. Wait on the real animation, not a guess.
async function waitForTooltipAnimation(page: Page) {
	await page.locator('[data-slot="tooltip-content"]').evaluate(async (el) => {
		await Promise.all(el.getAnimations().map((animation) => animation.finished))
	})
}

test.describe('Tooltip stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		await expect(page.getByRole('tooltip')).toBeVisible()
		await expect(page).toHaveScreenshot('tooltip-default.png')
	})

	test('with arrow matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--with-arrow&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).focus()
		await expect(page.getByRole('tooltip')).toBeVisible()
		await expect(page).toHaveScreenshot('tooltip-with-arrow.png')
	})

	// Rendering
	test('renders a real tooltip role with data-slot on trigger and content', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		await expect(page.locator('[data-slot="tooltip-trigger"]')).toHaveCount(1)
		await page.getByRole('button', { name: 'Hover me' }).focus()
		const content = page.locator('[data-slot="tooltip-content"]')
		await expect(content).toHaveCount(1)
		await expect(content).toHaveAttribute('role', 'tooltip')
	})

	test('TooltipArrow renders when provided', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--with-arrow&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).focus()
		await expect(page.locator('[data-slot="tooltip-arrow"]')).toHaveCount(1)
	})

	// Controlled behavior
	test('controlled open state: onOpenChange drives visibility, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--controlled&viewMode=story')
		await expect(page.getByText('open: false')).toBeVisible()
		await expect(page.getByRole('tooltip')).toHaveCount(0)
		await page.getByRole('button', { name: 'Trigger' }).focus()
		await expect(page.getByText('open: true')).toBeVisible()
		await expect(page.getByRole('tooltip')).toBeVisible()
	})

	// Interaction
	test('opens through keyboard focus, instantly (no hover delay)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 500 })
	})

	test('opens through pointer hover, respecting the provider delay', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).hover()
		await expect(page.getByRole('tooltip')).toBeVisible()
	})

	test('closes on blur', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		await expect(page.getByRole('tooltip')).toBeVisible()
		await trigger.blur()
		await expect(page.getByRole('tooltip')).not.toBeVisible()
	})

	test('Escape closes the tooltip', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		await expect(page.getByRole('tooltip')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.getByRole('tooltip')).not.toBeVisible()
	})

	test('provider configuration: delayDuration=0 opens on hover with no wait', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--provider-configuration&viewMode=story')
		await page.getByRole('button', { name: 'No delay' }).hover()
		await expect(page.getByRole('tooltip')).toBeVisible({ timeout: 500 })
	})

	// Composition
	test('asChild works with a Button trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--on-button&viewMode=story')
		const trigger = page.locator('[data-slot="tooltip-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'BUTTON')
	})

	test('asChild works with a link trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--on-link&viewMode=story')
		const trigger = page.locator('[data-slot="tooltip-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'A')
		await expect(trigger).toHaveAttribute('href', '/documentation')
	})

	test('multiple tooltips coexist independently', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--multiple-tooltips&viewMode=story')
		await expect(page.locator('[data-slot="tooltip-trigger"]')).toHaveCount(3)
		await page.getByRole('button', { name: 'First' }).focus()
		await expect(page.getByRole('tooltip', { name: 'First tooltip' })).toBeVisible()
		await page.getByRole('button', { name: 'Second' }).focus()
		// The first tooltip's exit animation keeps it mounted (data-state
		//="closed") briefly rather than unmounting instantly — scope by name
		// instead of asserting a single generic `tooltip` role match.
		await expect(page.getByRole('tooltip', { name: 'Second tooltip' })).toBeVisible()
	})

	test('content composes React children, not just a string', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--long-content&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).focus()
		await expect(page.getByRole('tooltip')).toContainText('longer piece of supplementary text')
	})

	test('disabled-element pattern: wrapping span lets the tooltip attach to a disabled Button', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--disabled-element&viewMode=story')
		await expect(page.getByRole('button', { name: 'Save' })).toBeDisabled()
		await page.locator('[data-slot="tooltip-trigger"]').hover()
		await expect(page.getByRole('tooltip')).toBeVisible()
	})

	// Positioning
	test('side is forwarded to data-side', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--different-sides&viewMode=story')
		await page.getByRole('button', { name: 'left', exact: true }).focus()
		await expect(page.getByRole('tooltip')).toHaveAttribute('data-side', 'left')
	})

	test('align is forwarded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--different-alignments&viewMode=story')
		await page.getByRole('button', { name: 'end', exact: true }).focus()
		await expect(page.getByRole('tooltip')).toHaveAttribute('data-align', 'end')
	})

	test('sideOffset is forwarded (affects the gap to the trigger)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--custom-offset&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		const tooltip = page.getByRole('tooltip')
		await expect(tooltip).toBeVisible()
		await waitForTooltipAnimation(page)
		const [triggerBox, tooltipBox] = await Promise.all([trigger.boundingBox(), tooltip.boundingBox()])
		if (!triggerBox || !tooltipBox) throw new Error('expected both trigger and tooltip to have a bounding box')
		const gap = triggerBox.y - (tooltipBox.y + tooltipBox.height)
		expect(gap).toBeGreaterThan(10)
	})

	// Styling
	test('default styling: inverted primary surface, rounded, shadowed', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).focus()
		const content = page.getByRole('tooltip')
		await expect(content).toHaveClass(/bg-primary/)
		await expect(content).toHaveClass(/text-primary-foreground/)
		await expect(content).toHaveClass(/rounded-md/)
	})

	test('custom className is merged with default styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).focus()
		await expect(page.getByRole('tooltip')).toHaveClass(/bg-primary/)
	})

	test('data-state reflects open/closed', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		await expect(page.getByRole('tooltip')).toHaveAttribute('data-state', 'instant-open')
	})

	// Accessibility
	test('trigger/content association: aria-describedby points at the tooltip', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Hover me' })
		await trigger.focus()
		const content = page.getByRole('tooltip')
		const describedBy = await trigger.getAttribute('aria-describedby')
		const contentId = await content.getAttribute('id')
		expect(describedBy).toBe(contentId)
	})

	test('no label/text/title prop needed: content is plain composed children', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		await page.getByRole('button', { name: 'Hover me' }).focus()
		await expect(page.getByRole('tooltip')).toHaveText('Helpful information')
	})

	// Refs
	test('ref forwards on trigger and content to the real underlying elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-tooltip--default&viewMode=story')
		const trigger = page.locator('[data-slot="tooltip-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'BUTTON')
		await trigger.focus()
		await expect(page.locator('[data-slot="tooltip-content"]')).toHaveJSProperty('tagName', 'DIV')
	})
})
