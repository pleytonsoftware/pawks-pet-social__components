import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@pawks/components/alert-dialog'
import { Button } from '@pawks/components/button'

const meta: Meta<typeof AlertDialog> = {
	title: 'Atoms/AlertDialog',
	component: AlertDialog,
}

export default meta
type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button appearance='outline'>Show dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
}

// AlertDialogAction is styled via the same `buttonVariants` Button itself
// uses (not the Button component) — pass a `tone` through the same helper to
// mark it destructive, exactly like overriding any Button's appearance.
export const DestructiveConfirmation: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button tone='destructive'>Delete project</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this project?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the project and remove its data.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className='bg-destructive text-destructive-foreground hover:bg-destructive-hover'>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
}

// AlertDialog owns no state of its own — this is a real controlled
// component, proving `onOpenChange` (not internal state) drives visibility.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
					<AlertDialog open={open} onOpenChange={setOpen}>
						<AlertDialogTrigger asChild>
							<Button appearance='outline'>{open ? 'Close' : 'Show'} dialog</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Controlled alert dialog</AlertDialogTitle>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Continue</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
					<span style={{ fontSize: '12px', color: '#888' }}>open: {String(open)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const CustomActions: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button appearance='outline'>Leave page</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Leave without saving?</AlertDialogTitle>
					<AlertDialogDescription>You have unsaved changes.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Stay</AlertDialogCancel>
					<AlertDialogAction>Leave anyway</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
}

export const LongDescription: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button appearance='outline'>Show dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Terms of service update</AlertDialogTitle>
					<AlertDialogDescription>
						We have updated our terms of service to reflect changes in how we handle data processing, third-party integrations, and
						account deletion requests. Continuing to use the product means you accept these updated terms in full.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Decline</AlertDialogCancel>
					<AlertDialogAction>Accept</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
}

// The ref, not a prop, marks the element — proves it forwards to the real DOM node.
// A callback ref, not a prop, marks the element — proves it forwards to the
// real DOM node (see the equivalent Dialog story for why not useRef+useEffect).
export const RefForwarding: Story = {
	render: () => (
		<AlertDialog defaultOpen>
			<AlertDialogTrigger asChild>
				<Button appearance='outline'>Show dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent
				ref={(node: HTMLDivElement | null) => {
					if (node) node.dataset.refForwarded = 'true'
				}}
			>
				<AlertDialogHeader>
					<AlertDialogTitle>Ref forwarding</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
}

// Loading/disabled state is the consuming component's responsibility —
// AlertDialogAction has no `loading` prop of its own, matching Button/Spinner.
export const DisabledAction: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button appearance='outline'>Show dialog</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Processing</AlertDialogTitle>
					<AlertDialogDescription>Please wait for the current operation to finish.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
}
