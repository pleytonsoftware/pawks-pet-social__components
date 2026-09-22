import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button } from '@pawks/components/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@pawks/components/dialog'
import { Field, FieldLabel } from '@pawks/components/field'
import { Input } from '@pawks/components/input'

const meta: Meta<typeof Dialog> = {
	title: 'Atoms/Dialog',
	component: Dialog,
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button appearance='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	),
}

export const Form: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button appearance='outline'>Edit profile</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Update your profile information.</DialogDescription>
				</DialogHeader>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
					<Field>
						<FieldLabel htmlFor='dialog-name'>Name</FieldLabel>
						<Input id='dialog-name' defaultValue='Pablo Leyton' />
					</Field>
					<Field>
						<FieldLabel htmlFor='dialog-username'>Username</FieldLabel>
						<Input id='dialog-username' defaultValue='pleyt' />
					</Field>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button appearance='outline'>Cancel</Button>
					</DialogClose>
					<Button>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
}

// Dialog owns no state of its own — this is a real controlled component,
// proving `onOpenChange` (not internal state) drives visibility.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button appearance='outline'>{open ? 'Close' : 'Open'} dialog</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Controlled dialog</DialogTitle>
							</DialogHeader>
						</DialogContent>
					</Dialog>
					<span style={{ fontSize: '12px', color: '#888' }}>open: {String(open)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const WithDescription: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button appearance='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>Configure your application settings.</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	),
}

export const WithFooterActions: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button appearance='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Discard changes?</DialogTitle>
					<DialogDescription>Your unsaved changes will be lost.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button appearance='outline'>Keep editing</Button>
					</DialogClose>
					<Button tone='destructive'>Discard</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
}

export const CustomContent: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button appearance='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Order summary</DialogTitle>
				</DialogHeader>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>Subtotal</span>
						<span>$42.00</span>
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<span>Shipping</span>
						<span>$5.00</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	),
}

export const DifferentContentSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.75rem' }}>
			<Dialog>
				<DialogTrigger asChild>
					<Button appearance='outline'>Small</Button>
				</DialogTrigger>
				<DialogContent style={{ maxWidth: '20rem' }}>
					<DialogHeader>
						<DialogTitle>Small dialog</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
			<Dialog>
				<DialogTrigger asChild>
					<Button appearance='outline'>Large</Button>
				</DialogTrigger>
				<DialogContent style={{ maxWidth: '40rem' }}>
					<DialogHeader>
						<DialogTitle>Large dialog</DialogTitle>
						<DialogDescription>A wider dialog for content that needs more horizontal room.</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	),
}

// A callback ref, not a prop, marks the element — proves it forwards to the
// real DOM node. Not a `useRef` + `useEffect(..., [])` pair: `defaultOpen`
// defers the actual mount to a post-render effect inside Radix (an
// SSR-hydration-safe pattern), so a run-once effect can fire before
// DialogContent exists at all. A callback ref has no such timing dependency
// — React calls it exactly when the node attaches, whenever that is.
export const RefForwarding: Story = {
	render: () => (
		<Dialog defaultOpen>
			<DialogTrigger asChild>
				<Button appearance='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent
				ref={(node: HTMLDivElement | null) => {
					if (node) node.dataset.refForwarded = 'true'
				}}
			>
				<DialogHeader>
					<DialogTitle>Ref forwarding</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	),
}

// A DialogTrigger inside one DialogContent opens a second, independent Dialog.
export const NestedComposition: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button appearance='outline'>Open dialog</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Account settings</DialogTitle>
				</DialogHeader>
				<Dialog>
					<DialogTrigger asChild>
						<Button appearance='outline'>Change password</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Change password</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</DialogContent>
		</Dialog>
	),
}
