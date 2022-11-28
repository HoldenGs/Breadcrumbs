import PropTypes from 'prop-types'

export default function FullScreenContainer({ children }) {
	return (
		<div className="full-screen-container">
			<div className="full-screen-container__container">{children}</div>
		</div>
	)
}

FullScreenContainer.propTypes = {
	className: PropTypes.string,
}
