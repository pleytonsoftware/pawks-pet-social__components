import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import { motion, useReducedMotion } from 'motion/react'

/**
 * lucide's `paw-print` geometry verbatim (24x24, 1.75px stroke per §15/§25.6),
 * hand-authored rather than imported — same reasoning as lib/form-icons.tsx:
 * lucide-react is a types-only devDependency here and icon values always come
 * caller-supplied from @pawks/icons.
 */
const TOES = [
	{ cx: 11, cy: 4 },
	{ cx: 18, cy: 8 },
	{ cx: 20, cy: 16 },
] as const

const PAD_PATH = 'M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z'

const POP_DURATION = 0.4
const STAGGER_STEP = 0.14
const CYCLE_DURATION = 1.2
const RESTING_OPACITY = 0.35
const TOE_PEAK_SCALE = 1.3
/** The pad dwarfs a toe — the same 1.3 peak reads as a lurch rather than a pop. */
const PAD_PEAK_SCALE = 1.12

/** DESIGN §17's two locked curves, as `as const` tuples so they satisfy motion's `BezierDefinition`. */
const EASE_OUT = [0.16, 1, 0.3, 1] as const
const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const

/** Without its own box, an SVG transform scales about the viewBox origin, not the shape. */
const POP_STYLE = { transformBox: 'fill-box', transformOrigin: 'center' } as const

/**
 * One 0.4s pop, phase-offset per element by `delay` — with `repeat: Infinity`
 * the delay shifts the whole repeating sequence, so the stagger survives every
 * loop. Per-segment easing is DESIGN §17's ease-out on the pop and ease-in-out
 * on the release, so the pop snaps and the settle stays soft.
 */
const popProps = (index: number, peakScale: number, isStatic: boolean) =>
	isStatic
		? { animate: { scale: 1, opacity: 1 } }
		: {
				animate: { scale: [1, peakScale, 1], opacity: [RESTING_OPACITY, 1, RESTING_OPACITY] },
				transition: {
					duration: POP_DURATION,
					delay: index * STAGGER_STEP,
					repeat: Infinity,
					repeatDelay: CYCLE_DURATION - POP_DURATION,
					ease: [EASE_OUT, EASE_IN_OUT],
				},
			}

export type PawLoaderProps = ComponentPropsWithRef<'svg'>

/**
 * Pet-aware counterpart to Spinner (DESIGN §3.3) — identical contract:
 * presence represents the loading state, no `loading` prop, sizing via
 * `className`. Defaults to `size-6` rather than Spinner's `size-4` because
 * three r=2 toes plus a pad collapse into a smudge at 16px.
 * Respects `prefers-reduced-motion` by rendering a static, fully opaque paw.
 */
export const PawLoader: FC<PawLoaderProps> = ({ className, role = 'status', 'aria-label': ariaLabel = 'Loading', ref, ...props }) => {
	const isStatic = useReducedMotion() === true

	return (
		<svg
			ref={ref}
			data-slot='paw-loader'
			role={role}
			aria-label={ariaLabel}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.75'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={cn('size-6 text-current', className)}
			{...props}
		>
			{TOES.map(({ cx, cy }, index) => (
				<motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r='2' style={POP_STYLE} {...popProps(index, TOE_PEAK_SCALE, isStatic)} />
			))}
			<motion.path d={PAD_PATH} style={POP_STYLE} {...popProps(TOES.length, PAD_PEAK_SCALE, isStatic)} />
		</svg>
	)
}
