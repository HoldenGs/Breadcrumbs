import PropTypes from 'prop-types'

export default function ArticleContainer({ type, className, children }) {
	return (
		<article
			className={
				'article-container' +
				(type ? ` article-container--${type}` : '') +
				(className ? ` ${className}` : '')
			}
		>
			{children}
		</article>
	)
}

ArticleContainer.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
}
