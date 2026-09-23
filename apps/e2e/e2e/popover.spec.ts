import { test, expect } from '../fixtures.js'

test.describe('Popover stories', () => {
	test('with form matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--with-form&viewMode=story')
		await page.getByRole('button', { name: 'Edit dimensions' }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
		await expect(page).toHaveScreenshot('popover-with-form.png')
	})

	// Rendering
	test('trigger renders with data-slot, content only exists once opened', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		await expect(page.locator('[data-slot="popover-trigger"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="popover-content"]')).toHaveCount(0)
		await page.getByRole('button', { name: 'Open popover' }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
	})

	// Interaction
	test('clicking the trigger opens the popover; clicking it again closes it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open popover' })
		await trigger.click()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
		await trigger.click()
		await expect(page.locator('[data-slot="popover-content"]')).not.toBeVisible()
	})

	test('Escape closes the popover and returns focus to the trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--keyboard-interaction&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Tab to me, Enter to open' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.locator('[data-slot="popover-content"]')).not.toBeVisible()
		await expect(trigger).toBeFocused()
	})

	test('clicking outside the content closes the popover', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		await page.getByRole('button', { name: 'Open popover' }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
		// The dismissable layer registers its outside-pointerdown listener
		// asynchronously after mount — retry the click rather than asserting
		// once (same registration-timing race already seen on Dialog/DropdownMenu).
		await expect(async () => {
			await page.mouse.click(10, 10)
			await expect(page.locator('[data-slot="popover-content"]')).not.toBeVisible({ timeout: 500 })
		}).toPass({ timeout: 5000 })
	})

	test('focus moves into the content on open', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--keyboard-interaction&viewMode=story')
		await page.getByRole('button', { name: 'Tab to me, Enter to open' }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
		await expect(page.getByRole('button', { name: 'Focusable button' })).toBeFocused()
	})

	test('controlled usage: onOpenChange drives visibility, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--controlled-open&viewMode=story')
		await expect(page.getByText('open: false')).toBeVisible()
		await page.getByRole('button', { name: 'Open popover' }).click()
		await expect(page.getByText('open: true')).toBeVisible()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
	})

	// Composition
	test('asChild: trigger renders the real button, not an extra wrapper', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		await expect(page.locator('[data-slot="popover-trigger"]')).toHaveJSProperty('tagName', 'BUTTON')
	})

	test('content composes arbitrary React content, not just text', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--custom-content&viewMode=story')
		await page.getByRole('button', { name: 'Release notes' }).click()
		const content = page.locator('[data-slot="popover-content"]')
		await expect(content.getByText('v2.5.0')).toBeVisible()
		await expect(content.getByRole('listitem')).toHaveCount(2)
	})

	test('PopoverHeader/PopoverTitle/PopoverDescription render with their own data-slots', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--with-form&viewMode=story')
		await page.getByRole('button', { name: 'Edit dimensions' }).click()
		await expect(page.locator('[data-slot="popover-header"]')).toBeVisible()
		await expect(page.locator('[data-slot="popover-title"]')).toHaveText('Dimensions')
		await expect(page.locator('[data-slot="popover-description"]')).toHaveText('Set the dimensions for the layer.')
	})

	test('PopoverAnchor positions the content against a different element than the trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--with-anchor&viewMode=story')
		const anchor = page.locator('[data-slot="popover-anchor"]')
		await page.getByRole('button', { name: 'Toggle' }).click()
		const content = page.locator('[data-slot="popover-content"]')
		await expect(content).toBeVisible()
		const [anchorBox, contentBox] = await Promise.all([anchor.boundingBox(), content.boundingBox()])
		if (!anchorBox || !contentBox) throw new Error('expected both anchor and content to have a bounding box')
		expect(Math.abs(contentBox.x - anchorBox.x)).toBeLessThan(2)
	})

	// Positioning
	test('side is forwarded to data-side', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--different-sides&viewMode=story')
		await page.getByRole('button', { name: 'left', exact: true }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toHaveAttribute('data-side', 'left')
	})

	test('align is forwarded to data-align', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--different-alignments&viewMode=story')
		await page.getByRole('button', { name: 'end', exact: true }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toHaveAttribute('data-align', 'end')
	})

	test('sideOffset is forwarded (affects the gap to the trigger)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--custom-offset&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open' })
		await trigger.click()
		const content = page.locator('[data-slot="popover-content"]')
		await expect(content).toBeVisible()
		await content.evaluate(async (el) => {
			await Promise.all(el.getAnimations().map((animation) => animation.finished))
		})
		const [triggerBox, contentBox] = await Promise.all([trigger.boundingBox(), content.boundingBox()])
		if (!triggerBox || !contentBox) throw new Error('expected both trigger and content to have a bounding box')
		const gap = contentBox.y - (triggerBox.y + triggerBox.height)
		expect(gap).toBeGreaterThan(10)
	})

	// Styling
	test('default styling: popover surface, bordered, shadowed, rounded-md (matches its siblings)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		await page.getByRole('button', { name: 'Open popover' }).click()
		const content = page.locator('[data-slot="popover-content"]')
		await expect(content).toHaveClass(/bg-popover/)
		await expect(content).toHaveClass(/border-border/)
		await expect(content).toHaveClass(/shadow-md/)
		await expect(content).toHaveClass(/rounded-md/)
	})

	test('custom className is merged with default styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--inside-popover&viewMode=story')
		await page.getByRole('button').click()
		await expect(page.locator('[data-slot="popover-content"]')).toHaveClass(/w-auto/)
		await expect(page.locator('[data-slot="popover-content"]')).toHaveClass(/p-0/)
	})

	test('data-state reflects open/closed', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		await page.getByRole('button', { name: 'Open popover' }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toHaveAttribute('data-state', 'open')
	})

	// Accessibility
	test('rtl: content still opens correctly under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--rtl&viewMode=story')
		await page.getByRole('button').click()
		await expect(page.locator('[data-slot="popover-content"]')).toBeVisible()
	})

	// Refs
	test('trigger and content refs forward to the real underlying elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-popover--default&viewMode=story')
		await expect(page.locator('[data-slot="popover-trigger"]')).toHaveJSProperty('tagName', 'BUTTON')
		await page.getByRole('button', { name: 'Open popover' }).click()
		await expect(page.locator('[data-slot="popover-content"]')).toHaveJSProperty('tagName', 'DIV')
	})
})
