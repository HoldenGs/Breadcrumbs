import React from 'react'

// iconURL, location of button icon
// alt, alt text of button
// onClick, function to be called on button click
export default function IconButton({ iconURL, alt, onClick }) {
  return (
	<div
		className='icon-button'
		onClick={onClick}
	>
		<img
			className='icon-button__image'
			src={iconURL}
			alt={alt}
		/>
	</div>
  )
}
