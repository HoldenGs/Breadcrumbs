// text prop, text to display in button
// onClick prop, function to run when button is clicked
// disabled prop, optional, whether button is disabled
// type, optional, type of button (defaults to 1, a primary button) -- for styling
export default function Button({ text, onClick, disabled = false, type = 1 }) {
	const className = `button--${type}`

	return <button
		onClick={onClick}
		disabled={disabled}
		className={'button ' + className}
	>
		{text}
	</button>
}
