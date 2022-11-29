import React from 'react'

import CourseCard from './CourseCard'

export default function ProfileCard({
	name,
	gradYear,
	major,
	reviewLabel,
	review,
}) {
	const renderCourseCard = courseCard()
	function courseCard() {
		if (!review) return
		return <CourseCard editable={false} reviewInfo={review} />
	}

	const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
	return (
		<div className="profile-card">
			<h2 className="profile-card__name">{name}</h2>
			<h2 className="profile-card__year">{years[2026 - gradYear]}</h2>
			<p className="profile-card__major">{major}</p>
			<h3 className="profile-card__review-label">{reviewLabel}</h3>
			{renderCourseCard}
		</div>
	)
}
