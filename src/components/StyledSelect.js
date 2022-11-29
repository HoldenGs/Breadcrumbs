import { Select } from '@mantine/core'
import styled from '@emotion/styled'

const SSelect = styled(Select)`
	& .mantine-Select-input {
		height: 2.6rem;
		width: 100%;
		padding-left: 0.5rem;
		background-color: var(--dough);
		border: 0.2rem solid var(--jet);
		border-radius: 3px;
		font-size: 1rem;
		font-color: black;
		transition: background-color 150ms ease;

		&:hover {
			background-color: var(--dough-dark1);
		}

		&:active {
			background-color: var(--dough-dark2);
		}

		&::placeholder {
			color: var(--jet);
		}

		&:focus {
			background-color: var(--dough-dark2);
			&::placeholder {
				opacity: 0;
			}
		}
	}
`

export default function StyledSelect({ placeholder, value, onChange, data }) {
	return (
		<SSelect
			placeholder={placeholder}
			searchable
			value={value}
			onChange={onChange}
			data={data}
		/>
	)
}
