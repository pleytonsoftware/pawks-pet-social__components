import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as AccordionPrimitive from '@radix-ui/react-accordion'

// A composable expandable-content list — five separate parts (Root, Item,
// Header, Trigger, Content), matching raw Radix's own shape rather than
// bundling Header into Trigger. Radix owns single/multiple selection state,
// keyboard navigation, focus management, collapsible behavior, orientation,
// and accessibility; this only styles via `data-*`. No default icon is
// rendered inside the trigger — consumers compose their own (see stories) —
// so `[data-state=open]>svg` styling hooks work generically for whichever
// icon a consumer places, without this component dictating one.

export type AccordionProps = ComponentPropsWithRef<typeof AccordionPrimitive.Root>
export const Accordion: FC<AccordionProps> = ({ ref, ...props }) => <AccordionPrimitive.Root ref={ref} data-slot='accordion' {...props} />

export type AccordionItemProps = ComponentPropsWithRef<typeof AccordionPrimitive.Item>

export const AccordionItem: FC<AccordionItemProps> = ({ className, ref, ...props }) => (
	<AccordionPrimitive.Item ref={ref} data-slot='accordion-item' className={cn('border-b border-border last:border-b-0', className)} {...props} />
)

export type AccordionHeaderProps = ComponentPropsWithRef<typeof AccordionPrimitive.Header>

export const AccordionHeader: FC<AccordionHeaderProps> = ({ className, ref, ...props }) => (
	<AccordionPrimitive.Header ref={ref} data-slot='accordion-header' className={cn('flex', className)} {...props} />
)

export type AccordionTriggerProps = ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>

export const AccordionTrigger: FC<AccordionTriggerProps> = ({ className, ref, ...props }) => (
	<AccordionPrimitive.Trigger
		ref={ref}
		data-slot='accordion-trigger'
		className={cn(
			'flex flex-1 items-center justify-between gap-4 rounded-md p-4 text-left text-body font-medium outline-none transition-all',
			'hover:cursor-pointer hover:underline focus-visible:ring-[3px] focus-visible:ring-ring',
			'disabled:pointer-events-none disabled:opacity-40',
			'[&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-200',
			className,
		)}
		{...props}
	/>
)

export type AccordionContentProps = ComponentPropsWithRef<typeof AccordionPrimitive.Content>

export const AccordionContent: FC<AccordionContentProps> = ({ className, children, ref, ...props }) => (
	<AccordionPrimitive.Content ref={ref} data-slot='accordion-content' className='overflow-hidden text-body' {...props}>
		<div className={cn('px-4 pt-0 pb-4', className)}>{children}</div>
	</AccordionPrimitive.Content>
)
