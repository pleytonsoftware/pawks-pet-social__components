import { test, expect } from '../fixtures.js'

test.describe('Skeleton stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('skeleton-default.png')
	})

	test('card matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--card&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('skeleton-card.png')
	})

	test('custom shape matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--custom-shape&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('skeleton-custom-shape.png')
	})

	test('custom size matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--custom-size&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('skeleton-custom-size.png')
	})

	// Rendering
	test('renders a real div with data-slot="skeleton"', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		const skeleton = page.locator('[data-slot="skeleton"]')
		await expect(skeleton).toHaveCount(1)
		await expect(skeleton).toHaveJSProperty('tagName', 'DIV')
	})

	test('default styling: pulse animation, muted background, rounded-md radius', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		const styles = await page.locator('[data-slot="skeleton"]').evaluate((el) => {
			const cs = getComputedStyle(el)
			return { animationName: cs.animationName, borderRadius: cs.borderRadius }
		})
		expect(styles.animationName).toBe('pulse')
		expect(styles.borderRadius).toBe('8px')
	})

	// Class merging
	test('default classes are applied', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		await expect(page.locator('[data-slot="skeleton"]')).toHaveClass(/animate-pulse/)
		await expect(page.locator('[data-slot="skeleton"]')).toHaveClass(/bg-muted/)
	})

	test('custom className is preserved alongside the default classes', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--avatar&viewMode=story')
		const skeleton = page.locator('[data-slot="skeleton"]')
		await expect(skeleton).toHaveClass(/animate-pulse/)
		await expect(skeleton).toHaveClass(/rounded-full/)
	})

	test('consumers can override dimensions', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--custom-size&viewMode=story')
		const boxes = await page.locator('[data-slot="skeleton"]').evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width))
		expect(boxes).toHaveLength(3)
		const [small, medium, large] = boxes
		expect(small).toBeLessThan(medium!)
		expect(medium).toBeLessThan(large!)
	})

	test('consumers can override border radius', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--avatar&viewMode=story')
		const skeleton = page.locator('[data-slot="skeleton"]')
		await expect(skeleton).toHaveClass(/rounded-full/)
		await expect(skeleton).not.toHaveClass(/rounded-md/)
		// Tailwind v4's rounded-full uses an effectively-infinite radius value
		// (clamped visually to a circle at layout time) rather than a plain
		// px figure, so assert the class swap rather than a literal computed value.
	})

	// Native attributes
	test('id and custom data-* props are forwarded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		const skeleton = page.locator('[data-slot="skeleton"]')
		await expect(skeleton).toHaveAttribute('id', 'profile-name-skeleton')
		await expect(skeleton).toHaveAttribute('data-testid', 'skeleton-testid')
	})

	test('style is forwarded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		const inlineHeight = await page.locator('[data-slot="skeleton"]').evaluate((el) => el.style.height)
		expect(inlineHeight.length).toBeGreaterThan(0)
	})

	test('aria-* is forwarded', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--accessibility-aria-hidden&viewMode=story')
		await expect(page.locator('[data-slot="skeleton"]')).toHaveAttribute('aria-hidden', 'true')
	})

	// Ref forwarding
	test('ref resolves to the underlying div', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--ref-forwarding&viewMode=story')
		await expect(page.locator('[data-slot="skeleton"]')).toHaveAttribute('data-ref-forwarded', 'true')
	})

	// Composition
	test('composition: multiple lines render as independent siblings', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--multiple-lines&viewMode=story')
		await expect(page.locator('[data-slot="skeleton"]')).toHaveCount(2)
	})

	test('composition: avatar + text card renders a circle and two lines', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--card&viewMode=story')
		const skeletons = page.locator('[data-slot="skeleton"]')
		await expect(skeletons).toHaveCount(3)
		await expect(skeletons.first()).toHaveClass(/rounded-full/)
	})

	// Accessibility
	test('aria-hidden passes through untransformed, and does not block aria-busy on the surrounding region', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--accessibility-aria-hidden&viewMode=story')
		await expect(page.locator('[data-slot="skeleton"]')).toHaveAttribute('aria-hidden', 'true')
		await expect(page.locator('[aria-busy="true"]')).toHaveCount(1)
	})

	test('no loading prop: presence alone represents the loading state', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-skeleton--default&viewMode=story')
		await expect(page.locator('[data-slot="skeleton"]')).toBeVisible()
	})
})
