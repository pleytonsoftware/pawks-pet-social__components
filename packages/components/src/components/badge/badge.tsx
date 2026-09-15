import type { FC, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Each (tone, appearance) cell needs genuinely distinct classes, not a sum
 * of independent per-axis classes — modeled as an explicit lookup consumed
 * via cva's compoundVariants, same pattern as Button. Every class name
 * below must stay a literal string for Tailwind's scanner to find; do not
 * refactor this into template-literal interpolation.
 *
 * `muted` intentionally departs from the /10-tint pattern the other seven
 * tones use for `soft` — `muted` is itself a surface color (not ink, per
 * DESIGN §8.9), so tinting it further would wash out to near-invisible.
 * It reuses the exact `bg-muted`/`text-muted-foreground` pairing Button
 * already established for its own muted cells.
 */
const TONE_APPEARANCE_CLASSES = {
	soft: {
		primary: 'bg-primary/10 text-primary',
		secondary: 'bg-secondary/10 text-secondary',
		muted: 'bg-muted text-muted-foreground',
		accent: 'bg-accent/10 text-accent',
		destructive: 'bg-destructive/10 text-destructive',
		success: 'bg-success/10 text-success',
		warning: 'bg-warning/10 text-warning',
		info: 'bg-info/10 text-info',
	},
	solid: {
		primary: 'bg-primary text-primary-foreground',
		secondary: 'bg-secondary text-secondary-foreground',
		muted: 'bg-muted text-muted-foreground',
		accent: 'bg-accent text-accent-foreground',
		destructive: 'bg-destructive text-destructive-foreground',
		success: 'bg-success text-success-foreground',
		warning: 'bg-warning text-warning-foreground',
		info: 'bg-info text-info-foreground',
	},
	outline: {
		primary: 'border border-primary text-primary bg-transparent',
		secondary: 'border border-secondary text-secondary bg-transparent',
		muted: 'border border-border text-muted-foreground bg-transparent',
		accent: 'border border-accent text-accent bg-transparent',
		destructive: 'border border-destructive text-destructive bg-transparent',
		success: 'border border-success text-success bg-transparent',
		warning: 'border border-warning text-warning bg-transparent',
		info: 'border border-info text-info bg-transparent',
	},
} as const

// The status dot always uses a solid, saturated fill regardless of
// `appearance` — it needs to read clearly as a status indicator even in
// `outline`/`soft` badges where the text itself is a lighter tint.
const DOT_TONE_CLASSES = {
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	muted: 'bg-muted-foreground',
	accent: 'bg-accent',
	destructive: 'bg-destructive',
	success: 'bg-success',
	warning: 'bg-warning',
	info: 'bg-info',
} as const

type Appearance = keyof typeof TONE_APPEARANCE_CLASSES
type Tone = keyof (typeof TONE_APPEARANCE_CLASSES)['soft']

const APPEARANCES = Object.keys(TONE_APPEARANCE_CLASSES) as Appearance[]
const TONES = Object.keys(TONE_APPEARANCE_CLASSES.soft) as Tone[]

const emptyVariantMap = <T extends string>(keys: T[]) => Object.fromEntries(keys.map((key) => [key, ''])) as Record<T, string>

const toneAppearanceCompoundVariants = APPEARANCES.flatMap((appearance) =>
	TONES.map((tone) => ({ appearance, tone, class: TONE_APPEARANCE_CLASSES[appearance][tone] })),
)

// Radius is `full` per §13 ("Avatar / pill / badge → full"). Sizing
// extends DESIGN §25.4's locked Badge row (12px / 24px / 8px — treated as
// `md` here) proportionally to `sm`/`lg`, the same way Button's own
// sm/md/lg scale was built.
export const badgeVariants = cva('inline-flex items-center whitespace-nowrap rounded-full font-medium', {
	variants: {
		tone: emptyVariantMap(TONES),
		appearance: emptyVariantMap(APPEARANCES),
		size: {
			sm: 'h-5 gap-1 px-1.5 text-caption',
			md: 'h-6 gap-1 px-2 text-caption',
			lg: 'h-7 gap-1.5 px-2.5 text-small',
		},
	},
	compoundVariants: toneAppearanceCompoundVariants,
	defaultVariants: { tone: 'muted', appearance: 'soft', size: 'md' },
})

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof badgeVariants> & {
		/** Rendered before the content. Any ReactNode — not coupled to a specific icon library. Treated as decorative (`aria-hidden`). */
		icon?: ReactNode
		/** Shows a small solid status dot before the content (and before `icon`, if both are set), colored by `tone`. */
		dot?: boolean
	}

export const Badge: FC<BadgeProps> = ({ className, tone, appearance, size, icon, dot, children, ...props }) => {
	const resolvedTone = tone ?? 'muted'

	return (
		<span className={cn(badgeVariants({ tone: resolvedTone, appearance, size }), className)} {...props}>
			{dot ? <span aria-hidden='true' className={cn('size-1.5 shrink-0 rounded-full', DOT_TONE_CLASSES[resolvedTone])} /> : null}
			{icon ? (
				<span aria-hidden='true' className='inline-flex shrink-0 [&>svg]:size-3 [&>svg]:shrink-0'>
					{icon}
				</span>
			) : null}
			{children}
		</span>
	)
}
