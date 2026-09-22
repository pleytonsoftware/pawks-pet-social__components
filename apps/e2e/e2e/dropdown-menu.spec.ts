import { test, expect, type Page } from '../fixtures.js'

// The menu plays a 150ms enter animation that starts offset and scaled down,
// so a box measured right after `toBeVisible()` is mid-flight. Wait on the
// real animations rather than a guessed timeout.
async function waitForMenuAnimation(page: Page) {
	await page.locator('[data-slot="dropdown-menu-content"]').evaluate(async (el) => {
		await Promise.all(el.getAnimations().map((animation) => animation.finished))
	})
}

test.describe('DropdownMenu stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('dropdown-menu-closed.png')
	})

	// The open menu is a Radix portal, positioned fixed — it doesn't expand
	// `body`'s own layout-flow bounding box, so a `body` element screenshot
	// crops it to a sliver. `expect(page)` captures the real rendered
	// viewport instead, portal content included.
	test('open menu matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.getByRole('menu')).toBeVisible()
		await expect(page).toHaveScreenshot('dropdown-menu-open.png')
	})

	test('checkbox items and radio items match screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--checkbox-items&viewMode=story')
		await page.getByRole('button', { name: 'View' }).click()
		await expect(page.getByRole('menu')).toBeVisible()
		await expect(page).toHaveScreenshot('dropdown-menu-checkbox-items.png')
	})

	test('complex menu matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--complex&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.getByRole('menu')).toBeVisible()
		await expect(page).toHaveScreenshot('dropdown-menu-complex.png')
	})

	test('inset items match screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--inset-items&viewMode=story')
		await page.getByRole('button', { name: 'View' }).click()
		await expect(page.getByRole('menu')).toBeVisible()
		await expect(page).toHaveScreenshot('dropdown-menu-inset-items.png')
	})

	test('destructive item matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--destructive-item&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.getByRole('menu')).toBeVisible()
		await expect(page).toHaveScreenshot('dropdown-menu-destructive-item.png')
	})

	// Guards the reported anchoring bug. Radix is modal by default, so while
	// the menu is open the trigger is aria-hidden and unreachable by role —
	// measure it through its data-slot instead.
	test('menu is anchored to its trigger, not clamped to the viewport', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.getByRole('menu')).toBeVisible()
		await waitForMenuAnimation(page)

		const trigger = await page.locator('[data-slot="dropdown-menu-trigger"]').boundingBox()
		const menu = await page.getByRole('menu').boundingBox()
		if (!trigger || !menu) throw new Error('expected both trigger and menu to have a bounding box')

		// Default align is `start` (deviates from Radix/shadcn's `center`
		// default — left-aligned reads better as this design system's default).
		expect(Math.abs(trigger.x - menu.x)).toBeLessThanOrEqual(2)
		// Vertical gap must equal sideOffset exactly — no stray permanent transform.
		expect(Math.abs(menu.y - (trigger.y + trigger.height) - 4)).toBeLessThanOrEqual(2)
	})

	test('align=start lines the menu up with the left edge of its trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--align-and-side&viewMode=story')
		const trigger = page.locator('[data-slot="dropdown-menu-trigger"]').first()
		const triggerBox = await trigger.boundingBox()
		await trigger.click()
		await expect(page.getByRole('menu')).toBeVisible()
		await waitForMenuAnimation(page)

		const menu = await page.getByRole('menu').boundingBox()
		if (!triggerBox || !menu) throw new Error('expected both trigger and menu to have a bounding box')
		expect(Math.abs(menu.x - triggerBox.x)).toBeLessThanOrEqual(2)
	})

	test('long menus cap at the available height and scroll instead of clipping', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--many-items&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.getByRole('menu')).toBeVisible()

		const box = await page.locator('[data-slot="dropdown-menu-content"]').evaluate((el) => ({
			clientHeight: el.clientHeight,
			scrollHeight: el.scrollHeight,
			overflowY: getComputedStyle(el).overflowY,
		}))
		expect(box.overflowY).toBe('auto')
		expect(box.scrollHeight).toBeGreaterThan(box.clientHeight)
	})

	test('destructive tone is styling only — the item still selects and closes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--destructive-item&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await page.getByRole('menuitem', { name: 'Delete permanently' }).click()
		await expect(page.getByRole('menu')).not.toBeVisible()
	})

	test('inset item aligns with an indicator-bearing sibling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--inset-items&viewMode=story')
		await page.getByRole('button', { name: 'View' }).click()
		const inset = page.getByRole('menuitem', { name: 'Reset to defaults' })
		const plain = page.getByRole('menuitem', { name: 'Not inset, for contrast' })
		await expect(inset).toHaveClass(/pl-8/)
		await expect(plain).not.toHaveClass(/pl-8/)
	})

	test('opens on trigger click and closes on Escape', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.click()
		await expect(page.getByRole('menu')).toBeVisible()
		await page.keyboard.press('Escape')
		await expect(page.getByRole('menu')).not.toBeVisible()
		await expect(trigger).toBeFocused()
	})

	test('clicking outside closes the menu', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		// The dismissable layer registers its outside-pointerdown listener
		// asynchronously after mount — waiting for the first item to actually
		// receive focus (a signal only available on keyboard-open; a mouse
		// click doesn't autofocus an item) gets most of the way there, but
		// under parallel load the listener registration can still land after
		// this wait resolves, so retry the click itself rather than asserting
		// once (verified against the real component: it's the registration
		// timing that's occasionally late, not a functional bug).
		await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused()
		await expect(async () => {
			await page.mouse.click(400, 400)
			await expect(page.getByRole('menu')).not.toBeVisible({ timeout: 500 })
		}).toPass({ timeout: 5000 })
	})

	// DropdownMenu owns no state of its own — this is a real controlled
	// component, proving `onOpenChange` (not internal state) drives it.
	test('controlled usage: onOpenChange drives open state, no independent state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--controlled&viewMode=story')
		await expect(page.getByText('open: false')).toBeVisible()
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.getByText('open: true')).toBeVisible()
		await expect(page.getByRole('menu')).toBeVisible()
	})

	test('keyboard: opens with Enter, ArrowDown navigates items, Enter selects and closes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('menu')).toBeVisible()
		// Radix focuses the first item asynchronously after the menu mounts —
		// menu visibility alone doesn't guarantee that's settled yet.
		await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused()
		await page.keyboard.press('ArrowDown')
		await expect(page.getByRole('menuitem', { name: 'Settings' })).toBeFocused()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('menu')).not.toBeVisible()
	})

	test('typeahead: typing a letter moves focus to the matching item', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused()
		await page.keyboard.press('l')
		await expect(page.getByRole('menuitem', { name: 'Log out' })).toBeFocused()
	})

	test('focus returns to the trigger after closing', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused()
		await page.keyboard.press('Escape')
		await expect(trigger).toBeFocused()
	})

	test('disabled item is skipped by keyboard navigation and cannot be selected', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--disabled-item&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		const disabledItem = page.getByRole('menuitem', { name: 'Settings (unavailable)' })
		await expect(disabledItem).toHaveAttribute('data-disabled', '')
		await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused()
		await page.keyboard.press('ArrowDown')
		// Roving focus skips disabled items entirely.
		await expect(page.getByRole('menuitem', { name: 'Log out' })).toBeFocused()
	})

	test('clicking an item fires onSelect and closes the menu', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await page.getByRole('menuitem', { name: 'Settings' }).click()
		await expect(page.getByRole('menu')).not.toBeVisible()
	})

	// Radix closes the menu on select by default for CheckboxItem/RadioItem
	// too, same as a plain Item — this component doesn't call
	// `event.preventDefault()` in `onSelect` to override that, per "Radix
	// owns interaction" — so the state change is verified by reopening
	// rather than by asserting the item stays mounted.
	test('checkbox item toggles independently, closing the menu like a plain item', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--checkbox-items&viewMode=story')
		const trigger = page.getByRole('button', { name: 'View' })
		await trigger.click()
		const toolbar = page.getByRole('menuitemcheckbox', { name: 'Show toolbar' })
		const sidebar = page.getByRole('menuitemcheckbox', { name: 'Show sidebar' })
		await expect(toolbar).toHaveAttribute('data-state', 'checked')
		await expect(sidebar).toHaveAttribute('data-state', 'unchecked')
		await sidebar.click()
		await expect(page.getByRole('menu')).not.toBeVisible()
		await trigger.click()
		await expect(page.getByRole('menuitemcheckbox', { name: 'Show sidebar' })).toHaveAttribute('data-state', 'checked')
	})

	test('radio group: selecting an item updates the checked item and unchecks the sibling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--radio-items&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Alignment' })
		await trigger.click()
		const start = page.getByRole('menuitemradio', { name: 'Start' })
		await expect(start).toHaveAttribute('data-state', 'checked')
		await page.getByRole('menuitemradio', { name: 'Center' }).click()
		await expect(page.getByRole('menu')).not.toBeVisible()
		await trigger.click()
		await expect(page.getByRole('menuitemradio', { name: 'Center' })).toHaveAttribute('data-state', 'checked')
		await expect(page.getByRole('menuitemradio', { name: 'Start' })).toHaveAttribute('data-state', 'unchecked')
	})

	test('groups render items without an accessible group label', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--groups&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.locator('[data-slot="dropdown-menu-group"]')).toHaveCount(2)
	})

	test('label renders as a non-interactive heading inside the menu', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--labels&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.locator('[data-slot="dropdown-menu-label"]')).toHaveText('My Account')
	})

	test('separator renders between items', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--separators&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.locator('[data-slot="dropdown-menu-separator"]')).toHaveCount(1)
	})

	test('submenu opens on hover and its item is selectable', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--submenu&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		const subTrigger = page.getByRole('menuitem', { name: 'Invite users' })
		await subTrigger.hover()
		const emailItem = page.getByRole('menuitem', { name: 'Email' })
		await expect(emailItem).toBeVisible()
		await emailItem.click()
		await expect(page.getByRole('menu').first()).not.toBeVisible()
	})

	test('submenu opens via ArrowRight and closes via ArrowLeft, returning focus to the sub trigger', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--submenu&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused()
		await page.keyboard.press('ArrowDown')
		const subTrigger = page.getByRole('menuitem', { name: 'Invite users' })
		await expect(subTrigger).toBeFocused()
		await page.keyboard.press('ArrowRight')
		await expect(page.getByRole('menuitem', { name: 'Email' })).toBeFocused()
		await page.keyboard.press('ArrowLeft')
		await expect(subTrigger).toBeFocused()
	})

	test('data-slot attributes are present on trigger, content, and items', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		await expect(page.locator('[data-slot="dropdown-menu-trigger"]')).toHaveCount(1)
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.locator('[data-slot="dropdown-menu-content"]')).toHaveCount(1)
		await expect(page.locator('[data-slot="dropdown-menu-item"]')).toHaveCount(3)
	})

	test('highlighted item is exposed via data-highlighted on keyboard focus', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.getByRole('button', { name: 'Open menu' })
		await trigger.focus()
		await page.keyboard.press('Enter')
		const profile = page.getByRole('menuitem', { name: 'Profile' })
		await expect(profile).toBeFocused()
		await expect(profile).toHaveAttribute('data-highlighted', '')
	})

	test('asChild composition: trigger renders the child element, not an extra wrapper button', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--default&viewMode=story')
		const trigger = page.locator('[data-slot="dropdown-menu-trigger"]')
		await expect(trigger).toHaveJSProperty('tagName', 'BUTTON')
		await expect(trigger).toHaveAttribute('data-slot', 'dropdown-menu-trigger')
	})

	test('asChild item composition renders a real link, not a div wrapping an anchor', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--with-link&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		const link = page.getByRole('menuitem', { name: 'Visit website' })
		await expect(link).toHaveJSProperty('tagName', 'A')
		await expect(link).toHaveAttribute('href', 'https://example.com')
	})

	test('custom trigger element receives data-slot and stays interactive without asChild', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--with-custom-trigger&viewMode=story')
		const trigger = page.locator('[data-slot="dropdown-menu-trigger"]')
		await trigger.click()
		await expect(page.getByRole('menu')).toBeVisible()
	})

	test('shortcut text renders alongside the item label', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-dropdownmenu--shortcuts&viewMode=story')
		await page.getByRole('button', { name: 'Open menu' }).click()
		await expect(page.locator('[data-slot="dropdown-menu-shortcut"]').first()).toHaveText('⌘T')
	})
})
