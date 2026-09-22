import type { ComponentPropsWithRef, FC } from 'react'

import { Separator, type SeparatorProps } from '@/components/separator/separator.js'
import { cn } from '@/lib/cn.js'

import { cva, type VariantProps } from 'class-variance-authority'

import { Slot } from '@radix-ui/react-slot'

// A layout/composition primitive, not an interactive one — unlike Accordion
// or DropdownMenu, this owns no state, no keyboard navigation, no focus
// management. It only makes adjacent controls *look* like one unit (shared
// borders, corner-radius flattening on non-edge children, `focus-visible`
// z-raising so a ring never gets clipped by a neighbor). Every visual/
// behavioral concern beyond that — variant, size, disabled, click handling —
// stays owned entirely by the children. No child cloning, no
// `React.Children` introspection: the CSS below targets DOM structure
// (`:first-child`/`:last-child`/`> input`) generically, so it applies the
// same way to a Button, an Input, or a Select trigger — all of which carry
// their own visible border for this to collapse. For icon-only controls,
// use `Button` with `iconOnly` (not `IconToggle`): IconToggle has no border
// of its own (state is communicated via icon fill, not a bordered
// container), so grouping it wouldn't produce the segmented-control look
// this primitive exists for. NativeSelect is a known partial exception:
// its actual bordered `<select>` sits one level inside a positioning
// wrapper `<div>`, so the wrapper (the real DOM child here) has no border/
// radius of its own to flatten.
//
// Nesting: wrap every top-level cluster — even a single button — in its own
// ButtonGroup, rather than mixing a bare control directly alongside a
// nested group as siblings. The flattening rule only knows "am I this
// parent's first/last child," not "is anything actually fused against me" —
// a bare `<Button>Previous</Button>` sitting next to a nested `1 2 3` group
// would itself be treated as a non-last child and get its own trailing
// corner wrongly squared off, even though nothing touches it there (the
// nested group creates a gap, not a seam). Wrapping it in its own
// single-item `<ButtonGroup><Button>Previous</Button></ButtonGroup>` means
// the outer flattening only ever reaches that invisible wrapper — Previous
// stays its wrapper's sole (first-and-last) child, so it keeps both
// corners rounded. See the `NestedGroups` story for the full pattern.

const buttonGroupVariants = cva(
	'flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>input]:flex-1',
	{
		variants: {
			orientation: {
				// Logical (inline-start/end), not physical (left/right): a
				// physical `rounded-l`/`border-l` never flips for `dir="rtl"`, so
				// the "first child keeps its outer corner" logic would target
				// the wrong physical side once text direction reverses which
				// edge is actually the group's outer edge.
				//
				// Every seam is normally owned by its start-side neighbor's own
				// trailing (end) border — a non-first child strips its own start
				// border and relies on the previous sibling's end border for the
				// shared line. That breaks when the previous sibling is disabled:
				// `disabled:opacity-40` fades the whole element, so a seam owned
				// by a disabled neighbor's border looks visibly fainter than
				// every other seam, even though the *next* button is enabled and
				// otherwise looks normal. The two extra rules below hand that
				// seam's ownership to the following (enabled) sibling instead,
				// whenever the preceding one is disabled: the disabled child
				// drops its own end border, and the very next child gets its
				// start border restored.
				horizontal:
					'[&>*:not(:first-child)]:rounded-s-none [&>*:not(:first-child)]:border-s-0 [&>*:not(:last-child)]:rounded-e-none [&>*:disabled:not(:last-child)]:border-e-0 [&>*:disabled:not(:last-child)+*]:border-s',
				// Top/bottom aren't inline-direction-dependent, so physical
				// properties are correct as-is here; same disabled-seam handoff.
				vertical:
					'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>*:disabled:not(:last-child)]:border-b-0 [&>*:disabled:not(:last-child)+*]:border-t',
			},
		},
		defaultVariants: { orientation: 'horizontal' },
	},
)

export type ButtonGroupProps = ComponentPropsWithRef<'div'> & VariantProps<typeof buttonGroupVariants>

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

// `self-stretch` + overriding Separator's own percentage-based `h-full`
// back to `h-auto`: a flex item with an explicit `height: 100%` can't
// resolve against a `ButtonGroup` whose own height is only as tall as its
// children (no definite height to read a percentage from), so it computes
// to 0 instead of stretching — `h-auto` lets the normal flex `align-items:
// stretch` behavior (which only kicks in for `auto`-sized items) take over.
export const ButtonGroupSeparator: FC<ButtonGroupSeparatorProps> = ({ className, orientation = 'vertical', ...props }) => (
	<Separator
		data-slot='button-group-separator'
		orientation={orientation}
		className={cn('self-stretch data-[orientation=vertical]:h-auto', className)}
		{...props}
	/>
)
