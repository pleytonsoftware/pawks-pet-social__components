import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import { createContext, useContext, useMemo } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'

export type BubbleVariant = 'default' | 'secondary' | 'muted' | 'tinted' | 'outline' | 'ghost' | 'destructive'
export type BubbleAlign = 'start' | 'end'

type BubbleContextValue = { variant: BubbleVariant; align: BubbleAlign }

const BubbleContext = createContext<BubbleContextValue>({ variant: 'default', align: 'start' })

export type BubbleProps = ComponentPropsWithRef<'div'> & { variant?: BubbleVariant; align?: BubbleAlign }

/**
 * A presentational row primitive for comments, thoughts, and chat messages —
 * it knows only `variant`/`align`, never sender identity, timestamps,
 * avatars, or read state (that belongs to a future `Message` molecule).
 * Owns width/max-width/alignment itself (not `BubbleContent`) so it shrinks
 * to exactly `BubbleContent`'s box — `BubbleReactions` anchors against
 * *this* element, and a wider positioning box would misplace it. Alignment
 * uses an auto inline margin rather than flex `justify-*`, so it stays
 * correct whether its parent is block, flex, or grid.
 */
export const Bubble: FC<BubbleProps> = ({ className, variant = 'default', align = 'start', ref, ...props }) => {
	const contextValue = useMemo(() => ({ variant, align }), [variant, align])

	return (
		<BubbleContext.Provider value={contextValue}>
			<div
				ref={ref}
				data-slot='bubble'
				data-variant={variant}
				data-align={align}
				className={cn('relative', variant === 'ghost' ? 'w-full max-w-full' : 'w-fit max-w-[80%]', align === 'end' && 'ms-auto', className)}
				{...props}
			/>
		</BubbleContext.Provider>
	)
}

const bubbleContentVariants = cva(
	'block w-full rounded-lg px-3 py-2 text-body break-words focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground',
				secondary: 'bg-secondary text-secondary-foreground',
				muted: 'bg-muted text-muted-foreground',
				tinted: 'bg-primary/10 text-primary',
				outline: 'border border-border bg-card text-card-foreground',
				ghost: 'bg-transparent text-foreground',
				destructive: 'bg-destructive text-destructive-foreground',
			} satisfies Record<BubbleVariant, string>,
		},
		defaultVariants: { variant: 'default' },
	},
)

export type BubbleContentProps = ComponentPropsWithRef<'div'> & { asChild?: boolean }

/** The actual bubble surface. `asChild` renders via Slot (same convention as `Button`) so interactive content — a `<button>`/`<a>` — stays a real interactive element instead of a `<div onClick>`. */
export const BubbleContent: FC<BubbleContentProps> = ({ className, asChild, ref, ...props }) => {
	const { variant, align } = useContext(BubbleContext)
	const Comp = asChild ? Slot : 'div'

	return (
		<Comp
			ref={ref}
			data-slot='bubble-content'
			data-variant={variant}
			data-align={align}
			className={cn(bubbleContentVariants({ variant }), className)}
			{...props}
		/>
	)
}

const bubbleReactionsVariants = cva(
	'absolute z-10 inline-flex items-center gap-1 rounded-full border-2 border-border bg-popover px-1.5 py-0.5 text-caption text-popover-foreground shadow-sm',
	{
		variants: {
			side: { top: '-top-3.5', bottom: '-bottom-3' },
			align: { start: 'start-1', end: 'end-1' },
		},
		defaultVariants: { side: 'bottom', align: 'end' },
	},
)

export type BubbleReactionsProps = ComponentPropsWithRef<'div'> & VariantProps<typeof bubbleReactionsVariants>

/**
 * Purely compositional — no reactions data model, pass whatever markup you
 * want as children. Positioned absolutely against the nearest `Bubble`
 * (which is `relative`), straddling its edge by design. A non-interactive
 * reaction row should carry `role="img"` + a descriptive `aria-label`;
 * interactive reactions should be real buttons with accessible names.
 */
export const BubbleReactions: FC<BubbleReactionsProps> = ({ className, side = 'bottom', align = 'end', ref, ...props }) => (
	<div
		ref={ref}
		data-slot='bubble-reactions'
		data-side={side}
		data-align={align}
		className={cn(bubbleReactionsVariants({ side, align }), className)}
		{...props}
	/>
)

export type BubbleGroupProps = ComponentPropsWithRef<'div'>

/** Vertical spacing for consecutive bubbles from the same participant. Deliberately owns no `align` — that stays per-`Bubble`, mirroring `ButtonGroup`'s "don't own child semantics" principle. */
export const BubbleGroup: FC<BubbleGroupProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='bubble-group' className={cn('flex flex-col gap-1', className)} {...props} />
)
