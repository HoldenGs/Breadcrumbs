import React, { useEffect, useState } from 'react'
import { Select, Rating } from '@mantine/core'

import dataStore from '../helpers/DataStore'

export default function CourseCard({
	idx,
	editable,
	coursesTaken,
	setCoursesTaken,
}) {
	const [quarterCode, setQuarterCode] = useState(null)
	const [departments, setDepts] = useState([])
	const [courses, setCourses] = useState([])
	const [professors, setProfs] = useState([])

	useEffect(() => {
		dataStore.quarters().then((quarters) => {
			const { short } = quarters.find((quarter) => {
				return quarter.long === coursesTaken[idx].quarter
			})

			setQuarterCode(short)
		})

		dataStore.departments().then(setDepts)
		// want an empty dependency array; quarter will not change per-card
		// eslint-disable-next-line
	}, [])

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

	function onDepartmentChange(newVal) {
		setProperty(newVal, 'department')
		setProperty('', 'code')
		setProperty('', 'title')
		setProperty('', 'professor')
		setCourses([])
		dataStore
			.classes(quarterCode, coursesTaken[idx].department)
			.then(setCourses)
	}

	function onCourseChange(newVal) {
		const [code, title] = newVal.split(' — ')
		setProperty(code, 'code')
		setProperty(title, 'title')
		setProperty('', 'professor')
		setProfs(
			courses
				.filter((c) => c.code === coursesTaken[idx].code)
				.map((c) => c.professor)
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
						onChange={onDepartmentChange}
						data={departments}
					/>
					<Select
						placeholder="Course"
						searchable
						value={coursesTaken[idx].code + ' — ' + coursesTaken[idx].title}
						onChange={onCourseChange}
						data={[...new Set(courses.map((c) => c.code + ' — ' + c.title))]}
						disabled={!courses.length}
					/>
					<Select
						placeholder="Professor"
						searchable
						value={coursesTaken[idx].professor}
						onChange={(newVal) => setProperty(newVal, 'professor')}
						data={professors}
						disabled={!professors.length}
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
							{coursesTaken[idx].department +
								' ' +
								coursesTaken[idx].code +
								' — ' +
								coursesTaken[idx].title}
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
