import type { ComponentProps, FC } from 'react'

/**
 * Hand-authored to match lucide-react's own path data (24x24, 1.75px
 * stroke per §15/§25.6) rather than adding lucide-react as a real
 * dependency here — Icon/Button/IconToggle only import it for types, and
 * actual icon values always come caller-supplied from @pawks/icons.
 * Shared across Checkbox/Select/NativeSelect rather than duplicated per component.
 */
const BASE_PROPS = {
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 1.75,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	'aria-hidden': true,
} as const

export const CheckIcon: FC<ComponentProps<'svg'>> = (props) => (
	<svg {...BASE_PROPS} {...props}>
		<path d='M20 6 9 17l-5-5' />
	</svg>
)

export const MinusIcon: FC<ComponentProps<'svg'>> = (props) => (
	<svg {...BASE_PROPS} {...props}>
		<path d='M5 12h14' />
	</svg>
)

export const ChevronDownIcon: FC<ComponentProps<'svg'>> = (props) => (
	<svg {...BASE_PROPS} {...props}>
		<path d='m6 9 6 6 6-6' />
	</svg>
)

export const ChevronUpIcon: FC<ComponentProps<'svg'>> = (props) => (
	<svg {...BASE_PROPS} {...props}>
		<path d='m18 15-6-6-6 6' />
	</svg>
)
