import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { FORM_CONTROL_BASE_CLASSES } from '@/lib/form-control-classes.js'
import { CHROME_ICON_PROPS } from '@/lib/icon-props.js'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from '@pawks/icons'

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root>
/**
 * Thin Radix composition — Radix owns open/close, positioning, typeahead,
 * keyboard nav, and selection. SelectContent has no enter/exit animation
 * (opens/closes instantly): Radix unmounts it by default, and animating
 * that needs `forceMount` coordination or a plugin this repo doesn't
 * otherwise depend on — not worth adding for one component.
 */
export const Select: FC<SelectProps> = (props) => <SelectPrimitive.Root data-slot='select' {...props} />

export type SelectGroupProps = ComponentProps<typeof SelectPrimitive.Group>
export const SelectGroup: FC<SelectGroupProps> = (props) => <SelectPrimitive.Group data-slot='select-group' {...props} />

export type SelectValueProps = ComponentProps<typeof SelectPrimitive.Value>
export const SelectValue: FC<SelectValueProps> = (props) => <SelectPrimitive.Value data-slot='select-value' {...props} />

export type SelectTriggerProps = ComponentPropsWithRef<typeof SelectPrimitive.Trigger>

export const SelectTrigger: FC<SelectTriggerProps> = ({ className, children, ref, ...props }) => (
	<SelectPrimitive.Trigger
		ref={ref}
		data-slot='select-trigger'
		className={cn(
			FORM_CONTROL_BASE_CLASSES,
			'flex h-8 w-fit items-center justify-between gap-2 data-placeholder:text-muted-foreground',
			'[&_svg]:pointer-events-none [&_svg]:shrink-0',
			className,
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDown {...CHROME_ICON_PROPS} className='size-3.5 text-muted-foreground' />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
)

export type SelectContentProps = ComponentPropsWithRef<typeof SelectPrimitive.Content>

export const SelectContent: FC<SelectContentProps> = ({ className, children, position = 'popper', ref, ...props }) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			data-slot='select-content'
			position={position}
			className={cn(
				'relative z-popover min-w-32 overflow-y-auto overflow-x-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
				'max-h-(--radix-select-content-available-height)',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
				className,
			)}
			{...props}
		>
			<SelectScrollUpButton />
			<SelectPrimitive.Viewport
				className={cn(
					'p-1',
					position === 'popper' && 'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width) scroll-my-1',
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
			<SelectScrollDownButton />
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
)

export type SelectItemProps = ComponentPropsWithRef<typeof SelectPrimitive.Item>

export const SelectItem: FC<SelectItemProps> = ({ className, children, ref, ...props }) => (
	<SelectPrimitive.Item
		ref={ref}
		data-slot='select-item'
		className={cn(
			'relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-body text-foreground outline-none select-none',
			'focus:bg-accent focus:text-accent-foreground',
			'data-disabled:pointer-events-none data-disabled:opacity-40',
			className,
		)}
		{...props}
	>
		<span className='absolute right-2 flex size-3.5 items-center justify-center'>
			<SelectPrimitive.ItemIndicator>
				<Check {...CHROME_ICON_PROPS} className='size-3.5' />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
)

export type SelectLabelProps = ComponentProps<typeof SelectPrimitive.Label>

export const SelectLabel: FC<SelectLabelProps> = ({ className, ...props }) => (
	<SelectPrimitive.Label data-slot='select-label' className={cn('px-2 py-1.5 text-caption text-muted-foreground', className)} {...props} />
)

export type SelectSeparatorProps = ComponentProps<typeof SelectPrimitive.Separator>

export const SelectSeparator: FC<SelectSeparatorProps> = ({ className, ...props }) => (
	<SelectPrimitive.Separator data-slot='select-separator' className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
)

export type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpButton>

export const SelectScrollUpButton: FC<SelectScrollUpButtonProps> = ({ className, ...props }) => (
	<SelectPrimitive.ScrollUpButton
		data-slot='select-scroll-up-button'
		className={cn('flex cursor-default items-center justify-center py-1', className)}
		{...props}
	>
		<ChevronUp {...CHROME_ICON_PROPS} className='size-3.5' />
	</SelectPrimitive.ScrollUpButton>
)

export type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownButton>

export const SelectScrollDownButton: FC<SelectScrollDownButtonProps> = ({ className, ...props }) => (
	<SelectPrimitive.ScrollDownButton
		data-slot='select-scroll-down-button'
		className={cn('flex cursor-default items-center justify-center py-1', className)}
		{...props}
	>
		<ChevronDown {...CHROME_ICON_PROPS} className='size-3.5' />
	</SelectPrimitive.ScrollDownButton>
)
