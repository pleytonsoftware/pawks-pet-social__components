import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading, type HeadingProps } from '@pawks/components/heading'

const VARIANTS: NonNullable<HeadingProps['variant']>[] = ['display', 'h1', 'h2', 'h3']

const meta: Meta<typeof Heading> = {
	title: 'Atoms/Heading',
	component: Heading,
	argTypes: {
		variant: { control: 'select', options: VARIANTS },
		as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
	},
}

export default meta
type Story = StoryObj<typeof Heading>

export const Display: Story = {
	args: { variant: 'display', children: 'Pawks Design System' },
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			{VARIANTS.map((variant) => (
				<Heading key={variant} variant={variant}>
					{variant} — The quick brown fox
				</Heading>
			))}
		</div>
	),
}
