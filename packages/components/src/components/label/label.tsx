import type { ComponentProps, FC } from 'react'

import { cn } from '@/lib/cn.js'

import * as LabelPrimitive from '@radix-ui/react-label'

/**
 * Native form label wrapper: keeps the `Text` label typography style while
 * rendering a real `<label>` with native focus/activation semantics.
 * Uses Radix only to avoid text selection on double-click; no custom props.
 */
export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>

export const Label: FC<LabelProps> = ({ className, ...props }) => (
	<LabelPrimitive.Root
		data-slot='label'
		className={cn('text-label text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-40', className)}
		{...props}
	/>
)
