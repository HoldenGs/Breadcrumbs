import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// dest prop, navigation button destination
// text prop, navigation button text
// userID prop, userId if available (to pass through e.g. Profile -> Following)
export default function NavButton({ dest, text, userID }) {
	return (
		<NavLink to={dest} state={{ userID: userID }} className="nav-button">
			{text}
		</NavLink>
	)
}

NavButton.propTypes = {
	dest: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	userID: PropTypes.string,
}
