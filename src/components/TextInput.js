import PropTypes from 'prop-types'

export default function TextInput({
  type,
  name,
  placeholder,
  value,
  handleChange,
  required
}) {
  return (
    <input
      className='text-input'
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
    />
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}

TextInput.defaultProps = {
  type: 'text',
  required: false
}
