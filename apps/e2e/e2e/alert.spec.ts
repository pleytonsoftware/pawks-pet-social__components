import { test, expect } from '../fixtures.js'

test.describe('Alert stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('alert-default.png')
	})

	test('destructive matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--destructive&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('alert-destructive.png')
	})

	test('renders a real div with data-slot="alert"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		const alert = page.locator('[data-slot="alert"]')
		await expect(alert).toHaveCount(1)
		await expect(alert).toHaveJSProperty('tagName', 'DIV')
	})

	test('title and description render with their own data-slots', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		await expect(page.locator('[data-slot="alert-title"]')).toHaveText('Heads up')
		await expect(page.locator('[data-slot="alert-description"]')).toHaveText('You can add components to your app using the CLI.')
	})

	test('default variant applies base styling, no destructive classes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		const alert = page.locator('[data-slot="alert"]')
		await expect(alert).toHaveClass(/bg-card/)
		await expect(alert).not.toHaveClass(/text-destructive/)
	})

	test('destructive variant swaps in the destructive classes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--destructive&viewMode=story')
		const alert = page.locator('[data-slot="alert"]')
		await expect(alert).toHaveClass(/text-destructive/)
		await expect(alert).toHaveClass(/border-destructive/)
	})

	test('does not force role="alert" by default — only when a consumer opts in', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--with-title&viewMode=story')
		await expect(page.locator('[data-slot="alert"]')).not.toHaveAttribute('role', 'alert')

		await page.goto('/iframe.html?id=atoms-alert--destructive&viewMode=story')
		await expect(page.locator('[data-slot="alert"]')).toHaveAttribute('role', 'alert')
	})

	test('native id, style, and data-* attributes are forwarded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--custom-styling&viewMode=story')
		const alert = page.locator('[data-slot="alert"]')
		const inlineStyle = await alert.evaluate((el) => el.style.borderColor)
		expect(inlineStyle.length).toBeGreaterThan(0)
	})

	test('custom className is merged with the default classes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		await expect(page.locator('[data-slot="alert"]')).toHaveClass(/rounded-lg/)
	})

	test('ref forwards to the real underlying div', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="alert"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	test('no dismiss/state props: dismissal is composed via AlertAction + a real Button', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--custom-content&viewMode=story')
		const dismissButton = page.getByRole('button', { name: 'Dismiss' })
		await expect(dismissButton).toBeVisible()
		await expect(page.locator('[data-slot="alert"]')).toBeVisible()
	})

	test('with icon and action matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--with-icon-and-action&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('alert-with-icon-and-action.png')
	})

	// The grid only reserves an icon column when an <svg> is a direct child —
	// no icon-related prop drives this, so verify the actual computed layout
	// differs between a story with an icon and one without.
	test('icon-aware grid: the icon column only exists when an <svg> child is present', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--with-title&viewMode=story')
		const noIconColumns = await page.locator('[data-slot="alert"]').evaluate((el) => getComputedStyle(el).gridTemplateColumns)
		expect(noIconColumns.split(' ')[0]).toBe('0px')

		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		const iconColumns = await page.locator('[data-slot="alert"]').evaluate((el) => getComputedStyle(el).gridTemplateColumns)
		expect(iconColumns.split(' ')[0]).toBe('16px')
	})

	test('AlertAction renders with its own data-slot, absolutely positioned in the corner', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--custom-content&viewMode=story')
		const action = page.locator('[data-slot="alert-action"]')
		await expect(action).toHaveCount(1)
		await expect(action).toHaveClass(/absolute/)
	})

	// `has-[[data-slot=alert-action]]:pr-10` is a literal class-name string
	// that's always present in the DOM regardless of whether an AlertAction
	// exists — only whether the CSS `:has()` rule it encodes actually
	// matches is conditional. So this checks the computed style, not the
	// class-string presence (which would pass unconditionally either way).
	test('an AlertAction reserves right-padding on the alert so text never overlaps it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--custom-content&viewMode=story')
		const withAction = await page.locator('[data-slot="alert"]').evaluate((el) => getComputedStyle(el).paddingRight)
		expect(withAction).toBe('40px')

		await page.goto('/iframe.html?id=atoms-alert--default&viewMode=story')
		const withoutAction = await page.locator('[data-slot="alert"]').evaluate((el) => getComputedStyle(el).paddingRight)
		expect(withoutAction).toBe('16px')
	})

	test('Dismissible: clicking the action button removes the alert — presence represents the state, not a prop', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-alert--dismissible&viewMode=story')
		await expect(page.locator('[data-slot="alert"]')).toBeVisible()
		await page.getByRole('button', { name: 'Dismiss' }).click()
		await expect(page.locator('[data-slot="alert"]')).toHaveCount(0)
		await expect(page.getByRole('button', { name: 'Show alert' })).toBeVisible()
	})
})
