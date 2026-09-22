import type { Meta, StoryObj } from '@storybook/react-vite'

import { useEffect, useRef, useState } from 'react'

import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from '@pawks/components/accordion'
import { Badge } from '@pawks/components/badge'
import { Button } from '@pawks/components/button'
import { ChevronDown, Heart } from '@pawks/icons'

const meta: Meta<typeof Accordion> = {
	title: 'Atoms/Accordion',
	component: Accordion,
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
	render: () => (
		<Accordion type='single' collapsible style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						Is it accessible?
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Yes. It adheres to the WAI-ARIA accordion design pattern via Radix.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionHeader>
					<AccordionTrigger>
						Is it styled?
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Yes. It comes with default styles that match the design system.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionHeader>
					<AccordionTrigger>
						Is it animated?
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Yes. It's animated by default using the Radix content-size CSS variables.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

// type="single", not collapsible: once an item is open, clicking its trigger
// again keeps it open — only selecting a different item changes the state.
export const SingleItem: Story = {
	render: () => (
		<Accordion type='single' defaultValue='item-1' style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						First section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>This item can't be collapsed by clicking it again — only by opening another item.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionHeader>
					<AccordionTrigger>
						Second section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Opening this closes the first section.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const SingleCollapsible: Story = {
	render: () => (
		<Accordion type='single' collapsible defaultValue='item-1' style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						Collapsible section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Click this section's own trigger again to close it — that's what `collapsible` enables.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const Multiple: Story = {
	render: () => (
		<Accordion type='multiple' defaultValue={['item-1']} style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						First section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Multiple sections can be open at the same time.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionHeader>
					<AccordionTrigger>
						Second section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Opening this doesn't close the first one.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-3'>
				<AccordionHeader>
					<AccordionTrigger>
						Third section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Neither does this one.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const DefaultExpanded: Story = {
	render: () => (
		<Accordion type='single' collapsible defaultValue='item-2' style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						First section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Starts closed.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionHeader>
					<AccordionTrigger>
						Second section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>Starts open via defaultValue.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const DisabledItem: Story = {
	render: () => (
		<Accordion type='single' collapsible style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						Available section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>This one opens normally.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2' disabled>
				<AccordionHeader>
					<AccordionTrigger>
						Disabled section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>This content is unreachable while the item is disabled.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const DisabledRoot: Story = {
	render: () => (
		<Accordion type='single' collapsible disabled style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						First section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>The whole accordion is disabled, not just one item.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionHeader>
					<AccordionTrigger>
						Second section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>This one is unreachable too.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const Horizontal: Story = {
	render: () => (
		<Accordion type='single' collapsible orientation='horizontal' defaultValue='item-1' style={{ display: 'flex', alignItems: 'flex-start' }}>
			<AccordionItem value='item-1' style={{ borderBottom: 'none', borderRight: '1px solid var(--border)' }}>
				<AccordionHeader>
					<AccordionTrigger>First</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent style={{ width: '12rem' }}>
					Horizontal accordions animate width instead of height, and use left/right arrow keys.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2' style={{ borderBottom: 'none' }}>
				<AccordionHeader>
					<AccordionTrigger>Second</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent style={{ width: '12rem' }}>Each panel expands sideways.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const CustomTriggerContent: Story = {
	render: () => (
		<Accordion type='single' collapsible style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						<span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<Heart className='size-4' />
							Favorites
							<Badge>3</Badge>
						</span>
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>The trigger composes an icon and a badge alongside its label, not just text.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const CustomContent: Story = {
	render: () => (
		<Accordion type='single' collapsible defaultValue='item-1' style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						Team members
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>
					<ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
						<li>Pablo Leyton — Owner</li>
						<li>Ada Lovelace — Admin</li>
					</ul>
					<Button size='sm' style={{ marginTop: '0.75rem' }}>
						Invite member
					</Button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const AnimatedContent: Story = {
	render: () => (
		<Accordion type='single' collapsible style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						Short section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>A single line of content.</AccordionContent>
			</AccordionItem>
			<AccordionItem value='item-2'>
				<AccordionHeader>
					<AccordionTrigger>
						Long section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
						{Array.from({ length: 8 }, (_, index) => (
							<p key={index} style={{ margin: 0 }}>
								Paragraph {index + 1}: the panel animates to its own measured height, whether short or tall.
							</p>
						))}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [value, setValue] = useState('item-1')
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<Accordion type='single' collapsible value={value} onValueChange={setValue} style={{ width: '24rem' }}>
						<AccordionItem value='item-1'>
							<AccordionHeader>
								<AccordionTrigger>
									First section
									<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
								</AccordionTrigger>
							</AccordionHeader>
							<AccordionContent>Driven by external state, not internal.</AccordionContent>
						</AccordionItem>
						<AccordionItem value='item-2'>
							<AccordionHeader>
								<AccordionTrigger>
									Second section
									<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
								</AccordionTrigger>
							</AccordionHeader>
							<AccordionContent>Same here.</AccordionContent>
						</AccordionItem>
					</Accordion>
					<span style={{ fontSize: '12px', color: '#888' }}>value: {value || '(none)'}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

// A ref, not a prop, marks the element — proves it forwards to the real DOM
// node. Accordion's content stays in normal DOM flow (no portal, no deferred
// mount like Dialog's), so a plain `useRef` + `useEffect(..., [])` is safe
// here — nothing async gates when the node first attaches.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const itemRef = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (itemRef.current) itemRef.current.dataset.refForwarded = 'true'
			}, [])
			return (
				<Accordion type='single' collapsible style={{ width: '24rem' }}>
					<AccordionItem value='item-1' ref={itemRef}>
						<AccordionHeader>
							<AccordionTrigger>
								Ref forwarding
								<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
							</AccordionTrigger>
						</AccordionHeader>
						<AccordionContent>Content.</AccordionContent>
					</AccordionItem>
				</Accordion>
			)
		}
		return <RefForwardingDemo />
	},
}

// Radix keeps closed content mounted (`display:none`) by default already —
// `forceMount` goes further and skips that `display:none`, handing full
// visibility control to this component's own CSS (the height/overflow
// animation) instead of Radix's presence logic.
export const ForceMount: Story = {
	render: () => (
		<Accordion type='single' collapsible style={{ width: '24rem' }}>
			<AccordionItem value='item-1'>
				<AccordionHeader>
					<AccordionTrigger>
						Force-mounted section
						<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
					</AccordionTrigger>
				</AccordionHeader>
				<AccordionContent forceMount>This content stays mounted even while closed.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
}

export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<Accordion type='single' collapsible style={{ width: '24rem' }}>
				<AccordionItem value='item-1'>
					<AccordionHeader>
						<AccordionTrigger>
							هل يمكن الوصول إليه؟
							<ChevronDown className='size-4 shrink-0 text-muted-foreground' />
						</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent>نعم، يتبع نمط تصميم الأكورديون الخاص بـ WAI-ARIA.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	),
}
