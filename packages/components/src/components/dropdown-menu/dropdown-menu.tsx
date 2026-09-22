import type { ComponentProps, ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { CheckIcon, ChevronRightIcon } from '@/lib/form-icons.js'

import { cva, type VariantProps } from 'class-variance-authority'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

// A menu/action primitive ("Which action?"), not a value picker like
// Select ("Which value?") — see this folder's own stories for the two
// side by side. Thin Radix composition: Radix owns open/close,
// positioning, portals, keyboard nav, typeahead, and submenu state; this
// only styles via `data-*`. No `items` prop — compose children instead.
// Enter/exit motion lives in styles/tailwind.css, keyed off `data-slot` +
// `data-state`, so it ships with the precompiled stylesheet.

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>
export const DropdownMenu: FC<DropdownMenuProps> = (props) => <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />

export type DropdownMenuTriggerProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.Trigger>
export const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = ({ ref, ...props }) => (
	<DropdownMenuPrimitive.Trigger ref={ref} data-slot='dropdown-menu-trigger' {...props} />
)

export type DropdownMenuPortalProps = ComponentProps<typeof DropdownMenuPrimitive.Portal>

/** Only for custom compositions — DropdownMenuContent already portals itself. */
export const DropdownMenuPortal: FC<DropdownMenuPortalProps> = (props) => <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />

/** Shared popover surface for both the root menu and its submenus. */
const MENU_SURFACE_CLASSES =
	'z-popover min-w-32 overflow-x-hidden overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md'

export type DropdownMenuContentProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>

export const DropdownMenuContent: FC<DropdownMenuContentProps> = ({ className, sideOffset = 4, align = 'start', ref, ...props }) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			data-slot='dropdown-menu-content'
			sideOffset={sideOffset}
			align={align}
			className={cn(
				MENU_SURFACE_CLASSES,
				'max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)',
				className,
			)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
)

/**
 * Shared by Item, CheckboxItem and RadioItem.
 * @property tone semantic color — `destructive` for irreversible actions
 * @property inset left-pads an item with no indicator so it aligns with ones that have
 */
export const dropdownMenuItemVariants = cva(
	cn(
		'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-body outline-none select-none',
		'data-disabled:pointer-events-none data-disabled:opacity-40',
		"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	),
	{
		variants: {
			tone: {
				default: 'text-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground',
				destructive: 'text-destructive data-highlighted:bg-destructive/10 data-highlighted:text-destructive',
			},
			inset: { true: 'pl-8', false: '' },
		},
		defaultVariants: { tone: 'default', inset: false },
	},
)

export type DropdownMenuItemProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & VariantProps<typeof dropdownMenuItemVariants>

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ className, tone, inset, ref, ...props }) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		data-slot='dropdown-menu-item'
		className={cn(dropdownMenuItemVariants({ tone, inset }), className)}
		{...props}
	/>
)

/** Reserves the indicator gutter that `inset` items pad past. */
const ItemIndicatorSlot: FC<ComponentProps<typeof DropdownMenuPrimitive.ItemIndicator>> = (props) => (
	<span className='pointer-events-none absolute left-2 flex size-3.5 items-center justify-center'>
		<DropdownMenuPrimitive.ItemIndicator {...props} />
	</span>
)

export type DropdownMenuCheckboxItemProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem> &
	Pick<VariantProps<typeof dropdownMenuItemVariants>, 'tone'>

export const DropdownMenuCheckboxItem: FC<DropdownMenuCheckboxItemProps> = ({ className, children, tone, ref, ...props }) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		data-slot='dropdown-menu-checkbox-item'
		className={cn(dropdownMenuItemVariants({ tone, inset: true }), 'pr-2', className)}
		{...props}
	>
		<ItemIndicatorSlot>
			<CheckIcon className='size-3.5' />
		</ItemIndicatorSlot>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
)

export type DropdownMenuRadioGroupProps = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
export const DropdownMenuRadioGroup: FC<DropdownMenuRadioGroupProps> = (props) => (
	<DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
)

export type DropdownMenuRadioItemProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem> &
	Pick<VariantProps<typeof dropdownMenuItemVariants>, 'tone'>

export const DropdownMenuRadioItem: FC<DropdownMenuRadioItemProps> = ({ className, children, tone, ref, ...props }) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		data-slot='dropdown-menu-radio-item'
		className={cn(dropdownMenuItemVariants({ tone, inset: true }), 'pr-2', className)}
		{...props}
	>
		<ItemIndicatorSlot>
			<span className='block size-2 rounded-full bg-current' />
		</ItemIndicatorSlot>
		{children}
	</DropdownMenuPrimitive.RadioItem>
)

type InsetProp = Pick<VariantProps<typeof dropdownMenuItemVariants>, 'inset'>

export type DropdownMenuLabelProps = ComponentProps<typeof DropdownMenuPrimitive.Label> & InsetProp

export const DropdownMenuLabel: FC<DropdownMenuLabelProps> = ({ className, inset, ...props }) => (
	<DropdownMenuPrimitive.Label
		data-slot='dropdown-menu-label'
		className={cn('px-2 py-1.5 text-caption text-muted-foreground', inset && 'pl-8', className)}
		{...props}
	/>
)

export type DropdownMenuSeparatorProps = ComponentProps<typeof DropdownMenuPrimitive.Separator>

export const DropdownMenuSeparator: FC<DropdownMenuSeparatorProps> = ({ className, ...props }) => (
	<DropdownMenuPrimitive.Separator data-slot='dropdown-menu-separator' className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
)

export type DropdownMenuGroupProps = ComponentProps<typeof DropdownMenuPrimitive.Group>
export const DropdownMenuGroup: FC<DropdownMenuGroupProps> = (props) => <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />

export type DropdownMenuSubProps = ComponentProps<typeof DropdownMenuPrimitive.Sub>
export const DropdownMenuSub: FC<DropdownMenuSubProps> = (props) => <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />

export type DropdownMenuSubTriggerProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & InsetProp

export const DropdownMenuSubTrigger: FC<DropdownMenuSubTriggerProps> = ({ className, children, inset, ref, ...props }) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		data-slot='dropdown-menu-sub-trigger'
		className={cn(dropdownMenuItemVariants({ inset }), 'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground', className)}
		{...props}
	>
		{children}
		<ChevronRightIcon className='ml-auto size-3.5' />
	</DropdownMenuPrimitive.SubTrigger>
)

export type DropdownMenuSubContentProps = ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>

export const DropdownMenuSubContent: FC<DropdownMenuSubContentProps> = ({ className, ref, ...props }) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		data-slot='dropdown-menu-sub-content'
		className={cn(MENU_SURFACE_CLASSES, 'origin-(--radix-dropdown-menu-content-transform-origin)', className)}
		{...props}
	/>
)

export type DropdownMenuShortcutProps = ComponentProps<'span'>

/** Presentational only — does not register or handle actual keyboard shortcuts. */
export const DropdownMenuShortcut: FC<DropdownMenuShortcutProps> = ({ className, ...props }) => (
	<span data-slot='dropdown-menu-shortcut' className={cn('ml-auto text-caption text-muted-foreground', className)} {...props} />
)
