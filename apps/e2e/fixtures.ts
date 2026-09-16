import { test as base, expect, type Page } from '@playwright/test'

// Storybook's static build always ships its "preparing" skeleton markup
// in the initial HTML (hidden via `display:none` once ready, never
// removed) — so `networkidle` alone doesn't guarantee a story has
// actually mounted. Screenshotting too early captures that skeleton
// instead (a visibly wrong, collapsed-height page), which reproduces
// intermittently and against effectively random stories as the suite's
// parallelism grows. `#storybook-root` only gains a child once the real
// story has rendered — that's the reliable readiness signal to wait for.
async function waitForStoryReady(page: Page) {
	await page.waitForFunction(
		() => {
			const root = document.getElementById('storybook-root')
			return !!root && root.children.length > 0
		},
		undefined,
		{ timeout: 10000 },
	)
}

export const test = base.extend<object>({
	page: async ({ page }, runTest) => {
		const originalGoto = page.goto.bind(page)
		page.goto = async (url, options) => {
			const response = await originalGoto(url, options)
			await waitForStoryReady(page)
			return response
		}
		await runTest(page)
	},
})

export { expect }
