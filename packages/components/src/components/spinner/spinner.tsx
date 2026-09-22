import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

export type SpinnerProps = ComponentPropsWithRef<'svg'>

/**
 * Presence represents the loading state — no `loading` prop, no timers, no
 * React state. Sizes via `className` (e.g. `size-8`); no dedicated `size`
 * prop until the design system establishes standard Spinner sizes.
 * Defaults to an announced `status`; pass `aria-hidden` when a nearby
 * element (e.g. "Saving…" text) already conveys the loading state.
 */
export const Spinner: FC<SpinnerProps> = ({ className, role = 'status', 'aria-label': ariaLabel = 'Loading', ref, ...props }) => (
	<svg
		ref={ref}
		data-slot='spinner'
		role={role}
		aria-label={ariaLabel}
		viewBox='0 0 24 24'
		fill='none'
		className={cn('size-4 animate-spin text-current', className)}
		{...props}
	>
		<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.75' strokeOpacity='0.25' />
		<path d='M12 2a10 10 0 0 1 10 10' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' />
	</svg>
)
