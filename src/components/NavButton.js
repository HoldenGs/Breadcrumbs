import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

// dest prop, navigation button destination
// text prop, navigation button text
// userID prop, userId if available (to pass through e.g. Profile -> Following)
export default function NavButton({ dest, text, userID, active }) {
	return (
		<NavLink
			to={dest}
			state={{ userID: userID }}
			className={`nav-button${active ? ' nav-button--custom-active' : ''}`}
		>
			<div className="nav-button__breadcrumb"></div>
			<div className="nav-button__breadcrumb"></div>
			<h3 className="nav-button__text">{text}</h3>
			<div className="nav-button__breadcrumb"></div>
			<div className="nav-button__breadcrumb"></div>
		</NavLink>
	)
}

NavButton.propTypes = {
	dest: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	userID: PropTypes.string,
}
