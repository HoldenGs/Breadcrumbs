import React from 'react'
import CourseCard from './CourseCard'

export default function Quarter({
	userID,
	name,
	editable,
	reviews,
	handleReviewChange,
}) {
	function addCourseCard() {
		handleReviewChange({
			reviewID: Math.random().toString() + Date.now(),
			userID: userID,
			department: '',
			courseCode: '',
			courseTitle: '',
			professor: '',
			quarter: name,
			rating: 0,
			feelings: '',
		})
	}

	return (
		(editable || reviews) && (
			<div className="quarter" hidden={!editable && !reviews.length}>
				<div className="quarter__name">{name}</div>
				<div className="quarter__reviews">
					{reviews
						.sort((a, b) => a.department.localeCompare(b.department))
						.map((review) => (
							<CourseCard
								key={review.reviewID}
								editable={editable}
								reviewInfo={review}
								handleReviewChange={handleReviewChange}
							/>
						))}
					{editable && (
						<button className="quarter__add-course" onClick={addCourseCard}>
							Add course
						</button>
					)}
				</div>
			</div>
		)
	)
}
