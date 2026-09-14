import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, type ButtonProps } from '@pawks/components/button'
import { Heart } from '@pawks/icons'

const TONES: NonNullable<ButtonProps['tone']>[] = ['primary', 'secondary', 'muted', 'accent', 'destructive', 'success', 'warning', 'info']
const APPEARANCES: NonNullable<ButtonProps['appearance']>[] = ['solid', 'outline', 'ghost', 'link']
const SIZES: NonNullable<ButtonProps['size']>[] = ['sm', 'md', 'lg']

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	argTypes: {
		tone: { control: 'select', options: TONES },
		appearance: { control: 'select', options: APPEARANCES },
		size: { control: 'select', options: SIZES },
	},
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: { tone: 'primary', appearance: 'solid', size: 'md', children: 'Click me' },
}

export const Muted: Story = {
	args: { tone: 'muted', appearance: 'solid', size: 'md', children: 'Click me' },
}

export const WithIcon: Story = {
	args: { tone: 'primary', appearance: 'solid', size: 'md', icon: Heart, children: 'Like' },
}

export const IconOnly: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
			{SIZES.map((size) => (
				<Button key={size} icon={Heart} iconOnly size={size} aria-label='Like' />
			))}
		</div>
	),
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
			{SIZES.map((size) => (
				<div key={size}>
					<h3 style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#888' }}>{size}</h3>
					<div style={{ display: 'grid', gap: '1rem' }}>
						{APPEARANCES.map((appearance) => (
							<div key={appearance} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
								{TONES.map((tone) => (
									<Button key={`${size}-${appearance}-${tone}`} tone={tone} appearance={appearance} size={size}>
										{tone}
									</Button>
								))}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	),
}
