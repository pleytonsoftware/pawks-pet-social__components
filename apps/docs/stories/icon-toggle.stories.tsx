import type { Meta, StoryObj } from '@storybook/react-vite'

import { IconToggle, type IconToggleProps } from '@pawks/components/icon-toggle'
import { Heart } from '@pawks/icons'

const TONES: NonNullable<IconToggleProps['tone']>[] = ['primary', 'secondary', 'muted', 'accent', 'destructive', 'success', 'warning', 'info']

const meta: Meta<typeof IconToggle> = {
	title: 'Atoms/IconToggle',
	component: IconToggle,
	argTypes: {
		tone: { control: 'select', options: TONES },
	},
}

export default meta
type Story = StoryObj<typeof IconToggle>

export const Default: Story = {
	args: { icon: Heart, 'aria-label': 'Like' },
}

export const Pressed: Story = {
	args: { icon: Heart, 'aria-label': 'Like', defaultPressed: true },
}

export const WithLabel: Story = {
	render: (args: IconToggleProps) => (
		<IconToggle {...args}>
			<span>124</span>
		</IconToggle>
	),
	args: { icon: Heart, tone: 'destructive', 'aria-label': 'Like', defaultPressed: true },
}

export const AllTones: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
			{TONES.map((tone) => (
				<IconToggle key={tone} icon={Heart} tone={tone} defaultPressed aria-label={`Like (${tone})`} />
			))}
		</div>
	),
}

export const DefaultVsPressed: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
			<IconToggle icon={Heart} tone='destructive' aria-label='Like (default)' />
			<IconToggle icon={Heart} tone='destructive' defaultPressed aria-label='Like (pressed)' />
		</div>
	),
}
