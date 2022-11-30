import PropTypes from 'prop-types'

export default function TextInput({
	type,
	name,
	placeholder,
	value,
	handleChange,
	color,
	required,
	autocomplete,
}) {
	return (
		<input
			className={'text-input' + (color ? ` text-input--${color}` : '')}
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			required={required}
			autocomplete={autocomplete}
		/>
	)
}

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	color: PropTypes.string,
	required: PropTypes.bool,
}

TextInput.defaultProps = {
	type: 'text',
	required: false,
}
