import type { Meta, StoryObj } from '@storybook/react-vite'

import {
	Avatar,
	AvatarFallback,
	AvatarFallbackPersonImage,
	AvatarFallbackCatImage,
	AvatarFallbackDogImage,
	AvatarGroup,
	AvatarImage,
	type AvatarProps,
} from '@pawks/components/avatar'
import { Icon } from '@pawks/components/icon'
import { PawPrint, UserRound } from '@pawks/icons'

const SIZES: NonNullable<AvatarProps['size']>[] = ['xs', 'sm', 'md', 'lg', 'xl']
const TONES: NonNullable<AvatarProps['tone']>[] = ['primary', 'secondary', 'muted', 'accent', 'destructive', 'success', 'warning', 'info']

// i.pravatar.cc/{size} serves a random face per load; pinning `img` (1-70)
// keeps these stories deterministic for Playwright's screenshot diffing.
const AVATAR_SRC = 'https://i.pravatar.cc/128?img=12'

const meta: Meta<typeof Avatar> = {
	title: 'Atoms/Avatar',
	component: Avatar,
	argTypes: {
		size: { control: 'select', options: SIZES },
		tone: { control: 'select', options: TONES },
	},
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
	render: (args: AvatarProps) => (
		<Avatar {...args}>
			<AvatarImage src={AVATAR_SRC} alt='Luna' />
			<AvatarFallback>LU</AvatarFallback>
		</Avatar>
	),
	args: { size: 'md' },
}

export const Fallback: Story = {
	render: (args: AvatarProps) => (
		<Avatar {...args}>
			<AvatarImage src='https://broken-image-url.invalid/missing.jpg' alt='Luna' />
			<AvatarFallback>LU</AvatarFallback>
		</Avatar>
	),
	args: { size: 'md' },
}

export const AllSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			{SIZES.map((size) => (
				<Avatar key={size} size={size}>
					<AvatarImage src={AVATAR_SRC} alt='Luna' />
					<AvatarFallback>LU</AvatarFallback>
				</Avatar>
			))}
		</div>
	),
}

export const ColoredBorders: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
			{TONES.map((tone) => (
				<Avatar key={tone} tone={tone} size='lg'>
					<AvatarImage src={AVATAR_SRC} alt='Luna' />
					<AvatarFallback>LU</AvatarFallback>
				</Avatar>
			))}
		</div>
	),
}

// Exploratory comparison — no AvatarImage on any of these, so the
// fallback always renders (deterministic, no network timing dependency).
export const FallbackVariants: Story = {
	args: {
		size: 'md',
	},

	render: () => (
		<div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
			{[
				{ label: 'Initials', content: <AvatarFallback>LU</AvatarFallback> },
				{
					label: 'Icon — person',
					content: (
						<AvatarFallback>
							<Icon IconComponent={UserRound} size='lg' />
						</AvatarFallback>
					),
				},
				{
					label: 'Icon — pet',
					content: (
						<AvatarFallback>
							<Icon IconComponent={PawPrint} fill='currentColor' stroke='currentColor' size='xl' />
						</AvatarFallback>
					),
				},
				{
					label: 'Image — person',
					content: (
						<AvatarFallback>
							<AvatarFallbackPersonImage />
						</AvatarFallback>
					),
				},
				{
					label: 'Image — pet (Cat)',
					content: (
						<AvatarFallback>
							<AvatarFallbackCatImage />
						</AvatarFallback>
					),
				},
				{
					label: 'Image — pet (Dog)',
					content: (
						<AvatarFallback>
							<AvatarFallbackDogImage />
						</AvatarFallback>
					),
				},
			].map(({ label, content }) => (
				<div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
					<Avatar size='xl'>{content}</Avatar>
					<span style={{ fontSize: '11px', color: '#888' }}>{label}</span>
				</div>
			))}
		</div>
	),
}

const GROUP_MEMBERS = [12, 13, 14, 15, 16].map((img) => `https://i.pravatar.cc/128?img=${img}`)

export const Group: Story = {
	render: () => (
		<AvatarGroup size='lg'>
			{GROUP_MEMBERS.map((src, index) => (
				<Avatar key={src}>
					<AvatarImage src={src} alt={`Member ${index + 1}`} />
					<AvatarFallback>{index + 1}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
	),
}

export const GroupCustomMax: Story = {
	render: () => (
		<AvatarGroup size='lg' max={4}>
			{GROUP_MEMBERS.map((src, index) => (
				<Avatar key={src}>
					<AvatarImage src={src} alt={`Member ${index + 1}`} />
					<AvatarFallback>{index + 1}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
	),
}
