import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import type { DateRange } from 'react-day-picker'

import { useState } from 'react'

import { es } from 'date-fns/locale'

import { Button } from '@pawks/components/button'
import { Calendar } from '@pawks/components/calendar'
import { Field, FieldDescription, FieldError, FieldLabel } from '@pawks/components/field'
import { Popover, PopoverContent, PopoverTrigger } from '@pawks/components/popover'

const meta: Meta<typeof Calendar> = {
	title: 'Atoms/Calendar',
	component: Calendar,
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
	render: () => <Calendar mode='single' />,
}

export const SelectedDate: Story = {
	render: () => <Calendar mode='single' selected={new Date(2026, 2, 15)} defaultMonth={new Date(2026, 2, 1)} />,
}

export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [date, setDate] = useState<Date | undefined>(new Date())
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
					<Calendar mode='single' selected={date} onSelect={setDate} />
					<span style={{ fontSize: '12px', color: '#888' }}>selected: {date?.toDateString() ?? '(none)'}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const RangeCalendar: Story = {
	render: () => {
		function RangeDemo() {
			const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 2, 10), to: new Date(2026, 2, 18) })
			return <Calendar mode='range' selected={range} onSelect={setRange} defaultMonth={new Date(2026, 2, 1)} />
		}
		return <RangeDemo />
	},
}

export const MultipleSelection: Story = {
	render: () => {
		function MultipleDemo() {
			const [dates, setDates] = useState<Date[] | undefined>([new Date(2026, 2, 3), new Date(2026, 2, 10), new Date(2026, 2, 17)])
			return <Calendar mode='multiple' selected={dates} onSelect={setDates} defaultMonth={new Date(2026, 2, 1)} />
		}
		return <MultipleDemo />
	},
}

export const DisabledDates: Story = {
	render: () => <Calendar mode='single' defaultMonth={new Date(2026, 2, 1)} disabled={{ dayOfWeek: [0, 6] }} />,
}

export const OutsideDays: Story = {
	render: () => <Calendar mode='single' showOutsideDays defaultMonth={new Date(2026, 2, 1)} />,
}

export const MonthNavigation: Story = {
	render: () => <Calendar mode='single' startMonth={new Date(2026, 0, 1)} endMonth={new Date(2026, 11, 1)} defaultMonth={new Date(2026, 2, 1)} />,
}

export const MonthYearDropdowns: Story = {
	render: () => (
		<Calendar
			mode='single'
			captionLayout='dropdown'
			startMonth={new Date(2020, 0, 1)}
			endMonth={new Date(2030, 11, 1)}
			defaultMonth={new Date(2026, 2, 1)}
		/>
	),
}

export const MultipleMonths: Story = {
	render: () => <Calendar mode='range' numberOfMonths={2} defaultMonth={new Date(2026, 2, 1)} />,
}

export const MinMaxDates: Story = {
	render: () => (
		<Calendar mode='single' defaultMonth={new Date(2026, 2, 1)} disabled={{ before: new Date(2026, 2, 10), after: new Date(2026, 2, 20) }} />
	),
}

export const Locale: Story = {
	render: () => <Calendar mode='single' locale={es} defaultMonth={new Date(2026, 2, 1)} />,
}

export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<Calendar mode='range' selected={{ from: new Date(2026, 2, 10), to: new Date(2026, 2, 18) }} defaultMonth={new Date(2026, 2, 1)} />
		</div>
	),
}

// Calendar owns no preset data model — the app composes buttons that just
// call `onSelect` with a computed date.
export const PresetsComposition: Story = {
	render: () => {
		function PresetsDemo() {
			const [date, setDate] = useState<Date | undefined>(new Date())
			const addDays = (days: number) => {
				const next = new Date()
				next.setDate(next.getDate() + days)
				setDate(next)
			}
			return (
				<div style={{ display: 'flex', gap: '1rem' }}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						<Button size='sm' appearance='outline' onClick={() => addDays(0)}>
							Today
						</Button>
						<Button size='sm' appearance='outline' onClick={() => addDays(1)}>
							Tomorrow
						</Button>
						<Button size='sm' appearance='outline' onClick={() => addDays(7)}>
							In a week
						</Button>
					</div>
					<Calendar mode='single' selected={date} onSelect={setDate} />
				</div>
			)
		}
		return <PresetsDemo />
	},
}

// Custom day styling composes via `classNames`, the same mechanism the
// component's own default styling uses — no separate `dayClassName` prop.
export const CustomDayStyling: Story = {
	render: () => (
		<Calendar
			mode='single'
			defaultMonth={new Date(2026, 2, 1)}
			classNames={{ day: 'group/day relative aspect-square h-full w-full p-0 text-center select-none [&_button]:font-mono' }}
		/>
	),
}

// `components` passes straight through to DayPicker — here the weekday
// header is swapped for a custom element.
export const CustomDayPickerComponents: Story = {
	render: () => (
		<Calendar
			mode='single'
			defaultMonth={new Date(2026, 2, 1)}
			components={{ Weekday: (props: ComponentProps<'th'>) => <th {...props} style={{ color: 'var(--primary)' }} /> }}
		/>
	),
}

// `timeZone` is forwarded straight to DayPicker/date-fns-tz — Calendar
// never normalizes a selected date to UTC itself.
export const Timezone: Story = {
	render: () => <Calendar mode='single' selected={new Date(2026, 2, 15)} defaultMonth={new Date(2026, 2, 1)} timeZone='Pacific/Kiritimati' />,
}

export const InsideField: Story = {
	render: () => (
		<Field>
			<FieldLabel>Start date</FieldLabel>
			<Calendar mode='single' />
			<FieldDescription>Select the beginning of the period.</FieldDescription>
			<FieldError />
		</Field>
	),
}

// A real DatePicker, composed rather than built into the library: Popover +
// Button + Calendar. `w-auto p-0` on PopoverContent avoids double padding
// (Popover's own `p-4` stacked on Calendar's `p-3`) and lets Calendar size itself.
export const InsidePopover: Story = {
	render: () => {
		function DatePickerDemo() {
			const [date, setDate] = useState<Date | undefined>(new Date())
			return (
				<Popover>
					<PopoverTrigger asChild>
						<Button appearance='outline'>{date ? date.toDateString() : 'Pick a date'}</Button>
					</PopoverTrigger>
					<PopoverContent align='start' className='w-auto p-0'>
						<Calendar mode='single' selected={date} onSelect={setDate} />
					</PopoverContent>
				</Popover>
			)
		}
		return <DatePickerDemo />
	},
}

export const Responsive: Story = {
	render: () => (
		<div style={{ maxWidth: '20rem' }}>
			<Calendar mode='range' numberOfMonths={2} defaultMonth={new Date(2026, 2, 1)} className='md:flex-col' />
		</div>
	),
}
