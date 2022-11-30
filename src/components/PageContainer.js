import PropTypes from 'prop-types'

export default function PageContainer({ className, children }) {
	return (
		<div className={'page-container' + (className ? ` ${className}` : '')}>
			<div className="page-container__div">{children}</div>
		</div>
	)
}

PageContainer.propTypes = {
	className: PropTypes.string,
}
