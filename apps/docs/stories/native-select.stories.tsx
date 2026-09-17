import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState, type ChangeEvent } from 'react'

import { Field, FieldDescription, FieldLabel } from '@pawks/components/field'
import { Label } from '@pawks/components/label'
import { NativeSelect } from '@pawks/components/native-select'

const meta: Meta<typeof NativeSelect> = {
	title: 'Atoms/NativeSelect',
	component: NativeSelect,
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {
	render: () => (
		<NativeSelect aria-label='Country' style={{ width: '12rem' }}>
			<option value='es'>Spain</option>
			<option value='fr'>France</option>
			<option value='pt'>Portugal</option>
		</NativeSelect>
	),
}

export const Placeholder: Story = {
	render: () => (
		<NativeSelect aria-label='Country' defaultValue='' style={{ width: '12rem' }}>
			<option value='' disabled>
				Select a country
			</option>
			<option value='es'>Spain</option>
			<option value='fr'>France</option>
		</NativeSelect>
	),
}

export const Selected: Story = {
	render: () => (
		<NativeSelect aria-label='Country' defaultValue='fr' style={{ width: '12rem' }}>
			<option value='es'>Spain</option>
			<option value='fr'>France</option>
			<option value='pt'>Portugal</option>
		</NativeSelect>
	),
}

// NativeSelect owns no state of its own — real controlled usage via the
// native `value`/`onChange` API, not Select's `onValueChange`.
export const Controlled: Story = {
	render: () => {
		function ControlledDemo() {
			const [value, setValue] = useState('es')
			return (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
					<NativeSelect
						aria-label='Country'
						value={value}
						onChange={(event: ChangeEvent<HTMLSelectElement>) => setValue(event.target.value)}
						style={{ width: '12rem' }}
					>
						<option value='es'>Spain</option>
						<option value='fr'>France</option>
					</NativeSelect>
					<span style={{ fontSize: '12px', color: '#888' }}>value: {value}</span>
				</div>
			)
		}
		return <ControlledDemo />
	},
}

export const Disabled: Story = {
	render: () => (
		<NativeSelect aria-label='Country' disabled defaultValue='es' style={{ width: '12rem' }}>
			<option value='es'>Spain</option>
			<option value='fr'>France</option>
		</NativeSelect>
	),
}

export const Required: Story = {
	render: () => (
		<NativeSelect aria-label='Country' name='country' required defaultValue='' style={{ width: '12rem' }}>
			<option value='' disabled>
				Select a country
			</option>
			<option value='es'>Spain</option>
		</NativeSelect>
	),
}

export const Multiple: Story = {
	render: () => (
		<NativeSelect aria-label='Countries' multiple size={4} style={{ width: '12rem', height: 'auto' }}>
			<option value='es'>Spain</option>
			<option value='fr'>France</option>
			<option value='pt'>Portugal</option>
			<option value='us'>United States</option>
		</NativeSelect>
	),
}

export const OptionGroups: Story = {
	render: () => (
		<NativeSelect aria-label='Country' style={{ width: '14rem' }}>
			<optgroup label='Europe'>
				<option value='es'>Spain</option>
				<option value='fr'>France</option>
			</optgroup>
			<optgroup label='North America'>
				<option value='us'>United States</option>
				<option value='ca'>Canada</option>
			</optgroup>
		</NativeSelect>
	),
}

export const LongOptions: Story = {
	render: () => (
		<NativeSelect aria-label='Shipping method' style={{ width: '16rem' }}>
			<option value='standard'>Standard shipping — arrives in 5 to 7 business days</option>
			<option value='express'>Express shipping — arrives in 1 to 2 business days</option>
		</NativeSelect>
	),
}

export const WithLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
			<Label htmlFor='native-country-label'>Country</Label>
			<NativeSelect id='native-country-label' style={{ width: '12rem' }}>
				<option value='es'>Spain</option>
				<option value='fr'>France</option>
			</NativeSelect>
		</div>
	),
}

export const WithDescription: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
			<Label htmlFor='native-country-desc'>Country</Label>
			<NativeSelect id='native-country-desc' style={{ width: '12rem' }}>
				<option value='es'>Spain</option>
				<option value='fr'>France</option>
			</NativeSelect>
			<span style={{ fontSize: '12px', color: '#888' }}>Select your country of residence.</span>
		</div>
	),
}

export const WithField: Story = {
	render: () => (
		<Field style={{ width: '16rem' }}>
			<FieldLabel htmlFor='native-country-field'>Country</FieldLabel>
			<NativeSelect id='native-country-field' className='w-full'>
				<option value=''>Select a country</option>
				<option value='es'>Spain</option>
				<option value='fr'>France</option>
			</NativeSelect>
			<FieldDescription>Select your country of residence.</FieldDescription>
		</Field>
	),
}

export const FormExample: Story = {
	render: () => (
		<form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
				<Label htmlFor='native-country-form'>Country</Label>
				<NativeSelect id='native-country-form' name='country' defaultValue='es' style={{ width: '12rem' }}>
					<option value='es'>Spain</option>
					<option value='fr'>France</option>
				</NativeSelect>
			</div>
		</form>
	),
}
