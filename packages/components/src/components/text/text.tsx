import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

type TextTag = 'p' | 'span' | 'div' | 'label'

export const textVariants = cva('text-foreground', {
	variants: {
		variant: {
			body: 'text-body',
			small: 'text-small',
			label: 'text-label',
			caption: 'text-caption',
		},
	},
	defaultVariants: { variant: 'body' },
})

export type TextProps = HTMLAttributes<HTMLElement> & VariantProps<typeof textVariants> & { as?: TextTag }

export const Text: FC<TextProps> = ({ className, variant, as, ...props }) => {
	const Comp = as ?? 'span'
	return <Comp className={cn(textVariants({ variant }), className)} {...props} />
}
