import React from 'react'
import { MultiSelect } from '@mantine/core'
import styled from '@emotion/styled'

const SMultiSelect = styled(MultiSelect)`
	& .mantine-MultiSelect-input {
		width: 100%;
		padding-inline: 0.5rem;
		background-color: ${(props) =>
			props.dark ? 'var(--tan)' : 'var(--dough)'};
		border: 0.2rem solid var(--jet);
		border-radius: 3px;
		font-size: 1rem;
		color: var(--jet);
		font-family: 'Lexend', sans-serif;
		transition: background-color 150ms ease;

		&:hover {
			background-color: ${(props) =>
				props.dark ? 'var(--tan-dark1)' : 'var(--dough-dark1)'};
		}
	}

	& .mantine-MultiSelect-searchInput {
		color: var(--jet);
		font-family: 'Lexend', sans-serif;
		transition: background-color 150ms ease;

		&::placeholder {
			color: var(--jet);
			font-family: 'Lexend', sans-serif;
		}
	}

	.mantine-MultiSelect-value {
		color: var(--jet);
		background-color: var(--dough);
		border: 0.1rem solid var(--jet);
		border-radius: 3px;
		transition: background-color 150ms ease;

		&:hover {
			background-color: var(--dough-dark1);
		}
	}
`

export default function StyledMultiSelect({
	placeholder,
	value,
	onChange,
	nothingFound,
	data,
	required,
	maxSelectedValues,
	dark,
}) {
	return (
		<SMultiSelect
			placeholder={placeholder}
			searchable
			value={value}
			onChange={onChange}
			nothingFound={nothingFound}
			data={data}
			required={required}
			maxSelectedValues={maxSelectedValues}
			dark={dark}
		/>
	)
}
