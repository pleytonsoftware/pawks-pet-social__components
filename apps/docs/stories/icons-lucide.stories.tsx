import type { Meta, StoryObj } from '@storybook/react-vite'

import { useDeferredValue, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { Icon } from '@pawks/components/icon'
import { lucideIcons } from '@pawks/icons'
import { useWindowVirtualizer } from '@tanstack/react-virtual'

const ALL_ICON_ENTRIES = Object.entries(lucideIcons)

const ITEM_WIDTH = 96
const ITEM_HEIGHT = 76
const GAP = 16

function LucideIconGallery() {
	const [search, setSearch] = useState('')
	// `search` updates synchronously on every keystroke, so the input itself
	// never feels laggy. `deferredSearch` — what the expensive icon
	// filter/re-render actually reacts to — is allowed by React to lag a
	// frame or two behind under its own scheduling instead of blocking the
	// keystroke's own paint.
	const deferredSearch = useDeferredValue(search)
	const isStale = search !== deferredSearch

	const entries = useMemo(() => {
		const query = deferredSearch.trim().toLowerCase()
		if (!query) return ALL_ICON_ENTRIES
		return ALL_ICON_ENTRIES.filter(([name]) => name.toLowerCase().includes(query))
	}, [deferredSearch])

	// Only ~1818 icons exist, but rendering all of them as real DOM nodes at
	// once is what caused the scroll jank — the grid is windowed instead:
	// only rows actually near the viewport get rendered, recycled as the
	// page scrolls. Column count is measured (not hardcoded) so the grid
	// still reflows responsively, same as the plain CSS grid it replaces.
	// Ref reads happen only in effects, never during render.
	const gridRef = useRef<HTMLDivElement>(null)
	const [columnCount, setColumnCount] = useState(1)
	const [scrollMargin, setScrollMargin] = useState(0)

	useLayoutEffect(() => {
		const el = gridRef.current
		if (!el) return
		const observer = new ResizeObserver(([entry]) => {
			const width = entry?.contentRect.width ?? 0
			setColumnCount(Math.max(1, Math.floor((width + GAP) / (ITEM_WIDTH + GAP))))
			setScrollMargin(el.offsetTop)
		})
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const rowCount = Math.ceil(entries.length / columnCount)

	const rowVirtualizer = useWindowVirtualizer({
		count: rowCount,
		estimateSize: () => ITEM_HEIGHT + GAP,
		overscan: 4,
		scrollMargin,
	})

	return (
		<div>
			<input
				type='search'
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				placeholder={`Filter ${ALL_ICON_ENTRIES.length} icons by name…`}
				style={{ display: 'block', width: '100%', maxWidth: '20rem', marginBottom: '1rem', padding: '0.375rem 0.5rem' }}
			/>
			<p style={{ fontSize: '12px', color: '#888', marginBottom: '1rem' }}>
				{entries.length} of {ALL_ICON_ENTRIES.length} icons
			</p>
			<div
				ref={gridRef}
				style={{
					position: 'relative',
					height: rowVirtualizer.getTotalSize(),
					opacity: isStale ? 0.5 : 1,
					transition: 'opacity 100ms',
				}}
			>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const rowStart = virtualRow.index * columnCount
					const rowItems = entries.slice(rowStart, rowStart + columnCount)
					return (
						<div
							key={virtualRow.key}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								transform: `translateY(${virtualRow.start - scrollMargin}px)`,
								display: 'grid',
								gridTemplateColumns: `repeat(${columnCount}, minmax(96px, 1fr))`,
								gap: GAP,
							}}
						>
							{rowItems.map(([name, IconComponent]) => (
								<div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
									<Icon IconComponent={IconComponent} size='md' />
									<span style={{ fontSize: '11px', textAlign: 'center', wordBreak: 'break-word' }}>{name}</span>
								</div>
							))}
						</div>
					)
				})}
			</div>
		</div>
	)
}

const meta: Meta = {
	title: 'Icons/Lucide',
}

export default meta
type Story = StoryObj

export const AllIcons: Story = {
	render: () => <LucideIconGallery />,
}
