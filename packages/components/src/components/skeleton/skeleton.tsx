import type { ComponentPropsWithRef, FC } from 'react'

import { cn } from '@/lib/cn.js'

export type SkeletonProps = ComponentPropsWithRef<'div'>

/** A loading placeholder — dimensions and shape come from `className`, not dedicated props. */
export const Skeleton: FC<SkeletonProps> = ({ className, ref, ...props }) => (
	<div ref={ref} data-slot='skeleton' className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
)
