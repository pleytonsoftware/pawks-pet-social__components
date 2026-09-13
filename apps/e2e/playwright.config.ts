import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	reporter: [['html', { outputFolder: 'playwright-report' }]],
	use: {
		baseURL: 'http://127.0.0.1:6006',
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		command: 'pnpm --filter docs exec http-server storybook-static -p 6006 -s',
		url: 'http://127.0.0.1:6006',
		reuseExistingServer: !process.env.CI,
		cwd: '../..',
	},
})
