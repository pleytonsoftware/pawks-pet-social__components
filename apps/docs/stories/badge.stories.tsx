import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge, type BadgeProps } from '@pawks/components/badge'
import { Check } from '@pawks/icons'

const TONES: NonNullable<BadgeProps['tone']>[] = ['primary', 'secondary', 'muted', 'accent', 'destructive', 'success', 'warning', 'info']
const APPEARANCES: NonNullable<BadgeProps['appearance']>[] = ['soft', 'solid', 'outline']
const SIZES: NonNullable<BadgeProps['size']>[] = ['sm', 'md', 'lg']

const meta: Meta<typeof Badge> = {
	title: 'Atoms/Badge',
	component: Badge,
	argTypes: {
		tone: { control: 'select', options: TONES },
		appearance: { control: 'select', options: APPEARANCES },
		size: { control: 'select', options: SIZES },
	},
}

export default meta
type Story = StoryObj<typeof Badge>

// AC1 — basic usage, default configuration (muted / soft / md).
export const Default: Story = {
	args: { children: 'Badge' },
}

// AC2 — every semantic tone, default (soft) appearance.
export const AllTones: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
			{TONES.map((tone) => (
				<Badge key={tone} tone={tone}>
					{tone}
				</Badge>
			))}
		</div>
	),
}

// AC3 — every appearance, across every tone.
export const AllAppearances: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			{APPEARANCES.map((appearance) => (
				<div key={appearance} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
					{TONES.map((tone) => (
						<Badge key={`${appearance}-${tone}`} tone={tone} appearance={appearance}>
							{tone}
						</Badge>
					))}
				</div>
			))}
		</div>
	),
}

// AC4 — every size.
export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
			{SIZES.map((size) => (
				<Badge key={size} size={size}>
					{size}
				</Badge>
			))}
		</div>
	),
}

// AC5 — icon before content, visually aligned.
export const WithIcon: Story = {
	args: { tone: 'success', icon: <Check />, children: 'Verified' },
}

// AC6 — status dot, colored by tone.
export const WithDot: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
			{TONES.map((tone) => (
				<Badge key={tone} tone={tone} dot>
					{tone}
				</Badge>
			))}
		</div>
	),
}

// Combinations — appearance × size × icon/dot together, matching the
// ticket's "combinations of the available options" documentation ask.
export const Combinations: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
			<Badge tone='success' appearance='solid' size='lg' icon={<Check />}>
				Verified
			</Badge>
			<Badge tone='destructive' appearance='outline' dot>
				Offline
			</Badge>
			<Badge tone='warning' appearance='soft' size='sm' dot>
				Pending
			</Badge>
			<Badge tone='info' appearance='solid' size='sm'>
				New
			</Badge>
		</div>
	),
}
