import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Field, FieldLabel } from '@pawks/components/field'
import { Label } from '@pawks/components/label'
import { RadioGroup, RadioGroupItem } from '@pawks/components/radio-group'

const meta: Meta<typeof RadioGroup> = {
	title: 'Atoms/RadioGroup',
	component: RadioGroup,
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
	render: () => (
		<RadioGroup>
			<RadioGroupItem value='default' aria-label='Default' />
		</RadioGroup>
	),
}

// Selection is a property of the group's value, not the item — there is
// no `checked`/`defaultChecked` prop on RadioGroupItem.
export const Selected: Story = {
	render: () => (
		<RadioGroup defaultValue='default'>
			<RadioGroupItem value='default' aria-label='Default' />
		</RadioGroup>
	),
}

export const MultipleOptions: Story = {
	render: () => (
		<RadioGroup defaultValue='comfortable'>
			{['default', 'comfortable', 'compact'].map((value) => (
				<div key={value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<RadioGroupItem value={value} id={`density-${value}`} />
					<Label htmlFor={`density-${value}`} style={{ textTransform: 'capitalize' }}>
						{value}
					</Label>
				</div>
			))}
		</RadioGroup>
	),
}

export const Disabled: Story = {
	render: () => (
		<RadioGroup disabled defaultValue='default'>
			{['default', 'comfortable', 'compact'].map((value) => (
				<div key={value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<RadioGroupItem value={value} id={`disabled-${value}`} />
					<Label htmlFor={`disabled-${value}`} style={{ textTransform: 'capitalize' }}>
						{value}
					</Label>
				</div>
			))}
		</RadioGroup>
	),
}

export const DisabledOption: Story = {
	render: () => (
		<RadioGroup defaultValue='email'>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<RadioGroupItem value='email' id='contact-email' />
				<Label htmlFor='contact-email'>Email</Label>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<RadioGroupItem value='sms' id='contact-sms' disabled />
				<Label htmlFor='contact-sms'>SMS (unavailable)</Label>
			</div>
		</RadioGroup>
	),
}

export const Required: Story = {
	render: () => (
		<RadioGroup name='terms' required>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<RadioGroupItem value='accept' id='terms-accept' />
				<Label htmlFor='terms-accept'>Accept</Label>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<RadioGroupItem value='decline' id='terms-decline' />
				<Label htmlFor='terms-decline'>Decline</Label>
			</div>
		</RadioGroup>
	),
}

// RadioGroup owns no state of its own — this is a real controlled
// component, proving `onValueChange` (not `onChange`) drives it.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [value, setValue] = useState('email')
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<RadioGroup value={value} onValueChange={setValue}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<RadioGroupItem value='email' id='controlled-email' />
							<Label htmlFor='controlled-email'>Email</Label>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<RadioGroupItem value='sms' id='controlled-sms' />
							<Label htmlFor='controlled-sms'>SMS</Label>
						</div>
					</RadioGroup>
					<span style={{ fontSize: '12px', color: '#888' }}>value: {value}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const HorizontalOrientation: Story = {
	render: () => (
		<RadioGroup orientation='horizontal' defaultValue='default'>
			{['default', 'comfortable', 'compact'].map((value) => (
				<div key={value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<RadioGroupItem value={value} id={`horizontal-${value}`} />
					<Label htmlFor={`horizontal-${value}`} style={{ textTransform: 'capitalize' }}>
						{value}
					</Label>
				</div>
			))}
		</RadioGroup>
	),
}

export const WithLabel: Story = {
	render: () => (
		<RadioGroup defaultValue='email'>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<RadioGroupItem value='email' id='label-email' />
				<Label htmlFor='label-email'>Email</Label>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<RadioGroupItem value='sms' id='label-sms' />
				<Label htmlFor='label-sms'>SMS</Label>
			</div>
		</RadioGroup>
	),
}

export const WithField: Story = {
	render: () => (
		<Field style={{ width: '16rem' }}>
			<FieldLabel>Notification method</FieldLabel>
			<RadioGroup defaultValue='email'>
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<RadioGroupItem value='email' id='field-email' />
					<Label htmlFor='field-email'>Email</Label>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<RadioGroupItem value='sms' id='field-sms' />
					<Label htmlFor='field-sms'>SMS</Label>
				</div>
			</RadioGroup>
		</Field>
	),
}

export const LongLabels: Story = {
	render: () => (
		<RadioGroup defaultValue='standard' style={{ width: '18rem' }}>
			<div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
				<RadioGroupItem value='standard' id='shipping-standard' style={{ marginTop: '2px' }} />
				<Label htmlFor='shipping-standard'>Standard shipping — arrives in 5 to 7 business days, no tracking included</Label>
			</div>
			<div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
				<RadioGroupItem value='express' id='shipping-express' style={{ marginTop: '2px' }} />
				<Label htmlFor='shipping-express'>Express shipping — arrives in 1 to 2 business days with full tracking</Label>
			</div>
		</RadioGroup>
	),
}
