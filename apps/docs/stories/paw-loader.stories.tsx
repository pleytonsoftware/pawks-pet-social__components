import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@pawks/components/button'
import { PawLoader } from '@pawks/components/paw-loader'
import { Spinner } from '@pawks/components/spinner'

const meta: Meta<typeof PawLoader> = {
	title: 'Atoms/PawLoader',
	component: PawLoader,
}

export default meta
type Story = StoryObj<typeof PawLoader>

export const Default: Story = {}

// Defaults to `size-6` rather than Spinner's `size-4` — the paw needs the
// extra room to stay legible once the toes and pad are all stroked at 1.75px.
export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<PawLoader className='size-4' />
			<PawLoader className='size-6' />
			<PawLoader className='size-8' />
		</div>
	),
}

// No hardcoded color — the paw inherits `currentColor` from its context.
export const InheritsTextColor: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
			<PawLoader />
			<div style={{ color: '#2a7e49' }}>
				<PawLoader />
			</div>
			<div style={{ color: '#ce372c' }}>
				<PawLoader />
			</div>
			<div className='text-muted-foreground'>
				<PawLoader />
			</div>
		</div>
	),
}

// Announced to assistive tech by default (role="status", aria-label="Loading").
export const Announced: Story = {}

export const CustomLabel: Story = {
	args: { 'aria-label': 'Fetching your feed' },
}

// Silent when an adjacent element already conveys the loading state.
export const Decorative: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<PawLoader aria-hidden='true' className='size-4' />
			<span>Fetching your feed…</span>
		</div>
	),
}

// Presence represents the loading state — no `loading` prop on PawLoader or Button.
export const ButtonLoadingState: Story = {
	render: () => {
		function PawLoaderButtonDemo() {
			const [isPosting, setIsPosting] = useState(false)
			return (
				<Button
					disabled={isPosting}
					onClick={() => {
						setIsPosting(true)
						setTimeout(() => setIsPosting(false), 1500)
					}}
				>
					{isPosting && <PawLoader aria-hidden='true' className='size-4' />}
					{isPosting ? 'Posting…' : 'Post'}
				</Button>
			)
		}
		return <PawLoaderButtonDemo />
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
			return <PawLoader ref={ref} />
		}
		return <RefForwardingDemo />
	},
}

export const PageLoadingState: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '8rem' }}>
			<PawLoader className='size-8' />
		</div>
	),
}

// Spinner stays the neutral default; PawLoader is for the pet-facing moments
// where the wait itself is worth a bit of personality (DESIGN §3.3).
export const AlongsideSpinner: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<Spinner aria-hidden='true' />
				<span>Saving settings…</span>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<PawLoader aria-hidden='true' className='size-4' />
				<span>Fetching your feed…</span>
			</div>
		</div>
	),
}
