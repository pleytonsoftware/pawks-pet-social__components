import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState, type ChangeEvent } from 'react'

import { Field, FieldDescription, FieldError, FieldLabel } from '@pawks/components/field'
import { Label } from '@pawks/components/label'
import { Textarea } from '@pawks/components/textarea'

const meta: Meta<typeof Textarea> = {
	title: 'Atoms/Textarea',
	component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
	args: { placeholder: 'Write something...' },
}

export const WithValue: Story = {
	args: { defaultValue: 'Initial content' },
}

export const Disabled: Story = {
	args: { placeholder: 'Write something...', disabled: true },
}

export const ReadOnly: Story = {
	args: { defaultValue: 'You can select this text, but not edit it.', readOnly: true },
}

export const Invalid: Story = {
	args: { defaultValue: 'x', 'aria-invalid': true },
}

// AC13 — native constraints (required/minLength/maxLength) are left to
// the browser; Textarea doesn't duplicate this validation itself.
export const Constrained: Story = {
	args: { placeholder: 'At least 20 characters...', required: true, minLength: 20, maxLength: 500, rows: 6 },
}

export const ResizeNone: Story = {
	args: { placeholder: 'Cannot be resized', className: 'resize-none' },
}

// Controlled usage — Textarea holds no state of its own.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [value, setValue] = useState('')
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '18rem' }}>
					<Textarea
						value={value}
						onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
						placeholder='Type to see the live count...'
					/>
					<span style={{ fontSize: '12px', color: '#888' }}>{value.length} characters</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const WithLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '18rem' }}>
			<Label htmlFor='description-label'>Description</Label>
			<Textarea id='description-label' placeholder='Describe your project...' />
		</div>
	),
}

export const WithField: Story = {
	render: () => (
		<Field style={{ width: '18rem' }}>
			<FieldLabel htmlFor='description-field'>Description</FieldLabel>
			<Textarea id='description-field' placeholder='Describe your project...' />
			<FieldDescription>Keep your description under 500 characters.</FieldDescription>
		</Field>
	),
}

export const WithFieldError: Story = {
	render: () => (
		<Field style={{ width: '18rem' }} data-invalid>
			<FieldLabel htmlFor='description-error'>Description</FieldLabel>
			<Textarea id='description-error' aria-invalid='true' />
			<FieldError>Description is required.</FieldError>
		</Field>
	),
}
