import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { buttonVariants } from '@/components/button/button.js'
import { cn } from '@/lib/cn.js'
import { DIALOG_CONTENT_CLASSES, DIALOG_OVERLAY_CLASSES } from '@/lib/dialog-classes.js'

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

// A distinct Radix primitive from Dialog, not a styling variant of it — for
// confirmations the user must explicitly acknowledge (destructive or
// otherwise irreversible actions), not general modal content. No default
// close (×) button, unlike Dialog: dismissal only ever happens through
// Cancel/Action, never a casual dismiss. Radix owns focus trapping/
// restoration, Escape, modal behavior, and action/cancel semantics.

export type AlertDialogProps = ComponentProps<typeof AlertDialogPrimitive.Root>
export const AlertDialog: FC<AlertDialogProps> = (props) => <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />

export type AlertDialogTriggerProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Trigger>
export const AlertDialogTrigger: FC<AlertDialogTriggerProps> = ({ ref, ...props }) => (
	<AlertDialogPrimitive.Trigger ref={ref} data-slot='alert-dialog-trigger' {...props} />
)

export type AlertDialogPortalProps = ComponentProps<typeof AlertDialogPrimitive.Portal>
export const AlertDialogPortal: FC<AlertDialogPortalProps> = (props) => <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />

export type AlertDialogOverlayProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Overlay>

export const AlertDialogOverlay: FC<AlertDialogOverlayProps> = ({ className, ref, ...props }) => (
	<AlertDialogPrimitive.Overlay ref={ref} data-slot='alert-dialog-overlay' className={cn(DIALOG_OVERLAY_CLASSES, className)} {...props} />
)

export type AlertDialogContentProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Content>

export const AlertDialogContent: FC<AlertDialogContentProps> = ({ className, ref, ...props }) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content ref={ref} data-slot='alert-dialog-content' className={cn(DIALOG_CONTENT_CLASSES, className)} {...props} />
	</AlertDialogPortal>
)

export type AlertDialogHeaderProps = ComponentProps<'div'>

export const AlertDialogHeader: FC<AlertDialogHeaderProps> = ({ className, ...props }) => (
	<div data-slot='alert-dialog-header' className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
)

export type AlertDialogFooterProps = ComponentProps<'div'>

export const AlertDialogFooter: FC<AlertDialogFooterProps> = ({ className, ...props }) => (
	<div data-slot='alert-dialog-footer' className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)} {...props} />
)

export type AlertDialogTitleProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>

export const AlertDialogTitle: FC<AlertDialogTitleProps> = ({ className, ref, ...props }) => (
	<AlertDialogPrimitive.Title ref={ref} data-slot='alert-dialog-title' className={cn('text-h3 text-card-foreground', className)} {...props} />
)

export type AlertDialogDescriptionProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>

export const AlertDialogDescription: FC<AlertDialogDescriptionProps> = ({ className, ref, ...props }) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		data-slot='alert-dialog-description'
		className={cn('text-small text-muted-foreground', className)}
		{...props}
	/>
)

export type AlertDialogActionProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Action>

// Styled via `buttonVariants` (not the `Button` component itself) to avoid a
// hard dependency on Button while still matching its exact appearance — the
// consuming feature owns what the action actually does (e.g. `onClick`).
export const AlertDialogAction: FC<AlertDialogActionProps> = ({ className, ref, ...props }) => (
	<AlertDialogPrimitive.Action ref={ref} data-slot='alert-dialog-action' className={cn(buttonVariants(), className)} {...props} />
)

export type AlertDialogCancelProps = ComponentPropsWithRef<typeof AlertDialogPrimitive.Cancel>

export const AlertDialogCancel: FC<AlertDialogCancelProps> = ({ className, ref, ...props }) => (
	<AlertDialogPrimitive.Cancel
		ref={ref}
		data-slot='alert-dialog-cancel'
		className={cn(buttonVariants({ appearance: 'outline' }), className)}
		{...props}
	/>
)
