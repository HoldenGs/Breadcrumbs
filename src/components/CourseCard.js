import React from 'react'
import StyledSelect from './StyledSelect'
import StyledRating from './StyledRating'
import IconButton from './IconButton'

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
					<div className="course-card__editable-course-info">
						<StyledSelect
							className="course-card__editable-department"
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
							className="course-card__editable-course"
							placeholder="Course"
							value={reviewInfo.courseCode}
							onChange={(newCourseCode) =>
								handleReviewChange({
									...reviewInfo,
									courseCode: newCourseCode,
								})
							}
							data={['35L', '200', '300']}
						/>
						<IconButton
							type="remove-course"
							iconURL="/icons/icons8-close.svg"
							alt="Remove Course"
							handleClick={removeCourseCard}
						>
							X
						</IconButton>
					</div>
					<StyledSelect
						className="course-card__editable-professor"
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
						className="course-card__editable-rating"
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
						className="course-card__editable-feelings"
						placeholder="Express your feelings for the course here..."
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
					<div className="course-card__viewable-title">
						<strong>
							{reviewInfo.department + ' ' + reviewInfo.courseCode}
						</strong>
						{' ' + reviewInfo.courseTitle}
					</div>
					<div className="course-card__viewable-professor">
						{reviewInfo.professor}
					</div>
					<StyledRating
						className="course-card__viewable-rating"
						count={10}
						value={reviewInfo.rating}
						readOnly
					/>
					<div className="course-card__viewable-feelings">
						{reviewInfo.feelings}
					</div>
				</>
			)}
		</div>
	)
}
