import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@pawks/components/button'
import { Spinner } from '@pawks/components/spinner'

const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<Spinner className='size-3' />
			<Spinner className='size-4' />
			<Spinner className='size-6' />
			<Spinner className='size-8' />
		</div>
	),
}

// No hardcoded color — the spinner inherits `currentColor` from its context.
export const InheritsTextColor: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
			<Spinner className='size-6' />
			<div style={{ color: '#2a7e49' }}>
				<Spinner className='size-6' />
			</div>
			<div style={{ color: '#ce372c' }}>
				<Spinner className='size-6' />
			</div>
			<div className='text-muted-foreground'>
				<Spinner className='size-6' />
			</div>
		</div>
	),
}

// Announced to assistive tech by default (role="status", aria-label="Loading").
export const Announced: Story = {
	render: () => <Spinner className='size-6' />,
}

export const CustomLabel: Story = {
	args: { 'aria-label': 'Fetching results' },
}

// Silent when an adjacent element already conveys the loading state.
export const Decorative: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Spinner aria-hidden='true' />
			<span>Saving…</span>
		</div>
	),
}

// Presence represents the loading state — no `loading` prop on Spinner or Button.
export const ButtonLoadingState: Story = {
	render: () => {
		function ButtonLoadingDemo() {
			const [isSaving, setIsSaving] = useState(false)
			return (
				<Button
					disabled={isSaving}
					onClick={() => {
						setIsSaving(true)
						setTimeout(() => setIsSaving(false), 1500)
					}}
				>
					{isSaving && <Spinner aria-hidden='true' />}
					{isSaving ? 'Saving…' : 'Save'}
				</Button>
			)
		}
		return <ButtonLoadingDemo />
	},
}

// The ref, not a prop, marks the element — proves it forwards to the real SVG node.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const ref = useRef<SVGSVGElement>(null)
			useEffect(() => {
				if (ref.current) ref.current.dataset.refForwarded = 'true'
			}, [])
			return <Spinner ref={ref} />
		}
		return <RefForwardingDemo />
	},
}

export const PageLoadingState: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem' }}>
			<Spinner className='size-6' />
		</div>
	),
}
