import React, { useState } from 'react'

// startingText prop, optional, what text to place in text field initially
// placeholder prop, optional, "hint" text displayed when text field is empty
export default function TextField({ startingText, placeholder }) {
	const [ text, setText ] = useState(startingText || '')

	return (
		<div className='text-field'>
			<input
				type='text'
				className='text-field__input'
				placeholder={placeholder || ''}
				onChange={event => setText(event.target.value)}
				value={text}
			/>
		</div>
	)
}
