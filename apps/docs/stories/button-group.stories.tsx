import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef } from 'react'

import { Button } from '@pawks/components/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@pawks/components/button-group'
import { Input } from '@pawks/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@pawks/components/select'
import { Bold, ChevronLeft, ChevronRight, Italic, Redo2, Search, Underline, Undo2 } from '@pawks/icons'

const meta: Meta<typeof ButtonGroup> = {
	title: 'Atoms/ButtonGroup',
	component: ButtonGroup,
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
	render: () => (
		<ButtonGroup>
			<Button>One</Button>
			<Button>Two</Button>
			<Button>Three</Button>
		</ButtonGroup>
	),
}

export const OutlineButtons: Story = {
	render: () => (
		<ButtonGroup>
			<Button appearance='outline'>One</Button>
			<Button appearance='outline'>Two</Button>
			<Button appearance='outline'>Three</Button>
		</ButtonGroup>
	),
}

export const DifferentSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
			<ButtonGroup>
				<Button appearance='outline' size='xs'>
					One
				</Button>
				<Button appearance='outline' size='xs'>
					Two
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button appearance='outline' size='sm'>
					One
				</Button>
				<Button appearance='outline' size='sm'>
					Two
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button appearance='outline' size='lg'>
					One
				</Button>
				<Button appearance='outline' size='lg'>
					Two
				</Button>
			</ButtonGroup>
		</div>
	),
}

export const Vertical: Story = {
	render: () => (
		<ButtonGroup orientation='vertical'>
			<Button appearance='outline'>One</Button>
			<Button appearance='outline'>Two</Button>
			<Button appearance='outline'>Three</Button>
		</ButtonGroup>
	),
}

export const WithIcons: Story = {
	render: () => (
		<ButtonGroup>
			<Button appearance='outline' icon={ChevronLeft} iconOnly aria-label='Previous' />
			<Button appearance='outline'>Page 1</Button>
			<Button appearance='outline' icon={ChevronRight} iconOnly aria-label='Next' />
		</ButtonGroup>
	),
}

export const WithText: Story = {
	render: () => (
		<ButtonGroup>
			<ButtonGroupText>https://</ButtonGroupText>
			<Input placeholder='example.com' />
		</ButtonGroup>
	),
}

export const WithInput: Story = {
	render: () => (
		<ButtonGroup>
			<Input placeholder='Search…' />
			<Button appearance='outline' icon={Search} iconOnly aria-label='Search' />
		</ButtonGroup>
	),
}

export const WithSeparator: Story = {
	render: () => (
		<ButtonGroup>
			<Button appearance='outline' icon={Bold} iconOnly aria-label='Bold' />
			<Button appearance='outline' icon={Italic} iconOnly aria-label='Italic' />
			<Button appearance='outline' icon={Underline} iconOnly aria-label='Underline' />
			<ButtonGroupSeparator />
			<Button appearance='outline' icon={Undo2} iconOnly aria-label='Undo' />
			<Button appearance='outline' icon={Redo2} iconOnly aria-label='Redo' />
		</ButtonGroup>
	),
}

export const MixedControls: Story = {
	render: () => (
		<ButtonGroup>
			<Select defaultValue='usd'>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='usd'>USD</SelectItem>
					<SelectItem value='eur'>EUR</SelectItem>
				</SelectContent>
			</Select>
			<Input placeholder='Amount' />
			<Button>Convert</Button>
		</ButtonGroup>
	),
}

// Every top-level cluster — even a single button — is wrapped in its own
// ButtonGroup, so no bare Button is ever a direct sibling of a nested group.
// That matters, not just stylistic: the outer group's corner-flattening
// rule (`:not(:first-child)`/`:not(:last-child)`) applies to whatever DOM
// element is its own direct child. A bare "Previous" Button sitting next to
// a nested group would itself be treated as a non-last child and get its
// own trailing corner wrongly flattened, even though nothing is actually
// fused against it (there's a gap, from `has-[>[data-slot=button-group]]:
// gap-2`) — it would end up squared on one side for no visible reason.
// Wrapping "Previous" in its own single-item ButtonGroup means the outer
// group's flattening only ever touches that (invisible, borderless)
// wrapper — "Previous" itself is its wrapper's only child, so it keeps
// both corners rounded, exactly as it should.
export const NestedGroups: Story = {
	render: () => (
		<ButtonGroup>
			<ButtonGroup>
				<Button appearance='outline'>Previous</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button appearance='outline'>1</Button>
				<Button appearance='outline'>2</Button>
				<Button appearance='outline'>3</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button appearance='outline'>Next</Button>
			</ButtonGroup>
		</ButtonGroup>
	),
}

export const DisabledChild: Story = {
	render: () => (
		<ButtonGroup>
			<Button appearance='outline'>One</Button>
			<Button appearance='outline' disabled>
				Two
			</Button>
			<Button appearance='outline'>Three</Button>
		</ButtonGroup>
	),
}

export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<ButtonGroup>
				<Button appearance='outline'>واحد</Button>
				<Button appearance='outline'>اثنان</Button>
				<Button appearance='outline'>ثلاثة</Button>
			</ButtonGroup>
		</div>
	),
}

export const CustomRole: Story = {
	render: () => (
		<ButtonGroup role='toolbar' aria-label='Text formatting'>
			<Button appearance='outline' icon={Bold} iconOnly aria-label='Bold' />
			<Button appearance='outline' icon={Italic} iconOnly aria-label='Italic' />
		</ButtonGroup>
	),
}

// A ref, not a prop, marks the element — proves it forwards to the real DOM
// node. ButtonGroup renders synchronously (no portal, no deferred mount),
// so a plain `useRef` + `useEffect(..., [])` is safe here.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const groupRef = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (groupRef.current) groupRef.current.dataset.refForwarded = 'true'
			}, [])
			return (
				<ButtonGroup ref={groupRef}>
					<Button appearance='outline'>One</Button>
					<Button appearance='outline'>Two</Button>
				</ButtonGroup>
			)
		}
		return <RefForwardingDemo />
	},
}
