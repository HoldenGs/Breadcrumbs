import React, { useEffect } from 'react'
import { Select, Rating } from '@mantine/core'

export default function CourseCard({
	idx,
	editable,
	coursesTaken,
	setCoursesTaken,
}) {
	function setProperty(newVal, propName) {
		let newCoursesTaken = coursesTaken.slice()
		newCoursesTaken[idx][propName] = newVal
		setCoursesTaken(newCoursesTaken)
	}

	function removeCourse() {
		setCoursesTaken(
			coursesTaken.filter(
				(targetCourse) => targetCourse.id !== coursesTaken[idx].id
			)
		)
	}

	return (
		<div className="course-card">
			{editable ? (
				<>
					<button onClick={removeCourse}>X</button>
					<Select
						placeholder="Department"
						searchable
						value={coursesTaken[idx].department}
						onChange={(newVal) => setProperty(newVal, 'department')}
						data={['COM SCI', 'MATH', 'PHYSICS', 'PSYCH']}
					/>
					<Select
						placeholder="Course"
						searchable
						value={coursesTaken[idx].course}
						onChange={(newVal) => setProperty(newVal, 'course')}
						data={[
							'31 - Introduction to Computer Science I',
							'32 - Introduction to Computer Science II',
							'33 - Introduction to Computer Organization',
							'35L - Software Construction',
						]}
					/>
					<Select
						placeholder="Professor"
						searchable
						value={coursesTaken[idx].professor}
						onChange={(newVal) => setProperty(newVal, 'professor')}
						data={[
							'Smallberg, D.A.',
							'Nachenberg, C.S.',
							'Nowatzki, A.J.',
							'Eggert, P.R.',
						]}
					/>
					<Rating
						count={10}
						value={coursesTaken[idx].rating}
						onChange={(newVal) => setProperty(newVal, 'rating')}
					/>
					<textarea
						placeholder="Express your feelings for the course here..."
						rows="4"
						cols="36"
						value={coursesTaken[idx].feelings}
						onChange={(event) => setProperty(event.target.value, 'feelings')}
					/>
				</>
			) : (
				<>
					<div>
						<strong>
							{coursesTaken[idx].department + ' ' + coursesTaken[idx].course}
						</strong>
					</div>
					<div>{coursesTaken[idx].professor}</div>
					<Rating count={10} value={coursesTaken[idx].rating} readOnly />
					<div>{coursesTaken[idx].feelings}</div>
				</>
			)}
		</div>
	)
}
