import { React, useState, useEffect } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'
import { useLocation } from 'react-router-dom'
import useAuth from '../components/AuthContext'
import { db } from '../firebase'
import dataStore from '../helpers/dataStore'
import {
	query,
	getDocs,
	collection,
	where,
	serverTimestamp,
	updateDoc,
	doc,
	addDoc,
} from 'firebase/firestore'

export default function Profile() {
	const [editable, setEditable] = useState(false)
	const quarters = ['Fall 2022', 'Spring 2022', 'Winter 2022', 'Fall 2021']
	const [reviews, setReviews] = useState([])

	const location = useLocation()
	const { currentUser } = useAuth()
	const [id, setID] = useState(location.state ? location.state.userID : null)
	const [loggedInUserFollowing, setLoggedInUserFollowing] = useState()
	const username = location.pathname.split('/').at(-1)
	const renderEditProfile = editProf(currentUser.uid.toString(), id)

	useEffect(() => {
		const fetchID = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'user'), where('username', '==', username))
			)
			setID(querySnapshot.docs[0].data().userID)
			setLoggedInUserFollowing(
				querySnapshot.docs[0].data().followers.includes(currentUser.uid)
			)
		}

		if (!id) fetchID()
	}, [username, id])

	useEffect(() => {
		const fetchReviews = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'Reviews'), where('username', '==', username))
			)
			querySnapshot.forEach((doc) => {
				setReviews((arr) => [...arr, doc.data()])
			})
		}
		fetchReviews()
	}, [])

	//can't edit another user's profile
	function editProf(currentUserID, id) {
		if (currentUserID !== id) return
		return (
			<Button text={editable ? 'Save' : 'Edit'} handleClick={handleEditProf} />
		)
	}

	function handleEditProf() {
		setEditable(!editable)
		if (!editable) return

		reviews.map((course) => {
			const fetchDocs = async () => {
				const querySnapshot = await getDocs(
					query(
						collection(db, 'Reviews'),
						where('reviewID', '==', course.reviewID)
					)
				)
				if (!querySnapshot.empty) {
					const ref = doc(db, 'Reviews', querySnapshot.docs[0].id)
					updateDoc(ref, {
						reviewID: course.reviewID,
						department: course.department,
						courseCode: course.courseCode,
						courseTitle: course.courseTitle,
						professor: course.professor,
						quarter: course.quarter,
						startDate: course.startDate,
						rating: course.rating,
						feelings: course.feelings,
					})
				} else {
					addDoc(collection(db, 'Reviews'), {
						reviewID: course.reviewID,
						userID: id,
						creationDate: serverTimestamp(),
						department: course.department,
						courseCode: course.courseCode,
						courseTitle: course.courseTitle,
						professor: course.professor,
						quarter: course.quarter,
						startDate: course.startDate,
						rating: course.rating,
						feelings: course.feelings,
						username: username,
					}).catch((err) => {
						console.error(err)
					})
				}
			}
			fetchDocs()
		})
	}

	const exampleReviews = [
		{
			reviewID: '1',
			userID: '1234567890',
			creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
			department: 'COM SCI',
			courseCode: '35L',
			courseTitle: 'Software Construction',
			professor: 'Eggert, P.R.',
			quarter: 'Fall 2022',
			startDate: '2022-9-19',
			rating: 8,
			feelings:
				'This was an interesting class... An interesting class indeed. What an interesting class. There are some interesting observations about this class. Interesting...',
		},
		{
			reviewID: '2',
			userID: '1234567890',
			creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
			department: 'COM SCI',
			courseCode: '200',
			courseTitle: 'Another Class',
			professor: 'Eggert, P.R.',
			quarter: 'Spring 2022',
			startDate: '2022-9-19',
			rating: 9,
			feelings:
				'This was an interesting class... An interesting class indeed. What an interesting class. There are some interesting observations about this class. Interesting...',
		},
		{
			reviewID: '3',
			userID: '1234567890',
			creationDate: 'November 21, 2022 at 12:00:00 AM UTC-8',
			department: 'COM SCI',
			courseCode: '300',
			courseTitle: 'A Third Class',
			professor: 'Eggert, P.R.',
			quarter: 'Fall 2022',
			startDate: '2022-9-19',
			rating: 10,
			feelings:
				'This was an interesting class... An interesting class indeed. What an interesting class. There are some interesting observations about this class. Interesting...',
		},
	]

	function handleReviewChange(changedReview, remove = false) {
		if (remove) {
			let userSnapshot
			const fetchData = async () => {
				const userQuery = query(
					collection(db, 'Reviews'),
					where('userID', '==', changedReview.reviewID)
				)
				userSnapshot = await getDocs(userQuery)
			}
			fetchData().then(userSnapshot.docs[0].ref.delete())

			setReviews(
				reviews.filter(
					(targetReview) => targetReview.reviewID !== changedReview.reviewID
				)
			)
			return
		}
		let idx = reviews.findIndex(
			(review) => review.reviewID === changedReview.reviewID
		)
		if (idx === -1) {
			setReviews((state) => {
				let newState = state.slice()
				newState.push(changedReview)
				return newState
			})
		} else {
			setReviews((state) => [
				...state.slice(0, idx),
				changedReview,
				...state.slice(idx + 1),
			])
		}
	}

	return (
		<div className="profile">
			<Header
				username={username}
				id={id}
				reviews={reviews}
				setReviews={setReviews}
			/>
			<UserInfo
				name="Bobbie Smith"
				year={2}
				major="Computer Science and Engineering"
				editable={editable}
				username={username}
				loggedInUserFollowing={loggedInUserFollowing}
				setLoggedInUserFollowing={setLoggedInUserFollowing}
			/>
			{renderEditProfile}
			{quarters.map((quarter) => (
				<Quarter
					key={quarter}
					name={quarter}
					editable={editable}
					reviews={reviews.filter((review) => review.quarter === quarter)}
					handleReviewChange={handleReviewChange}
				/>
			))}
		</div>
	)
}
