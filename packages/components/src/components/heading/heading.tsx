import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

/**
 * `variant` controls the visual style (DESIGN §14); `as` controls the
 * semantic tag. They're independent on purpose — the level a heading
 * belongs at in the document outline is a content/accessibility decision,
 * not something the visual size should dictate.
 */
export const headingVariants = cva('text-foreground', {
	variants: {
		variant: {
			display: 'text-display',
			h1: 'text-h1',
			h2: 'text-h2',
			h3: 'text-h3',
		},
	},
	defaultVariants: { variant: 'h1' },
})

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants> & { as?: HeadingTag }

export function Heading({ className, variant, as, ...props }: HeadingProps) {
	const Comp = as ?? 'h1'
	return <Comp className={cn(headingVariants({ variant }), className)} {...props} />
}
