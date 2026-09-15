import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Register custom color and typography tokens separately so tailwind-merge
// does not treat non-conflicting text-size and text-color classes as duplicates.
const COLOR_TOKENS = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'primary',
	'primary-foreground',
	'primary-hover',
	'secondary',
	'secondary-foreground',
	'secondary-hover',
	'muted',
	'muted-foreground',
	'muted-hover',
	'accent',
	'accent-foreground',
	'accent-hover',
	'destructive',
	'destructive-foreground',
	'destructive-hover',
	'success',
	'success-foreground',
	'success-hover',
	'warning',
	'warning-foreground',
	'warning-hover',
	'info',
	'info-foreground',
	'info-hover',
	'border',
	'input',
	'ring',
]

const TEXT_SIZE_TOKENS = ['display', 'h1', 'h2', 'h3', 'body', 'small', 'label', 'caption']

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': TEXT_SIZE_TOKENS.map((name) => `text-${name}`),
			'text-color': COLOR_TOKENS.map((name) => `text-${name}`),
			'bg-color': COLOR_TOKENS.map((name) => `bg-${name}`),
			'border-color': COLOR_TOKENS.map((name) => `border-${name}`),
			'ring-color': COLOR_TOKENS.map((name) => `ring-${name}`),
		},
	},
})

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
