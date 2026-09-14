import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text, type TextProps } from '@pawks/components/text'

const VARIANTS: NonNullable<TextProps['variant']>[] = ['body', 'small', 'label', 'caption']

const meta: Meta<typeof Text> = {
	title: 'Atoms/Text',
	component: Text,
	argTypes: {
		variant: { control: 'select', options: VARIANTS },
		as: { control: 'select', options: ['span', 'p', 'div', 'label'] },
	},
}

export default meta
type Story = StoryObj<typeof Text>

export const Body: Story = {
	args: { variant: 'body', children: 'The quick brown fox jumps over the lazy dog.' },
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
			{VARIANTS.map((variant) => (
				<Text key={variant} variant={variant} as='div'>
					{variant} — The quick brown fox jumps over the lazy dog.
				</Text>
			))}
		</div>
	),
}
