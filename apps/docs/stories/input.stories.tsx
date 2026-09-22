import type { Meta, StoryObj } from '@storybook/react-vite'

import { useRef } from 'react'

import { Button } from '@pawks/components/button'
import { Input } from '@pawks/components/input'
import { Label } from '@pawks/components/label'

const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
	args: { placeholder: 'Pet name' },
}

export const WithValue: Story = {
	args: { defaultValue: 'Luna' },
}

export const Disabled: Story = {
	args: { placeholder: 'Pet name', disabled: true },
}

export const Invalid: Story = {
	args: { placeholder: 'Pet name', defaultValue: 'x', 'aria-invalid': true },
}

export const States: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '16rem' }}>
			<Input placeholder='Default' />
			<Input defaultValue='Luna' />
			<Input placeholder='Disabled' disabled />
			<Input placeholder='Invalid' aria-invalid defaultValue='x' />
		</div>
	),
}

// Input never renders its own Label — this is the expected composition
// pattern (ticket §3/§7): the consumer pairs them via htmlFor/id.
export const WithLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '16rem' }}>
			<Label htmlFor='pet-name'>Pet name</Label>
			<Input id='pet-name' placeholder='Luna' />
		</div>
	),
}

// Matches the ticket's "With an error" example exactly: aria-invalid +
// aria-describedby pointing at a consumer-rendered error message — Input
// itself renders no error text.
export const WithError: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '16rem' }}>
			<Label htmlFor='email-error'>Email</Label>
			<Input id='email-error' type='email' aria-invalid aria-describedby='email-error-message' defaultValue='not-an-email' />
			<p id='email-error-message' style={{ margin: 0, fontSize: '12px', color: '#ce372c' }}>
				Enter a valid email address.
			</p>
		</div>
	),
}

export const FileInput: Story = {
	args: { type: 'file' },
}

// Demonstrates AC5 concretely: a ref to the real DOM node, used
// imperatively (no forwardRef needed — React 19 ref-as-prop).
export const RefFocus: Story = {
	render: () => {
		function RefFocusDemo() {
			const inputRef = useRef<HTMLInputElement>(null)
			return (
				<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
					<Input ref={inputRef} placeholder='Click the button to focus me' style={{ width: '14rem' }} />
					<Button size='md' onClick={() => inputRef.current?.focus()}>
						Focus
					</Button>
				</div>
			)
		}
		return <RefFocusDemo />
	},
}
