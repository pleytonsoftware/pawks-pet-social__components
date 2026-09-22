import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef } from 'react'

import { Separator } from '@pawks/components/separator'

const meta: Meta<typeof Separator> = {
	title: 'Atoms/Separator',
	component: Separator,
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
	render: () => (
		<div style={{ width: '16rem' }}>
			<Separator />
		</div>
	),
}

export const Vertical: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', height: '2rem' }}>
			<Separator orientation='vertical' />
		</div>
	),
}

// Radix defaults `decorative` to false (announced to assistive tech); this
// component defaults it to true (silent, visual-only) since most usages —
// like the two above — are purely visual dividers. This story opts back
// into the semantic, announced separator.
export const Decorative: Story = {
	render: () => (
		<div style={{ width: '16rem' }}>
			<Separator decorative={false} />
		</div>
	),
}

// Inline style, not `className='my-4'` — this package ships a precompiled
// stylesheet, so utility classes written in a consumer (like this story) are
// never seen by Tailwind. A real consuming app with its own Tailwind build
// wouldn't hit this; `<Separator className='my-4' />` is the real API.
export const WithSpacing: Story = {
	render: () => (
		<div style={{ width: '16rem' }}>
			<div>Account</div>
			<Separator style={{ margin: '1rem 0' }} />
			<div>Preferences</div>
		</div>
	),
}

export const InsideACard: Story = {
	render: () => (
		<div style={{ width: '18rem', border: '1px solid #e5dfdc', borderRadius: '0.75rem', padding: '1rem' }}>
			<div style={{ fontWeight: 600 }}>Billing</div>
			<div style={{ color: '#888', fontSize: '0.875rem' }}>Manage your subscription and payment method.</div>
			<Separator style={{ margin: '1rem 0' }} />
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span>Plan</span>
				<span>Pro</span>
			</div>
		</div>
	),
}

export const InsideAList: Story = {
	render: () => (
		<div style={{ width: '16rem' }}>
			{['Profile', 'Notifications', 'Billing', 'Security'].map((item, i, arr) => (
				<div key={item}>
					<div style={{ padding: '0.5rem 0' }}>{item}</div>
					{i < arr.length - 1 && <Separator />}
				</div>
			))}
		</div>
	),
}

// The ref, not a prop, marks the element — proves it forwards to the real DOM node.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const ref = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (ref.current) ref.current.dataset.refForwarded = 'true'
			}, [])
			return <Separator ref={ref} />
		}
		return <RefForwardingDemo />
	},
}

export const InsideAFlexLayout: Story = {
	render: () => (
		// Inline styles, not `className='mx-4 h-4'` — this package ships a
		// precompiled stylesheet, so utility classes written in a consumer
		// (like this story) are never seen by Tailwind. A real consuming app
		// with its own Tailwind build wouldn't hit this.
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<span>Profile</span>
			<Separator orientation='vertical' style={{ margin: '0 1rem', height: '1rem' }} />
			<span>Settings</span>
			<Separator orientation='vertical' style={{ margin: '0 1rem', height: '1rem' }} />
			<span>Log out</span>
		</div>
	),
}
