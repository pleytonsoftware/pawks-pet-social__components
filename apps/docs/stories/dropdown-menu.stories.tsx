import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button } from '@pawks/components/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@pawks/components/dropdown-menu'

const meta: Meta<typeof DropdownMenu> = {
	title: 'Atoms/DropdownMenu',
	component: DropdownMenu,
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const WithButtonTrigger: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuItem>Archive</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

// DropdownMenu owns no state of its own — this is a real controlled
// component, proving `onOpenChange` (not internal state) drives visibility.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<DropdownMenu open={open} onOpenChange={setOpen}>
						<DropdownMenuTrigger asChild>
							<Button appearance='outline'>{open ? 'Close' : 'Open'} menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<span style={{ fontSize: '12px', color: '#888' }}>open: {String(open)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const DisabledItem: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem disabled>Settings (unavailable)</DropdownMenuItem>
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const Groups: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Log out</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const Labels: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const Separators: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const CheckboxItems: Story = {
	render: () => {
		function CheckboxItemsDemo() {
			const [showToolbar, setShowToolbar] = useState(true)
			const [showSidebar, setShowSidebar] = useState(false)
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button appearance='outline'>View</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
							Show toolbar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
							Show sidebar
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
		return <CheckboxItemsDemo />
	},
}

export const RadioItems: Story = {
	render: () => {
		function RadioItemsDemo() {
			const [align, setAlign] = useState('start')
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button appearance='outline'>Alignment</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuRadioGroup value={align} onValueChange={setAlign}>
							<DropdownMenuRadioItem value='start'>Start</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value='center'>Center</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value='end'>End</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
		return <RadioItemsDemo />
	},
}

export const Submenu: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Email</DropdownMenuItem>
						<DropdownMenuItem>Message</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const KeyboardNavigation: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open with Enter/Space, navigate with arrows</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>First</DropdownMenuItem>
				<DropdownMenuItem>Second</DropdownMenuItem>
				<DropdownMenuItem>Third</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const Shortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					New tab
					<DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					New window
					<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const WithLink: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem asChild>
					<a href='https://example.com'>Visit website</a>
				</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const WithCustomTrigger: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer rounded-full border border-input px-3 py-1 text-body outline-none focus-visible:ring-[3px] focus-visible:ring-ring'>
				⋯
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

// The shadcn "complex menu" shape — label, grouped items with shortcuts,
// separators, a submenu, and a destructive action, at an explicit width.
export const Complex: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			{/* Inline width, not `className='w-56'` — this package ships a
			    precompiled stylesheet, so utility classes written in a
			    consumer (like this story) are never seen by Tailwind. */}
			<DropdownMenuContent align='start' style={{ width: '14rem' }}>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Email</DropdownMenuItem>
						<DropdownMenuItem>Message</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>More…</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuItem disabled>API (coming soon)</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem tone='destructive'>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const DestructiveItem: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Rename</DropdownMenuItem>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem tone='destructive'>Delete permanently</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

// `inset` pads a plain item past the indicator gutter so its text lines up
// with checkbox/radio siblings.
export const InsetItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>View</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent style={{ width: '14rem' }}>
				<DropdownMenuLabel inset>Appearance</DropdownMenuLabel>
				<DropdownMenuCheckboxItem checked>Show toolbar</DropdownMenuCheckboxItem>
				<DropdownMenuItem inset>Reset to defaults</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Not inset, for contrast</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

// Proof that anchoring tracks the trigger in every configuration.
export const AlignAndSide: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
			{(['start', 'center', 'end'] as const).map((align) => (
				<DropdownMenu key={align}>
					<DropdownMenuTrigger asChild>
						<Button appearance='outline'>align={align}</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align={align}>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			))}
		</div>
	),
}

export const LongContent: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Export as a comma-separated values file (.csv)</DropdownMenuItem>
				<DropdownMenuItem>Export as a portable document format file (.pdf)</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const ManyItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button appearance='outline'>Open menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
					<DropdownMenuItem key={n}>Option {n}</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	),
}
