import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Field, FieldDescription, FieldLabel } from '@pawks/components/field'
import { Label } from '@pawks/components/label'
import { Switch } from '@pawks/components/switch'

const meta: Meta<typeof Switch> = {
	title: 'Atoms/Switch',
	component: Switch,
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
	args: { 'aria-label': 'Notifications' },
}

export const Checked: Story = {
	args: { defaultChecked: true, 'aria-label': 'Notifications' },
}

export const Unchecked: Story = {
	args: { defaultChecked: false, 'aria-label': 'Notifications' },
}

export const Disabled: Story = {
	args: { disabled: true, 'aria-label': 'Notifications' },
}

export const DisabledChecked: Story = {
	args: { disabled: true, defaultChecked: true, 'aria-label': 'Notifications' },
}

export const Required: Story = {
	render: () => <Switch name='terms' value='accepted' required aria-label='Accept terms' />,
}

// Switch owns no state of its own — this is a real controlled component,
// proving `onCheckedChange` (not `onChange`) drives it.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [checked, setChecked] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<Switch checked={checked} onCheckedChange={setChecked} aria-label='Notifications' />
					<span style={{ fontSize: '12px', color: '#888' }}>checked: {String(checked)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

// Switch never renders its own Label — this is the expected composition.
export const WithLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Switch id='dark-mode' />
			<Label htmlFor='dark-mode'>Dark mode</Label>
		</div>
	),
}

export const WithDescription: Story = {
	// Group won't work in storybook as we don't have tailwind here, we leave the code in order to display the example in the docs.
	render: () => (
		<div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }} className='group'>
			<Switch id='notifications-desc' style={{ marginTop: '2px' }} />
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
				<Label htmlFor='notifications-desc' className='group-hover:cursor-pointer'>
					Notifications
				</Label>
				<span style={{ fontSize: '12px', color: '#888' }} className='group-hover:cursor-pointer'>
					Receive notifications about new activity.
				</span>
			</div>
		</div>
	),
}

export const WithField: Story = {
	render: () => (
		<Field style={{ width: '18rem' }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<div>
					<FieldLabel htmlFor='notifications-field'>Notifications</FieldLabel>
					<FieldDescription>Receive notifications about new activity.</FieldDescription>
				</div>
				<Switch id='notifications-field' />
			</div>
		</Field>
	),
}

export const FormExample: Story = {
	render: () => (
		<form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<Switch id='form-notifications' name='notifications' value='enabled' defaultChecked />
				<Label htmlFor='form-notifications'>Notifications</Label>
			</div>
		</form>
	),
}
