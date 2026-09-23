import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { DIALOG_CONTENT_CLASSES, DIALOG_OVERLAY_CLASSES } from '@/lib/dialog-classes.js'
import { CHROME_ICON_PROPS } from '@/lib/icon-props.js'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from '@pawks/icons'

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>
/**
 * General-purpose modal — forms, settings, editing, contextual detail.
 * For a confirmation the user must explicitly acknowledge, use AlertDialog
 * instead (a distinct Radix primitive, not a styling variant of this one).
 */
export const Dialog: FC<DialogProps> = (props) => <DialogPrimitive.Root data-slot='dialog' {...props} />

export type DialogTriggerProps = ComponentPropsWithRef<typeof DialogPrimitive.Trigger>
export const DialogTrigger: FC<DialogTriggerProps> = ({ ref, ...props }) => (
	<DialogPrimitive.Trigger ref={ref} data-slot='dialog-trigger' {...props} />
)

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>
export const DialogPortal: FC<DialogPortalProps> = (props) => <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />

export type DialogCloseProps = ComponentPropsWithRef<typeof DialogPrimitive.Close>
export const DialogClose: FC<DialogCloseProps> = ({ ref, ...props }) => <DialogPrimitive.Close ref={ref} data-slot='dialog-close' {...props} />

export type DialogOverlayProps = ComponentPropsWithRef<typeof DialogPrimitive.Overlay>

export const DialogOverlay: FC<DialogOverlayProps> = ({ className, ref, ...props }) => (
	<DialogPrimitive.Overlay ref={ref} data-slot='dialog-overlay' className={cn(DIALOG_OVERLAY_CLASSES, className)} {...props} />
)

export type DialogContentProps = ComponentPropsWithRef<typeof DialogPrimitive.Content>

export const DialogContent: FC<DialogContentProps> = ({ className, children, ref, ...props }) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content ref={ref} data-slot='dialog-content' className={cn(DIALOG_CONTENT_CLASSES, className)} {...props}>
			{children}
			<DialogClose className='absolute hover:cursor-pointer top-4 right-4 rounded-xs text-card-foreground/60 outline-none transition-colors hover:text-card-foreground focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none'>
				<X {...CHROME_ICON_PROPS} className='size-4' />
				<span className='sr-only'>Close</span>
			</DialogClose>
		</DialogPrimitive.Content>
	</DialogPortal>
)

export type DialogHeaderProps = ComponentProps<'div'>

export const DialogHeader: FC<DialogHeaderProps> = ({ className, ...props }) => (
	<div data-slot='dialog-header' className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
)

export type DialogFooterProps = ComponentProps<'div'>

export const DialogFooter: FC<DialogFooterProps> = ({ className, ...props }) => (
	<div data-slot='dialog-footer' className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
)

export type DialogTitleProps = ComponentPropsWithRef<typeof DialogPrimitive.Title>

export const DialogTitle: FC<DialogTitleProps> = ({ className, ref, ...props }) => (
	<DialogPrimitive.Title ref={ref} data-slot='dialog-title' className={cn('text-h3 text-card-foreground', className)} {...props} />
)

export type DialogDescriptionProps = ComponentPropsWithRef<typeof DialogPrimitive.Description>

export const DialogDescription: FC<DialogDescriptionProps> = ({ className, ref, ...props }) => (
	<DialogPrimitive.Description ref={ref} data-slot='dialog-description' className={cn('text-small text-muted-foreground', className)} {...props} />
)
