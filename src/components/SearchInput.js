import IconButton from './IconButton'
import PropTypes from 'prop-types'

export default function SearchInput({value, handleChange, handleClick}) {
  return (
    <div className='search-input'>
      <input
        type='text'
        className='search-input__input'
        placeholder='Search'
        value={value}
        onChange={handleChange}
      />
      {value && (
        <IconButton
          iconURL='/icons/magnifying-glass-solid.svg'
          alt='Search'
          onClick={handleClick}
        />
      )}
    </div>
  )
}

SearchInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}
