import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as PopoverPrimitive from '@radix-ui/react-popover'

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>
/** Interactive, richer content than Tooltip/HoverCard — anchored, portaled, and focusable, unlike HoverCard's non-interactive-by-convention preview. */
export const Popover: FC<PopoverProps> = (props) => <PopoverPrimitive.Root data-slot='popover' {...props} />

export type PopoverTriggerProps = ComponentPropsWithRef<typeof PopoverPrimitive.Trigger>
export const PopoverTrigger: FC<PopoverTriggerProps> = ({ ref, ...props }) => (
	<PopoverPrimitive.Trigger ref={ref} data-slot='popover-trigger' {...props} />
)

export type PopoverAnchorProps = ComponentPropsWithRef<typeof PopoverPrimitive.Anchor>
/**
 * Anchors positioning to a different element than the trigger — optional,
 * only needed when trigger and anchor should differ. Pair with a controlled
 * `open`/`onOpenChange` on `Popover`, not a sibling `PopoverTrigger`: Radix
 * (1.1.23) has a real timing bug where both mounting together race to
 * register as the anchor, leaving it stuck at a 0×0 rect.
 */
export const PopoverAnchor: FC<PopoverAnchorProps> = ({ ref, ...props }) => (
	<PopoverPrimitive.Anchor ref={ref} data-slot='popover-anchor' {...props} />
)

export type PopoverContentProps = ComponentPropsWithRef<typeof PopoverPrimitive.Content>

export const PopoverContent: FC<PopoverContentProps> = ({ className, sideOffset = 4, ref, ...props }) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			ref={ref}
			data-slot='popover-content'
			sideOffset={sideOffset}
			className={cn(
				'z-popover w-72 rounded-md border border-border bg-popover p-2.5 text-body text-popover-foreground shadow-md',
				'origin-(--radix-popover-content-transform-origin)',
				className,
			)}
			{...props}
		/>
	</PopoverPrimitive.Portal>
)

export type PopoverHeaderProps = ComponentProps<'div'>
export const PopoverHeader: FC<PopoverHeaderProps> = ({ className, ...props }) => (
	<div data-slot='popover-header' className={cn('flex flex-col gap-1', className)} {...props} />
)

export type PopoverTitleProps = ComponentProps<'h2'>
export const PopoverTitle: FC<PopoverTitleProps> = ({ className, ...props }) => (
	<h2 data-slot='popover-title' className={cn('text-h3', className)} {...props} />
)

export type PopoverDescriptionProps = ComponentProps<'p'>
export const PopoverDescription: FC<PopoverDescriptionProps> = ({ className, ...props }) => (
	<p data-slot='popover-description' className={cn('text-small text-muted-foreground', className)} {...props} />
)
