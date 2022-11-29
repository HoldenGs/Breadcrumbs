import React from 'react'
import NavButton from './NavButton'

const YEARS = {
	2026: '1st Year',
	2025: '2nd Year',
	2024: '3rd Year',
	2023: '4th Year',
}

export default function ProfileCard({
	username,
	id,
	name,
	gradYear,
	major,
	highlightedReview,
}) {
	return (
		<div className="profile-card">
			<NavButton dest={`/profile/${username}`} text={username} userID={id} />
			<div className="profile-card__name">{name}</div>
			<div className="profile-card__year">{YEARS[gradYear]}</div>
			<div className="profile-card__major">{major}</div>
			<div className="profile-card__review">{highlightedReview}</div>
		</div>
	)
}
