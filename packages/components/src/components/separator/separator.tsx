import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as SeparatorPrimitive from '@radix-ui/react-separator'

export type SeparatorProps = ComponentPropsWithRef<typeof SeparatorPrimitive.Root>

/** Thin Radix wrapper — width/height track `orientation` automatically, no manual sizing needed. */
export const Separator: FC<SeparatorProps> = ({ className, orientation = 'horizontal', decorative = true, ref, ...props }) => (
	<SeparatorPrimitive.Root
		ref={ref}
		data-slot='separator'
		orientation={orientation}
		decorative={decorative}
		className={cn(
			'shrink-0 bg-border',
			'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full',
			'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
			className,
		)}
		{...props}
	/>
)
