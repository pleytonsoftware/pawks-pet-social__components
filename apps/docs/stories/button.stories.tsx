import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@pawks/components/button'

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: { variant: 'primary', size: 'md', children: 'Click me' },
}

export const Muted: Story = {
	args: { variant: 'muted', size: 'md', children: 'Click me' },
}
