import type { ComponentPropsWithRef, CSSProperties, FC } from 'react'

import { Toaster as SonnerToaster, toast, useSonner } from 'sonner'

import { PawLoader } from '../paw-loader/paw-loader.js'

// A thin design-system adapter, not a behavioral primitive — unlike every
// Radix/Base UI wrapper in this library, Sonner owns 100% of toast state,
// lifecycle, stacking, timers, promise handling, positioning, and
// accessibility. This component's only job is visual integration: mapping
// Sonner's own CSS custom properties onto this design system's tokens.
// `toast`/`useSonner` are re-exported verbatim (no wrapping, no altered
// behavior) purely so consumers don't need `sonner` as a second direct
// dependency alongside `@pawks/components` — application code still uses
// Sonner's own imperative API exactly as Sonner documents it:
// `toast('Saved')`, `toast.success(...)`, `toast.promise(...)`.
//
// No `data-slot` wrapper: Sonner's own `Toaster` destructures every prop by
// name with no `...rest` spread, so an unrecognized attribute like
// `data-slot` would never reach its rendered DOM node anyway — and adding
// an extra wrapping `<div>` purely to plant one is exactly the kind of
// superfluous wrapping this component should avoid. `[data-sonner-toaster]`
// (Sonner's own attribute) is the correct, already-exposed query hook.
//
// No theme-detection effect: rather than syncing Sonner's own `theme` prop
// to this project's `.dark`-class-based dark mode (which would need a
// MutationObserver — real React state for what's ultimately a styling
// concern), every color below is a `var(...)` reference to this project's
// own tokens, which already update live under `.dark` with zero JS. Two
// spots in Sonner's injected stylesheet are hardcoded hex values with no
// corresponding CSS variable at all (description text color, close-button
// colors) — those are overridden directly in tailwind.css instead, since no
// amount of `style`-prop CSS-var mapping can reach a property Sonner never
// parameterized to begin with.
//
// `richColors` defaults to `true` (Sonner's own default is `false`): the
// `--success-*`/`--info-*`/`--warning-*`/`--error-*` vars below only apply
// once a toast has Sonner's own `data-rich-colors="true"`, so without this
// default `toast.success(...)`/`.error(...)` would render visually
// identical to a plain `toast(...)` — just a different icon. Still fully
// overridable per the ticket's own "expose Sonner's concept, don't invent a
// new one" principle: a consumer can pass `richColors={false}` themselves.
export type ToasterProps = ComponentPropsWithRef<typeof SonnerToaster>

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
