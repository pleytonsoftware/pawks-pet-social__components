import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'
import { FORM_CONTROL_BASE_CLASSES } from '@/lib/form-control-classes.js'
import { ChevronDownIcon } from '@/lib/form-icons.js'

export type NativeSelectProps = ComponentPropsWithRef<'select'>

/**
 * A real native `<select>` — not a Radix emulation. For richer/custom
 * dropdown UX, use `Select` instead; the two slot into `Field`
 * interchangeably but are deliberately not API-compatible.
 */
export const NativeSelect: FC<NativeSelectProps> = ({ className, children, ref, ...props }) => (
	// Grid overlay, not absolute positioning: both children share one grid
	// cell (`*:col-start-1 *:row-start-1`), so the wrapper's size always
	// tracks the <select>'s own size — including `w-full` — with no risk
	// of a plain block wrapper stretching past it and misplacing the icon.
	<div className='relative inline-grid *:col-start-1 *:row-start-1'>
		<select ref={ref} data-slot='native-select' className={cn(FORM_CONTROL_BASE_CLASSES, 'h-8 appearance-none pr-7', className)} {...props}>
			{children}
		</select>
		<ChevronDownIcon className='pointer-events-none mr-2 size-3.5 self-center justify-self-end text-muted-foreground peer-disabled:opacity-40' />
	</div>
)
