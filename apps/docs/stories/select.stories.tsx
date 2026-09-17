import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Field, FieldDescription, FieldLabel } from '@pawks/components/field'
import { Label } from '@pawks/components/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@pawks/components/select'

const meta: Meta<typeof Select> = {
	title: 'Atoms/Select',
	component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
	render: () => (
		<Select>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='es'>Spain</SelectItem>
				<SelectItem value='fr'>France</SelectItem>
				<SelectItem value='pt'>Portugal</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const Placeholder: Story = {
	render: () => (
		<Select>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Choose one…' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='es'>Spain</SelectItem>
				<SelectItem value='fr'>France</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const Selected: Story = {
	render: () => (
		<Select defaultValue='fr'>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='es'>Spain</SelectItem>
				<SelectItem value='fr'>France</SelectItem>
				<SelectItem value='pt'>Portugal</SelectItem>
			</SelectContent>
		</Select>
	),
}

// Select owns no state of its own — this is a real controlled component,
// proving `onValueChange` (not `onChange`) drives it.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [value, setValue] = useState('es')
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<Select value={value} onValueChange={setValue}>
						<SelectTrigger aria-label='Country'>
							<SelectValue placeholder='Select a country' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='es'>Spain</SelectItem>
							<SelectItem value='fr'>France</SelectItem>
						</SelectContent>
					</Select>
					<span style={{ fontSize: '12px', color: '#888' }}>value: {value}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const Disabled: Story = {
	render: () => (
		<Select disabled defaultValue='es'>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='es'>Spain</SelectItem>
				<SelectItem value='fr'>France</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const DisabledItem: Story = {
	render: () => (
		<Select>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='es'>Spain</SelectItem>
				<SelectItem value='fr' disabled>
					France (unavailable)
				</SelectItem>
				<SelectItem value='pt'>Portugal</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const Required: Story = {
	render: () => (
		<Select name='country' required>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='es'>Spain</SelectItem>
				<SelectItem value='fr'>France</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const Groups: Story = {
	render: () => (
		<Select>
			<SelectTrigger aria-label='Country'>
				<SelectValue placeholder='Select a country' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Europe</SelectLabel>
					<SelectItem value='es'>Spain</SelectItem>
					<SelectItem value='fr'>France</SelectItem>
					<SelectItem value='pt'>Portugal</SelectItem>
				</SelectGroup>
				<SelectSeparator />
				<SelectGroup>
					<SelectLabel>North America</SelectLabel>
					<SelectItem value='us'>United States</SelectItem>
					<SelectItem value='ca'>Canada</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
}

export const LongOptions: Story = {
	render: () => (
		<Select>
			<SelectTrigger aria-label='Shipping method' style={{ width: '16rem' }}>
				<SelectValue placeholder='Select a shipping method' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='standard'>Standard shipping — arrives in 5 to 7 business days</SelectItem>
				<SelectItem value='express'>Express shipping — arrives in 1 to 2 business days</SelectItem>
			</SelectContent>
		</Select>
	),
}

export const ManyOptions: Story = {
	render: () => (
		<Select>
			<SelectTrigger aria-label='Number'>
				<SelectValue placeholder='Select a number' />
			</SelectTrigger>
			<SelectContent>
				{Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
					<SelectItem key={n} value={String(n)}>
						Option {n}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	),
}

export const WithLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
			<Label htmlFor='country-label'>Country</Label>
			<Select>
				<SelectTrigger id='country-label'>
					<SelectValue placeholder='Select a country' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='es'>Spain</SelectItem>
					<SelectItem value='fr'>France</SelectItem>
				</SelectContent>
			</Select>
		</div>
	),
}

export const WithDescription: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
			<Label htmlFor='country-desc'>Country</Label>
			<Select>
				<SelectTrigger id='country-desc'>
					<SelectValue placeholder='Select a country' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='es'>Spain</SelectItem>
					<SelectItem value='fr'>France</SelectItem>
				</SelectContent>
			</Select>
			<span style={{ fontSize: '12px', color: '#888' }}>Select your country of residence.</span>
		</div>
	),
}

export const WithField: Story = {
	render: () => (
		<Field style={{ width: '16rem' }}>
			<FieldLabel htmlFor='country-field'>Country</FieldLabel>
			<Select>
				<SelectTrigger id='country-field' className='w-full'>
					<SelectValue placeholder='Select a country' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='es'>Spain</SelectItem>
					<SelectItem value='fr'>France</SelectItem>
				</SelectContent>
			</Select>
			<FieldDescription>Select your country of residence.</FieldDescription>
		</Field>
	),
}

export const FormExample: Story = {
	render: () => (
		<form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
				<Label htmlFor='country-form'>Country</Label>
				<Select name='country' defaultValue='es'>
					<SelectTrigger id='country-form'>
						<SelectValue placeholder='Select a country' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='es'>Spain</SelectItem>
						<SelectItem value='fr'>France</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</form>
	),
}
