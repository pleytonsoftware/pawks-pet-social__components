import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CSSProperties } from 'react'

import { useEffect, useState } from 'react'

import { Button } from '@pawks/components/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@pawks/components/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@pawks/components/drawer'
import { Field, FieldLabel } from '@pawks/components/field'
import { Input } from '@pawks/components/input'

const meta: Meta<typeof Drawer> = {
	title: 'Atoms/Drawer',
	component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Edit profile</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

// Drawer owns no open state of its own — this is a real controlled
// component, proving `onOpenChange` (not internal state) drives visibility.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [open, setOpen] = useState(false)
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
					<Drawer open={open} onOpenChange={setOpen}>
						<DrawerTrigger render={<Button appearance='outline' />}>{open ? 'Close' : 'Open'} drawer</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Controlled drawer</DrawerTitle>
							</DrawerHeader>
						</DrawerContent>
					</Drawer>
					<span style={{ fontSize: '12px', color: '#888' }}>open: {String(open)}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const WithHeader: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Scheduled reports</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const WithDescription: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Scheduled reports</DrawerTitle>
					<DrawerDescription>Weekly snapshots, sent every Monday.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const WithFooter: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Discard changes?</DrawerTitle>
					<DrawerDescription>Your unsaved changes will be lost.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<Button tone='destructive'>Discard</Button>
					<DrawerClose render={<Button appearance='outline' />}>Keep editing</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
}

export const Form: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Edit profile</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Edit profile</DrawerTitle>
					<DrawerDescription>Update your profile information.</DrawerDescription>
				</DrawerHeader>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0 1rem' }}>
					<Field>
						<FieldLabel htmlFor='drawer-form-name'>Name</FieldLabel>
						<Input id='drawer-form-name' defaultValue='Pablo Leyton' />
					</Field>
					<Field>
						<FieldLabel htmlFor='drawer-form-username'>Username</FieldLabel>
						<Input id='drawer-form-username' defaultValue='pleyt' />
					</Field>
				</div>
				<DrawerFooter>
					<Button>Save changes</Button>
					<DrawerClose render={<Button appearance='outline' />}>Cancel</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
}

// The header and footer stay put — only this middle region scrolls, composed
// by the consumer rather than forced by the primitive (per the ticket's
// explicit non-goal: Drawer must not make the whole sheet scroll).
export const ScrollableContent: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Terms of service</DrawerTitle>
				</DrawerHeader>
				<div className='flex-1 overflow-y-auto p-4' style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
					{Array.from({ length: 40 }, (_, index) => (
						<p key={index} style={{ margin: 0 }}>
							Section {index + 1}: this is scrollable body content while the header and footer remain fixed in place.
						</p>
					))}
				</div>
				<DrawerFooter>
					<Button>I agree</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
}

