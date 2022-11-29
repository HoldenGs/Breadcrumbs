import IconButton from './IconButton'
import PropTypes from 'prop-types'

import TextInput from './TextInput'

export default function SearchInput({value, handleChange, handleClick}) {
  return (
    <div className='search-input'>
      <TextInput
        name='search'
        placeholder='Search'
        value={value}
        handleChange={handleChange}
      />
      {value && (
        <IconButton
          iconURL='/icons/search.svg'
          alt='Search'
          onClick={handleClick}
        />
      )}
    </div>
  )
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
}
