import type { ComponentPropsWithRef, CSSProperties, FC } from 'react'

import { Toaster as SonnerToaster, toast, useSonner } from 'sonner'

import { PawLoader } from '../paw-loader/paw-loader.js'

export type ToasterProps = ComponentPropsWithRef<typeof SonnerToaster>

/**
 * A thin design-system adapter, not a behavioral primitive — Sonner owns
 * 100% of toast state, lifecycle, and accessibility; this only maps
 * Sonner's CSS variables onto our tokens. `toast`/`useSonner` are
 * re-exported verbatim so consumers don't need `sonner` as a second direct
 * dependency. No `data-slot` wrapper: Sonner's `Toaster` has no `...rest`
 * spread, so use its own `[data-sonner-toaster]` attribute instead.
 * No theme-detection effect: every color is a live `var(...)` reference
 * that already updates under `.dark` with zero JS — two spots with no
 * corresponding CSS variable (description/close-button colors) are
 * overridden directly in tailwind.css instead. `richColors` defaults to
 * `true` (Sonner's own default is `false`) so `toast.success()`/`.error()`
 * actually render with distinct colors, not just a different icon.
 */
export const Toaster: FC<ToasterProps> = ({ style, richColors = true, icons, ...props }) => (
	<SonnerToaster
		richColors={richColors}
		style={
			{
				'--normal-bg': 'var(--popover)',
				'--normal-text': 'var(--popover-foreground)',
				'--normal-border': 'var(--border)',
				'--border-radius': 'var(--radius-lg)',
				'--success-bg': 'var(--success)',
				'--success-text': 'var(--success-foreground)',
				'--success-border': 'var(--success)',
				'--info-bg': 'var(--info)',
				'--info-text': 'var(--info-foreground)',
				'--info-border': 'var(--info)',
				'--warning-bg': 'var(--warning)',
				'--warning-text': 'var(--warning-foreground)',
				'--warning-border': 'var(--warning)',
				'--error-bg': 'var(--destructive)',
				'--error-text': 'var(--destructive-foreground)',
				'--error-border': 'var(--destructive)',
				...style,
			} as CSSProperties
		}
		icons={{
			loading: <PawLoader className='size-4' />,
			...icons,
		}}
		{...props}
	/>
)

export { toast, useSonner }
