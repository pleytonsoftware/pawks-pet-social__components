import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '@pawks/components/icon'
import { pawksIcons } from '@pawks/icons'

const meta: Meta = {
	title: 'Icons/Pawks',
}

export default meta
type Story = StoryObj

export const AllIcons: Story = {
	render: () => (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: '1rem' }}>
			{Object.entries(pawksIcons).map(([name, IconComponent]) => (
				<div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
					<Icon IconComponent={IconComponent} size='md' />
					<span style={{ fontSize: '11px', textAlign: 'center', wordBreak: 'break-word' }}>{name}</span>
				</div>
			))}
		</div>
	),
}
