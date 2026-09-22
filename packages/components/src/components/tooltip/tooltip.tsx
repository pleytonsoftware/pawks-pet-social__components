import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

export type TooltipProviderProps = ComponentProps<typeof TooltipPrimitive.Provider>
export const TooltipProvider: FC<TooltipProviderProps> = (props) => <TooltipPrimitive.Provider data-slot='tooltip-provider' {...props} />

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root>
/**
 * Supplementary, non-interactive information only — not a general-purpose
 * popup (use Popover for richer/interactive content). Every `Tooltip` needs
 * a `TooltipProvider` ancestor; Radix throws otherwise.
 */
export const Tooltip: FC<TooltipProps> = (props) => <TooltipPrimitive.Root data-slot='tooltip' {...props} />

export type TooltipTriggerProps = ComponentPropsWithRef<typeof TooltipPrimitive.Trigger>
export const TooltipTrigger: FC<TooltipTriggerProps> = ({ ref, ...props }) => (
	<TooltipPrimitive.Trigger ref={ref} data-slot='tooltip-trigger' {...props} />
)

export type TooltipContentProps = ComponentPropsWithRef<typeof TooltipPrimitive.Content>

export const TooltipContent: FC<TooltipContentProps> = ({ className, sideOffset = 4, children, ref, ...props }) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			ref={ref}
			data-slot='tooltip-content'
			sideOffset={sideOffset}
			className={cn(
				'z-popover w-fit rounded-md bg-primary px-3 py-1.5 text-caption text-primary-foreground shadow-md',
				'origin-(--radix-tooltip-content-transform-origin)',
				className,
			)}
			{...props}
		>
			{children}
		</TooltipPrimitive.Content>
	</TooltipPrimitive.Portal>
)

export type TooltipArrowProps = ComponentPropsWithRef<typeof TooltipPrimitive.Arrow>
export const TooltipArrow: FC<TooltipArrowProps> = ({ className, ref, ...props }) => (
	<TooltipPrimitive.Arrow ref={ref} data-slot='tooltip-arrow' className={cn('fill-primary', className)} {...props} />
)
