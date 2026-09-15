import type { LucideIcon } from 'lucide-react'
import type { ComponentProps, FC } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import * as TogglePrimitive from '@radix-ui/react-toggle'

import { Icon } from '../icon/icon.js'

// Same semantic tones as Button/Avatar — kept as an explicit lookup (not
// template-literal interpolation) so every class name stays a literal
// string for Tailwind's scanner to find. `muted` has no dedicated ink
// "-hover" token (unlike the others, whose `-hover` tokens are lightness
// shifts of a *fill* color) — see Button's outline/ghost `muted` cells for
// the same reasoning — so it reuses `text-muted-foreground` on hover too.
const TONE_CLASSES = {
	primary: 'hover:text-primary data-[state=on]:text-primary data-[state=on]:hover:text-primary-hover',
	secondary: 'hover:text-secondary data-[state=on]:text-secondary data-[state=on]:hover:text-secondary-hover',
	muted: 'hover:text-foreground data-[state=on]:text-muted-foreground',
	accent: 'hover:text-accent data-[state=on]:text-accent data-[state=on]:hover:text-accent-hover',
	destructive: 'hover:text-destructive data-[state=on]:text-destructive data-[state=on]:hover:text-destructive-hover',
	success: 'hover:text-success data-[state=on]:text-success data-[state=on]:hover:text-success-hover',
	warning: 'hover:text-warning data-[state=on]:text-warning data-[state=on]:hover:text-warning-hover',
	info: 'hover:text-info data-[state=on]:text-info data-[state=on]:hover:text-info-hover',
} as const

type Tone = keyof typeof TONE_CLASSES

const TONES = Object.keys(TONE_CLASSES) as Tone[]

const emptyVariantMap = <T extends string>(keys: T[]) => Object.fromEntries(keys.map((key) => [key, ''])) as Record<T, string>

// No border, no background — per DESIGN §15 ("Outline by default → filled/
// emphasized when active"), state is communicated entirely through the
// icon's fill + color, not through a button-shaped container. `p-1 -m-1`
// pads the hit/focus-ring area (§20 touch-target guidance) without
// changing the visible footprint (negative margin cancels it out).
export const iconToggleVariants = cva(
	'group inline-flex items-center gap-1.5 rounded-md p-1 -m-1 text-small font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40',
	{
		variants: { tone: emptyVariantMap(TONES) },
		compoundVariants: TONES.map((tone) => ({ tone, class: TONE_CLASSES[tone] })),
		defaultVariants: { tone: 'primary' },
	},
)

export type IconToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
	VariantProps<typeof iconToggleVariants> & {
		/**
		 * Not all icons are filled shapes — some are outlines, some are strokes, some are glyphs. The `icon` prop is the icon to render inside the toggle button. It should be a Lucide icon component.
		 */
		icon: LucideIcon
		/** Icon size — same scale as the Icon atom. @default 'md' */
		size?: ComponentProps<typeof Icon>['size']
	}

export const IconToggle: FC<IconToggleProps> = ({ className, tone, icon: IconComponent, size = 'md', children, ...props }) => (
	<TogglePrimitive.Root className={cn(iconToggleVariants({ tone }), className)} {...props}>
		<Icon
			IconComponent={IconComponent}
			size={size}
			className='fill-none transition-colors group-hover:fill-current/20 group-data-[state=on]:fill-current'
		/>
		{children}
	</TogglePrimitive.Root>
)
