import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import { useEffect, useRef } from 'react'

import { Button } from '@pawks/components/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@pawks/components/card'
import { Field, FieldLabel } from '@pawks/components/field'
import { Input } from '@pawks/components/input'
import { X } from '@pawks/icons'

const meta: Meta<typeof Card> = {
	title: 'Atoms/Card',
	component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Project Overview</CardTitle>
				<CardDescription>Track project activity and progress.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>3 tasks completed this week.</p>
			</CardContent>
		</Card>
	),
}

export const Small: Story = {
	render: () => (
		<Card size='sm' style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Project Overview</CardTitle>
				<CardDescription>Track project activity and progress.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>3 tasks completed this week.</p>
			</CardContent>
		</Card>
	),
}

export const WithHeader: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Scheduled reports</CardTitle>
			</CardHeader>
		</Card>
	),
}

export const WithDescription: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Scheduled reports</CardTitle>
				<CardDescription>Weekly snapshots, sent every Monday.</CardDescription>
			</CardHeader>
		</Card>
	),
}

export const WithAction: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Scheduled reports</CardTitle>
				<CardDescription>Weekly snapshots, sent every Monday.</CardDescription>
				<CardAction>
					<Button appearance='ghost' iconOnly size='sm' icon={X} aria-label='Remove' />
				</CardAction>
			</CardHeader>
		</Card>
	),
}

export const WithContent: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardContent>
				<p>A card can hold content on its own, with no header at all.</p>
			</CardContent>
		</Card>
	),
}

export const WithFooter: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Scheduled reports</CardTitle>
				<CardDescription>Weekly snapshots, sent every Monday.</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button>Set up</Button>
			</CardFooter>
		</Card>
	),
}

// The grid-cols/rows only activate when CardAction/CardDescription are
// actually present (has-data-[slot=...]) — no layout prop needed.
export const WithImage: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<img
				src='https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg'
				alt='Cat having a bath'
				style={{ display: 'block', width: '100%', height: '10rem', objectFit: 'cover' }}
			/>
			<CardHeader>
				<CardTitle>Cat's hygiene</CardTitle>
				<CardDescription>A practical talk about Cat's baths.</CardDescription>
			</CardHeader>
		</Card>
	),
}

export const Form: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Edit profile</CardTitle>
				<CardDescription>Update your profile information.</CardDescription>
			</CardHeader>
			<CardContent>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
					<Field>
						<FieldLabel htmlFor='card-form-name'>Name</FieldLabel>
						<Input id='card-form-name' defaultValue='Pablo Leyton' />
					</Field>
					<Field>
						<FieldLabel htmlFor='card-form-username'>Username</FieldLabel>
						<Input id='card-form-username' defaultValue='pleyt' />
					</Field>
				</div>
			</CardContent>
			<CardFooter>
				<Button>Save changes</Button>
			</CardFooter>
		</Card>
	),
}

// Overriding `--card-spacing` from the root re-syncs every section's inset
// and gap together — no per-section spacing props to keep in sync manually.
export const CustomSpacing: Story = {
	render: () => (
		<Card style={{ width: '20rem', '--card-spacing': '2rem' } as CSSProperties}>
			<CardHeader>
				<CardTitle>Scheduled reports</CardTitle>
				<CardDescription>Weekly snapshots, sent every Monday.</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Every section's padding and gap grew together.</p>
			</CardContent>
		</Card>
	),
}

export const CustomStyling: Story = {
	render: () => (
		<Card style={{ width: '20rem', borderColor: '#2a7e49' }}>
			<CardHeader>
				<CardTitle>Deployment succeeded</CardTitle>
				<CardDescription>Your changes are now live.</CardDescription>
			</CardHeader>
		</Card>
	),
}

export const FullWidth: Story = {
	render: () => (
		<Card style={{ width: '100%' }}>
			<CardHeader>
				<CardTitle>Full-width card</CardTitle>
				<CardDescription>Cards don't set their own width — the parent controls it.</CardDescription>
			</CardHeader>
		</Card>
	),
}

export const ComposedContent: Story = {
	render: () => (
		<Card style={{ width: '20rem' }}>
			<CardHeader>
				<CardTitle>Team members</CardTitle>
				<CardDescription>3 people have access.</CardDescription>
				<CardAction>
					<Button appearance='outline' size='sm'>
						Invite
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
					<li>Pablo Leyton — Owner</li>
					<li>Ada Lovelace — Admin</li>
					<li>Alan Turing — Member</li>
				</ul>
			</CardContent>
			<CardFooter>
				<Button appearance='outline'>Manage members</Button>
			</CardFooter>
		</Card>
	),
}

// The ref, not a prop, marks the element — proves it forwards to the real DOM node.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const ref = useRef<HTMLDivElement>(null)
			useEffect(() => {
				if (ref.current) ref.current.dataset.refForwarded = 'true'
			}, [])
			return (
				<Card ref={ref} style={{ width: '20rem' }}>
					<CardHeader>
						<CardTitle>Ref forwarding</CardTitle>
					</CardHeader>
				</Card>
			)
		}
		return <RefForwardingDemo />
	},
}
