import { NavLink } from "react-router-dom"

// dest prop, navigation button destination
// text prop, navigation button text
export default function NavButton({ dest, text }) {
	return (
		<NavLink
			to={dest}
			className='nav-button'
		>
			{text}
		</NavLink>
	)
}
