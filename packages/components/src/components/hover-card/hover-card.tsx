import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

// A contextual preview shown on hover/focus of a trigger — richer than
// Tooltip (arbitrary composed content, not just short text) but still
// non-interactive-by-convention, unlike Popover. No Provider primitive,
// unlike Tooltip: `openDelay`/`closeDelay` are plain Root props (Radix
// defaults: 700ms/300ms). Radix owns hover/focus timing, positioning,
// collision detection, and portal/accessibility behavior; this only styles
// via `data-*`. Enter/exit motion is shared with DropdownMenu/Tooltip via
// `[data-slot='hover-card-content']` in styles/tailwind.css — Radix's own
// `data-state` here is plain "open"/"closed", unlike Tooltip's
// "delayed-open"/"instant-open" variants.

export type HoverCardProps = ComponentProps<typeof HoverCardPrimitive.Root>
export const HoverCard: FC<HoverCardProps> = (props) => <HoverCardPrimitive.Root data-slot='hover-card' {...props} />

export type HoverCardTriggerProps = ComponentPropsWithRef<typeof HoverCardPrimitive.Trigger>
export const HoverCardTrigger: FC<HoverCardTriggerProps> = ({ ref, ...props }) => (
	<HoverCardPrimitive.Trigger ref={ref} data-slot='hover-card-trigger' {...props} />
)

export type HoverCardContentProps = ComponentPropsWithRef<typeof HoverCardPrimitive.Content>

export const HoverCardContent: FC<HoverCardContentProps> = ({ className, sideOffset = 4, ref, ...props }) => (
	<HoverCardPrimitive.Portal>
		<HoverCardPrimitive.Content
			ref={ref}
			data-slot='hover-card-content'
			sideOffset={sideOffset}
			className={cn(
				'z-popover w-64 rounded-md border border-border bg-popover p-4 text-body text-popover-foreground shadow-md',
				'origin-(--radix-hover-card-content-transform-origin)',
				className,
			)}
			{...props}
		/>
	</HoverCardPrimitive.Portal>
)

export type HoverCardArrowProps = ComponentPropsWithRef<typeof HoverCardPrimitive.Arrow>
export const HoverCardArrow: FC<HoverCardArrowProps> = ({ className, ref, ...props }) => (
	<HoverCardPrimitive.Arrow ref={ref} data-slot='hover-card-arrow' className={cn('fill-popover', className)} {...props} />
)
