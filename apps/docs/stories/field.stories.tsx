import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field, FieldDescription, FieldError, FieldLabel, type FieldProps } from '@pawks/components/field'
import { Input } from '@pawks/components/input'

const ORIENTATIONS: NonNullable<FieldProps['orientation']>[] = ['vertical', 'horizontal']

const meta: Meta<typeof Field> = {
	title: 'Atoms/Field',
	component: Field,
	argTypes: {
		orientation: { control: 'select', options: ORIENTATIONS },
	},
}

export default meta
type Story = StoryObj<typeof Field>

export const Basic: Story = {
	render: () => (
		<Field style={{ width: '16rem' }}>
			<FieldLabel htmlFor='email-basic'>Email</FieldLabel>
			<Input id='email-basic' type='email' placeholder='you@example.com' />
		</Field>
	),
}

export const WithDescriptionAndError: Story = {
	render: () => (
		<Field style={{ width: '16rem' }}>
			<FieldLabel htmlFor='email-full'>Email</FieldLabel>
			<Input id='email-full' type='email' defaultValue='not-an-email' aria-invalid />
			<FieldDescription>{"We'll never share your email."}</FieldDescription>
			<FieldError>Please enter a valid email.</FieldError>
		</Field>
	),
}

// FieldError renders nothing when there's no error — consumers pass the
// error value directly (`<FieldError>{error}</FieldError>`) without
// wrapping it in a conditional themselves.
export const WithoutError: Story = {
	render: () => (
		<Field style={{ width: '16rem' }}>
			<FieldLabel htmlFor='email-noerr'>Email</FieldLabel>
			<Input id='email-noerr' type='email' placeholder='you@example.com' />
			<FieldDescription>{"We'll never share your email."}</FieldDescription>
			<FieldError>{undefined}</FieldError>
		</Field>
	),
}

// Field doesn't inspect or depend on its children's component type —
// Textarea/Checkbox atoms don't exist yet in this library, so plain
// native elements stand in here purely to demonstrate control-agnosticism.
export const DifferentControls: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '18rem' }}>
			<Field>
				<FieldLabel htmlFor='username'>Username</FieldLabel>
				<Input id='username' placeholder='pablo' />
			</Field>
			<Field>
				<FieldLabel htmlFor='bio'>Bio</FieldLabel>
				<textarea
					id='bio'
					rows={3}
					style={{ font: 'inherit', padding: '6px 10px', borderRadius: '6px', border: '1px solid var(--input)', resize: 'vertical' }}
				/>
			</Field>
			<Field orientation='horizontal'>
				<input id='notifications' type='checkbox' />
				<FieldLabel htmlFor='notifications'>Notifications</FieldLabel>
			</Field>
		</div>
	),
}

export const Orientations: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '18rem' }}>
			<Field orientation='vertical'>
				<FieldLabel htmlFor='email-vertical'>Email</FieldLabel>
				<Input id='email-vertical' type='email' placeholder='you@example.com' />
			</Field>
			<Field orientation='horizontal'>
				<FieldLabel htmlFor='email-horizontal'>Email</FieldLabel>
				<Input id='email-horizontal' type='email' placeholder='you@example.com' />
			</Field>
		</div>
	),
}
