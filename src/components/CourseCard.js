import { React, useState, useEffect } from 'react'
import { Select, Rating } from '@mantine/core'

import dataStore from '../helpers/dataStore'

export default function CourseCard({
	editable,
	reviewInfo,
	handleReviewChange,
}) {
	const [quarterCode, setQuarterCode] = useState(null)
	const [departments, setDepts] = useState([])
	const [courses, setCourses] = useState([])
	const [professors, setProfs] = useState([])

	useEffect(() => {
		if (!editable) return

		dataStore.quarters().then((quarters) => {
			const { short } = quarters.find((quarter) => {
				return quarter.long === reviewInfo.quarter
			})

			setQuarterCode(short)
		})

		dataStore.departments().then(setDepts)
	}, [editable, reviewInfo.quarter])

	function removeCourseCard() {
		handleReviewChange(reviewInfo, true)
	}

	// on department change, fetch classes for that department and set profs to []
	useEffect(() => {
		if (!departments.length || !quarterCode) return

		setProfs([])

		if (reviewInfo.department)
			dataStore.classes(quarterCode, reviewInfo.department).then(setCourses)
	}, [departments, quarterCode, reviewInfo.department])

	// on course change, fetch profs for that course
	useEffect(() => {
		if (!courses.length || !reviewInfo.courseCode) return

		setProfs(
			courses
				.filter((c) => c.code === reviewInfo.courseCode)
				.map((c) => c.professor)
		)
	}, [courses, reviewInfo.courseCode])

	return (
		<div className="course-card">
			{editable ? (
				<>
					<button onClick={removeCourseCard}>X</button>
					<Select
						placeholder="Department"
						searchable
						value={reviewInfo.department}
						onChange={(newDepartment) => {
							handleReviewChange({
								...reviewInfo,
								department: newDepartment,
								courseCode: '',
								courseTitle: '',
								professor: '',
							})
						}}
						data={departments}
					/>
					<Select
						placeholder="Course Code"
						searchable
						value={reviewInfo.courseCode + ' — ' + reviewInfo.courseTitle}
						onChange={(newCourse) => {
							const [code, title] = newCourse.split(' — ')

							handleReviewChange({
								...reviewInfo,
								courseCode: code,
								courseTitle: title,
								professor: '',
							})
						}}
						data={[...new Set(courses.map((c) => c.code + ' — ' + c.title))]}
						nothingFound={
							!courses.length
								? `No ${reviewInfo.department} courses in ${reviewInfo.quarter}`
								: `Invalid course`
						}
					/>
					<Select
						placeholder="Professor"
						searchable
						value={reviewInfo.professor}
						onChange={(newProfessor) =>
							handleReviewChange({
								...reviewInfo,
								professor: newProfessor,
							})
						}
						data={professors}
						disabled={!professors.length}
					/>
					<Rating
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
					<Rating count={10} value={reviewInfo.rating} readOnly />
					<div>{reviewInfo.feelings}</div>
				</>
			)}
		</div>
	)
}
