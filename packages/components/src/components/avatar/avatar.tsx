import type { ComponentProps, FC } from 'react'

import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import * as AvatarPrimitive from '@radix-ui/react-avatar'

// Same semantic tones as Button — kept as an explicit lookup (not
// template-literal interpolation) so every class name stays a literal
// string for Tailwind's scanner to find.
const TONE_BORDER_CLASSES = {
	primary: 'border-[1.5px] border-primary',
	secondary: 'border-[1.5px] border-secondary',
	muted: 'border-[1.5px] border-border',
	accent: 'border-[1.5px] border-accent',
	destructive: 'border-[1.5px] border-destructive',
	success: 'border-[1.5px] border-success',
	warning: 'border-[1.5px] border-warning',
	info: 'border-[1.5px] border-info',
} as const

type Tone = keyof typeof TONE_BORDER_CLASSES

const TONES = Object.keys(TONE_BORDER_CLASSES) as Tone[]

const emptyVariantMap = <T extends string>(keys: T[]) => Object.fromEntries(keys.map((key) => [key, ''])) as Record<T, string>

// Sizes follow the same 4px spacing scale as the rest of the system
// (§25.2): 24 / 32 / 40 / 48 / 64px, mirroring Icon's xs–xl scale.
export const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
	variants: {
		size: {
			xs: 'size-6',
			sm: 'size-8',
			md: 'size-10',
			lg: 'size-12',
			xl: 'size-16',
		},
		// No border by default — opt in with `tone` to ring an avatar in a
		// semantic color (e.g. to mark "you", a selected pet, an active
		// speaker). Emphasis-weight border (§25.5) since it needs to read
		// clearly against a circular photo.
		tone: emptyVariantMap(TONES),
	},
	compoundVariants: TONES.map((tone) => ({ tone, class: TONE_BORDER_CLASSES[tone] })),
	defaultVariants: { size: 'md' },
})

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>

export const Avatar: FC<AvatarProps> = ({ className, size, tone, ...props }) => (
	<AvatarPrimitive.Root className={cn(avatarVariants({ size, tone }), className)} {...props} />
)

export type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image>

export const AvatarImage: FC<AvatarImageProps> = ({ className, ...props }) => (
	<AvatarPrimitive.Image className={cn('aspect-square size-full object-cover', className)} {...props} />
)

export type AvatarFallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback>

export const AvatarFallback: FC<AvatarFallbackProps> = ({ className, ...props }) => (
	<AvatarPrimitive.Fallback
		className={cn('flex size-full items-center justify-center rounded-full bg-muted text-small font-medium text-muted-foreground', className)}
		{...props}
	/>
)
