import { test, expect, type Page } from '../fixtures.js'

// The popup plays a 450ms entrance transition (DrawerPopup's own
// `duration-450`), so a box/attribute read right after opening can be
// mid-flight.
async function waitForDrawerAnimation(page: Page) {
	await page.locator('[data-slot="drawer-popup"]').evaluate(async (el) => {
		await Promise.all(el.getAnimations().map((animation) => animation.finished))
	})
}

// Chromium desaturates full-page screenshots of a momentarily-inactive
// window under heavy parallel test load — a real, reproducible browser
// quirk (not app behavior), already hit and fixed the same way for
// Dialog/AlertDialog this session.
async function settleForScreenshot(page: Page) {
	await page.bringToFront()
	await page.waitForTimeout(150)
}

test.describe('Drawer stories', () => {
	// A viewport screenshot, not `page.locator('body')`: the popup is
	// `position: fixed`, so it's excluded from body's own (short, in-flow-only)
	// layout box — the same reason Dialog/AlertDialog's screenshot tests use
	// `expect(page).toHaveScreenshot()` instead.
	test('default open state matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await waitForDrawerAnimation(page)
		await settleForScreenshot(page)
		await expect(page).toHaveScreenshot('drawer-default-open.png')
	})

	test('swipe handle matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--swipe-handle&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await waitForDrawerAnimation(page)
		await settleForScreenshot(page)
		await expect(page).toHaveScreenshot('drawer-swipe-handle-open.png')
	})

	// Rendering
	test('trigger renders with data-slot, popup only exists once opened', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await expect(page.locator('[data-slot="drawer-trigger"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveCount(0)
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-content"]')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-portal"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="drawer-overlay"]')).toBeVisible()
	})

	test('header, title, description, footer render with their own data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--with-footer&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-header"]')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-title"]')).toHaveText('Discard changes?')
		await expect(page.locator('[data-slot="drawer-description"]')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-footer"]')).toBeVisible()
	})

	test('swipe handle renders only when showSwipeHandle is set', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-swipe-handle"]')).toHaveCount(0)

		await page.goto('/iframe.html?id=atoms-drawer--swipe-handle&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-swipe-handle"]')).toHaveCount(1)
	})

	// Open state
	test('uncontrolled: trigger opens, Escape closes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.locator('[data-slot="drawer-popup"]')).not.toBeVisible()
	})

	test('DrawerClose closes the drawer through primitive state, not a custom handler', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--with-footer&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await page.getByRole('button', { name: 'Keep editing' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).not.toBeVisible()
	})

	test('modal drawer closes on outside press', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await page.mouse.click(10, 10)
		await expect(page.locator('[data-slot="drawer-popup"]')).not.toBeVisible()
	})

	// Closing via the trigger isn't exercised here: once open, the modal
	// backdrop (fixed inset-0, above the trigger's own stacking context)
	// intercepts a click aimed at the trigger's screen position, same as
	// Dialog's own controlled story/test — Escape is the reliable way to
	// close and still proves onOpenChange (not internal state) drives it.
	test('controlled: open and onOpenChange drive visibility, not internal state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--controlled&viewMode=story')
		await expect(page.getByText('open: false')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveCount(0)
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.getByText('open: true')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.getByText('open: false')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-popup"]')).not.toBeVisible()
	})

	// Direction
	test.describe('swipeDirection', () => {
		const cases: Array<{ story: string; trigger: string; direction: string; axis: string }> = [
			{ story: 'top-drawer', trigger: 'Open top drawer', direction: 'up', axis: 'y' },
			{ story: 'right-drawer', trigger: 'Open right drawer', direction: 'right', axis: 'x' },
			{ story: 'bottom-drawer', trigger: 'Open bottom drawer', direction: 'down', axis: 'y' },
			{ story: 'left-drawer', trigger: 'Open left drawer', direction: 'left', axis: 'x' },
		]

		for (const { story, trigger, direction, axis } of cases) {
			test(`${direction}: data-swipe-direction and data-swipe-axis are correct`, async ({ page }) => {
				await page.goto(`/iframe.html?id=atoms-drawer--${story}&viewMode=story`)
				await page.getByRole('button', { name: trigger }).click()
				const popup = page.locator('[data-slot="drawer-popup"]')
				await expect(popup).toHaveAttribute('data-swipe-direction', direction)
				await expect(popup).toHaveAttribute('data-swipe-axis', axis)
			})
		}
	})

	// Swipe interaction
	test('swiping the handle past the threshold dismisses the drawer', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--swipe-handle&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await waitForDrawerAnimation(page)

		const handle = page.locator('[data-slot="drawer-swipe-handle"]')
		const box = await handle.boundingBox()
		if (!box) throw new Error('expected the swipe handle to have a bounding box')
		const startX = box.x + box.width / 2
		const startY = box.y + box.height / 2

		await page.mouse.move(startX, startY)
		await page.mouse.down()
		for (let step = 1; step <= 10; step++) {
			await page.mouse.move(startX, startY + step * 40, { steps: 2 })
		}
		await page.mouse.up()

		await expect(page.locator('[data-slot="drawer-popup"]')).not.toBeVisible()
	})

	test('data-swiping is set while a swipe gesture is in progress', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--swipe-handle&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await waitForDrawerAnimation(page)

		const handle = page.locator('[data-slot="drawer-swipe-handle"]')
		const box = await handle.boundingBox()
		if (!box) throw new Error('expected the swipe handle to have a bounding box')
		const startX = box.x + box.width / 2
		const startY = box.y + box.height / 2

		await page.mouse.move(startX, startY)
		await page.mouse.down()
		await page.mouse.move(startX, startY + 30, { steps: 3 })
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveAttribute('data-swiping', '')
		await page.mouse.up()
	})

	// Snap points
	test('snapPoints: data-snap-points is present on the popup', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--snap-points&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveAttribute('data-snap-points', '')
	})

	test('drawer without snapPoints has no data-snap-points attribute', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).not.toHaveAttribute('data-snap-points')
	})

	test('controlled snapPoint: onSnapPointChange fires and drives the active snap point', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--controlled-snap-point&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.getByText('Current snap point: 0.5')).toBeVisible()

		await page.getByRole('button', { name: '25%' }).click()
		await expect(page.getByText('Current snap point: 0.25')).toBeVisible()

		await page.getByRole('button', { name: '100%' }).click()
		await expect(page.getByText('Current snap point: 1')).toBeVisible()
	})

	test('the full snap point sets data-expanded on the popup', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--controlled-snap-point&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const popup = page.locator('[data-slot="drawer-popup"]')
		await expect(popup).not.toHaveAttribute('data-expanded')
		await page.getByRole('button', { name: '100%' }).click()
		await expect(popup).toHaveAttribute('data-expanded', '')
	})

	// Nested drawers
	test('nested drawer opens on top of the parent, which stays mounted', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--nested-drawer&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveCount(1)

		await page.getByRole('button', { name: 'Change password' }).click()
		const popups = page.locator('[data-slot="drawer-popup"]')
		await expect(popups).toHaveCount(2)
	})

	test('nested drawer state attributes: parent gets data-nested-drawer-open, child gets data-nested', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--nested-drawer&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await page.getByRole('button', { name: 'Change password' }).click()
		const popups = page.locator('[data-slot="drawer-popup"]')
		await expect(popups).toHaveCount(2)
		await expect(popups.first()).toHaveAttribute('data-nested-drawer-open', '')
		await expect(popups.nth(1)).toHaveAttribute('data-nested', '')
	})

	// Non-modal
	test('modal={false}: no overlay is rendered and the rest of the page stays interactive', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--non-modal&viewMode=story')
		await page.getByRole('button', { name: 'Open non-modal drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-overlay"]')).toHaveCount(0)
		await expect(page.locator('[data-slot="drawer-viewport"]')).toHaveAttribute('data-modal', 'false')
	})

	test('disablePointerDismissal: outside press does not close the drawer', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--disabled-pointer-dismissal&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await page.mouse.click(10, 10)
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await page.getByRole('button', { name: 'Close' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).not.toBeVisible()
	})

	// Scrollable content
	test('scrollable content: header and footer stay fixed while the middle region scrolls', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--scrollable-content&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await waitForDrawerAnimation(page)

		const header = page.locator('[data-slot="drawer-header"]')
		const footer = page.locator('[data-slot="drawer-footer"]')
		const scrollArea = page.locator('[data-slot="drawer-content"] > .overflow-y-auto')

		const { scrollHeight, clientHeight } = await scrollArea.evaluate((el) => ({ scrollHeight: el.scrollHeight, clientHeight: el.clientHeight }))
		expect(scrollHeight).toBeGreaterThan(clientHeight)

		const headerBoxBefore = await header.boundingBox()
		const footerBoxBefore = await footer.boundingBox()
		await scrollArea.evaluate((el) => {
			el.scrollTop = 200
		})
		expect(await scrollArea.evaluate((el) => el.scrollTop)).toBe(200)
		expect(await header.boundingBox()).toEqual(headerBoxBefore)
		expect(await footer.boundingBox()).toEqual(footerBoxBefore)
	})

	// Sizing
	test('CustomHeight: className/style on DrawerContent controls the popup height', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--custom-height&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const height = await page.locator('[data-slot="drawer-popup"]').evaluate((el) => el.getBoundingClientRect().height)
		const viewportHeight = page.viewportSize()?.height
		if (!viewportHeight) throw new Error('expected a viewport size')
		expect(height).toBeCloseTo(viewportHeight * 0.5, 0)
	})

	test('CustomWidth: style on DrawerContent controls the popup width for a side drawer', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--custom-width&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const width = await page.locator('[data-slot="drawer-popup"]').evaluate((el) => getComputedStyle(el).width)
		expect(width).toBe('448px') // 28rem
	})

	test('CustomInset: the --drawer-inset CSS variable is consumed as a margin', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--custom-inset&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const margin = await page.locator('[data-slot="drawer-popup"]').evaluate((el) => getComputedStyle(el).margin)
		expect(margin).toBe('16px')
	})

	// Styling
	test('default styling: popover surface, bordered, shadowed, rounded per direction', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const popup = page.locator('[data-slot="drawer-popup"]')
		await expect(popup).toHaveClass(/bg-popover/)
		await expect(popup).toHaveClass(/border-border/)
		await expect(popup).toHaveClass(/shadow-lg/)
		await expect(popup).toHaveClass(/rounded-t-xl/)
	})

	test('custom styling (border color) is applied via style, not overridden by defaults', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--custom-styling&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const borderColor = await page.locator('[data-slot="drawer-popup"]').evaluate((el) => getComputedStyle(el).borderColor)
		expect(borderColor).toBe('rgb(42, 126, 73)')
	})

	// Composition
	test('render prop composes the trigger with the real Button element, not an extra wrapper', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		const trigger = page.locator('[data-slot="drawer-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'BUTTON')
		await expect(trigger).toHaveClass(/border-primary/)
		await expect(trigger).toHaveText('Open drawer')
	})

	test('a Drawer can compose a Field-based form', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--form&viewMode=story')
		await page.getByRole('button', { name: 'Edit profile' }).click()
		await expect(page.locator('#drawer-form-name')).toHaveValue('Pablo Leyton')
		await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible()
	})

	// Responsive pattern
	test('responsive pattern: desktop viewport renders Dialog, mobile viewport renders Drawer', async ({ page, browser }) => {
		await page.setViewportSize({ width: 1200, height: 800 })
		await page.goto('/iframe.html?id=atoms-drawer--responsive-dialog-and-drawer&viewMode=story')
		await page.getByRole('button', { name: 'Edit profile' }).click()
		await expect(page.locator('[data-slot="dialog-content"]')).toBeVisible()
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveCount(0)

		const mobileContext = await browser.newContext({ viewport: { width: 400, height: 800 } })
		const mobilePage = await mobileContext.newPage()
		await mobilePage.goto('/iframe.html?id=atoms-drawer--responsive-dialog-and-drawer&viewMode=story')
		await mobilePage.waitForFunction(() => {
			const root = document.getElementById('storybook-root')
			return !!root && root.children.length > 0
		})
		await mobilePage.getByRole('button', { name: 'Edit profile' }).click()
		await expect(mobilePage.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await expect(mobilePage.locator('[data-slot="dialog-content"]')).toHaveCount(0)
		await mobileContext.close()
	})

	// Accessibility
	test('rtl: drawer still opens correctly under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--rtl&viewMode=story')
		await page.getByRole('button').first().click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
	})

	test('accessible title and description are wired via aria-labelledby/aria-describedby', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--with-description&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		const popup = page.locator('[data-slot="drawer-popup"]')
		await expect(popup).toHaveAttribute('role', 'dialog')
		const labelledBy = await popup.getAttribute('aria-labelledby')
		const describedBy = await popup.getAttribute('aria-describedby')
		expect(labelledBy).toBeTruthy()
		expect(describedBy).toBeTruthy()
		const titleId = await page.locator('[data-slot="drawer-title"]').getAttribute('id')
		const descriptionId = await page.locator('[data-slot="drawer-description"]').getAttribute('id')
		expect(labelledBy).toBe(titleId)
		expect(describedBy).toBe(descriptionId)
	})

	test('focus moves into the drawer when opened', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--default&viewMode=story')
		await page.getByRole('button', { name: 'Open drawer' }).click()
		await expect(page.locator('[data-slot="drawer-popup"]')).toBeVisible()
		await waitForDrawerAnimation(page)
		const isFocusInsidePopup = await page.evaluate(() => {
			const popup = document.querySelector('[data-slot="drawer-popup"]')
			return !!popup && popup.contains(document.activeElement)
		})
		expect(isFocusInsidePopup).toBe(true)
	})

	// Refs
	test('DrawerContent ref forwards to the real underlying popup element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-drawer--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="drawer-popup"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})
})
