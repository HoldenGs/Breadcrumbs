import React from 'react'
import StyledSelect from './StyledSelect'
import StyledRating from './StyledRating'

export default function CourseCard({
	editable,
	reviewInfo,
	handleReviewChange,
}) {
	function removeCourseCard() {
		handleReviewChange(reviewInfo, true)
	}

	return (
		<div className="course-card">
			{editable ? (
				<>
					<button onClick={removeCourseCard}>X</button>
					<StyledSelect
						placeholder="Department"
						value={reviewInfo.department}
						onChange={(newDepartment) =>
							handleReviewChange({
								...reviewInfo,
								department: newDepartment,
							})
						}
						data={['COM SCI', 'MATH', 'PHYSICS', 'PSYCH']}
					/>
					<StyledSelect
						placeholder="Course Code"
						value={reviewInfo.courseCode}
						onChange={(newCourseCode) =>
							handleReviewChange({
								...reviewInfo,
								courseCode: newCourseCode,
							})
						}
						data={['35L', '200', '300']}
					/>
					<StyledSelect
						placeholder="Professor"
						value={reviewInfo.professor}
						onChange={(newProfessor) =>
							handleReviewChange({
								...reviewInfo,
								professor: newProfessor,
							})
						}
						data={[
							'Smallberg, D.A.',
							'Nachenberg, C.S.',
							'Nowatzki, A.J.',
							'Eggert, P.R.',
						]}
					/>
					<StyledRating
						count={10}
						value={reviewInfo.rating}
						onChange={(newRating) =>
							handleReviewChange({
								...reviewInfo,
								rating: newRating,
							})
						}
					/>
					<textarea
						placeholder="Express your feelings for the course here..."
						rows="4"
						cols="36"
						value={reviewInfo.feelings}
						onChange={(e) =>
							handleReviewChange({
								...reviewInfo,
								feelings: e.target.value,
							})
						}
					/>
				</>
			) : (
				<>
					<div>
						<strong>
							{reviewInfo.department + ' ' + reviewInfo.courseCode}
						</strong>
						{' ' + reviewInfo.courseTitle}
					</div>
					<div>{reviewInfo.professor}</div>
					<StyledRating count={10} value={reviewInfo.rating} readOnly />
					<div>{reviewInfo.feelings}</div>
				</>
			)}
		</div>
	)
}
