import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button } from '@pawks/components/button'
import { Input } from '@pawks/components/input'
import { Label } from '@pawks/components/label'
import { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@pawks/components/popover'

const meta: Meta<typeof Popover> = {
	title: 'Atoms/Popover',
	component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button appearance='outline'>Open popover</Button>
			</PopoverTrigger>
			<PopoverContent>Place content for the popover here.</PopoverContent>
		</Popover>
	),
}

export const WithForm: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button appearance='outline'>Edit dimensions</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
				</PopoverHeader>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', alignItems: 'center', gap: '0.5rem' }}>
						<Label htmlFor='width'>Width</Label>
						<Input id='width' defaultValue='100%' />
					</div>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', alignItems: 'center', gap: '0.5rem' }}>
						<Label htmlFor='height'>Height</Label>
						<Input id='height' defaultValue='25px' />
					</div>
				</div>
			</PopoverContent>
		</Popover>
	),
}

export const DifferentSides: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Popover key={side}>
					<PopoverTrigger asChild>
						<Button appearance='outline'>{side}</Button>
					</PopoverTrigger>
					<PopoverContent side={side}>Side: {side}</PopoverContent>
				</Popover>
			))}
		</div>
	),
}

export const DifferentAlignments: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			{(['start', 'center', 'end'] as const).map((align) => (
				<Popover key={align}>
					<PopoverTrigger asChild>
						<Button appearance='outline'>{align}</Button>
					</PopoverTrigger>
					<PopoverContent align={align}>Align: {align}</PopoverContent>
				</Popover>
			))}
		</div>
	),
}

export const CustomOffset: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button appearance='outline'>Open</Button>
			</PopoverTrigger>
			<PopoverContent sideOffset={16}>16px offset</PopoverContent>
		</Popover>
	),
}

export const ControlledOpen: Story = {
	render: () => {
		function ControlledDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button appearance='outline'>{open ? 'Close' : 'Open'} popover</Button>
						</PopoverTrigger>
						<PopoverContent>Driven by external state, not internal.</PopoverContent>
					</Popover>
					<span style={{ fontSize: '12px', color: '#888' }}>open: {String(open)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

// Anchors positioning to a different element than the trigger — driven by
// controlled `open` state with a plain external button, not `PopoverTrigger`:
// installed Radix (1.1.23) has a real timing bug where `PopoverAnchor` and
// `PopoverTrigger` mounting as siblings both race to register as the
// anchor, leaving it stuck at a 0×0 rect (verified against vanilla Radix,
// not this library's own code). Controlled `open` avoids the race entirely.
export const WithAnchor: Story = {
	render: () => {
		function WithAnchorDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverAnchor asChild>
							<Input placeholder='Anchored here' style={{ width: '12rem' }} />
						</PopoverAnchor>
						<PopoverContent align='start'>Positioned against the input, not the toggle button.</PopoverContent>
					</Popover>
					<Button appearance='outline' onClick={() => setOpen((isOpen) => !isOpen)}>
						Toggle
					</Button>
				</div>
			)
		}
		return <WithAnchorDemo />
	},
}

export const CustomContent: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button appearance='outline'>Release notes</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<p style={{ margin: 0, fontWeight: 500 }}>v2.5.0</p>
					<ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
						<li>New Popover and Calendar primitives</li>
						<li>Fixed Calendar outside-day muting</li>
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	),
}

// Radix's Popper positioning is RTL-aware automatically — no dir-specific
// prop needed on Popover itself, just the ambient `dir` context.
export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<Popover>
				<PopoverTrigger asChild>
					<Button appearance='outline'>افتح</Button>
				</PopoverTrigger>
				<PopoverContent>محتوى النافذة المنبثقة في وضع RTL.</PopoverContent>
			</Popover>
		</div>
	),
}

export const KeyboardInteraction: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger asChild>
				<Button appearance='outline'>Tab to me, Enter to open</Button>
			</PopoverTrigger>
			<PopoverContent>
				Focus moves in here on open. Escape closes and returns focus to the trigger.
				<div style={{ marginTop: '0.5rem' }}>
					<Button size='sm'>Focusable button</Button>
				</div>
			</PopoverContent>
		</Popover>
	),
}
// TEMP DEBUG 2
export const AnchorNoTriggerDebug: Story = {
	render: () => {
		function Demo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverAnchor asChild>
							<Input placeholder='anchor' style={{ width: '150px' }} />
						</PopoverAnchor>
						<PopoverContent align='start'>Anchored content</PopoverContent>
					</Popover>
					<Button onClick={() => setOpen((o) => !o)}>Toggle</Button>
				</div>
			)
		}
		return <Demo />
	},
}
