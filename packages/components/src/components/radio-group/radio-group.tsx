import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

export type RadioGroupProps = ComponentPropsWithRef<typeof RadioGroupPrimitive.Root>

/** Wraps Radix's RadioGroup — Radix owns selection/keyboard/a11y; this only styles it via `data-*`. */
export const RadioGroup: FC<RadioGroupProps> = ({ className, ref, ...props }) => (
	<RadioGroupPrimitive.Root
		ref={ref}
		data-slot='radio-group'
		className={cn('flex flex-col gap-2 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:gap-4', className)}
		{...props}
	/>
)

export type RadioGroupItemProps = ComponentPropsWithRef<typeof RadioGroupPrimitive.Item>

/** Selection belongs to RadioGroup, not the item — no `checked` prop here, just Radix's `value`. */
export const RadioGroupItem: FC<RadioGroupItemProps> = ({ className, ref, ...props }) => (
	<RadioGroupPrimitive.Item
		ref={ref}
		data-slot='radio-group-item'
		className={cn(
			'peer aspect-square size-4 shrink-0 rounded-full border border-input bg-transparent outline-none transition-colors',
			'data-[state=unchecked]:hover:border-ring',
			'data-[state=checked]:border-primary',
			'focus-visible:ring-[3px] focus-visible:ring-ring',
			'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20',
			'disabled:cursor-not-allowed disabled:opacity-40',
			'hover:cursor-pointer',
			className,
		)}
		{...props}
	>
		<RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
			<span className='size-2 rounded-full bg-primary' />
		</RadioGroupPrimitive.Indicator>
	</RadioGroupPrimitive.Item>
)
