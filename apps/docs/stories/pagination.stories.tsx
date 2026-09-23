import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { useEffect, useRef } from 'react'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@pawks/components/pagination'

const meta: Meta<typeof Pagination> = {
	title: 'Atoms/Pagination',
	component: Pagination,
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href='/users?page=1' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=1' isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=2'>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=3'>3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href='/users?page=2' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const ActivePage: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationLink href='/users?page=1'>1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=2' isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=3'>3</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const PreviousAndNext: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href='/users?page=1' />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href='/users?page=3' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const ManyPagesWithEllipsis: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href='/users?page=41' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=1'>1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=41'>41</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=42' isActive>
						42
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=43'>43</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=100'>100</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href='/users?page=43' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const SimplePageNumbers: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationLink href='/users?page=1' isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=2'>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=3'>3</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

// Cursor-based pagination: no page numbers, just previous/next against
// opaque cursor URLs — no cursor-specific API needed on top of the base
// PaginationPrevious/PaginationNext.
export const PreviousNextOnly: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href='/feed?cursor=before-abc123' />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href='/feed?cursor=after-abc123' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

// No `disabled` prop exists on purpose — anchors have no native disabled
// semantics. Consumers omit `href` and set `aria-disabled` themselves.
export const DisabledPrevious: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious aria-disabled='true' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=1' isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=2'>2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href='/users?page=2' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const DisabledNext: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href='/users?page=9' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=9'>9</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/users?page=10' isActive>
						10
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext aria-disabled='true' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const CustomPreviousNextText: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href='/usuarios?pagina=1' text='Anterior' />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href='/usuarios?pagina=2' isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href='/usuarios?pagina=3' text='Siguiente' />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

export const Rtl: Story = {
	render: () => (
		<div dir='rtl'>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href='/users?page=1' text='السابق' />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href='/users?page=1'>١</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href='/users?page=2' isActive>
							٢
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href='/users?page=3' text='التالي' />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	),
}

// Previous/Next text is hidden below the `sm` breakpoint via CSS
// (`hidden sm:inline`) while the chevron and accessible label stay present.
export const ResponsiveLayout: Story = {
	render: () => (
		<div style={{ width: '20rem' }}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href='/users?page=1' />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href='/users?page=1'>1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href='/users?page=2' isActive>
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href='/users?page=3'>3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href='/users?page=3' />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	),
}

// `asChild` swaps the anchor for a router's own link component (e.g. Next.js
// `Link`) via Slot — a plain component standing in for one here.
function FakeRouterLink({ to, children, ...props }: { to: string; children: ReactNode }) {
	return (
		<a href={to} data-fake-router-link='true' {...props}>
			{children}
		</a>
	)
}

export const CustomLinkRendering: Story = {
	render: () => (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationLink asChild isActive>
						<FakeRouterLink to='/users?page=1'>1</FakeRouterLink>
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink asChild>
						<FakeRouterLink to='/users?page=2'>2</FakeRouterLink>
					</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	),
}

// A ref, not a prop, marks the element — proves it forwards to the real DOM
// node. Pagination renders synchronously (no portal, no deferred mount), so
// a plain `useRef` + `useEffect(..., [])` is safe here.
export const RefForwarding: Story = {
	render: () => {
		function RefForwardingDemo() {
			const navRef = useRef<HTMLElement>(null)
			useEffect(() => {
				if (navRef.current) navRef.current.dataset.refForwarded = 'true'
			}, [])
			return (
				<Pagination ref={navRef}>
					<PaginationContent>
						<PaginationItem>
							<PaginationLink href='/users?page=1' isActive>
								1
							</PaginationLink>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)
		}
		return <RefForwardingDemo />
	},
}
