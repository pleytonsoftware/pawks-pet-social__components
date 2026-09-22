import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

export const alertVariants = cva(
	cn(
		'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border border-border bg-card px-4 py-3 text-body text-card-foreground',
		'has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
		'has-[[data-slot=alert-action]]:pr-10',
	),
	{
		variants: {
			variant: {
				default: '',
				destructive: 'border-destructive/50 text-destructive',
			},
		},
		defaultVariants: { variant: 'default' },
	},
)

export type AlertProps = ComponentPropsWithRef<'div'> & VariantProps<typeof alertVariants>

/**
 * Persistent inline feedback — not a toast, not a modal.
 * No default `role`; pass `role='alert'`/`role='status'` (DESIGN §20) when warranted.
 * Icon column and action padding reserve themselves automatically (`has-[>svg]`/`has-[[data-slot=alert-action]]`) — no icon/action props needed.
 */
export const Alert: FC<AlertProps> = ({ className, variant, ref, ...props }) => (
	<div ref={ref} data-slot='alert' className={cn(alertVariants({ variant }), className)} {...props} />
)

export type AlertTitleProps = ComponentPropsWithRef<'div'>

export const AlertTitle: FC<AlertTitleProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='alert-title' className={cn('col-start-2 text-label font-medium', className)} {...props} />
)

export type AlertDescriptionProps = ComponentPropsWithRef<'div'>

export const AlertDescription: FC<AlertDescriptionProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='alert-description' className={cn('col-start-2 text-small text-muted-foreground', className)} {...props} />
)

export type AlertActionProps = ComponentPropsWithRef<'div'>

/** Positions whatever action(s) a consumer supplies (e.g. a close Button) — owns no dismiss state itself. */
export const AlertAction: FC<AlertActionProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='alert-action' className={cn('absolute top-4 right-4', className)} {...props} />
)
