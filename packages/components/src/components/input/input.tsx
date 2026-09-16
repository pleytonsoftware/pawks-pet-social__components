import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { FORM_CONTROL_BASE_CLASSES } from '@/lib/form-control-classes.js'

export type InputProps = ComponentPropsWithRef<'input'>

/** Compact native input — focus/disabled/invalid states, no validation or label rendering. */
export const Input: FC<InputProps> = ({ className, type, ref, ...props }) => (
	<input
		type={type}
		ref={ref}
		data-slot='input'
		className={cn(
			FORM_CONTROL_BASE_CLASSES,
			'flex h-8 items-center',
			'file:h-8 file:my-auto file:border-0 file:bg-transparent file:text-sm file:font-medium',
			className,
		)}
		{...props}
	/>
)
