import { useState, useEffect } from 'react'

import { Loader } from '@mantine/core'

import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import Button from '../components/Button'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { query, getDocs, collection, where } from 'firebase/firestore'

// Search query will be read from the URL
// Firestore query will be called from this component
// This version assumes all search results will be returned at once (no pagination)

// FRONTEND TODO:
// 	* Make the results "clickable"
// 	* Empty results message
export default function Search() {
	const [profiles, setProfiles] = useState([])
	const [courses, setCourses] = useState([]) //eslint-disable-line
	const [numProfiles, setNumProfiles] = useState(5)
	const [numCourses, setNumCourses] = useState(5)
	const [loading, setLoading] = useState(true)

	const location = useLocation()
	const qry = decodeURIComponent(location.pathname.split('/').at(-1))

	useEffect(() => {
		// Query from Firestore and store result into state
		setLoading(true)

		let promises = [
			where('username', '==', qry),
			where('firstName', '==', qry),
			where('lastName', '==', qry),
		].map((whereFunc) => {
			return getDocs(query(collection(db, 'user'), whereFunc))
		})

		if (qry.split(' ').length > 1) {
			promises.push(
				getDocs(
					query(
						collection(db, 'user'),
						where('lastName', '==', qry.split(' ')[1]),
						where('firstName', '==', qry.split(' ')[0])
					)
				)
			)
		}

		Promise.all(promises).then((results) => {
			results = results.map((res) => {
				if (res.empty) return []

				return res.docs.map((r) => {
					return {
						...r.data(),
						name: r.data().firstName + ' ' + r.data().lastName,
					}
				})
			})

			const merge = results.flat(1)

			setProfiles(merge)
			setLoading(false)
		})
	}, [qry])

	const profileCards = profiles
		.slice(0, numProfiles)
		.map(
			({ username, userID, name, gradYear, majors, minors, latestReview }) => (
				<ProfileCard
					name={name}
					gradYear={gradYear}
					majors={majors}
					minors={minors}
					id={userID}
					username={username}
					reviewLabel="Latest Review"
					review={latestReview}
				/>
			)
		)

	const courseCards = courses
		.slice(0, numCourses)
		.map(({ name, gradYear, major, latestReview }) => (
			<ProfileCard
				name={name}
				gradYear={gradYear}
				major={major}
				reviewLabel="Course Review"
				review={latestReview}
			/>
		))

	return (
		<div className="search">
			<Header searchVal={qry} />
			{loading ? (
				<Loader size="lg" />
			) : (
				<>
					<div className="search__profiles">
						<h2 className="search__heading">Profile Results</h2>
						{profileCards}
						{numProfiles < profiles.length && (
							<Button
								text="Show More"
								handleClick={() =>
									setNumProfiles((prevNumProfiles) => prevNumProfiles + 5)
								}
							/>
						)}
					</div>
					<div hidden={true} className="search__courses">
						<h2 className="search__heading">Course Results</h2>
						{courseCards}
						{numCourses < courses.length && (
							<Button
								text="Show More"
								handleClick={() =>
									setNumCourses((prevNumCourses) => prevNumCourses + 5)
								}
							/>
						)}
					</div>
				</>
			)}
		</div>
	)
}
