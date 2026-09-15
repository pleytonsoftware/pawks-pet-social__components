import { cn } from '@/lib/cn.js'

import { Children, cloneElement, isValidElement, type FC, type ReactElement, type ReactNode } from 'react'

import { Avatar, AvatarFallback, type AvatarProps } from './avatar.js'

export type AvatarGroupProps = {
	children: ReactNode
	/**
	 * How many avatars to show before collapsing the rest into a trailing
	 * "+n" avatar.
	 * @default 3
	 */
	max?: number
	/**
	 * Applied to every avatar in the group (including the "+n" overflow
	 * avatar), overriding each child's own `size`, so the stack stays
	 * visually consistent. Leave unset to let each child keep its own size.
	 */
	size?: AvatarProps['size']
	className?: string
}

export const AvatarGroup: FC<AvatarGroupProps> = ({ children, max = 3, size, className }) => {
	const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[]
	const visible = items.slice(0, max)
	const overflowCount = items.length - visible.length

	return (
		<div className={cn('flex items-center', className)}>
			{visible.map((child, index) =>
				cloneElement(child, {
					key: child.key ?? index,
					size: size ?? child.props.size,
					className: cn('ring-2 ring-background', index > 0 && '-ml-2', child.props.className),
				}),
			)}
			{overflowCount > 0 && (
				<Avatar size={size} className='-ml-2 ring-2 ring-background'>
					<AvatarFallback>+{overflowCount}</AvatarFallback>
				</Avatar>
			)}
		</div>
	)
}
