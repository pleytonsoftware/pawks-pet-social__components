import type { ComponentProps, FC } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import { Label, type LabelProps } from '../label/label.js'

/** Layout/coordination only — no form-state, validation, or child inspection. */
export const fieldVariants = cva('group/field flex gap-1.5', {
	variants: {
		orientation: {
			vertical: 'flex-col',
			horizontal: 'flex-row items-center gap-2',
		},
	},
	defaultVariants: { orientation: 'vertical' },
})

export type FieldProps = ComponentProps<'div'> & VariantProps<typeof fieldVariants>

export const Field: FC<FieldProps> = ({ className, orientation, ...props }) => (
	<div data-slot='field' data-orientation={orientation ?? 'vertical'} className={cn(fieldVariants({ orientation }), className)} {...props} />
)

/** Composes Label rather than reimplementing it. */
export type FieldLabelProps = LabelProps

export const FieldLabel: FC<FieldLabelProps> = (props) => <Label data-slot='field-label' {...props} />

export type FieldDescriptionProps = ComponentProps<'p'>

export const FieldDescription: FC<FieldDescriptionProps> = ({ className, ...props }) => (
	<p data-slot='field-description' className={cn('text-caption text-muted-foreground', className)} {...props} />
)

export type FieldErrorProps = ComponentProps<'p'>

/** Renders nothing when `children` is falsy — no `{error && ...}` wrapper needed. */
export const FieldError: FC<FieldErrorProps> = ({ className, children, ...props }) => {
	if (!children) return null

	return (
		<p role='alert' data-slot='field-error' className={cn('text-caption text-destructive', className)} {...props}>
			{children}
		</p>
	)
}
