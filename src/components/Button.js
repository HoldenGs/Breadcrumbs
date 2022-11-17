import PropTypes from 'prop-types'

export default function Button({text, handleClick, disabled}) {
  return (
    <button className='button' onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  disabled: false
}
