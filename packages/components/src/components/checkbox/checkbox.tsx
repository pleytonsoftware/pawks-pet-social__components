import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { CHROME_ICON_PROPS } from '@/lib/icon-props.js'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from '@pawks/icons'

export type CheckboxProps = ComponentPropsWithRef<typeof CheckboxPrimitive.Root>

/** Wraps Radix's Checkbox — Radix owns interaction/state/a11y; this only styles it via `data-state`. */
export const Checkbox: FC<CheckboxProps> = ({ className, ref, ...props }) => (
	<CheckboxPrimitive.Root
		ref={ref}
		data-slot='checkbox'
		className={cn(
			'peer size-4 shrink-0 rounded-sm border border-input bg-transparent outline-none transition-colors hover:cursor-pointer',
			'data-[state=unchecked]:hover:border-ring',
			'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
			'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
			'focus-visible:ring-[3px] focus-visible:ring-ring',
			'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20',
			'disabled:cursor-not-allowed disabled:opacity-40',
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className='group flex items-center justify-center text-current'>
			<Check {...CHROME_ICON_PROPS} className='hidden size-3 group-data-[state=checked]:block' />
			<Minus {...CHROME_ICON_PROPS} className='hidden size-3 group-data-[state=indeterminate]:block' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
)
