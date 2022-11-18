import React from 'react'

// iconURL, location of button icon
// alt, alt text of button
// handleClick, function to be called on button click
export default function IconButton({type, iconURL, alt, handleClick}) {
  return (
    <button
      className={'icon-button' + (type ? ` icon-button--${type}` : '')}
      onClick={handleClick}
    >
      <img className='icon-button__image' src={iconURL} alt={alt} />
    </button>
  )
}
