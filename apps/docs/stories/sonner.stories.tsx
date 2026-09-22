import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback, AvatarFallbackPersonImage, AvatarImage, Card, CardContent } from '@pawks/components'
import { Button } from '@pawks/components/button'
import { Toaster, toast } from '@pawks/components/sonner'

// `Toaster` itself has no props being demonstrated here — it's mounted once
// globally in .storybook/preview.tsx, exactly matching the ticket's own
// "mounted once at the application root" guidance. Every story below
// demonstrates Sonner's own imperative `toast()` API directly, not a
// design-system wrapper of it — there isn't one to wrap.
const meta: Meta = {
	title: 'Atoms/Sonner',
}

export default meta
type Story = StoryObj

export const Default: Story = {
	render: () => <Button onClick={() => toast('Event has been created.')}>Show toast</Button>,
}

export const Success: Story = {
	render: () => <Button onClick={() => toast.success('Saved successfully.')}>Show success toast</Button>,
}

export const Info: Story = {
	render: () => <Button onClick={() => toast.info('A new version is available.')}>Show info toast</Button>,
}

export const Warning: Story = {
	render: () => <Button onClick={() => toast.warning('Your session will expire soon.')}>Show warning toast</Button>,
}

export const ErrorToast: Story = {
	render: () => <Button onClick={() => toast.error('Something went wrong.')}>Show error toast</Button>,
}

// The lifecycle (loading → success/error) is entirely Sonner's — this story
// just triggers it, it doesn't manage any of the three states itself.
export const PromiseToast: Story = {
	render: () => {
		function saveData() {
			return new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: 'profile.json' }), 1500))
		}
		return (
			<Button
				onClick={() =>
					toast.promise(saveData(), {
						loading: 'Saving…',
						success: (data: { name: string }) => `${data.name} saved.`,
						error: 'Failed to save.',
					})
				}
			>
				Show promise toast
			</Button>
		)
	},
}

export const CustomDescription: Story = {
	render: () => (
		<Button
			onClick={() =>
				toast('Event has been created.', {
					description: 'Monday, January 3rd at 6:00pm',
				})
			}
		>
			Show toast with description
		</Button>
	),
}

export const WithAction: Story = {
	render: () => (
		<Button
			onClick={() =>
				toast('File deleted', {
					action: {
						label: 'Undo',
						onClick: () => toast('Undo clicked'),
					},
				})
			}
		>
			Show toast with action
		</Button>
	),
}

export const WithCloseButton: Story = {
	render: () => <Button onClick={() => toast('Dismissible toast', { closeButton: true })}>Show toast with close button</Button>,
}

// Sonner accepts arbitrary React content via `toast.custom` — not restricted
// to strings, and this wrapper doesn't constrain or re-type it further.
export const CustomContent: Story = {
	render: () => (
		<Button
			onClick={() =>
				toast.custom(() => (
					<Card>
						<CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
							<Avatar>
								<AvatarImage src='https://i.pravatar.cc/128?img=12' />
								<AvatarFallback>
									<AvatarFallbackPersonImage />
								</AvatarFallback>
							</Avatar>
							<div>
								<p style={{ margin: 0, fontWeight: 500 }}>Pablo Leyton</p>
								<p style={{ margin: 0, color: 'var(--muted-foreground)' }}>commented on your post</p>
							</div>
						</CardContent>
					</Card>
				))
			}
		>
			Show custom content toast
		</Button>
	),
}

// The global Toaster has no position override, so each button demonstrates
// Sonner's own per-toast `position` option — one Toaster instance can render
// toasts at several positions simultaneously, no separate Toaster needed.
export const DifferentPositions: Story = {
	render: () => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
			{(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((position) => (
				<Button key={position} appearance='outline' onClick={() => toast(`Toast at ${position}`, { position })}>
					{position}
				</Button>
			))}
		</div>
	),
}

// The toast's colors come entirely from CSS variables pointing at this
// design system's own tokens (--popover, --success, --destructive, etc.),
// which already flip under `.dark` with no JavaScript — toggle Storybook's
// own Mode toolbar control to see it adapt, the same way every other
// component in this library does.
export const ThemeIntegration: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
			<Button onClick={() => toast('Default toast')}>Default</Button>
			<Button onClick={() => toast.success('Success toast')}>Success</Button>
			<Button onClick={() => toast.error('Error toast')}>Error</Button>
			<span style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>Toggle the Mode toolbar control above to compare light/dark.</span>
		</div>
	),
}

export const MultipleToasts: Story = {
	render: () => (
		<Button
			onClick={() => {
				toast('First notification')
				toast.success('Second notification')
				toast.warning('Third notification')
			}}
		>
			Show multiple toasts
		</Button>
	),
}

// A ref, not a prop, marks the element — proves it forwards to the real DOM
// node. A callback ref, not `useRef` + `useEffect(..., [])`: Sonner's own
// toaster root only mounts once the first toast is created (see
// sonner.tsx's comment), so a run-once effect would fire while the ref is
// still null. This story mounts its own local `Toaster`, scoped to its own
// `id`/`toasterId` so its toast doesn't also broadcast to the global
// instance in .storybook/preview.tsx — purely to exercise the ref in
// isolation; real usage is the single global, unscoped instance.
export const RefForwarding: Story = {
	render: () => (
		<div>
			<Toaster
				id='ref-forwarding-demo'
				ref={(node: HTMLElement | null) => {
					if (node) node.dataset.refForwarded = 'true'
				}}
			/>
			<Button onClick={() => toast('Ref forwarding', { toasterId: 'ref-forwarding-demo' })}>Show toast</Button>
		</div>
	),
}
