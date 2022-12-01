import { useRef, useEffect } from 'react'
import { MultiSelect } from '@mantine/core'
import styled from '@emotion/styled'

const SMultiSelect = styled(MultiSelect)`
	& .mantine-MultiSelect-input {
		padding-inline: 0.5rem;
		background-color: ${(props) =>
			props.dark ? 'var(--tan)' : 'var(--dough)'};
		border: 0.2rem solid var(--jet);
		border-radius: 3px;
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
		font-size: 1rem;
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
		border: 0.2rem solid var(--jet);
		border-radius: 3px;
		transition: background-color 150ms ease;

		&:hover {
			background-color: var(--dough-dark1);
		}
	}

	.mantine-MultiSelect-defaultValueRemove {
		styles: none;
	}
`

export default function StyledMultiSelect({
	className,
	placeholder,
	value,
	onChange,
	nothingFound,
	data,
	required,
	maxSelectedValues,
	dark,
}) {
	const inputRef = useRef(null)

	useEffect(() => {
		if (required) {
			if (value?.length) inputRef.current.required = false
			else inputRef.current.required = true
		}
	}, [value, required])

	return (
		<SMultiSelect
			className={className}
			ref={inputRef}
			placeholder={placeholder}
			searchable
			value={value}
			onChange={onChange}
			nothingFound={nothingFound}
			data={data}
			maxSelectedValues={maxSelectedValues}
			dark={dark}
		/>
	)
}
