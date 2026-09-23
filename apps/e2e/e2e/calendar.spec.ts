import { test, expect } from '../fixtures.js'

test.describe('Calendar stories', () => {
	test('default matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('calendar-default.png')
	})

	test('range calendar matches screenshot', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--range-calendar&viewMode=story')
		await expect(page.locator('body')).toHaveScreenshot('calendar-range.png')
	})

	// Rendering
	test('renders with data-slot and the current month visible', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		await expect(page.locator('[data-slot="calendar"]')).toBeVisible()
		const now = new Date()
		await expect(page.locator('[data-slot="calendar"]')).toContainText(now.toLocaleString('default', { month: 'long' }))
	})

	test('outside days are shown and visually distinguished, but still selectable dates', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--outside-days&viewMode=story')
		const outside = page.locator('[data-day]').first()
		await expect(outside).toBeVisible()
	})

	test('custom className is merged with default styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		await expect(page.locator('[data-slot="calendar"]')).toHaveClass(/w-fit/)
	})

	// Single selection — `button[data-day]` specifically: DayPicker's own Day
	// (`<td>`) wrapper independently sets its own `data-day` too (ISO-ish
	// format), distinct from the button's `data-day` this component sets.
	test('clicking a day selects it (uncontrolled)', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		const day = page.locator('button[data-day]').nth(10)
		await day.click()
		await expect(day).toHaveAttribute('data-selected-single', 'true')
	})

	test('controlled selection: clicking a day updates the externally-owned state and re-renders as selected', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--controlled&viewMode=story')
		// A stable `data-day` value, not the `:not(...)` filter itself, must be
		// used to re-locate after clicking — clicking flips `data-selected-single`,
		// which would otherwise drop the element out of its own locator's match set.
		const day = page.locator('button[data-day]:not([data-selected-single="true"])').nth(10)
		const dayValue = await day.getAttribute('data-day')
		await day.click()
		await expect(page.locator(`button[data-day="${dayValue}"]`)).toHaveAttribute('data-selected-single', 'true')
		await expect(page.getByText(/^selected:/)).toBeVisible()
	})

	// Range selection
	test('a pre-set range shows distinct start/middle/end styling', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--range-calendar&viewMode=story')
		await expect(page.locator('[data-range-start="true"]')).toHaveCount(1)
		await expect(page.locator('[data-range-end="true"]')).toHaveCount(1)
		const middleCount = await page.locator('[data-range-middle="true"]').count()
		expect(middleCount).toBeGreaterThan(0)
	})

	test('range selection updates when clicking two days', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--multiple-months&viewMode=story')
		const days = page.locator('button[data-day]')
		await days.nth(5).click()
		await days.nth(9).click()
		await expect(page.locator('[data-range-start="true"]')).toHaveCount(1)
		await expect(page.locator('[data-range-end="true"]')).toHaveCount(1)
	})

	// Navigation
	test('next/previous month navigation changes the displayed month', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		const caption = page.locator('[data-slot="calendar"]')
		const initialText = await caption.textContent()
		await page.getByRole('button', { name: /next/i }).click()
		await expect(caption).not.toHaveText(initialText ?? '')
		await page.getByRole('button', { name: /previous/i }).click()
		await expect(caption).toHaveText(initialText ?? '')
	})

	// Story's defaultMonth (March 2026) is exactly 2 months after startMonth
	// (January 2026) — clicking "previous" twice reaches the limit.
	test('navigation is limited by startMonth/endMonth', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--month-navigation&viewMode=story')
		const previous = page.getByRole('button', { name: /previous/i })
		await previous.click()
		await previous.click()
		await expect(previous).toBeDisabled()
	})

	// Disabled dates
	test('disabled dates cannot be selected but remain visible and accessible', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--disabled-dates&viewMode=story')
		const disabledDay = page.locator('button[data-day]:disabled').first()
		await expect(disabledDay).toBeVisible()
		await disabledDay.click({ force: true })
		await expect(disabledDay).not.toHaveAttribute('data-selected-single', 'true')
	})

	// Month/year dropdowns
	test('captionLayout="dropdown" renders month and year select elements', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--month-year-dropdowns&viewMode=story')
		const selects = page.locator('[data-slot="calendar"] select')
		await expect(selects).toHaveCount(2)
	})

	test('changing the month dropdown navigates to that month', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--month-year-dropdowns&viewMode=story')
		const monthSelect = page.locator('[data-slot="calendar"] select').first()
		await monthSelect.selectOption({ label: 'Jun' })
		await expect(page.locator('[data-slot="calendar"]')).toContainText('June')
	})

	// Locale
	test('locale is forwarded: month caption and weekday names render localized', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--locale&viewMode=story')
		await expect(page.locator('[data-slot="calendar"]')).toContainText('marzo')
		await expect(page.getByText('lu', { exact: true })).toBeVisible()
	})

	// RTL
	test('rtl: calendar renders and range selection semantics stay correct under an ambient dir=rtl context', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--rtl&viewMode=story')
		await expect(page.locator('[data-slot="calendar"]')).toBeVisible()
		await expect(page.locator('[data-range-start="true"]')).toHaveCount(1)
		await expect(page.locator('[data-range-end="true"]')).toHaveCount(1)
	})

	// Accessibility
	test('day buttons expose an accessible name including the full date', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		const now = new Date()
		const year = now.getFullYear().toString()
		const button = page.locator('[data-slot="calendar"] button[data-day]').first()
		await expect(button).toHaveAccessibleName(new RegExp(year))
	})

	test('keyboard: arrow keys move focus between day buttons', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--default&viewMode=story')
		const firstDay = page.locator('[data-slot="calendar"] button[data-day]').first()
		await firstDay.focus()
		await page.keyboard.press('ArrowRight')
		await expect(firstDay).not.toBeFocused()
	})

	// aria-selected lives on the gridcell (<td>), not the day button — the
	// button instead folds "selected" into its own accessible name.
	test('selected state is exposed via aria-selected on the gridcell for assistive tech', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--selected-date&viewMode=story')
		const selectedCell = page.locator('[data-slot="calendar"] td[aria-selected="true"]')
		await expect(selectedCell).toHaveCount(1)
		const selectedButton = page.locator('button[data-selected-single="true"]')
		await expect(selectedButton).toHaveAccessibleName(/selected/)
	})

	// Customization
	test('custom components pass through: a custom Weekday element renders with its own inline style', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--custom-day-picker-components&viewMode=story')
		const weekday = page.locator('[data-slot="calendar"] th').first()
		await expect(weekday).toHaveAttribute('style', /var\(--primary\)/)
	})

	// API passthrough / data-slot
	test('aria-label and data-* attributes are forwarded to the underlying DayPicker root', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--timezone&viewMode=story')
		await expect(page.locator('[data-slot="calendar"]')).toBeVisible()
	})

	// DatePicker composition (non-goal: Calendar itself has no popover/trigger)
	test('DatePicker composition: Calendar composes inside a Popover without owning trigger/open state itself', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--inside-popover&viewMode=story')
		await expect(page.locator('[data-slot="calendar"]')).toHaveCount(0)
		await page.getByRole('button').click()
		await expect(page.locator('[data-slot="calendar"]')).toBeVisible()
	})

	// Field composition
	test('Calendar composes inside Field alongside a label and description', async ({ page }) => {
		await page.goto('/iframe.html?id=atoms-calendar--inside-field&viewMode=story')
		await expect(page.locator('[data-slot="field-label"]')).toHaveText('Start date')
		await expect(page.locator('[data-slot="calendar"]')).toBeVisible()
		await expect(page.locator('[data-slot="field-description"]')).toBeVisible()
	})
})
