import { test, expect, type Page } from '../fixtures.js'

// The content plays a 150ms enter animation (shared with DropdownMenu/
// Select/Tooltip), so a box measured or a click fired right after
// `toBeVisible()` can land mid-flight. Wait on the real animation.
async function waitForDialogAnimation(page: Page) {
	await page
		.locator('[data-slot="dialog-content"]')
		.first()
		.evaluate(async (el) => {
			await Promise.all(el.getAnimations().map((animation) => animation.finished))
		})
}

test.describe('Dialog stories', () => {
	test('form matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--form&viewMode=story')
		await page.getByRole('button', { name: 'Edit profile' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
		// Under heavy parallel execution, Chromium can render a page as an
		// "inactive/background window" (desaturated colors) if some other
		// worker's context currently holds OS focus — verified directly by
		// diffing two "failing" captures against each other: same pixels,
		// only the saturation differed. `bringToFront()` forces this page to
		// the foreground right before capture so it can't land mid-desaturated.
		await page.bringToFront()
		await page.waitForTimeout(150)
		await expect(page).toHaveScreenshot('dialog-form.png')
	})

	test('with footer actions matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--with-footer-actions&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
		await page.bringToFront()
		await page.waitForTimeout(150)
		await expect(page).toHaveScreenshot('dialog-with-footer-actions.png')
	})

	// Root rendering / trigger behavior
	test('closed by default: no dialog in the DOM until the trigger is clicked', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await expect(page.getByRole('dialog')).toHaveCount(0)
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
	})

	test('data-slot is present on trigger, overlay, and content', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await expect(page.locator('[data-slot="dialog-trigger"]')).toHaveCount(1)
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.locator('[data-slot="dialog-overlay"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="dialog-content"]')).toHaveCount(1)
	})

	// Controlled / uncontrolled
	test('uncontrolled usage: the trigger opens and closes with no external state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
	})

	test('controlled usage: onOpenChange drives open state, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--controlled&viewMode=story')
		await expect(page.getByText('open: false')).toBeVisible()
		await expect(page.getByRole('dialog')).toHaveCount(0)
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByText('open: true')).toBeVisible()
		await expect(page.getByRole('dialog')).toBeVisible()
	})

	// Opening/closing, DialogClose, Escape, focus
	test('DialogClose (the footer Cancel button) closes the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--form&viewMode=story')
		await page.getByRole('button', { name: 'Edit profile' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
		await page.getByRole('button', { name: 'Cancel' }).click()
		await expect(page.getByRole('dialog')).not.toBeVisible()
	})

	test('the default corner close (×) button closes the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
		await page.getByRole('button', { name: 'Close' }).click()
		await expect(page.getByRole('dialog')).not.toBeVisible()
	})

	test('Escape closes the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.getByRole('dialog')).not.toBeVisible()
	})

	test('focus moves into the dialog on open and restores to the trigger on close', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open dialog' })
		await trigger.click()
		const dialog = page.getByRole('dialog')
		await expect(dialog).toBeVisible()
		await expect(dialog).toContainText('Edit profile')
		// Radix focuses the first focusable descendant when one exists —
		// here that's the default corner close button, not the content div
		// itself (verified directly: the content only gets focus when it has
		// no focusable descendants at all).
		await expect(page.locator('[data-slot="dialog-close"]')).toBeFocused()
		await page.keyboard.press('Escape')
		await expect(trigger).toBeFocused()
	})

	test('clicking the overlay (outside the content) closes the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toBeVisible()
		// The dismissable layer registers its outside-pointerdown listener
		// asynchronously after mount — retry the click rather than asserting
		// once (same registration-timing race already seen on DropdownMenu).
		await expect(async () => {
			await page.mouse.click(10, 10)
			await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 500 })
		}).toPass({ timeout: 5000 })
	})

	// Title/description relationships
	test('DialogTitle and DialogDescription are accessibly associated with the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--with-description&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		const dialog = page.getByRole('dialog')
		const [labelledBy, describedBy] = await Promise.all([dialog.getAttribute('aria-labelledby'), dialog.getAttribute('aria-describedby')])
		const [titleId, descriptionId] = await Promise.all([
			page.locator('[data-slot="dialog-title"]').getAttribute('id'),
			page.locator('[data-slot="dialog-description"]').getAttribute('id'),
		])
		expect(labelledBy).toBe(titleId)
		expect(describedBy).toBe(descriptionId)
	})

	// asChild composition
	test('asChild: DialogTrigger renders the Button itself, not an extra wrapper', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		const trigger = page.locator('[data-slot="dialog-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'BUTTON')
	})

	test('asChild: DialogClose renders the Button itself in the footer', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--form&viewMode=story')
		await page.getByRole('button', { name: 'Edit profile' }).click()
		const cancel = page.locator('[data-slot="dialog-close"]').filter({ hasText: 'Cancel' })
		await expect(cancel).toHaveJSProperty('tagName', 'BUTTON')
	})

	// Refs
	test('ref forwards to the real underlying content element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="dialog-content"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	// Styling
	test('default styling: card surface, rounded-xl, shadow-lg', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		const content = page.getByRole('dialog')
		await expect(content).toHaveClass(/bg-card/)
		await expect(content).toHaveClass(/rounded-xl/)
		await expect(content).toHaveClass(/shadow-lg/)
	})

	test('custom className is merged with the default styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--different-content-sizes&viewMode=story')
		await page.getByRole('button', { name: 'Large' }).click()
		await expect(page.getByRole('dialog')).toHaveClass(/bg-card/)
	})

	test('Radix data-state is available for state-based styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog')).toHaveAttribute('data-state', 'open')
	})

	// Nested composition
	test('nested dialogs: opening the inner one does not close the outer one', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dialog--nested-composition&viewMode=story')
		await page.getByRole('button', { name: 'Open dialog' }).click()
		await expect(page.getByRole('dialog').first()).toBeVisible()
		await waitForDialogAnimation(page)
		await page.getByRole('button', { name: 'Change password' }).click()
		// Both stay mounted and open, but `getByRole('dialog')` only counts
		// 1: Radix correctly aria-hides the outer dialog's content while a
		// nested one is topmost, matching real stacked-modal accessibility
		// behavior — so assert via data-slot/data-state, not the AT-filtered role.
		const contents = page.locator('[data-slot="dialog-content"]')
		await expect(contents).toHaveCount(2)
		const states = await contents.evaluateAll((els) => els.map((el) => el.getAttribute('data-state')))
		expect(states).toEqual(['open', 'open'])
		await expect(contents.first()).toHaveAttribute('aria-hidden', 'true')
	})
})
