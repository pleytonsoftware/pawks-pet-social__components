import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback } from '@pawks/components/avatar'
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from '@pawks/components/hover-card'

const meta: Meta<typeof HoverCard> = {
	title: 'Atoms/HoverCard',
	component: HoverCard,
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='/documentation'>Documentation</a>
			</HoverCardTrigger>
			<HoverCardContent>Additional context about the documentation link.</HoverCardContent>
		</HoverCard>
	),
}

export const UserPreview: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='/users/pablo'>@pablo</a>
			</HoverCardTrigger>
			<HoverCardContent>
				<div style={{ display: 'flex', gap: '0.75rem' }}>
					<Avatar>
						<AvatarFallback>PL</AvatarFallback>
					</Avatar>
					<div>
						<p style={{ margin: 0, fontWeight: 500 }}>Pablo Leyton</p>
						<p style={{ margin: 0, color: 'var(--muted-foreground)' }}>Software developer</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	),
}

export const LinkPreview: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='https://example.com'>example.com</a>
			</HoverCardTrigger>
			<HoverCardContent>
				<p style={{ margin: 0, fontWeight: 500 }}>Example Domain</p>
				<p style={{ margin: '0.25rem 0 0', color: 'var(--muted-foreground)' }}>This domain is for illustrative examples.</p>
			</HoverCardContent>
		</HoverCard>
	),
}

export const DifferentSides: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<HoverCard key={side}>
					<HoverCardTrigger asChild>
						<a href='#'>{side}</a>
					</HoverCardTrigger>
					<HoverCardContent side={side}>Side: {side}</HoverCardContent>
				</HoverCard>
			))}
		</div>
	),
}

export const DifferentAlignments: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '2rem' }}>
			{(['start', 'center', 'end'] as const).map((align) => (
				<HoverCard key={align}>
					<HoverCardTrigger asChild>
						<a href='#'>{align}</a>
					</HoverCardTrigger>
					<HoverCardContent align={align}>Align: {align}</HoverCardContent>
				</HoverCard>
			))}
		</div>
	),
}

export const CustomOffset: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='#'>Hover me</a>
			</HoverCardTrigger>
			<HoverCardContent sideOffset={16}>16px offset</HoverCardContent>
		</HoverCard>
	),
}

export const DelayedOpen: Story = {
	render: () => (
		<HoverCard openDelay={1000}>
			<HoverCardTrigger asChild>
				<a href='#'>Opens after 1s</a>
			</HoverCardTrigger>
			<HoverCardContent>Took a full second to appear.</HoverCardContent>
		</HoverCard>
	),
}

export const DelayedClose: Story = {
	render: () => (
		<HoverCard closeDelay={1000}>
			<HoverCardTrigger asChild>
				<a href='#'>Stays open after leaving</a>
			</HoverCardTrigger>
			<HoverCardContent>Closes a full second after the pointer leaves.</HoverCardContent>
		</HoverCard>
	),
}

export const CustomContent: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='#'>Release notes</a>
			</HoverCardTrigger>
			<HoverCardContent>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<p style={{ margin: 0, fontWeight: 500 }}>v2.4.0</p>
					<ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
						<li>New Card and HoverCard primitives</li>
						<li>Improved Dialog focus restoration</li>
					</ul>
				</div>
			</HoverCardContent>
		</HoverCard>
	),
}

export const KeyboardFocus: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='#'>Tab to me, then focus</a>
			</HoverCardTrigger>
			<HoverCardContent>Opened via keyboard focus, not just pointer hover.</HoverCardContent>
		</HoverCard>
	),
}

// Radix's Popper positioning is RTL-aware automatically — no dir-specific
// prop needed on HoverCard itself, just the ambient `dir` context.
export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<HoverCard>
				<HoverCardTrigger asChild>
					<a href='#'>مرر فوق هذا</a>
				</HoverCardTrigger>
				<HoverCardContent>محتوى المعاينة في وضع RTL.</HoverCardContent>
			</HoverCard>
		</div>
	),
}

export const WithArrow: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<a href='#'>Hover me</a>
			</HoverCardTrigger>
			<HoverCardContent>
				Additional context.
				<HoverCardArrow />
			</HoverCardContent>
		</HoverCard>
	),
}
