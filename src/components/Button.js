import PropTypes from 'prop-types'

export default function Button({ text, handleClick, color , disabled}) {
	return (
		<button className={"button" + (color ? ` button--${color}` : "")} onClick={handleClick} disabled={disabled}>
			{text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	color: PropTypes.string,
	disabled: PropTypes.bool,
}

Button.defaultProps = {
	disabled: false,
}
