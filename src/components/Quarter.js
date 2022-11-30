import React, { useEffect } from 'react'
import CourseCard from './CourseCard'

export default function Quarter({
	name,
	editable,
	reviews,
	handleReviewChange,
}) {
	function addCourseCard() {
		handleReviewChange({
			reviewID: Math.random(),
			userID: '1234567890',
			creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
			department: '',
			courseCode: '',
			courseTitle: '',
			professor: '',
			quarter: name,
			startDate: '2022-9-19',
			rating: 0,
			feelings: '',
		})
	}

	return (
		<div className="quarter">
			<div className="quarter__name">{name}</div>
			<div className="quarter__reviews">
				{reviews.length !== 0 ? (
					reviews.map((review) => (
						<CourseCard
							key={review.reviewID}
							editable={editable}
							reviewInfo={review}
							handleReviewChange={handleReviewChange}
						/>
					))
				) : (
					<div
						className={`quarter__${
							editable ? 'editable' : 'viewable'
						}-no-reviews`}
					>
						No reviews for this quarter.
					</div>
				)}
				{editable && (
					<button className="quarter__add-course" onClick={addCourseCard}>
						Add course
					</button>
				)}
			</div>
		</div>
	)
}
