import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef } from 'react'

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@pawks/components/bubble'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@pawks/components/tooltip'

const meta: Meta<typeof Bubble> = {
	title: 'Atoms/Bubble',
	component: Bubble,
}

export default meta
type Story = StoryObj<typeof Bubble>

export const Default: Story = {
	render: () => (
		<Bubble>
			<BubbleContent>Hey, how's Luna doing after her checkup?</BubbleContent>
		</Bubble>
	),
}

export const Variants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '24rem' }}>
			<Bubble variant='default'>
				<BubbleContent>default</BubbleContent>
			</Bubble>
			<Bubble variant='secondary'>
				<BubbleContent>secondary</BubbleContent>
			</Bubble>
			<Bubble variant='muted'>
				<BubbleContent>muted</BubbleContent>
			</Bubble>
			<Bubble variant='tinted'>
				<BubbleContent>tinted</BubbleContent>
			</Bubble>
			<Bubble variant='outline'>
				<BubbleContent>outline</BubbleContent>
			</Bubble>
			<Bubble variant='ghost'>
				<BubbleContent>ghost</BubbleContent>
			</Bubble>
			<Bubble variant='destructive'>
				<BubbleContent>destructive</BubbleContent>
			</Bubble>
		</div>
	),
}

export const AlignStart: Story = {
	render: () => (
		<div style={{ width: '24rem' }}>
			<Bubble align='start'>
				<BubbleContent>Aligned to the start — the other participant's message.</BubbleContent>
			</Bubble>
		</div>
	),
}

export const AlignEnd: Story = {
	render: () => (
		<div style={{ width: '24rem' }}>
			<Bubble align='end' variant='default'>
				<BubbleContent>Aligned to the end — your own message.</BubbleContent>
			</Bubble>
		</div>
	),
}

export const ShortContent: Story = {
	render: () => (
		<Bubble align='end'>
			<BubbleContent>👍</BubbleContent>
		</Bubble>
	),
}

export const LongContent: Story = {
	render: () => (
		<div style={{ width: '28rem' }}>
			<Bubble>
				<BubbleContent>
					Just took Luna to the vet for her annual checkup — the vet said her weight is right where it should be and her teeth look great
					for a five-year-old cat. She was not thrilled about the car ride there, but she forgave us the second we got home and gave her a
					treat.
				</BubbleContent>
			</Bubble>
		</div>
	),
}

// `ghost` drops the max-width constraint so assistant/rich content can use
// the full available conversation width instead of the ~80% chat default.
export const GhostFullWidth: Story = {
	render: () => (
		<div style={{ width: '28rem' }}>
			<Bubble variant='ghost'>
				<BubbleContent>This content stretches to the full available width instead of the ~80% chat default.</BubbleContent>
			</Bubble>
		</div>
	),
}

