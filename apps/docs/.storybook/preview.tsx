import '@pawks/components/styles.css'
import './preview.css'

import type { Preview } from '@storybook/react-vite'

import { useEffect, type ReactNode } from 'react'

const COATS = [
	{ value: 'ragdoll', title: 'Ragdoll' },
	{ value: 'abyssinian', title: 'Abyssinian' },
	{ value: 'maine-coon', title: 'Maine Coon' },
	{ value: 'havana-brown', title: 'Havana Brown' },
	{ value: 'bombay', title: 'Bombay' },
]

function ThemeDecorator({ coat, mode, children }: { coat: string; mode: string; children: ReactNode }) {
	useEffect(() => {
		document.documentElement.dataset.coat = coat
		document.documentElement.classList.toggle('dark', mode === 'dark')
	}, [coat, mode])

	return <>{children}</>
}

const preview: Preview = {
	tags: ['autodocs'],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		coat: {
			description: 'Active coat theme',
			toolbar: { title: 'Coat', icon: 'paintbrush', items: COATS, dynamicTitle: true },
		},
		mode: {
			description: 'Light / dark mode',
			toolbar: {
				title: 'Mode',
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: { coat: 'ragdoll', mode: 'light' },
	decorators: [
		(Story, context) => (
			<ThemeDecorator coat={context.globals.coat as string} mode={context.globals.mode as string}>
				<Story />
			</ThemeDecorator>
		),
	],
}

export default preview
