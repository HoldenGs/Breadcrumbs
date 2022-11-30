import PropTypes from 'prop-types'

export default function FullScreenContainer({ children, className }) {
	return (
		<div className="full-screen-container">
			<div
				className={
					'full-screen-container__container' +
					(className ? ` ${className}` : '')
				}
			>
				{children}
			</div>
		</div>
	)
}

FullScreenContainer.propTypes = {
	className: PropTypes.string,
}
