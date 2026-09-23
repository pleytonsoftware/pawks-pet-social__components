import { test, expect } from '../fixtures.js'

test.describe('Bubble stories', () => {
	test('variants matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--variants&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('bubble-variants.png')
	})

	test('with reactions matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--with-reactions&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('bubble-with-reactions.png')
	})

	// Rendering
	test('default renders with the right data-slot and default variant/align', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--default&viewMode=story')
		const bubble = page.locator('[data-slot="bubble"]')
		await expect(bubble).toHaveCount(1)
		await expect(bubble).toHaveAttribute('data-variant', 'default')
		await expect(bubble).toHaveAttribute('data-align', 'start')
		await expect(page.locator('[data-slot="bubble-content"]')).toHaveCount(1)
	})

	// Variants
	for (const variant of ['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive']) {
		test(`variant="${variant}" is reflected via data-variant on both Bubble and BubbleContent`, async ({ page }) => {
			await page.goto('/iframe.html?id=atoms-bubble--variants&viewMode=story')
			const bubble = page.locator(`[data-slot="bubble"][data-variant="${variant}"]`)
			await expect(bubble).toHaveCount(1)
			await expect(bubble.locator('[data-slot="bubble-content"]')).toHaveAttribute('data-variant', variant)
		})
	}

	// Alignment — Bubble itself shrinks to its content and uses an auto
	// inline margin to push to either edge, so alignment is asserted via
	// position against the story's sized wrapper, not a flex justify-content.
	test('align="start" positions the bubble at the start edge of its container', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--align-start&viewMode=story')
		const wrapper = page.locator('#storybook-root > div').first()
		const bubble = page.locator('[data-slot="bubble"]')
		await expect(bubble).toHaveAttribute('data-align', 'start')
		const wrapperBox = await wrapper.boundingBox()
		const bubbleBox = await bubble.boundingBox()
		if (!wrapperBox || !bubbleBox) throw new Error('expected both wrapper and bubble to have a bounding box')
		expect(Math.abs(bubbleBox.x - wrapperBox.x)).toBeLessThan(2)
	})

	test('align="end" positions the bubble at the end edge of its container', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--align-end&viewMode=story')
		const wrapper = page.locator('#storybook-root > div').first()
		const bubble = page.locator('[data-slot="bubble"]')
		await expect(bubble).toHaveAttribute('data-align', 'end')
		const wrapperBox = await wrapper.boundingBox()
		const bubbleBox = await bubble.boundingBox()
		if (!wrapperBox || !bubbleBox) throw new Error('expected both wrapper and bubble to have a bounding box')
		expect(Math.abs(bubbleBox.x + bubbleBox.width - (wrapperBox.x + wrapperBox.width))).toBeLessThan(2)
	})

	// Content sizing — Bubble itself now owns width/max-width (BubbleContent
	// is always `w-full` of it), so these compare Bubble against the story's
	// sized wrapper rather than against BubbleContent, which is always ~the
	// same size as Bubble by construction.
	test('short content sizes the bubble to its content, not to the full available width', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--short-content&viewMode=story')
		const bubble = page.locator('[data-slot="bubble"]')
		const bubbleBox = await bubble.boundingBox()
		if (!bubbleBox) throw new Error('expected bubble to have a bounding box')
		expect(bubbleBox.width).toBeLessThan(100)
	})

	test('long content wraps within the ~80% max-width instead of spanning the full available width', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--long-content&viewMode=story')
		const wrapper = page.locator('#storybook-root > div').first()
		const bubble = page.locator('[data-slot="bubble"]')
		const wrapperBox = await wrapper.boundingBox()
		const bubbleBox = await bubble.boundingBox()
		if (!wrapperBox || !bubbleBox) throw new Error('expected both wrapper and bubble to have a bounding box')
		expect(bubbleBox.width).toBeLessThanOrEqual(wrapperBox.width * 0.81)
	})

	test('ghost variant spans the full available width, not the ~80% default', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--ghost-full-width&viewMode=story')
		const wrapper = page.locator('#storybook-root > div').first()
		const bubble = page.locator('[data-slot="bubble"]')
		const wrapperBox = await wrapper.boundingBox()
		const bubbleBox = await bubble.boundingBox()
		if (!wrapperBox || !bubbleBox) throw new Error('expected both wrapper and bubble to have a bounding box')
		expect(bubbleBox.width).toBeGreaterThan(wrapperBox.width * 0.95)
	})

	// Polymorphic rendering (asChild)
	test('BubbleContent with asChild renders the given element instead of a div', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--interactive-button&viewMode=story')
		const content = page.locator('[data-slot="bubble-content"]')
		await expect(content).toHaveJSProperty('tagName', 'BUTTON')
	})

	test('interactive button content is a real button, not a div with an onClick', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--interactive-button&viewMode=story')
		const button = page.getByRole('button', { name: 'Tap to retry sending this message' })
		await expect(button).toBeVisible()
		await expect(button).toHaveAttribute('data-slot', 'bubble-content')
	})

	test('interactive link content is a real anchor with an href', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--interactive-link&viewMode=story')
		const link = page.getByRole('link')
		await expect(link).toHaveJSProperty('tagName', 'A')
		await expect(link).toHaveAttribute('href', 'https://example.com')
	})

	// Focus
	test('interactive bubble content shows a visible focus ring on keyboard focus', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--interactive-button&viewMode=story')
		const button = page.getByRole('button', { name: 'Tap to retry sending this message' })
		const boxShadowBeforeFocus = await button.evaluate((el) => getComputedStyle(el).boxShadow)
		await button.focus()
		await expect(button).toBeFocused()
		const boxShadowOnFocus = await button.evaluate((el) => getComputedStyle(el).boxShadow)
		expect(boxShadowOnFocus).not.toBe(boxShadowBeforeFocus)
		expect(boxShadowOnFocus).not.toBe('none')
	})

	// BubbleReactions
	test('BubbleReactions defaults to side="bottom" align="end"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--with-reactions&viewMode=story')
		const reactions = page.locator('[data-slot="bubble-reactions"]')
		await expect(reactions).toHaveAttribute('data-side', 'bottom')
		await expect(reactions).toHaveAttribute('data-align', 'end')
	})

	test('BubbleReactions is positioned absolutely and overlaps its Bubble boundary', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--with-reactions&viewMode=story')
		const bubble = page.locator('[data-slot="bubble"]')
		const reactions = page.locator('[data-slot="bubble-reactions"]')
		await expect(reactions).toHaveCSS('position', 'absolute')
		const bubbleBox = await bubble.boundingBox()
		const reactionsBox = await reactions.boundingBox()
		if (!bubbleBox || !reactionsBox) throw new Error('expected both bubble and reactions to have a bounding box')
		expect(reactionsBox.y).toBeLessThan(bubbleBox.y + bubbleBox.height)
		expect(reactionsBox.y + reactionsBox.height).toBeGreaterThan(bubbleBox.y + bubbleBox.height)
	})

	test('side="top" positions the reactions chip against the top edge instead of the bottom', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--top-reactions&viewMode=story')
		const bubble = page.locator('[data-slot="bubble"]')
		const reactions = page.locator('[data-slot="bubble-reactions"]')
		await expect(reactions).toHaveAttribute('data-side', 'top')
		const bubbleBox = await bubble.boundingBox()
		const reactionsBox = await reactions.boundingBox()
		if (!bubbleBox || !reactionsBox) throw new Error('expected both bubble and reactions to have a bounding box')
		expect(reactionsBox.y).toBeLessThan(bubbleBox.y)
	})

	test('a non-interactive reaction row exposes role="img" and an accessible name', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--with-reactions&viewMode=story')
		const reactions = page.getByRole('img', { name: '2 paw reactions' })
		await expect(reactions).toBeVisible()
	})

	test('interactive reactions render as real, individually focusable buttons', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--interactive-reactions&viewMode=story')
		await expect(page.getByRole('button', { name: 'React with paw, 2 reactions' })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Add reaction' })).toBeVisible()
	})

	// BubbleGroup
	test('BubbleGroup renders with its own data-slot and stacks bubbles vertically with a tight gap', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--grouped-bubbles&viewMode=story')
		const group = page.locator('[data-slot="bubble-group"]')
		await expect(group).toHaveCount(1)
		const bubbles = group.locator('[data-slot="bubble"]')
		await expect(bubbles).toHaveCount(3)
		const tops = await bubbles.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top))
		const [first, second, third] = tops as [number, number, number]
		expect(second).toBeGreaterThan(first)
		expect(third).toBeGreaterThan(second)
	})

	test('BubbleGroup does not own alignment: each grouped Bubble keeps its own align', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--grouped-bubbles&viewMode=story')
		const bubbles = page.locator('[data-slot="bubble-group"] [data-slot="bubble"]')
		for (let i = 0; i < (await bubbles.count()); i++) {
			await expect(bubbles.nth(i)).toHaveAttribute('data-align', 'start')
		}
	})

	// Nested composition
	test('a Bubble composes BubbleContent and BubbleReactions together as siblings', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--nested-composition&viewMode=story')
		const bubble = page.locator('[data-slot="bubble"]')
		await expect(bubble.locator('[data-slot="bubble-content"]')).toHaveCount(1)
		await expect(bubble.locator('[data-slot="bubble-reactions"]')).toHaveCount(1)
	})

	// className merging
	test('className is merged with default classes on Bubble, not overridden', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--default&viewMode=story')
		await expect(page.locator('[data-slot="bubble"]')).toHaveClass(/relative/)
	})

	// aria-*/data-* passthrough
	test('aria-* and data-* attributes are forwarded to BubbleReactions', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--with-reactions&viewMode=story')
		await expect(page.locator('[data-slot="bubble-reactions"]')).toHaveAttribute('aria-label', '2 paw reactions')
	})

	// Refs
	test('ref forwards to the real underlying div element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="bubble"]')).toHaveAttribute('data-ref-forwarded', 'true')
		await expect(page.locator('[data-slot="bubble"]')).toHaveJSProperty('tagName', 'DIV')
	})

	// RTL
	test('rtl: the bubble still renders and aligns correctly under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-bubble--rtl&viewMode=story')
		const bubble = page.locator('[data-slot="bubble"]')
		await expect(bubble).toBeVisible()
		await expect(bubble).toHaveAttribute('data-align', 'start')
	})
})
