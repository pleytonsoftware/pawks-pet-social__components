import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

export type CardProps = ComponentPropsWithRef<'div'> & { size?: 'default' | 'sm' }

/**
 * A static content container — never inherently clickable (compose an
 * `<a>`/Button inside instead of an `href`/`onClick` on Card itself).
 * Sections share one `--card-spacing` custom property set on the root
 * (DESIGN §12), so overriding it via `className` re-syncs every child's inset/gap together.
 */
export const Card: FC<CardProps> = ({ className, size = 'default', ref, ...props }) => (
	<div
		ref={ref}
		data-slot='card'
		data-size={size}
		className={cn(
			'group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-border bg-card py-(--card-spacing) text-body text-card-foreground',
			'[--card-spacing:--spacing(4)] data-[size=sm]:[--card-spacing:--spacing(3)]',
			'has-data-[slot=card-footer]:pb-0',
			'has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
			className,
		)}
		{...props}
	/>
)

export type CardHeaderProps = ComponentPropsWithRef<'div'>

export const CardHeader: FC<CardHeaderProps> = ({ className, ref, ...props }) => (
	<div
		ref={ref}
		data-slot='card-header'
		className={cn(
			'group/card-header grid auto-rows-min items-start gap-1 px-(--card-spacing)',
			'has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
			className,
		)}
		{...props}
	/>
)

export type CardTitleProps = ComponentPropsWithRef<'div'>

export const CardTitle: FC<CardTitleProps> = ({ className, ref, ...props }) => (
	<div
		ref={ref}
		data-slot='card-title'
		className={cn('text-h3 group-data-[size=sm]/card:text-body group-data-[size=sm]/card:font-medium', className)}
		{...props}
	/>
)

export type CardDescriptionProps = ComponentPropsWithRef<'div'>

export const CardDescription: FC<CardDescriptionProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='card-description' className={cn('text-small text-muted-foreground', className)} {...props} />
)

export type CardActionProps = ComponentPropsWithRef<'div'>

export const CardAction: FC<CardActionProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='card-action' className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)} {...props} />
)

export type CardContentProps = ComponentPropsWithRef<'div'>

export const CardContent: FC<CardContentProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='card-content' className={cn('px-(--card-spacing)', className)} {...props} />
)

export type CardFooterProps = ComponentPropsWithRef<'div'>

export const CardFooter: FC<CardFooterProps> = ({ className, ref, ...props }) => (
	<div
		ref={ref}
		data-slot='card-footer'
		className={cn('flex items-center rounded-b-xl border-t border-border bg-muted/50 p-(--card-spacing)', className)}
		{...props}
	/>
)
