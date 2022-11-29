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
		<div className="quarter">
			<div>{name}</div>
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
				<div>No reviews for this quarter.</div>
			)}
			{editable && <button onClick={addCourseCard}>Add course</button>}
		</div>
	)
}
