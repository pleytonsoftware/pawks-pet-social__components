import type { ComponentPropsWithRef, FC } from 'react'

import { buttonVariants } from '@/components/button/button.js'
import { cn } from '@/lib/cn.js'
import { CHROME_ICON_PROPS } from '@/lib/icon-props.js'

import { ChevronLeft, ChevronRight } from '@pawks/icons'
import { Slot } from '@radix-ui/react-slot'

export type PaginationProps = ComponentPropsWithRef<'nav'>

/** Navigation only — no page/total/onChange state. The app owns pagination state and renders links accordingly. */
export const Pagination: FC<PaginationProps> = ({ className, 'aria-label': ariaLabel = 'pagination', ref, ...props }) => (
	<nav ref={ref} aria-label={ariaLabel} data-slot='pagination' className={cn('mx-auto flex w-full justify-center', className)} {...props} />
)

export type PaginationContentProps = ComponentPropsWithRef<'ul'>

export const PaginationContent: FC<PaginationContentProps> = ({ className, ref, ...props }) => (
	<ul ref={ref} data-slot='pagination-content' className={cn('flex flex-row items-center gap-1', className)} {...props} />
)

export type PaginationItemProps = ComponentPropsWithRef<'li'>

export const PaginationItem: FC<PaginationItemProps> = ({ ref, ...props }) => <li ref={ref} data-slot='pagination-item' {...props} />

export type PaginationLinkProps = ComponentPropsWithRef<'a'> & {
	/** Marks this as the current page: applies active styling and defaults `aria-current` to `"page"`. The app decides which link is active. */
	isActive?: boolean
	asChild?: boolean
}

/**
 * A real `<a>`, styled via `buttonVariants` (not `Button` itself) — it stays
 * a navigation link, never a `<button>`. `asChild` swaps in a router's own
 * link component via Slot, same convention as `Button`.
 */
export const PaginationLink: FC<PaginationLinkProps> = ({ className, isActive, asChild, 'aria-current': ariaCurrent, ref, ...props }) => {
	const Comp = asChild ? Slot : 'a'

	return (
		<Comp
			ref={ref}
			data-slot='pagination-link'
			data-active={isActive || undefined}
			aria-current={ariaCurrent ?? (isActive ? 'page' : undefined)}
			className={cn(
				buttonVariants({ tone: isActive ? 'primary' : 'muted', appearance: isActive ? 'outline' : 'ghost' }),
				'aria-disabled:pointer-events-none aria-disabled:opacity-40',
				className,
			)}
			{...props}
		/>
	)
}

export type PaginationPreviousProps = PaginationLinkProps & { text?: string }

/** Chevron flips under `dir="rtl"` via CSS — no JS direction handling. */
export const PaginationPrevious: FC<PaginationPreviousProps> = ({
	text = 'Previous',
	'aria-label': ariaLabel = 'Go to previous page',
	ref,
	...props
}) => (
	<PaginationLink ref={ref} data-slot='pagination-previous' aria-label={ariaLabel} {...props}>
		<ChevronLeft {...CHROME_ICON_PROPS} className='size-4 shrink-0 rtl:-scale-x-100' />
		<span className='hidden sm:inline'>{text}</span>
	</PaginationLink>
)

export type PaginationNextProps = PaginationLinkProps & { text?: string }

/** Chevron flips under `dir="rtl"` via CSS — no JS direction handling. */
export const PaginationNext: FC<PaginationNextProps> = ({ text = 'Next', 'aria-label': ariaLabel = 'Go to next page', ref, ...props }) => (
	<PaginationLink ref={ref} data-slot='pagination-next' aria-label={ariaLabel} {...props}>
		<span className='hidden sm:inline'>{text}</span>
		<ChevronRight {...CHROME_ICON_PROPS} className='size-4 shrink-0 rtl:-scale-x-100' />
	</PaginationLink>
)

export type PaginationEllipsisProps = ComponentPropsWithRef<'span'>

/** Presentational only — indicates omitted pages, never clickable. No page-range calculation: the app decides where this appears. */
export const PaginationEllipsis: FC<PaginationEllipsisProps> = ({ className, ref, ...props }) => (
	<span
		ref={ref}
		data-slot='pagination-ellipsis'
		aria-hidden='true'
		className={cn('flex size-8 items-center justify-center text-muted-foreground', className)}
		{...props}
	>
		&hellip;
	</span>
)