export const TopDrawer: Story = {
	render: () => (
		<Drawer swipeDirection='up'>
			<DrawerTrigger render={<Button appearance='outline' />}>Open top drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Notifications</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const RightDrawer: Story = {
	render: () => (
		<Drawer swipeDirection='right'>
			<DrawerTrigger render={<Button appearance='outline' />}>Open right drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Cart</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const BottomDrawer: Story = {
	render: () => (
		<Drawer swipeDirection='down'>
			<DrawerTrigger render={<Button appearance='outline' />}>Open bottom drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Bottom sheet</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const LeftDrawer: Story = {
	render: () => (
		<Drawer swipeDirection='left'>
			<DrawerTrigger render={<Button appearance='outline' />}>Open left drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Navigation</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const SwipeHandle: Story = {
	render: () => (
		<Drawer showSwipeHandle>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Drag me down</DrawerTitle>
					<DrawerDescription>Side drawers usually skip the handle — bottom sheets benefit most.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const CustomHeight: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent style={{ height: '50vh' }}>
				<DrawerHeader>
					<DrawerTitle>Half-height drawer</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const CustomWidth: Story = {
	render: () => (
		<Drawer swipeDirection='right'>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent style={{ width: '28rem' }}>
				<DrawerHeader>
					<DrawerTitle>Wider side drawer</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

// `--drawer-inset` is a CSS variable, not a component prop — set it the same
// way `--card-spacing` is overridden on Card, directly via `style`.
export const CustomInset: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent style={{ '--drawer-inset': '1rem' } as CSSProperties}>
				<DrawerHeader>
					<DrawerTitle>Inset drawer</DrawerTitle>
					<DrawerDescription>Floats 1rem away from every edge instead of flush against it.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const SnapPoints: Story = {
	render: () => (
		<Drawer snapPoints={[0.25, 0.5, 1]}>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Drag between snap points</DrawerTitle>
					<DrawerDescription>25%, 50%, and fully expanded.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

// Buttons live in the header, not a `mt-auto` footer: a snap-point drawer's
// popup is always laid out at its full (--drawer-content-height:100dvh)
// height with the snap offset applied via `translate`, so a footer pinned
// to the bottom of that 100dvh column renders off-screen at any snap point
// below 100%. The header, being `shrink-0` at the flex-start, stays visible
// regardless of the active snap point — matching how real bottom-sheet UIs
// keep primary controls reachable at every snap state.
export const ControlledSnapPoint: Story = {
	render: () => {
		function ControlledSnapPointDemo() {
			const [snapPoint, setSnapPoint] = useState<number | string | null>(0.5)
			return (
				<Drawer snapPoints={[0.25, 0.5, 1]} snapPoint={snapPoint} onSnapPointChange={setSnapPoint}>
					<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Controlled snap point</DrawerTitle>
							<DrawerDescription>Current snap point: {String(snapPoint)}</DrawerDescription>
							<div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
								<Button size='sm' onClick={() => setSnapPoint(0.25)}>
									25%
								</Button>
								<Button size='sm' onClick={() => setSnapPoint(0.5)}>
									50%
								</Button>
								<Button size='sm' onClick={() => setSnapPoint(1)}>
									100%
								</Button>
							</div>
						</DrawerHeader>
					</DrawerContent>
				</Drawer>
			)
		}
		return <ControlledSnapPointDemo />
	},
}

// A DrawerTrigger inside one DrawerContent opens a second, independent
// Drawer. Base UI manages the stack (peek/scale on the parent) — no custom
// application state involved.
export const NestedDrawer: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Account settings</DrawerTitle>
				</DrawerHeader>
				<div style={{ padding: '0 1rem' }}>
					<Drawer>
						<DrawerTrigger render={<Button appearance='outline' />}>Change password</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Change password</DrawerTitle>
							</DrawerHeader>
						</DrawerContent>
					</Drawer>
				</div>
			</DrawerContent>
		</Drawer>
	),
}

export const NonModal: Story = {
	render: () => (
		<Drawer modal={false}>
			<DrawerTrigger render={<Button appearance='outline' />}>Open non-modal drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Non-modal drawer</DrawerTitle>
					<DrawerDescription>The rest of the page stays interactive while this is open.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

export const DisabledPointerDismissal: Story = {
	render: () => (
		<Drawer disablePointerDismissal>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Pointer dismissal disabled</DrawerTitle>
					<DrawerDescription>Clicking outside won't close this — use the button below instead.</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<DrawerClose render={<Button appearance='outline' />}>Close</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	),
}

// Base UI's positioning is RTL-aware automatically — no dir-specific prop
// needed on Drawer itself, just the ambient `dir` context.
export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<Drawer swipeDirection='right'>
				<DrawerTrigger render={<Button appearance='outline' />}>افتح الدرج</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>إعدادات الحساب</DrawerTitle>
						<DrawerDescription>محتوى الدرج في وضع RTL.</DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</div>
	),
}

// Drawer and Dialog stay semantically independent — this small demo-only
// hook (not part of the library) is the pattern a consumer app would write
// to switch between them, matching the ticket's explicit non-goal that
// Drawer itself must not auto-switch based on viewport.
function useIsDesktop(breakpointPx: number) {
	const [isDesktop, setIsDesktop] = useState(true)
	useEffect(() => {
		const query = window.matchMedia(`(min-width: ${breakpointPx}px)`)
		const update = () => setIsDesktop(query.matches)
		update()
		query.addEventListener('change', update)
		return () => query.removeEventListener('change', update)
	}, [breakpointPx])
	return isDesktop
}

export const ResponsiveDialogAndDrawer: Story = {
	render: () => {
		function ResponsiveDemo() {
			const isDesktop = useIsDesktop(768)

			if (isDesktop) {
				return (
					<Dialog>
						<DialogTrigger render={<Button appearance='outline' />}>Edit profile</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit profile (Dialog on desktop)</DialogTitle>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				)
			}

			return (
				<Drawer>
					<DrawerTrigger render={<Button appearance='outline' />}>Edit profile</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Edit profile (Drawer on mobile)</DrawerTitle>
						</DrawerHeader>
					</DrawerContent>
				</Drawer>
			)
		}
		return <ResponsiveDemo />
	},
}

export const CustomStyling: Story = {
	render: () => (
		<Drawer>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent style={{ borderColor: '#2a7e49' }}>
				<DrawerHeader>
					<DrawerTitle>Deployment succeeded</DrawerTitle>
					<DrawerDescription>Your changes are now live.</DrawerDescription>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}

// A callback ref, not a prop, marks the element — proves it forwards to the
// real DOM node. Not a `useRef` + `useEffect(..., [])` pair: `defaultOpen`
// defers the actual popup mount to a post-render Base UI effect (an
// SSR-hydration-safe pattern, same as Radix's Dialog), so a run-once effect
// can fire before DrawerContent exists at all. A callback ref has no such
// timing dependency — React calls it exactly when the node attaches.
export const RefForwarding: Story = {
	render: () => (
		<Drawer defaultOpen>
			<DrawerTrigger render={<Button appearance='outline' />}>Open drawer</DrawerTrigger>
			<DrawerContent
				ref={(node: HTMLDivElement | null) => {
					if (node) node.dataset.refForwarded = 'true'
				}}
			>
				<DrawerHeader>
					<DrawerTitle>Ref forwarding</DrawerTitle>
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	),
}
