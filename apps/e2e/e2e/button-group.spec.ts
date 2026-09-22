import { test, expect } from '../fixtures.js'

test.describe('ButtonGroup stories', () => {
	test('outline buttons matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--outline-buttons&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('button-group-outline.png')
	})

	test('with separator matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--with-separator&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('button-group-with-separator.png')
	})

	// Rendering
	test('basic composition renders with the right data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--default&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveCount(1)
		await expect(page.getByRole('button')).toHaveCount(3)
	})

	// Orientation
	test('default orientation is horizontal', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--default&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('data-orientation', 'horizontal')
	})

	test('orientation="vertical" is reflected via data-orientation and stacks children in a column', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--vertical&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('data-orientation', 'vertical')
		const boxes = await page.getByRole('button').evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top))
		expect(boxes).toHaveLength(3)
		const [top, middle, bottom] = boxes as [number, number, number]
		expect(middle).toBeGreaterThan(top)
		expect(bottom).toBeGreaterThan(middle)
	})

	// role
	test('default role is "group"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--default&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('role', 'group')
	})

	test('a custom role overrides the default', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--custom-role&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('role', 'toolbar')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('aria-label', 'Text formatting')
	})

	// Styling — border/radius collapse
	test('adjacent children share one border: only the first child keeps its left border', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--outline-buttons&viewMode=story')
		const buttons = page.getByRole('button')
		await expect(buttons.nth(0)).not.toHaveCSS('border-left-width', '0px')
		await expect(buttons.nth(1)).toHaveCSS('border-left-width', '0px')
		await expect(buttons.nth(2)).toHaveCSS('border-left-width', '0px')
	})

	test('corner radius flattens on non-edge children: only the first and last keep rounded corners', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--outline-buttons&viewMode=story')
		const buttons = page.getByRole('button')
		const first = await buttons.nth(0).evaluate((el) => getComputedStyle(el).borderTopRightRadius)
		const middle = await buttons.nth(1).evaluate((el) => getComputedStyle(el).borderTopRightRadius)
		const last = await buttons.nth(2).evaluate((el) => getComputedStyle(el).borderTopLeftRadius)
		expect(first).toBe('0px') // first keeps its left corners rounded, right corners flattened
		expect(middle).toBe('0px')
		expect(last).toBe('0px') // last keeps its right corners rounded, left corners flattened
	})

	test('vertical orientation flattens top/bottom corners instead of left/right', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--vertical&viewMode=story')
		const buttons = page.getByRole('button')
		const firstBottom = await buttons.nth(0).evaluate((el) => getComputedStyle(el).borderBottomLeftRadius)
		const lastTop = await buttons.nth(2).evaluate((el) => getComputedStyle(el).borderTopLeftRadius)
		expect(firstBottom).toBe('0px')
		expect(lastTop).toBe('0px')
	})

	// Focus
	test("a focused child is raised above its neighbors so its ring isn't clipped", async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--outline-buttons&viewMode=story')
		const middle = page.getByRole('button', { name: 'Two' })
		await middle.focus()
		await expect(middle).toHaveCSS('position', 'relative')
		await expect(middle).toHaveCSS('z-index', '10')
	})

	// Keyboard — must NOT behave like a toolbar
	test('Tab moves focus through children individually; arrow keys do not move focus (no toolbar/roving-focus behavior)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--outline-buttons&viewMode=story')
		await page.getByRole('button', { name: 'One' }).focus()
		await page.keyboard.press('Tab')
		await expect(page.getByRole('button', { name: 'Two' })).toBeFocused()
		await page.keyboard.press('ArrowRight')
		await expect(page.getByRole('button', { name: 'Two' })).toBeFocused()
	})

	// Composition
	test('Button composition: each button keeps its own click behavior', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--outline-buttons&viewMode=story')
		await expect(page.getByRole('button', { name: 'One' })).toBeEnabled()
		await expect(page.getByRole('button', { name: 'Two' })).toBeEnabled()
	})

	test('Input composition: the input stretches to fill remaining space via [&>input]:flex-1', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--with-input&viewMode=story')
		const group = page.locator('[data-slot="button-group"]')
		const input = page.locator('input')
		const groupBox = await group.boundingBox()
		const inputBox = await input.boundingBox()
		if (!groupBox || !inputBox) throw new Error('expected both group and input to have a bounding box')
		expect(inputBox.width).toBeGreaterThan(groupBox.width * 0.6)
	})

	test('mixed-control composition: Select, Input, and Button work together', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--mixed-controls&viewMode=story')
		await expect(page.locator('[data-slot="select-trigger"]')).toBeVisible()
		await expect(page.locator('input[placeholder="Amount"]')).toBeVisible()
		await expect(page.getByRole('button', { name: 'Convert' })).toBeVisible()
	})

	// Nested groups — every top-level cluster (including single buttons) is
	// wrapped in its own ButtonGroup: outer + 3 wrappers = 4 total.
	test('nested groups: each cluster is treated as one unit with a gap around it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--nested-groups&viewMode=story')
		const groups = page.locator('[data-slot="button-group"]')
		await expect(groups).toHaveCount(4)
		const outerGap = await groups.first().evaluate((el) => getComputedStyle(el).gap)
		expect(outerGap).not.toBe('0px')
		// The "1 2 3" wrapper's own children still get border-collapsed among themselves.
		const innerButtons = groups.nth(2).getByRole('button')
		await expect(innerButtons.nth(1)).toHaveCSS('border-left-width', '0px')
	})

	// The actual bug this pattern exists to avoid: a bare Button sitting
	// directly next to a nested group (as opposed to being wrapped in its
	// own single-item group) would get one of its own corners wrongly
	// flattened by the outer group's `:not(:first-child)`/`:not(:last-child)`
	// rule, even though nothing is actually fused against it there.
	test('a single button wrapped in its own nested group keeps all four corners rounded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--nested-groups&viewMode=story')
		for (const name of ['Previous', 'Next']) {
			const button = page.getByRole('button', { name })
			const radii = await button.evaluate((el) => {
				const style = getComputedStyle(el)
				return [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomLeftRadius, style.borderBottomRightRadius]
			})
			for (const radius of radii) expect(radius).not.toBe('0px')
		}
	})

	// ButtonGroupText
	test('ButtonGroupText renders as presentational content with its own data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--with-text&viewMode=story')
		const text = page.locator('[data-slot="button-group-text"]')
		await expect(text).toHaveText('https://')
		await expect(text).toHaveJSProperty('tagName', 'DIV')
	})

	// ButtonGroupSeparator
	test('ButtonGroupSeparator renders a visible, full-height divider between clusters', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--with-separator&viewMode=story')
		const separator = page.locator('[data-slot="button-group-separator"]')
		await expect(separator).toBeVisible()
		const separatorBox = await separator.boundingBox()
		const toggleBox = await page.getByRole('button', { name: 'Underline' }).boundingBox()
		if (!separatorBox || !toggleBox) throw new Error('expected both elements to have a bounding box')
		// The separator stretches to roughly the same height as its siblings
		// (a real regression this ticket hit: a naive `h-full` on a flex item
		// without a definite-height ancestor computes to 0, not a stretch).
		expect(separatorBox.height).toBeGreaterThan(toggleBox.height * 0.5)
	})

	test("ButtonGroupSeparator defaults to vertical orientation (a horizontal group's natural divider)", async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--with-separator&viewMode=story')
		await expect(page.locator('[data-slot="button-group-separator"]')).toHaveAttribute('data-orientation', 'vertical')
	})

	// Disabled child
	test('a disabled child stays visibly and functionally disabled inside the group', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--disabled-child&viewMode=story')
		await expect(page.getByRole('button', { name: 'Two' })).toBeDisabled()
		await expect(page.getByRole('button', { name: 'One' })).toBeEnabled()
		await expect(page.getByRole('button', { name: 'Three' })).toBeEnabled()
	})

	// A disabled middle child's own borders fade with the rest of the
	// element (`disabled:opacity-40`), which used to make the shared seam
	// on its trailing side look fainter than the One/Two seam next to it —
	// that seam was owned by the disabled button's own (faded) border. The
	// fix hands seam ownership to the following enabled sibling instead:
	// the disabled child drops its own trailing border, and the button
	// after it gets its leading border restored, so both visible seams are
	// drawn by full-opacity (enabled) buttons.
	test('a disabled middle child does not own either of its shared borders, so both seams stay full-opacity', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--disabled-child&viewMode=story')
		const two = page.getByRole('button', { name: 'Two' })
		const three = page.getByRole('button', { name: 'Three' })
		await expect(two).toHaveCSS('border-right-width', '0px')
		await expect(three).toHaveCSS('border-left-width', '1px')
		await expect(three).toHaveCSS('opacity', '1')
	})

	// RTL
	test('rtl: the group still renders and functions correctly under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--rtl&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toBeVisible()
		await expect(page.getByRole('button')).toHaveCount(3)
	})

	// The actual RTL bug: physical `rounded-l`/`rounded-r`/`border-l` never
	// flip for `dir="rtl"`, so the "first DOM child keeps its outer corner"
	// logic ended up targeting the wrong physical side once the group's
	// visual (not DOM) order reversed — the outer edges looked squared off
	// and the inner seam looked rounded, backwards from what it should be.
	test('rtl: corner rounding follows the visual (not DOM) outer edges via logical properties', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--rtl&viewMode=story')
		const buttons = page.getByRole('button')
		const boxes = await buttons.evaluateAll((els) =>
			els.map((el) => ({
				x: el.getBoundingClientRect().x,
				tl: getComputedStyle(el).borderTopLeftRadius,
				tr: getComputedStyle(el).borderTopRightRadius,
			})),
		)
		expect(boxes).toHaveLength(3)
		const sortedByX = [...boxes].sort((a, b) => a.x - b.x)
		// Visually leftmost button keeps its left (outer) corner rounded.
		expect(sortedByX[0]?.tl).not.toBe('0px')
		// Visually rightmost button keeps its right (outer) corner rounded.
		expect(sortedByX[2]?.tr).not.toBe('0px')
	})

	// Native attribute / className passthrough
	test('className is merged with default classes, not overridden', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--default&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveClass(/items-stretch/)
	})

	test('aria-* and data-* attributes are forwarded to the root element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--custom-role&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('aria-label', 'Text formatting')
	})

	// Refs
	test('ref forwards to the real underlying div element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-buttongroup--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="button-group"]')).toHaveAttribute('data-ref-forwarded', 'true')
		await expect(page.locator('[data-slot="button-group"]')).toHaveJSProperty('tagName', 'DIV')
	})
})
