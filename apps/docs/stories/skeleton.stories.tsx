import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef } from 'react'

import { Skeleton } from '@pawks/components/skeleton'

// Dimension classes below use `style`, not `className='h-4 w-48'` etc. —
// this package ships a precompiled stylesheet (only `packages/components/src`
// is scanned by its own Tailwind build), so arbitrary height/width classes
// written only in this docs app never compile here. A real consuming app
// with its own Tailwind build has no such gap; `<Skeleton className='h-4
// w-48' />` (as shown throughout the ticket this component was built from)
// is the actual, intended API — these stories just can't demo it literally
// in-repo without either bloating the shipped stylesheet with an
// open-ended, ever-growing list of dimension utilities (unlike the
// `resize-*` `@source inline()` case, which is genuinely small and fixed),
// or accepting that risk for every future component with variable sizing.
const px = (n: number) => `${n * 0.25}rem`

const meta: Meta<typeof Skeleton> = {
	title: 'Atoms/Skeleton',
	component: Skeleton,
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
	render: () => <Skeleton id='profile-name-skeleton' data-testid='skeleton-testid' style={{ height: px(4), width: px(48) }} />,
}

export const Text: Story = {
	render: () => (
		<div style={{ width: '16rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
			<Skeleton style={{ height: px(4), width: px(48) }} />
		</div>
	),
}

export const MultipleLines: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
			<Skeleton style={{ height: px(4), width: px(48) }} />
			<Skeleton style={{ height: px(4), width: px(32) }} />
		</div>
	),
}

// `size-10` and `rounded-full` ARE real Tailwind classes here (both already
// compile — reused elsewhere in the library, e.g. Avatar/Switch), unlike the
// arbitrary height/width values above.
export const Avatar: Story = {
	render: () => <Skeleton className='size-10 rounded-full' />,
}

export const Card: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
			<Skeleton className='size-10 rounded-full' />
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
				<Skeleton style={{ height: px(4), width: px(32) }} />
				<Skeleton style={{ height: px(3), width: px(48) }} />
			</div>
		</div>
	),
}

export const CustomShape: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<Skeleton style={{ height: px(8), width: px(64) }} />
			<Skeleton className='w-full' style={{ height: px(24) }} />
			<Skeleton className='w-full' style={{ height: px(4) }} />
			<Skeleton style={{ height: px(4), width: '75%' }} />
		</div>
	),
}

export const CustomSize: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
			<Skeleton className='size-6 rounded-full' />
			<Skeleton className='size-10 rounded-full' />
			<Skeleton className='size-16 rounded-full' />
		</div>
	),
}

export const CustomStyling: Story = {
	render: () => <Skeleton className='w-full rounded-lg' style={{ height: px(32) }} />,
}

// Purely presentational — no default ARIA; consumers wire `aria-hidden`
// themselves and put loading semantics (`aria-busy`) on the surrounding region.
export const AccessibilityAriaHidden: Story = {
	render: () => (
		<div aria-busy='true'>
			<Skeleton aria-hidden='true' style={{ height: px(4), width: px(48) }} />
		</div>
	),
}

// The ref, not a prop, marks the element — proves it forwards to the real DOM node.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const ref = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (ref.current) ref.current.dataset.refForwarded = 'true'
			}, [])
			return <Skeleton ref={ref} style={{ height: px(4), width: px(48) }} />
		}
		return <RefForwardingDemo />
	},
}
