import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Checkbox } from '@pawks/components/checkbox'
import { Field, FieldDescription, FieldError, FieldLabel } from '@pawks/components/field'
import { Label } from '@pawks/components/label'

const meta: Meta<typeof Checkbox> = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
	args: { 'aria-label': 'Accept terms' },
}

export const Checked: Story = {
	args: { defaultChecked: true, 'aria-label': 'Accept terms' },
}

export const Indeterminate: Story = {
	args: { checked: 'indeterminate', 'aria-label': 'Select all' },
}

export const Disabled: Story = {
	args: { disabled: true, 'aria-label': 'Accept terms' },
}

export const DisabledChecked: Story = {
	args: { disabled: true, defaultChecked: true, 'aria-label': 'Accept terms' },
}

export const Invalid: Story = {
	args: { 'aria-invalid': true, 'aria-label': 'Accept terms' },
}

export const Required: Story = {
	render: () => <Checkbox name='terms' value='accepted' required aria-label='Accept terms' />,
}

// Checkbox owns no state of its own — this is a real controlled component,
// proving `onCheckedChange` (not `onChange`) drives it, per Radix's model.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<Checkbox checked={checked} onCheckedChange={setChecked} aria-label='Accept terms' />
					<span style={{ fontSize: '12px', color: '#888' }}>checked: {String(checked)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const AllStates: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
			<Checkbox aria-label='unchecked' />
			<Checkbox defaultChecked aria-label='checked' />
			<Checkbox checked='indeterminate' aria-label='indeterminate' />
			<Checkbox disabled aria-label='disabled' />
			<Checkbox disabled defaultChecked aria-label='disabled checked' />
		</div>
	),
}

// Checkbox never renders its own Label — this is the expected composition.
export const WithLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
			<Checkbox id='terms' />
			<Label htmlFor='terms'>Accept terms and conditions</Label>
		</div>
	),
}

export const WithField: Story = {
	render: () => (
		<Field orientation='horizontal' style={{ alignItems: 'flex-start' }}>
			<Checkbox id='notifications' style={{ marginTop: '2px' }} />
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
				<FieldLabel htmlFor='notifications'>Enable notifications</FieldLabel>
				<FieldDescription>Receive notifications about account activity.</FieldDescription>
			</div>
		</Field>
	),
}

export const WithFieldError: Story = {
	render: () => (
		<Field data-invalid style={{ width: '16rem' }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<Checkbox id='notifications-error' aria-invalid='true' />
				<FieldLabel htmlFor='notifications-error'>Enable notifications</FieldLabel>
			</div>
			<FieldError>Please select an option.</FieldError>
		</Field>
	),
}
