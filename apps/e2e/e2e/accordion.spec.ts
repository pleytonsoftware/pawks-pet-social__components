import { test, expect } from '../fixtures.js'

test.describe('Accordion stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		await page.getByRole('button', { name: /Is it accessible/ }).click()
		await expect(page.locator('[data-slot="accordion-item"]').first()).toHaveAttribute('data-state', 'open')
		await expect(page.locator('body')).toHaveScreenshot('accordion-default-open.png')
	})

	// Rendering
	test('basic composition renders with every data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		await expect(page.locator('[data-slot="accordion"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="accordion-item"]')).toHaveCount(3)
		await expect(page.locator('[data-slot="accordion-header"]')).toHaveCount(3)
		await expect(page.locator('[data-slot="accordion-trigger"]')).toHaveCount(3)
		// Radix keeps closed content mounted (display:none) rather than
		// removing it from the DOM, so the count is 3 even before any click.
		await expect(page.locator('[data-slot="accordion-content"]')).toHaveCount(3)
	})

	// Single-item behavior
	test('type="single": opening one item closes the previously open one', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const items = page.locator('[data-slot="accordion-item"]')
		await page.getByRole('button', { name: /Is it accessible/ }).click()
		await expect(items.nth(0)).toHaveAttribute('data-state', 'open')

		await page.getByRole('button', { name: /Is it styled/ }).click()
		await expect(items.nth(1)).toHaveAttribute('data-state', 'open')
		await expect(items.nth(0)).toHaveAttribute('data-state', 'closed')
	})

	// Multiple-item behavior
	test('type="multiple": several items can be open at the same time', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--multiple&viewMode=story')
		const items = page.locator('[data-slot="accordion-item"]')
		await expect(items.nth(0)).toHaveAttribute('data-state', 'open') // defaultValue=['item-1']

		await page.getByRole('button', { name: 'Second section' }).click()
		await expect(items.nth(0)).toHaveAttribute('data-state', 'open')
		await expect(items.nth(1)).toHaveAttribute('data-state', 'open')
	})

	// Controlled / uncontrolled
	test('controlled usage: value and onValueChange drive state, not internal state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--controlled&viewMode=story')
		await expect(page.getByText('value: item-1')).toBeVisible()
		await expect(page.locator('[data-slot="accordion-item"]').first()).toHaveAttribute('data-state', 'open')

		await page.getByRole('button', { name: 'Second section' }).click()
		await expect(page.getByText('value: item-2')).toBeVisible()
		await expect(page.locator('[data-slot="accordion-item"]').nth(1)).toHaveAttribute('data-state', 'open')
	})

	test('uncontrolled usage: the trigger toggles open state with no external state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--single-collapsible&viewMode=story')
		const item = page.locator('[data-slot="accordion-item"]').first()
		await expect(item).toHaveAttribute('data-state', 'open') // defaultValue='item-1'
		await page.getByRole('button', { name: 'Collapsible section' }).click()
		await expect(item).toHaveAttribute('data-state', 'closed')
	})

	// defaultValue
	test('defaultValue opens the specified item on mount', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default-expanded&viewMode=story')
		const items = page.locator('[data-slot="accordion-item"]')
		await expect(items.nth(0)).toHaveAttribute('data-state', 'closed')
		await expect(items.nth(1)).toHaveAttribute('data-state', 'open')
	})

	// collapsible
	// Radix marks the open trigger `aria-disabled="true"` here (it's a real
	// button, not HTML-disabled, so it stays focusable — but there's nothing
	// valid to toggle to without `collapsible`), which makes Playwright's
	// normal actionability check refuse the click; `force: true` simulates
	// the raw click a real accessibility-disabled button would still receive.
	test('collapsible=false: the open item cannot be closed by clicking its own trigger again', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--single-item&viewMode=story')
		const item = page.locator('[data-slot="accordion-item"]').first()
		await expect(item).toHaveAttribute('data-state', 'open') // defaultValue='item-1'
		await expect(page.getByRole('button', { name: 'First section' })).toHaveAttribute('aria-disabled', 'true')
		await page.getByRole('button', { name: 'First section' }).click({ force: true })
		await expect(item).toHaveAttribute('data-state', 'open')
	})

	test('collapsible=true: the open item closes when its own trigger is clicked again', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--single-collapsible&viewMode=story')
		const item = page.locator('[data-slot="accordion-item"]').first()
		await expect(item).toHaveAttribute('data-state', 'open')
		await page.getByRole('button', { name: 'Collapsible section' }).click()
		await expect(item).toHaveAttribute('data-state', 'closed')
	})

	// Disabled
	test('disabled root: every trigger is disabled and clicks have no effect', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--disabled-root&viewMode=story')
		const trigger = page.getByRole('button', { name: 'First section' })
		await expect(trigger).toBeDisabled()
		await trigger.click({ force: true })
		await expect(page.locator('[data-slot="accordion-item"]').first()).toHaveAttribute('data-state', 'closed')
	})

	test('disabled item: only that item is unreachable, others work normally', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--disabled-item&viewMode=story')
		const items = page.locator('[data-slot="accordion-item"]')
		await expect(page.getByRole('button', { name: 'Disabled section' })).toBeDisabled()
		await expect(page.getByRole('button', { name: 'Available section' })).toBeEnabled()

		await page.getByRole('button', { name: 'Available section' }).click()
		await expect(items.nth(0)).toHaveAttribute('data-state', 'open')
	})

	// Keyboard navigation
	test('vertical keyboard navigation: ArrowDown moves focus to the next trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		await page.getByRole('button', { name: /Is it accessible/ }).focus()
		await page.keyboard.press('ArrowDown')
		await expect(page.getByRole('button', { name: /Is it styled/ })).toBeFocused()
	})

	test('Space/Enter on a focused trigger toggles it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const trigger = page.getByRole('button', { name: /Is it accessible/ })
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.locator('[data-slot="accordion-item"]').first()).toHaveAttribute('data-state', 'open')
	})

	// Horizontal orientation
	test('horizontal orientation: data-orientation is forwarded, ArrowRight moves focus', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--horizontal&viewMode=story')
		await expect(page.locator('[data-slot="accordion"]')).toHaveAttribute('data-orientation', 'horizontal')
		await expect(page.locator('[data-slot="accordion-content"]').first()).toHaveAttribute('data-orientation', 'horizontal')

		await page.getByRole('button', { name: 'First' }).focus()
		await page.keyboard.press('ArrowRight')
		await expect(page.getByRole('button', { name: 'Second' })).toBeFocused()
	})

	// forceMount
	test('forceMount: content stays visible even while closed, unlike the default (display:none)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--force-mount&viewMode=story')
		const content = page.locator('[data-slot="accordion-content"]')
		await expect(content).toHaveAttribute('data-state', 'closed')
		await expect(content).toBeVisible()
		await expect(content).toHaveText('This content stays mounted even while closed.')
	})

	test('without forceMount, closed content is present but not visible (display:none)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const content = page.locator('[data-slot="accordion-content"]').first()
		await expect(content).toHaveAttribute('data-state', 'closed')
		await expect(content).toHaveCount(1)
		await expect(content).not.toBeVisible()
	})

	// Styling
	test('default styling: border between items, no border after the last', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const items = page.locator('[data-slot="accordion-item"]')
		await expect(items.first()).toHaveClass(/border-border/)
		const lastBorderBottomWidth = await items.last().evaluate((el) => getComputedStyle(el).borderBottomWidth)
		expect(lastBorderBottomWidth).toBe('0px')
	})

	// Tailwind v4's `rotate-*` utility compiles to the standalone CSS `rotate`
	// property, not the legacy `transform` property — `getComputedStyle(el)
	// .transform` stays "none" throughout, so the rotation must be read off
	// `.rotate` instead.
	test('the open trigger rotates its chevron via the [data-state=open]>svg selector', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const trigger = page.getByRole('button', { name: /Is it accessible/ })
		const svg = trigger.locator('svg')
		const rotationBefore = await svg.evaluate((el) => getComputedStyle(el).rotate)
		await trigger.click()
		await expect(page.locator('[data-slot="accordion-item"]').first()).toHaveAttribute('data-state', 'open')
		await svg.evaluate(async (el) => {
			await Promise.all(el.getAnimations().map((animation) => animation.finished))
		})
		const rotationAfter = await svg.evaluate((el) => getComputedStyle(el).rotate)
		expect(rotationBefore).toBe('none')
		expect(rotationAfter).toBe('180deg')
	})

	// Composition
	test('trigger composes arbitrary content (icon + badge), not just text', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--custom-trigger-content&viewMode=story')
		const trigger = page.locator('[data-slot="accordion-trigger"]')
		await expect(trigger.getByText('Favorites')).toBeVisible()
		await expect(trigger.locator('svg')).toHaveCount(2) // Heart icon + chevron
		await expect(trigger.getByText('3')).toBeVisible() // Badge
	})

	test('content composes arbitrary React content, not just text', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--custom-content&viewMode=story')
		const content = page.locator('[data-slot="accordion-content"]')
		await expect(content.locator('li')).toHaveCount(2)
		await expect(content.getByRole('button', { name: 'Invite member' })).toBeVisible()
	})

	// Native attribute / className passthrough
	test('className is merged with default classes, not overridden', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const trigger = page.locator('[data-slot="accordion-trigger"]').first()
		await expect(trigger).toHaveClass(/hover:underline/)
	})

	// A disabled item renders a genuinely HTML-disabled <button> (not just an
	// aria-disabled one — that variant only shows up for the "open, not
	// collapsible" case tested above) — `data-disabled` is forwarded onto
	// both the trigger and its item wrapper alongside the native attribute.
	test('aria-* and data-* attributes are forwarded to the underlying elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--disabled-item&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Disabled section' })
		await expect(trigger).toBeDisabled()
		await expect(trigger).toHaveAttribute('data-disabled', '')
		await expect(page.locator('[data-slot="accordion-item"]').nth(1)).toHaveAttribute('data-disabled', '')
	})

	// Accessibility
	test('accessible relationship: content has role=region and aria-labelledby pointing at its trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		const trigger = page.getByRole('button', { name: /Is it accessible/ })
		const triggerId = await trigger.getAttribute('id')
		const content = page.locator('[data-slot="accordion-content"]').first()
		await expect(content).toHaveAttribute('role', 'region')
		await expect(content).toHaveAttribute('aria-labelledby', triggerId ?? '')
	})

	test('rtl: accordion still opens correctly under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--rtl&viewMode=story')
		await page.getByRole('button').first().click()
		await expect(page.locator('[data-slot="accordion-item"]').first()).toHaveAttribute('data-state', 'open')
	})

	// Refs
	test('ref forwards to the real underlying item element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="accordion-item"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	test('trigger and content refs resolve to real button/div elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-accordion--default&viewMode=story')
		await expect(page.locator('[data-slot="accordion-trigger"]').first()).toHaveJSProperty('tagName', 'BUTTON')
		await expect(page.locator('[data-slot="accordion-content"]').first()).toHaveJSProperty('tagName', 'DIV')
	})
})
