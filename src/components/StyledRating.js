import React, { useState, useEffect } from 'react'
import { Rating } from '@mantine/core'
import styled from '@emotion/styled'

const SRating = styled(Rating)`
	& .mantine-Rating-symbolBody {
		margin: 0.08rem;
	}
`

export default function StyledSelect({ count, value, onChange, readOnly }) {
	const [liveValue, setLiveValue] = useState(value)
	useEffect(() => {
		liveValue === -1 && setLiveValue(value)
	}, [liveValue])

	const RatingCrumb = () => {
		return (
			<img
				src="/icons/rating-crumb.svg"
				alt="Rating Crumb"
				style={{ height: '0.6rem', width: '0.6rem' }}
			/>
		)
	}
	const EmptyCrumb = () => {
		return (
			<img
				src="/icons/empty-crumb.svg"
				alt="Empty Crumb"
				style={{ height: '0.6rem', width: '0.6rem' }}
			/>
		)
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				margin: '0.4rem 0.4rem 0.4rem -0.1rem',
			}}
		>
			<SRating
				count={count}
				value={value}
				onHover={(tempVal) => setLiveValue(tempVal)}
				onChange={onChange}
				readOnly={readOnly}
				emptySymbol={EmptyCrumb}
				fullSymbol={RatingCrumb}
			/>
			<div
				style={{
					fontSize: '1rem',
					color: 'var(--crust)',
					marginTop: '-0.1rem',
					marginLeft: '0.2rem',
					fontWeight: 'bold',
				}}
			>
				{liveValue}
			</div>
		</div>
	)
}
