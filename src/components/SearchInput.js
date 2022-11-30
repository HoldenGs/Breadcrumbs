import IconButton from './IconButton'
import PropTypes from 'prop-types'

import TextInput from './TextInput'

export default function SearchInput({ value, handleChange, handleClick }) {
	return (
		<form
			className="search-input"
			onSubmit={(e) => {
				e.preventDefault()
				handleClick()
			}}
		>
			<TextInput
				name="search"
				placeholder="Search"
				value={value}
				color="dough"
				handleChange={handleChange}
			/>
			{value && <IconButton iconURL="/icons/search.svg" alt="Search" />}
		</form>
	)
}

SearchInput.propTypes = {
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleClick: PropTypes.func.isRequired,
}
