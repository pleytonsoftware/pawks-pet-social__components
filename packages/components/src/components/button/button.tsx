import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'

export const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:opacity-90',
				muted: 'bg-muted text-muted-foreground hover:opacity-90',
				destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
			},
			size: {
				sm: 'h-8 px-3',
				md: 'h-10 px-4',
			},
		},
		defaultVariants: { variant: 'primary', size: 'md' },
	},
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean }

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button'
	return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