export const RichContent: Story = {
	render: () => (
		<div style={{ width: '32rem' }}>
			<Bubble variant='ghost'>
				<BubbleContent asChild>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						<p style={{ margin: 0 }}>Here's a quick summary of Luna's checkup:</p>
						<ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
							<li>Weight: within healthy range</li>
							<li>Teeth: no concerns</li>
							<li>Next visit: in 12 months</li>
						</ul>
						<code style={{ fontSize: '12px', background: 'var(--muted)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
							next_checkup: 2027-09
						</code>
					</div>
				</BubbleContent>
			</Bubble>
		</div>
	),
}

export const InteractiveButton: Story = {
	render: () => (
		<Bubble align='start'>
			<BubbleContent asChild variant='outline'>
				<button type='button' onClick={() => alert('Bubble clicked')}>
					Tap to retry sending this message
				</button>
			</BubbleContent>
		</Bubble>
	),
}

export const InteractiveLink: Story = {
	render: () => (
		<Bubble>
			<BubbleContent asChild variant='tinted'>
				<a href='https://example.com' target='_blank' rel='noreferrer'>
					https://example.com/luna-checkup-photos
				</a>
			</BubbleContent>
		</Bubble>
	),
}

export const WithReactions: Story = {
	render: () => (
		<div style={{ width: '20rem' }}>
			<Bubble align='start'>
				<BubbleContent>She's doing great, thanks for asking!</BubbleContent>
				<BubbleReactions role='img' aria-label='paw reactions'>
					🐾
				</BubbleReactions>
			</Bubble>
		</div>
	),
}

export const InteractiveReactions: Story = {
	render: () => (
		<div style={{ width: '20rem' }}>
			<Bubble align='start'>
				<BubbleContent>She's doing great, thanks for asking!</BubbleContent>
				<BubbleReactions>
					<button type='button' aria-label='React with paw, 2 reactions'>
						🐾 2
					</button>
					<button type='button' aria-label='Add reaction'>
						+
					</button>
				</BubbleReactions>
			</Bubble>
		</div>
	),
}

export const TopReactions: Story = {
	render: () => (
		<div style={{ width: '20rem', paddingTop: '1.5rem' }}>
			<Bubble align='end'>
				<BubbleContent>Same time next week?</BubbleContent>
				<BubbleReactions side='top' role='img' aria-label='1 heart reaction'>
					🫶
				</BubbleReactions>
			</Bubble>
		</div>
	),
}

export const GroupedBubbles: Story = {
	render: () => (
		<div style={{ width: '20rem' }}>
			<BubbleGroup>
				<Bubble align='start'>
					<BubbleContent>Hey!</BubbleContent>
				</Bubble>
				<Bubble align='start'>
					<BubbleContent>How's Luna doing after her checkup?</BubbleContent>
				</Bubble>
				<Bubble align='start'>
					<BubbleContent>Let me know if you need anything 🐾</BubbleContent>
				</Bubble>
			</BubbleGroup>
		</div>
	),
}

export const NestedComposition: Story = {
	render: () => (
		<div style={{ width: '20rem' }}>
			<Bubble align='start'>
				<BubbleContent>Good boy!</BubbleContent>
				<BubbleReactions role='img' aria-label='1 paw reaction'>
					🐾
				</BubbleReactions>
			</Bubble>
		</div>
	),
}

// `Bubble` has no built-in Collapsible — it composes with whatever the
// consuming app uses for disclosure. Native `<details>`/`<summary>` shown
// here as the minimal composition, since this library doesn't ship one yet.
export const CollapsibleContent: Story = {
	render: () => (
		<div style={{ width: '24rem' }}>
			<Bubble variant='outline'>
				<BubbleContent asChild>
					<details>
						<summary style={{ cursor: 'pointer' }}>Show full checkup notes</summary>
						<p style={{ marginBottom: 0 }}>Weight within range, teeth in good condition, next visit scheduled in 12 months.</p>
					</details>
				</BubbleContent>
			</Bubble>
		</div>
	),
}

// A comment on a post — the same variant/align system, used outside a chat
// context. Bubble stays neutral about the surrounding post/author UI.
export const AsPostComment: Story = {
	render: () => (
		<div style={{ width: '24rem' }}>
			<Bubble align='start' variant='muted'>
				<BubbleContent>Luna looks so happy in this photo! What's her favorite treat?</BubbleContent>
			</Bubble>
		</div>
	),
}

// A private note/thought — not part of any conversation. Same primitive,
// a quieter variant, no alignment-implied sender.
export const AsThought: Story = {
	render: () => (
		<div style={{ width: '20rem' }}>
			<Bubble variant='tinted'>
				<BubbleContent>Remember to ask the vet about switching her food next visit.</BubbleContent>
			</Bubble>
		</div>
	),
}

export const WithTooltipMetadata: Story = {
	render: () => (
		<TooltipProvider>
			<Bubble align='end'>
				<Tooltip>
					<TooltipTrigger asChild>
						<BubbleContent asChild>
							<button type='button'>Delivered a moment ago</button>
						</BubbleContent>
					</TooltipTrigger>
					<TooltipContent>Sent at 4:32 PM · Delivered</TooltipContent>
				</Tooltip>
			</Bubble>
		</TooltipProvider>
	),
}

export const Rtl: Story = {
	render: () => (
		<div dir='rtl' style={{ width: '100%' }}>
			<Bubble align='start'>
				<BubbleContent>كيف حال لونا بعد الفحص؟</BubbleContent>
				<BubbleReactions role='img' aria-label='1 paw reaction'>
					🐾
				</BubbleReactions>
			</Bubble>
		</div>
	),
}

// A ref, not a prop, marks the element — proves it forwards to the real DOM
// node. Bubble renders synchronously (no portal, no deferred mount), so a
// plain `useRef` + `useEffect(..., [])` is safe here.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const bubbleRef = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (bubbleRef.current) bubbleRef.current.dataset.refForwarded = 'true'
			}, [])
			return (
				<Bubble ref={bubbleRef}>
					<BubbleContent>Ref forwarding</BubbleContent>
				</Bubble>
			)
		}
		return <RefForwardingDemo />
	},
}
