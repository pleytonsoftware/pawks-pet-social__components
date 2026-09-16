import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { FORM_CONTROL_BASE_CLASSES } from '@/lib/form-control-classes.js'

export type TextareaProps = ComponentPropsWithRef<'textarea'>

/** Multiline sibling of Input — same border/focus/invalid styling, ref as a plain prop (React 19). */
export const Textarea: FC<TextareaProps> = ({ className, ref, ...props }) => (
	<textarea ref={ref} data-slot='textarea' className={cn(FORM_CONTROL_BASE_CLASSES, 'flex min-h-16 resize-y py-1.5', className)} {...props} />
)
