import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as SwitchPrimitive from '@radix-ui/react-switch'

export type SwitchProps = ComponentPropsWithRef<typeof SwitchPrimitive.Root>

/** Wraps Radix's Switch — Radix owns interaction/state/a11y; this only styles it via `data-state`. `checked` stays a plain boolean, no indeterminate. */
export const Switch: FC<SwitchProps> = ({ className, ref, ...props }) => (
	<SwitchPrimitive.Root
		ref={ref}
		data-slot='switch'
		className={cn(
			'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent outline-none transition-colors',
			'data-[state=unchecked]:bg-input',
			'data-[state=checked]:bg-primary',
			'focus-visible:ring-[3px] focus-visible:ring-ring',
			'aria-invalid:ring-1 aria-invalid:ring-destructive/20',
			'disabled:cursor-not-allowed disabled:opacity-40',
			className,
		)}
		{...props}
	>
		<SwitchPrimitive.Thumb
			data-slot='switch-thumb'
			className={cn(
				'pointer-events-none block size-4 rounded-full bg-background shadow-sm transition-transform',
				'data-[state=unchecked]:translate-x-0.5',
				'data-[state=checked]:translate-x-[calc(100%-2px)]',
			)}
		/>
	</SwitchPrimitive.Root>
)
