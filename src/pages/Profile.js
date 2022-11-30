import { React, useState, useEffect } from 'react'
import PageContainer from '../components/PageContainer'
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
	deleteDoc,
} from 'firebase/firestore'

export default function Profile() {
	const [editable, setEditable] = useState(false)
	const [quarters, setQuarters] = useState([])
	const [reviews, setReviews] = useState([])

	const location = useLocation()
	const { currentUser } = useAuth()
	const [id, setID] = useState(location.state ? location.state.userID : null)
	const [loggedInUserFollowing, setLoggedInUserFollowing] = useState()
	const username = location.pathname.split('/').at(-1)
	const renderEditProfile = editProf(currentUser.uid.toString(), id)

	// fetch ID for username of profile
	useEffect(() => {
		const fetchIDAndFollowing = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'user'), where('username', '==', username))
			)

			if (!querySnapshot || querySnapshot.empty)
				return console.log('No query snapshot for user on Profile returned')

			if (!id) setID(querySnapshot.docs[0].data().userID)

			if (currentUser)
				setLoggedInUserFollowing(
					querySnapshot.docs[0].data().followers.includes(currentUser.uid)
				)
		}

		if (!id || typeof loggedInUserFollowing !== 'boolean') fetchIDAndFollowing()
	}, [username, loggedInUserFollowing, id, currentUser, currentUser.uid])

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
	}, [username])

	useEffect(() => {
		dataStore.quarters().then((quarters) => {
			setQuarters(
				quarters
					.sort((a, b) => {
						return b.date - a.date
					})
					.map((data) => data.long)
			)
		})
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

		reviews.forEach((review) => {
			// only update reviews that have changed
			if (!review.modified) return

			review.modified = false

			const fetchDocs = async () => {
				const querySnapshot = await getDocs(
					query(
						collection(db, 'Reviews'),
						where('reviewID', '==', review.reviewID)
					)
				)
				if (!querySnapshot.empty) {
					const ref = doc(db, 'Reviews', querySnapshot.docs[0].id)
					updateDoc(ref, {
						reviewID: review.reviewID,
						department: review.department,
						courseCode: review.courseCode,
						courseTitle: review.courseTitle,
						professor: review.professor,
						quarter: review.quarter,
						rating: review.rating,
						feelings: review.feelings,
					})
				} else {
					addDoc(collection(db, 'Reviews'), {
						reviewID: review.reviewID,
						userID: id,
						creationDate: serverTimestamp(),
						department: review.department,
						courseCode: review.courseCode,
						courseTitle: review.courseTitle,
						professor: review.professor,
						quarter: review.quarter,
						rating: review.rating,
						feelings: review.feelings,
						username: username,
					}).catch((err) => {
						console.error(err)
					})
				}
				const userRef = await getDocs(
					query(collection(db, 'user'), where('username', '==', username))
				)
				const updateUserRef = doc(db, 'user', userRef.docs[0].id)
				updateDoc(updateUserRef, {
					latestReview: review,
				})
			}
			fetchDocs()
		})
	}

	function handleReviewChange(changedReview, remove = false) {
		if (remove) {
			const deleteReview = async () => {
				const userQuery = query(
					collection(db, 'Reviews'),
					where('reviewID', '==', changedReview.reviewID)
				)

				const snapshot = await getDocs(userQuery)

				if (snapshot && !snapshot.empty) deleteDoc(snapshot.docs[0].ref)
			}
			deleteReview()

			setReviews(
				reviews.filter(
					(targetReview) => targetReview.reviewID !== changedReview.reviewID
				)
			)
			return
		}

		changedReview.modified = true

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
		<PageContainer className="profile">
			<Header username={username} id={id} />
			<article className="profile__article">
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
						userID={id}
						key={quarter}
						name={quarter}
						editable={editable}
						reviews={reviews.filter((review) => review.quarter === quarter)}
						handleReviewChange={handleReviewChange}
					/>
				))}
			</article>
		</PageContainer>
	)
}
