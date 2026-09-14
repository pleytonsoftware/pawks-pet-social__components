import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon, type IconProps } from '@pawks/components/icon'
import { Heart, HorseHead, PawksIconTemplate } from '@pawks/icons'

const SIZES: NonNullable<IconProps['size']>[] = ['xs', 'sm', 'md', 'lg', 'xl']

const meta: Meta<typeof Icon> = {
	title: 'Atoms/Icon',
	component: Icon,
	argTypes: {
		size: { control: 'select', options: SIZES },
	},
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
	args: { IconComponent: Heart, size: 'md' },
}

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			{SIZES.map((size) => (
				<Icon key={size} IconComponent={Heart} size={size} />
			))}
		</div>
	),
}

export const AllSources: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<Icon IconComponent={Heart} size='lg' />
			<Icon IconComponent={HorseHead} size='lg' />
			<Icon IconComponent={PawksIconTemplate} size='lg' />
		</div>
	),
}
