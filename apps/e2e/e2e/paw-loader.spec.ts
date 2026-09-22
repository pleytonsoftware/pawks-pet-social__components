import type { Page } from '../fixtures.js'

import { test, expect } from '../fixtures.js'

const SHAPES = '[data-slot="paw-loader"] :is(circle, path)'

/**
 * Playwright's `animations: 'disabled'` screenshot default only freezes CSS
 * animations and transitions — motion drives this component from rAF and keeps
 * writing inline styles regardless, which would make every baseline flaky.
 * Emulating reduced motion instead renders the static paw the component
 * already falls back to, so the baselines are deterministic by construction.
 * `emulateMedia` has to precede `goto`: `useReducedMotion()` reads matchMedia
 * at mount.
 */
const gotoStatic = async (page: Page, storyId: string) => {
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await page.goto(`/iframe.html?id=atoms-pawloader--${storyId}&viewMode=story`)
}

/** Inline styles are motion's output surface — the animated state lives here, not in classes. */
const readShapeStyles = (page: Page) =>
	page.locator(SHAPES).evaluateAll((els) => els.map((el) => `${(el as SVGElement).style.opacity}|${(el as SVGElement).style.transform}`))

test.describe('PawLoader stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await gotoStatic(page, 'default')
		await expect(page.locator('body')).toHaveScreenshot('paw-loader-default.png')
	})

	test('sizes matches screenshot', async ({ page }) => {
		await gotoStatic(page, 'sizes')
		await expect(page.locator('body')).toHaveScreenshot('paw-loader-sizes.png')
	})

	test('inherits text color matches screenshot', async ({ page }) => {
		await gotoStatic(page, 'inherits-text-color')
		await expect(page.locator('body')).toHaveScreenshot('paw-loader-inherits-text-color.png')
	})

	test('page loading state matches screenshot', async ({ page }) => {
		await gotoStatic(page, 'page-loading-state')
		await expect(page.locator('body')).toHaveScreenshot('paw-loader-page-loading-state.png')
	})

	// Rendering
	test('renders as a real svg with data-slot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--default&viewMode=story')
		const loader = page.locator('[data-slot="paw-loader"]')
		await expect(loader).toHaveCount(1)
		await expect(loader).toHaveJSProperty('tagName', 'svg')
	})

	test('SVG structure: three toe circles plus one pad path, stroked with currentColor', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--default&viewMode=story')
		const loader = page.locator('[data-slot="paw-loader"]')
		await expect(loader.locator('circle')).toHaveCount(3)
		await expect(loader.locator('path')).toHaveCount(1)
		await expect(loader).toHaveAttribute('stroke', 'currentColor')
	})

	// Animation
	test('the loop is JS-driven: a toe opacity takes more than one value over a cycle', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--default&viewMode=story')
		const toe = page.locator('[data-slot="paw-loader"] circle').first()
		const seen = new Set<string>()
		for (let sample = 0; sample < 24; sample++) {
			seen.add(await toe.evaluate((el) => (el as SVGElement).style.opacity))
			await page.waitForTimeout(60)
		}
		expect(seen.size).toBeGreaterThan(1)
	})

	test('toes are phase-offset rather than popping in unison', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--default&viewMode=story')
		const toes = page.locator('[data-slot="paw-loader"] circle')
		// They do coincide during the rest beat, so sample across a full cycle
		// and assert they diverge at some point rather than at one fixed instant.
		let sawDivergence = false
		for (let sample = 0; sample < 30 && !sawDivergence; sample++) {
			const opacities = await toes.evaluateAll((els) => els.map((el) => (el as SVGElement).style.opacity))
			sawDivergence = new Set(opacities).size > 1
			await page.waitForTimeout(50)
		}
		expect(sawDivergence).toBe(true)
	})

	test('each shape scales about its own centre, not the viewBox origin', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--default&viewMode=story')
		const boxes = await page.locator(SHAPES).evaluateAll((els) => els.map((el) => el.getBoundingClientRect()))
		const loader = await page.locator('[data-slot="paw-loader"]').evaluate((el) => el.getBoundingClientRect())
		// A transform-origin bug parks shapes at the top-left corner of the
		// viewBox, so assert every shape still sits inside the loader's own box.
		for (const box of boxes) {
			expect(box.left).toBeGreaterThanOrEqual(loader.left - 1)
			expect(box.right).toBeLessThanOrEqual(loader.right + 1)
			expect(box.top).toBeGreaterThanOrEqual(loader.top - 1)
			expect(box.bottom).toBeLessThanOrEqual(loader.bottom + 1)
		}
	})

	test('prefers-reduced-motion: reduce renders a static, fully opaque paw', async ({ page }) => {
		await gotoStatic(page, 'default')
		await expect(page.locator(SHAPES)).toHaveCount(4)
		await page.waitForTimeout(300)
		const settled = await readShapeStyles(page)
		expect(settled.every((shape) => shape.startsWith('1|'))).toBe(true)
		await page.waitForTimeout(600)
		expect(await readShapeStyles(page)).toEqual(settled)
	})

	// Color
	test('currentColor: the paw visually inherits its container text color', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--inherits-text-color&viewMode=story')
		const loaders = page.locator('[data-slot="paw-loader"]')
		const colors = await loaders.evaluateAll((els) => els.map((el) => getComputedStyle(el).color))
		// 4 loaders, each in a differently-colored context — all distinct.
		expect(new Set(colors).size).toBe(4)
	})

	// Accessibility
	test('defaults to an announced status with a default label', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--default&viewMode=story')
		const loader = page.locator('[data-slot="paw-loader"]')
		await expect(loader).toHaveAttribute('role', 'status')
		await expect(loader).toHaveAttribute('aria-label', 'Loading')
	})

	test('aria-label is overridable', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--custom-label&viewMode=story')
		await expect(page.locator('[data-slot="paw-loader"]')).toHaveAttribute('aria-label', 'Fetching your feed')
	})

	test('decorative usage: aria-hidden overrides the default announced role', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--decorative&viewMode=story')
		await expect(page.locator('[data-slot="paw-loader"]')).toHaveAttribute('aria-hidden', 'true')
	})

	// Class merging
	test('custom className replaces the default size rather than stacking with it', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--page-loading-state&viewMode=story')
		const loader = page.locator('[data-slot="paw-loader"]')
		await expect(loader).toHaveClass(/size-8/)
		await expect(loader).not.toHaveClass(/size-6/)
	})

	// Ref forwarding
	test('ref forwards to the real underlying svg element', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="paw-loader"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	// Composition
	test('no loading prop: presence alone represents the loading state (composition, not an API)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-pawloader--button-loading-state&viewMode=story')
		await expect(page.getByRole('button')).toHaveText('Post')
		await expect(page.locator('[data-slot="paw-loader"]')).toHaveCount(0)
		await page.getByRole('button').click()
		await expect(page.locator('[data-slot="paw-loader"]')).toHaveCount(1)
		await expect(page.getByRole('button')).toBeDisabled()
	})
})
