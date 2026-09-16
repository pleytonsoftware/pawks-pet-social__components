import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

// Hand-authored to match lucide-react's own Check/Minus path data (24x24,
// 1.75px stroke per §15/§25.6) rather than adding lucide-react as a real
// dependency here — Icon/Button/IconToggle only import it for types, and
// actual icon values always come caller-supplied from @pawks/icons.
const CheckIcon: FC<ComponentProps<'svg'>> = (props) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth={1.75}
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		{...props}
	>
		<path d='M20 6 9 17l-5-5' />
	</svg>
)

const IndeterminateIcon: FC<ComponentProps<'svg'>> = (props) => (
	<svg
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth={1.75}
		strokeLinecap='round'
		strokeLinejoin='round'
		aria-hidden='true'
		{...props}
	>
		<path d='M5 12h14' />
	</svg>
)

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
			<CheckIcon className='hidden size-3 group-data-[state=checked]:block' />
			<IndeterminateIcon className='hidden size-3 group-data-[state=indeterminate]:block' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
)
