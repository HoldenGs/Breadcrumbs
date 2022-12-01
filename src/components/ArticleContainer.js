import PropTypes from 'prop-types'

export default function ArticleContainer({ className, children }) {
	return (
		<article
			className={'article-container' + (className ? ` ${className}` : '')}
		>
			{children}
		</article>
	)
}

ArticleContainer.propTypes = {
	className: PropTypes.string,
}
