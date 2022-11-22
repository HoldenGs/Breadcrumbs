import { NavLink } from "react-router-dom"

// dest prop, navigation button destination
// text prop, navigation button text
export default function NavButton({ dest, text, userId }) {
	return (
		<NavLink
			to={dest}
			state={{ userID: userId }}
			className='nav-button'
		>
			{text}
		</NavLink>
	)
}
