import { NavLink } from "react-router-dom"

// dest prop, navigation button destination
// text prop, navigation button text
export default function NavButton({ dest, text, userName }) {
	return (
		<NavLink
			to={dest}
			state={{username: userName}}
			className='nav-button'
		>
			{text}
		</NavLink>
	)
}
