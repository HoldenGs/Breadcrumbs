import React from 'react'
import { Select } from '@mantine/core'
import styled from '@emotion/styled'

const SSelect = styled(Select)`
	& .mantine-Select-input {
		height: 2.6rem;
		padding-inline: 0.5rem;
		background-color: ${(props) =>
			props.dark ? 'var(--tan)' : 'var(--dough)'};
		border: 0.2rem solid var(--jet);
		border-radius: 3px;
		color: var(--jet);
		font-size: 1rem;
		font-family: 'Lexend', sans-serif;
		transition: background-color 150ms ease;

		&:hover {
			background-color: ${(props) =>
				props.dark ? 'var(--tan-dark1)' : 'var(--dough-dark1)'};
		}

		&::placeholder {
			color: var(--jet);
		}

		&:focus {
			background-color: ${(props) =>
				props.dark ? 'var(--tan-dark2)' : 'var(--dough-dark2)'};
			&::placeholder {
				opacity: 0;
			}
		}
	}
`

export default function StyledSelect({
	className,
	placeholder,
	value,
	onChange,
	nothingFound,
	data,
	required,
	dark,
	disabled,
}) {
	return (
		<SSelect
			className={className}
			placeholder={placeholder}
			searchable
			value={value}
			onChange={onChange}
			nothingFound={nothingFound}
			data={data}
			required={required}
			dark={dark}
			disabled={disabled}
		/>
	)
}
