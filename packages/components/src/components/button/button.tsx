import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes, FC } from 'react'

import { Icon } from '@/components/icon/icon.js'
import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'

/**
 * Each (tone, appearance) cell needs genuinely distinct classes, not a sum
 * of independent per-axis classes — modeled as an explicit lookup consumed
 * via cva's compoundVariants. Every class name below must stay a literal
 * string for Tailwind's scanner to find it; do not refactor this into
 * template-literal interpolation.
 */
const TONE_APPEARANCE_CLASSES = {
	solid: {
		primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
		muted: 'bg-muted text-muted-foreground hover:bg-muted-hover',
		accent: 'bg-accent text-accent-foreground hover:bg-accent-hover',
		destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
		success: 'bg-success text-success-foreground hover:bg-success-hover',
		warning: 'bg-warning text-warning-foreground hover:bg-warning-hover',
		info: 'bg-info text-info-foreground hover:bg-info-hover',
	},
	outline: {
		primary: 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground',
		secondary: 'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground',
		muted: 'border border-border text-muted-foreground bg-transparent hover:bg-muted hover:text-muted-foreground',
		accent: 'border border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground',
		destructive: 'border border-destructive text-destructive bg-transparent hover:bg-destructive hover:text-destructive-foreground',
		success: 'border border-success text-success bg-transparent hover:bg-success hover:text-success-foreground',
		warning: 'border border-warning text-warning bg-transparent hover:bg-warning hover:text-warning-foreground',
		info: 'border border-info text-info bg-transparent hover:bg-info hover:text-info-foreground',
	},
	ghost: {
		primary: 'text-primary bg-transparent hover:bg-primary/10',
		secondary: 'text-secondary bg-transparent hover:bg-secondary/10',
		muted: 'text-muted-foreground bg-transparent hover:bg-muted',
		accent: 'text-accent bg-transparent hover:bg-accent/10',
		destructive: 'text-destructive bg-transparent hover:bg-destructive/10',
		success: 'text-success bg-transparent hover:bg-success/10',
		warning: 'text-warning bg-transparent hover:bg-warning/10',
		info: 'text-info bg-transparent hover:bg-info/10',
	},
	link: {
		primary: 'text-primary bg-transparent underline-offset-4 hover:underline',
		secondary: 'text-secondary bg-transparent underline-offset-4 hover:underline',
		muted: 'text-muted-foreground bg-transparent underline-offset-4 hover:underline',
		accent: 'text-accent bg-transparent underline-offset-4 hover:underline',
		destructive: 'text-destructive bg-transparent underline-offset-4 hover:underline',
		success: 'text-success bg-transparent underline-offset-4 hover:underline',
		warning: 'text-warning bg-transparent underline-offset-4 hover:underline',
		info: 'text-info bg-transparent underline-offset-4 hover:underline',
	},
} as const

type Appearance = keyof typeof TONE_APPEARANCE_CLASSES
type Tone = keyof (typeof TONE_APPEARANCE_CLASSES)['solid']

const APPEARANCES = Object.keys(TONE_APPEARANCE_CLASSES) as Appearance[]
const TONES = Object.keys(TONE_APPEARANCE_CLASSES.solid) as Tone[]

const emptyVariantMap = <T extends string>(keys: T[]) => Object.fromEntries(keys.map((key) => [key, ''])) as Record<T, string>

const toneAppearanceCompoundVariants = APPEARANCES.flatMap((appearance) =>
	TONES.map((tone) => ({ appearance, tone, class: TONE_APPEARANCE_CLASSES[appearance][tone] })),
)

type Size = 'sm' | 'md' | 'lg'

const DEFAULT_SIZE = 'sm' satisfies Size

export const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40',
	{
		variants: {
			tone: emptyVariantMap(TONES),
			appearance: emptyVariantMap(APPEARANCES),
			size: {
				sm: 'h-8 px-2 py-1.5',
				md: 'h-9 px-3 py-2',
				lg: 'h-10 px-4 py-2.5',
			} satisfies Record<Size, string>,
			// Square, padding-free sizing for icon-only buttons (shadcn's
			// "size: icon" pattern, extended across our own sm/md/lg scale
			// instead of one fixed size). Real classes live in
			// compoundVariants below; empty here purely so cva/VariantProps
			// knows `iconOnly` is a valid boolean prop.
			iconOnly: { true: '', false: '' },
		},
		compoundVariants: [
			...toneAppearanceCompoundVariants,
			{ appearance: 'link', class: 'h-auto p-0' },
			{ iconOnly: true, size: 'sm' satisfies Size, class: 'w-8 p-0' },
			{ iconOnly: true, size: 'md' satisfies Size, class: 'w-9 p-0' },
			{ iconOnly: true, size: 'lg' satisfies Size, class: 'w-10 p-0' },
		],
		defaultVariants: { tone: 'primary', appearance: 'solid', size: DEFAULT_SIZE, iconOnly: false },
	},
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		/**
		 * Icon to render inside the button (shadcn-style — no separate
		 * IconButton component). Combine with `iconOnly` for an icon-only
		 * square button; without it, the icon renders alongside `children`.
		 * Ignored when `asChild` is set, since Slot requires a single child
		 * — pass your own icon markup as part of `children` in that case.
		 * Icon-only buttons need an accessible name: pass `aria-label`.
		 */
		icon?: LucideIcon
	}

export const Button: FC<ButtonProps> = ({ className, tone, appearance, size = DEFAULT_SIZE, iconOnly, icon, children, asChild, ...props }) => {
	if (asChild) {
		return (
			<Slot className={cn(buttonVariants({ tone, appearance, size, iconOnly }), className)} {...props}>
				{children}
			</Slot>
		)
	}

	return (
		<button className={cn(buttonVariants({ tone, appearance, size, iconOnly }), className)} {...props}>
			{icon ? <Icon IconComponent={icon} size={size ?? DEFAULT_SIZE} /> : null}
			{iconOnly ? null : children}
		</button>
	)
}
