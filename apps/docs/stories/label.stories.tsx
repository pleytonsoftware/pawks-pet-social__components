import type { Meta, StoryObj } from '@storybook/react-vite'

import { useRef } from 'react'

import { Button } from '@pawks/components/button'
import { Input } from '@pawks/components/input'
import { Label } from '@pawks/components/label'

const meta: Meta<typeof Label> = {
	title: 'Atoms/Label',
	component: Label,
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
	args: { children: 'Email' },
}

export const CustomStyling: Story = {
	args: { children: 'Username', className: 'text-body' },
}

export const WithAccessibilityAttributes: Story = {
	args: { children: 'Email address', htmlFor: 'email-a11y', id: 'email-label' },
}

// Demonstrates the actual form-control pairing: clicking the label
// focuses the input (native <label for> behavior), and the label
// dims/disables via `peer-disabled` when the input it's paired with is
// disabled — Label has no knowledge of Input itself, just `htmlFor`/`peer`.
export const WithInput: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
				<Label htmlFor='email-enabled'>Email</Label>
				<Input id='email-enabled' type='email' placeholder='you@example.com' style={{ width: '16rem' }} />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
				<Label htmlFor='email-disabled'>Email</Label>
				<Input id='email-disabled' type='email' placeholder='you@example.com' disabled style={{ width: '16rem' }} />
			</div>
		</div>
	),
}

// Demonstrates AC8 concretely: `labelRef.current` is the real DOM <label>
// node, proven by using it to imperatively `.click()` the label — which
// triggers the label's native `htmlFor` click-to-focus behavior on its
// paired input, exactly as if a user had clicked it directly.
export const RefFocus: Story = {
	render: () => {
		function RefDemo() {
			const labelRef = useRef<HTMLLabelElement>(null)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
					<Label ref={labelRef} htmlFor='email-ref-demo'>
						Email
					</Label>
					<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
						<Input id='email-ref-demo' type='email' placeholder='you@example.com' style={{ width: '14rem' }} />
						<Button size='md' onClick={() => labelRef.current?.click()}>
							Click label via ref
						</Button>
					</div>
				</div>
			)
		}
		return <RefDemo />
	},
}
