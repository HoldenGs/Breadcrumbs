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
		<div className="quarter" hidden={!editable && !reviews.length}>
			<div>{name}</div>
			{reviews.map((review) => (
				<CourseCard
					key={review.reviewID}
					editable={editable}
					reviewInfo={review}
					handleReviewChange={handleReviewChange}
				/>
			))}
			{editable && <button onClick={addCourseCard}>Add course</button>}
		</div>
	)
}
