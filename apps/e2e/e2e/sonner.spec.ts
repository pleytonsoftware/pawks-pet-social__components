import { test, expect } from '../fixtures.js'

// Sonner's own toaster root (`[data-sonner-toaster]`, an <ol>) only mounts
// once the first toast is created — a real Sonner optimization, not
// something to route around. Every test here triggers a toast before
// asserting on it.

test.describe('Sonner stories', () => {
	// A viewport screenshot, not `page.locator('body')`: the toast is
	// `position: fixed`, so it's excluded from body's own (short, in-flow-
	// only) layout box — the same reason Dialog/Drawer's screenshot tests
	// use `expect(page).toHaveScreenshot()` instead.
	test('success toast matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--success&viewMode=story')
		await page.getByRole('button', { name: 'Show success toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toBeVisible()
		await expect(page).toHaveScreenshot('sonner-success.png')
	})

	test('with close button matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--with-close-button&viewMode=story')
		await page.getByRole('button', { name: 'Show toast with close button' }).click()
		await expect(page.locator('[data-close-button]')).toBeVisible()
		await expect(page).toHaveScreenshot('sonner-with-close-button.png')
	})

	// Rendering
	test('the toaster root only mounts once a toast is triggered', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--default&viewMode=story')
		await expect(page.locator('[data-sonner-toaster]')).toHaveCount(0)
		await page.getByRole('button', { name: 'Show toast' }).click()
		await expect(page.locator('[data-sonner-toaster]')).toHaveCount(1)
	})

	test('default toast renders its message', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--default&viewMode=story')
		await page.getByRole('button', { name: 'Show toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveText('Event has been created.')
	})

	// Toast types
	test('success toast has data-type="success"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--success&viewMode=story')
		await page.getByRole('button', { name: 'Show success toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveAttribute('data-type', 'success')
	})

	test('info toast has data-type="info"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--info&viewMode=story')
		await page.getByRole('button', { name: 'Show info toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveAttribute('data-type', 'info')
	})

	test('warning toast has data-type="warning"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--warning&viewMode=story')
		await page.getByRole('button', { name: 'Show warning toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveAttribute('data-type', 'warning')
	})

	test('error toast has data-type="error"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--error-toast&viewMode=story')
		await page.getByRole('button', { name: 'Show error toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveAttribute('data-type', 'error')
	})

	// richColors default — the actual reason semantic types look distinct at
	// all: Sonner's own default for richColors is false, which would make
	// every toast type render identically save for its icon.
	test('richColors defaults to true so semantic types render with distinct colors', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--success&viewMode=story')
		await page.getByRole('button', { name: 'Show success toast' }).click()
		const toast = page.locator('[data-sonner-toast]')
		await expect(toast).toHaveAttribute('data-rich-colors', 'true')
		const bg = await toast.evaluate((el) => getComputedStyle(el).backgroundColor)
		expect(bg).toBe('rgb(42, 126, 73)') // Ragdoll light --success
	})

	// Promise toasts — the lifecycle belongs entirely to Sonner.
	test('promise toast transitions from loading to resolved state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--promise-toast&viewMode=story')
		await page.getByRole('button', { name: 'Show promise toast' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveText('Saving…')
		await expect(page.locator('[data-sonner-toast]')).toHaveText('profile.json saved.', { timeout: 3000 })
	})

	// Custom content
	test('custom description renders alongside the title', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--custom-description&viewMode=story')
		await page.getByRole('button', { name: 'Show toast with description' }).click()
		await expect(page.locator('[data-title]')).toHaveText('Event has been created.')
		await expect(page.locator('[data-description]')).toHaveText('Monday, January 3rd at 6:00pm')
	})

	test('custom content composes arbitrary React content, not just text', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--custom-content&viewMode=story')
		await page.getByRole('button', { name: 'Show custom content toast' }).click()
		const toast = page.locator('[data-sonner-toast]')
		await expect(toast.getByText('Pablo Leyton')).toBeVisible()
		await expect(toast.getByText('commented on your post')).toBeVisible()
	})

	// Actions — Sonner's own native action button, not a custom abstraction.
	test('toast action button triggers its own onClick, using Sonner’s native action model', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--with-action&viewMode=story')
		await page.getByRole('button', { name: 'Show toast with action' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveText(/File deleted/)
		await page.getByRole('button', { name: 'Undo' }).click()
		await expect(page.getByText('Undo clicked')).toBeVisible()
	})

	// Dismissal — via Sonner's own close button.
	test('a toast with closeButton can be dismissed', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--with-close-button&viewMode=story')
		await page.getByRole('button', { name: 'Show toast with close button' }).click()
		const toast = page.locator('[data-sonner-toast]')
		await expect(toast).toBeVisible()
		await page.locator('[data-close-button]').click()
		await expect(toast).toHaveAttribute('data-removed', 'true')
	})

	// Multiple simultaneous toasts
	test('multiple toasts stack independently', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--multiple-toasts&viewMode=story')
		await page.getByRole('button', { name: 'Show multiple toasts' }).click()
		await expect(page.locator('[data-sonner-toast]')).toHaveCount(3)
	})

	// Position — a per-toast option on the one global Toaster, not a
	// separate Toaster instance per position. Sonner renders one [data-sonner-
	// toaster] <ol> per unique position that has ever held a toast (the
	// default position's list always exists too, even empty) — so the
	// assertion has to target the specific list containing this toast, not
	// assume there's only one.
	test('toast position is configurable per call', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--different-positions&viewMode=story')
		await page.getByRole('button', { name: 'top-left', exact: true }).click()
		const toast = page.locator('[data-sonner-toast]', { hasText: 'Toast at top-left' })
		await expect(toast).toBeVisible()
		const list = page.locator('[data-sonner-toaster]', { has: toast })
		await expect(list).toHaveAttribute('data-x-position', 'left')
		await expect(list).toHaveAttribute('data-y-position', 'top')
	})

	// Theming — colors come entirely from CSS variables that already flip
	// under `.dark`, with zero JavaScript theme-detection in the component.
	test('theme integration: toast colors follow the design system in both light and dark mode', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--default&viewMode=story')
		await page.getByRole('button', { name: 'Show toast' }).click()
		const toast = page.locator('[data-sonner-toast]')
		const lightBg = await toast.evaluate((el) => getComputedStyle(el).backgroundColor)
		expect(lightBg).toBe('rgb(253, 252, 252)') // Ragdoll light --popover

		await page.goto('/iframe.html?id=atoms-sonner--default&viewMode=story&globals=mode:dark')
		await page.getByRole('button', { name: 'Show toast' }).click()
		const darkBg = await toast.evaluate((el) => getComputedStyle(el).backgroundColor)
		expect(darkBg).toBe('rgb(37, 32, 29)') // Ragdoll dark --popover
	})

	// The specific bug this fix addresses: Sonner hardcodes description text
	// color to a literal hex with no corresponding CSS variable, so without
	// an explicit override it stays the *light*-mode value even in dark mode
	// (Sonner's own `theme` prop is never synced here) — unreadably low
	// contrast against a dark popover background.
	test('description text stays readable in dark mode (not Sonner’s hardcoded light-mode hex)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--custom-description&viewMode=story&globals=mode:dark')
		await page.getByRole('button', { name: 'Show toast with description' }).click()
		const color = await page.locator('[data-description]').evaluate((el) => getComputedStyle(el).color)
		expect(color).toBe('rgb(185, 172, 162)') // Ragdoll dark --muted-foreground, not Sonner's #3f3f3f
	})

	// Accessibility — delegated entirely to Sonner (live region, focus, etc.).
	test('the toaster root is an aria-live region', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--default&viewMode=story')
		await page.getByRole('button', { name: 'Show toast' }).click()
		const region = page.locator('[aria-live]').first()
		await expect(region).toHaveCount(1)
	})

	// Refs
	test('toaster root is an <ol> element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--default&viewMode=story')
		await page.getByRole('button', { name: 'Show toast' }).click()
		await expect(page.locator('[data-sonner-toaster]')).toHaveJSProperty('tagName', 'OL')
	})

	// Sonner forwards its ref to the outer <section aria-live> wrapper, not
	// to the inner [data-sonner-toaster] <ol> — that section renders
	// unconditionally from first mount (verified directly against the
	// installed Sonner source), unlike the per-position <ol> lists nested
	// inside it, which only appear once a toast targets that position.
	test('ref forwards to the real underlying section element, present from first mount', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-sonner--ref-forwarding&viewMode=story')
		const refForwardedSection = page.locator('section[aria-live][data-ref-forwarded="true"]')
		await expect(refForwardedSection).toHaveCount(1)
		await expect(refForwardedSection).toHaveJSProperty('tagName', 'SECTION')
	})
})
