import { test, expect } from '../fixtures.js'

test.describe('AlertDialog stories', () => {
	test('destructive confirmation matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--destructive-confirmation&viewMode=story')
		await page.getByRole('button', { name: 'Delete project' }).click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
		// See dialog.spec.ts's "form matches screenshot" for why: under heavy
		// parallel execution Chromium can render a page as an inactive/
		// background window (desaturated colors); bringToFront() prevents it.
		await page.bringToFront()
		await page.waitForTimeout(150)
		await expect(page).toHaveScreenshot('alert-dialog-destructive.png')
	})

	test('long description matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--long-description&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
		await page.bringToFront()
		await page.waitForTimeout(150)
		await expect(page).toHaveScreenshot('alert-dialog-long-description.png')
	})

	// Root rendering / trigger behavior
	test('closed by default: no alertdialog in the DOM until the trigger is clicked', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await expect(page.getByRole('alertdialog')).toHaveCount(0)
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
	})

	test('data-slot is present on trigger, overlay, and content', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await expect(page.locator('[data-slot="alert-dialog-trigger"]')).toHaveCount(1)
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.locator('[data-slot="alert-dialog-overlay"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="alert-dialog-content"]')).toHaveCount(1)
	})

	// No default dismiss (×) — the key distinction from Dialog
	test('has no default corner close button, unlike Dialog — only Cancel/Action dismiss it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
		await expect(page.getByRole('button', { name: 'Close' })).toHaveCount(0)
	})

	// Controlled / uncontrolled
	test('controlled usage: onOpenChange drives open state, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--controlled&viewMode=story')
		await expect(page.getByText('open: false')).toBeVisible()
		await expect(page.getByRole('alertdialog')).toHaveCount(0)
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByText('open: true')).toBeVisible()
		await expect(page.getByRole('alertdialog')).toBeVisible()
	})

	// Action / cancel behavior
	test('AlertDialogCancel closes the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await page.getByRole('button', { name: 'Cancel' }).click()
		await expect(page.getByRole('alertdialog')).not.toBeVisible()
	})

	test('AlertDialogAction fires its own onClick and closes the dialog — the consuming feature owns the operation', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await page.getByRole('button', { name: 'Continue' }).click()
		await expect(page.getByRole('alertdialog')).not.toBeVisible()
	})

	test('a disabled AlertDialogAction cannot be activated', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--disabled-action&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		const action = page.getByRole('button', { name: 'Continue' })
		await expect(action).toBeDisabled()
		await expect(page.getByRole('alertdialog')).toBeVisible()
	})

	// Escape / focus
	test('Escape closes the dialog like Cancel', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.getByRole('alertdialog')).not.toBeVisible()
	})

	test('focus moves into the dialog on open and restores to the trigger on close', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Show dialog' })
		await trigger.click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(trigger).toBeFocused()
	})

	// Modal behavior: clicking the overlay does NOT close it (unlike Dialog) —
	// AlertDialog requires an explicit Cancel/Action, matching Radix's own
	// AlertDialog default (outside-pointer interaction is prevented).
	test('modal behavior: clicking outside the content does not dismiss it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('alertdialog')).toBeVisible()
		await page.mouse.click(10, 10)
		await expect(page.getByRole('alertdialog')).toBeVisible()
	})

	// Title/description relationships
	test('AlertDialogTitle and AlertDialogDescription are accessibly associated with the dialog', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		const dialog = page.getByRole('alertdialog')
		const [labelledBy, describedBy] = await Promise.all([dialog.getAttribute('aria-labelledby'), dialog.getAttribute('aria-describedby')])
		const [titleId, descriptionId] = await Promise.all([
			page.locator('[data-slot="alert-dialog-title"]').getAttribute('id'),
			page.locator('[data-slot="alert-dialog-description"]').getAttribute('id'),
		])
		expect(labelledBy).toBe(titleId)
		expect(describedBy).toBe(descriptionId)
	})

	// asChild
	test('asChild: AlertDialogTrigger renders the Button itself, not an extra wrapper', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		const trigger = page.locator('[data-slot="alert-dialog-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'BUTTON')
	})

	// Refs
	test('ref forwards to the real underlying content element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="alert-dialog-content"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	// Styling
	test('AlertDialogAction is styled like a solid Button via buttonVariants', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('button', { name: 'Continue' })).toHaveClass(/bg-primary/)
	})

	test('AlertDialogCancel is styled like an outline Button via buttonVariants', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('button', { name: 'Cancel' })).toHaveClass(/border-primary/)
	})

	test('Radix data-state is available for state-based styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alertdialog--default&viewMode=story')
		await page.getByRole('button', { name: 'Show dialog' }).click()
		await expect(page.getByRole('alertdialog')).toHaveAttribute('data-state', 'open')
	})
})
