import React from 'react'

import CourseCard from './CourseCard'
import NavButton from './NavButton'

export default function ProfileCard({
	name,
	gradYear,
	major,
	minor,
	reviewLabel,
	review,
	id,
	username,
}) {
	const renderCourseCard = courseCard()
	const renderListMajor = listMajor(major)
	const renderListMinor = listMinor(minor)

	function courseCard() {
		if (!review) return
		return <CourseCard editable={false} reviewInfo={review} />
	}

	function listMajor(majors) {
		if (!majors || majors.length === 0) return
		return <p className="user-info__name">{`${majors.join(', ')}`}</p>
	}

	function listMinor(minors) {
		if (!minors || minors.length === 0) return

		return <p className="user-info__name">{`Minor: ${minors.join(', ')}`}</p>
	}

	const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
	return (
		<div className="profile-card">
			<NavButton dest={`/profile/${username}`} text={name} userID={id} />
			<h2 className="profile-card__year">{years[2026 - gradYear]}</h2>
			{renderListMajor}
			{renderListMinor}
			<h3 className="profile-card__review-label">{reviewLabel}</h3>
			{renderCourseCard}
		</div>
	)
}
