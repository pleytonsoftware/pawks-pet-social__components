import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef, useState } from 'react'

import { Alert, AlertAction, AlertDescription, AlertTitle } from '@pawks/components/alert'
import { Button } from '@pawks/components/button'
import { Info, TriangleAlert, X } from '@pawks/icons'

const meta: Meta<typeof Alert> = {
	title: 'Atoms/Alert',
	component: Alert,
}

export default meta
type Story = StoryObj<typeof Alert>

// The leading icon needs no prop — the grid auto-reserves its column the
// moment an `<svg>` is a direct child (`has-[>svg]:`).
export const Default: Story = {
	render: () => (
		<Alert style={{ width: '20rem' }}>
			<Info />
			<AlertTitle>Heads up</AlertTitle>
			<AlertDescription>You can add components to your app using the CLI.</AlertDescription>
		</Alert>
	),
}

export const Destructive: Story = {
	render: () => (
		<Alert variant='destructive' role='alert' style={{ width: '20rem' }}>
			<TriangleAlert />
			<AlertTitle>Payment failed</AlertTitle>
			<AlertDescription>Please check your payment method and try again.</AlertDescription>
		</Alert>
	),
}

export const WithTitle: Story = {
	render: () => (
		<Alert style={{ width: '20rem' }}>
			<AlertTitle>Changes saved</AlertTitle>
		</Alert>
	),
}

export const WithDescription: Story = {
	render: () => (
		<Alert style={{ width: '20rem' }}>
			<AlertDescription>Your profile has been updated.</AlertDescription>
		</Alert>
	),
}

// Composition, not a `dismissible` prop — dismissal state stays with the
// consuming component. AlertAction only positions the button; the real
// Button + a real icon from @pawks/icons do the rest.
export const CustomContent: Story = {
	render: () => (
		<Alert style={{ width: '20rem' }}>
			<AlertTitle>Changes saved</AlertTitle>
			<AlertDescription>Your changes have been saved.</AlertDescription>
			<AlertAction>
				<Button appearance='ghost' iconOnly size='sm' icon={X} aria-label='Dismiss' />
			</AlertAction>
		</Alert>
	),
}

export const WithIconAndAction: Story = {
	render: () => (
		<Alert style={{ width: '20rem' }}>
			<Info />
			<AlertTitle>Update available</AlertTitle>
			<AlertDescription>A new version is ready to install.</AlertDescription>
			<AlertAction>
				<Button appearance='ghost' iconOnly size='sm' icon={X} aria-label='Dismiss' />
			</AlertAction>
		</Alert>
	),
}

// Presence represents the state — no `dismissible`/`onClose` prop on Alert
// itself. The consuming component owns whether it's shown at all.
export const Dismissible: Story = {
	render: () => {
		function DismissibleDemo() {
			const [visible, setVisible] = useState(true)
			if (!visible)
				return (
					<Button appearance='outline' onClick={() => setVisible(true)}>
						Show alert
					</Button>
				)
			return (
				<Alert style={{ width: '20rem' }}>
					<Info />
					<AlertTitle>Changes saved</AlertTitle>
					<AlertDescription>Your changes have been saved.</AlertDescription>
					<AlertAction>
						<Button appearance='ghost' iconOnly size='sm' icon={X} aria-label='Dismiss' onClick={() => setVisible(false)} />
					</AlertAction>
				</Alert>
			)
		}
		return <DismissibleDemo />
	},
}

// The ref, not a prop, marks the element — proves it forwards to the real DOM node.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const ref = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (ref.current) ref.current.dataset.refForwarded = 'true'
			}, [])
			return (
				<Alert ref={ref}>
					<AlertTitle>Ref forwarding</AlertTitle>
				</Alert>
			)
		}
		return <RefForwardingDemo />
	},
}

export const CustomStyling: Story = {
	render: () => (
		<Alert style={{ width: '20rem', borderColor: '#2a7e49', color: '#2a7e49' }}>
			<AlertTitle>Deployment succeeded</AlertTitle>
			<AlertDescription>Your changes are now live.</AlertDescription>
		</Alert>
	),
}
