import React from 'react'

import CourseCard from './CourseCard'
import NavButton from './NavButton'

export default function ProfileCard({
	name,
	gradYear,
	majors,
	minors,
	reviewLabel,
	review,
	id,
	username,
}) {
	function listMajors() {
		if (!majors || majors.length === 0) return
		return <p className="user-info__name">{`${majors.join(', ')}`}</p>
	}

	function listMinors() {
		if (!minors || minors.length === 0) return

		return <p className="user-info__name">{`Minor: ${minors.join(', ')}`}</p>
	}

	function label() {
		if (!review || !reviewLabel) return

		return <h3 className="profile-card__review-label">{reviewLabel}</h3>
	}

	function courseCard() {
		if (!review) return
		return <CourseCard editable={false} reviewInfo={review} />
	}

	const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
	return (
		<div className="profile-card">
			<NavButton dest={`/profile/${username}`} text={name} userID={id} />
			<h2 className="profile-card__year">{years[2026 - gradYear]}</h2>
			{listMajors()}
			{listMinors()}
			{label()}
			{courseCard()}
		</div>
	)
}
