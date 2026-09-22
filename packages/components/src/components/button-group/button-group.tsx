import type { ComponentPropsWithRef, FC } from 'react'

import { Separator, type SeparatorProps } from '@/components/separator/separator.js'
import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'

const buttonGroupVariants = cva(
	'flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>input]:flex-1',
	{
		variants: {
			orientation: {
				// Logical properties (rounded-s/-e, border-s), not physical
				// left/right — those never flip for dir="rtl". The two `:disabled`
				// rules hand a seam's ownership to the next enabled sibling, so a
				// disabled child's faded border never owns a shared seam.
				horizontal:
					'[&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none [&>*:disabled:not(:last-child)]:border-e-0 [&>*:disabled:not(:last-child)+*]:border-s',
				// Top/bottom aren't RTL-dependent; same disabled-seam handoff.
				vertical:
					'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>*:disabled:not(:last-child)]:border-b-0 [&>*:disabled:not(:last-child)+*]:border-t',
			},
		},
		defaultVariants: { orientation: 'horizontal' },
	},
)

export type ButtonGroupProps = ComponentPropsWithRef<'div'> & VariantProps<typeof buttonGroupVariants>

/**
 * A layout/composition primitive, not an interactive one — owns no state,
 * keyboard nav, or focus management, only making adjacent controls *look*
 * like one unit. CSS targets DOM structure generically (`:first-child`/
 * `:last-child`), so it works for any bordered control (Button, Input,
 * Select). For icon-only controls use `Button` with `iconOnly`, not
 * `IconToggle` (no border of its own, so it won't produce the segmented
 * look). NativeSelect is a known partial exception — its bordered
 * `<select>` sits inside a positioning wrapper, so the actual DOM child
 * here has nothing to flatten.
 *
 * Nesting: wrap every top-level cluster — even a single button — in its
 * own ButtonGroup, rather than mixing a bare control alongside a nested
 * group as siblings. Otherwise a bare `<Button>` next to a nested cluster
 * gets treated as a non-last child and has its own outer corner wrongly
 * squared off, even though nothing is actually fused against it there.
 * See the `NestedGroups` story.
 */
export const ButtonGroup: FC<ButtonGroupProps> = ({ className, orientation = 'horizontal', role = 'group', ref, ...props }) => (
	<div
		ref={ref}
		role={role}
		data-slot='button-group'
		data-orientation={orientation}
		className={cn(buttonGroupVariants({ orientation }), className)}
		{...props}
	/>
)

export type ButtonGroupTextProps = ComponentPropsWithRef<'div'> & { asChild?: boolean }

export const ButtonGroupText: FC<ButtonGroupTextProps> = ({ className, asChild, ref, ...props }) => {
	const Comp = asChild ? Slot : 'div'
	return (
		<Comp
			ref={ref}
			data-slot='button-group-text'
			className={cn(
				'flex items-center gap-2 rounded-md border border-input bg-muted px-2.5 text-body font-medium text-foreground',
				'[&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4',
				className,
			)}
			{...props}
		/>
	)
}

export type ButtonGroupSeparatorProps = SeparatorProps

/** Overrides Separator's `h-full` to `h-auto`: a flex item with `height:100%` can't resolve against a ButtonGroup with no definite height, so it computes to 0 instead of stretching. */
export const ButtonGroupSeparator: FC<ButtonGroupSeparatorProps> = ({ className, orientation = 'vertical', ...props }) => (
	<Separator
		data-slot='button-group-separator'
		orientation={orientation}
		className={cn('self-stretch data-[orientation=vertical]:h-auto', className)}
		{...props}
	/>
)
