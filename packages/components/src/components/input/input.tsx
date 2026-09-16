import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

/**
 * Compact native input.
 * Supports standard input semantics, React 19 refs, and focus, disabled, and
 * `aria-invalid` states without owning validation or label rendering.
 */
export type InputProps = ComponentPropsWithRef<'input'>

export const Input: FC<InputProps> = ({ className, type, ref, ...props }) => (
	<input
		type={type}
		ref={ref}
		data-slot='input'
		className={cn(
			'peer flex h-8 w-full min-w-0 items-center rounded-md border border-input bg-transparent px-2.5 text-body text-foreground outline-none transition-colors',
			'placeholder:text-muted-foreground',
			'focus-visible:ring-[3px] focus-visible:ring-ring',
			'aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20',
			'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
			'file:border-0 file:bg-transparent file:text-sm file:font-medium file:h-8 file:my-auto',
			className,
		)}
		{...props}
	/>
)
