import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button } from '@pawks/components/button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@pawks/components/tooltip'
import { Info } from '@pawks/icons'

const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button appearance='outline'>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>Helpful information</TooltipContent>
		</Tooltip>
	),
}

export const DifferentSides: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side}>
					<TooltipTrigger asChild>
						<Button appearance='outline'>{side}</Button>
					</TooltipTrigger>
					<TooltipContent side={side}>Side: {side}</TooltipContent>
				</Tooltip>
			))}
		</div>
	),
}

export const DifferentAlignments: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			{(['start', 'center', 'end'] as const).map((align) => (
				<Tooltip key={align}>
					<TooltipTrigger asChild>
						<Button appearance='outline'>{align}</Button>
					</TooltipTrigger>
					<TooltipContent align={align}>Align: {align}</TooltipContent>
				</Tooltip>
			))}
		</div>
	),
}

export const WithArrow: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button appearance='outline'>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>
				Helpful information
				<TooltipArrow />
			</TooltipContent>
		</Tooltip>
	),
}

export const CustomOffset: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button appearance='outline'>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent sideOffset={16}>16px offset</TooltipContent>
		</Tooltip>
	),
}

export const LongContent: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button appearance='outline'>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>This tooltip contains a longer piece of supplementary text to demonstrate wrapping behavior.</TooltipContent>
		</Tooltip>
	),
}

export const IconButton: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button appearance='ghost' iconOnly icon={Info} aria-label='More information' />
			</TooltipTrigger>
			<TooltipContent>More information</TooltipContent>
		</Tooltip>
	),
}

export const OnButton: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button>Save</Button>
			</TooltipTrigger>
			<TooltipContent>Save changes</TooltipContent>
		</Tooltip>
	),
}

export const OnLink: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<a href='/documentation'>Documentation</a>
			</TooltipTrigger>
			<TooltipContent>Open the documentation</TooltipContent>
		</Tooltip>
	),
}

// Tooltip owns no state of its own — this is a real controlled component,
// proving `onOpenChange` (not internal state) drives visibility.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
					<Tooltip open={open} onOpenChange={setOpen}>
						<TooltipTrigger asChild>
							<Button appearance='outline'>Trigger</Button>
						</TooltipTrigger>
						<TooltipContent>Controlled tooltip</TooltipContent>
					</Tooltip>
					<span style={{ fontSize: '12px', color: '#888' }}>open: {String(open)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

// A nested TooltipProvider overrides the app-wide one (this story file's own
// default export doesn't need it — every story already sits inside a global
// TooltipProvider via .storybook/preview.tsx, the way a real app wraps its root).
export const ProviderConfiguration: Story = {
	render: () => (
		<TooltipProvider delayDuration={0} skipDelayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button appearance='outline'>No delay</Button>
				</TooltipTrigger>
				<TooltipContent>Opens instantly (delayDuration=0)</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	),
}

// Native disabled controls don't receive the pointer events a tooltip needs
// to trigger — wrap in a plain element the trigger can attach to instead.
export const DisabledElement: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<span>
					<Button disabled>Save</Button>
				</span>
			</TooltipTrigger>
			<TooltipContent>Complete the required fields first</TooltipContent>
		</Tooltip>
	),
}

export const MultipleTooltips: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem' }}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button appearance='outline'>First</Button>
				</TooltipTrigger>
				<TooltipContent>First tooltip</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button appearance='outline'>Second</Button>
				</TooltipTrigger>
				<TooltipContent>Second tooltip</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button appearance='outline'>Third</Button>
				</TooltipTrigger>
				<TooltipContent>Third tooltip</TooltipContent>
			</Tooltip>
		</div>
	),
}
