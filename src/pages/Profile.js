import { React, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../firebase'
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

import dataStore from '../helpers/dataStore'
import useAuth from '../components/AuthContext'

import PageContainer from '../components/PageContainer'
import ArticleContainer from '../components/ArticleContainer'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'

export default function Profile() {
	const [editable, setEditable] = useState(false)
	const [quarters, setQuarters] = useState([])
	const [reviews, setReviews] = useState([])

	const location = useLocation()
	const navigate = useNavigate()
	const { currentUser } = useAuth()
	const [id, setID] = useState(location.state ? location.state.userID : null)
	const [loggedInUserFollowing, setLoggedInUserFollowing] = useState()
	const username = location.pathname.split('/').at(-2)

	// fetch ID for username of profile
	useEffect(() => {
		const fetchIDAndFollowing = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'user'), where('username', '==', username))
			)

			// navigate to '/' if invalid username
			if (!querySnapshot || querySnapshot.empty) return navigate('/')

			if (!id) setID(querySnapshot.docs[0].data().userID)

			if (currentUser)
				setLoggedInUserFollowing(
					querySnapshot.docs[0].data().followers.includes(currentUser.uid)
				)
		}

		if (!id || typeof loggedInUserFollowing !== 'boolean') fetchIDAndFollowing()
		// eslint-disable-next-line
	}, [username, loggedInUserFollowing, id, currentUser])

	useEffect(() => {
		const fetchReviews = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'Reviews'), where('username', '==', username))
			)
			querySnapshot.forEach((doc) => {
				setReviews((previous) => sortReviews([...previous, doc.data()]))
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

	function sortReviews(array) {
		return array.sort((a, b) => a.department.localeCompare(b.department))
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

		setReviews(sortReviews(reviews))
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
			<Header
				username={currentUser && currentUser.uid === id ? username : null}
				id={currentUser ? currentUser.uid : null}
				active={currentUser && currentUser.uid === id ? 'profile' : ''}
			/>
			<ArticleContainer className="profile__article">
				<div className="profile__info">
					<UserInfo
						editable={editable}
						username={username}
						loggedInUserFollowing={loggedInUserFollowing}
						setLoggedInUserFollowing={setLoggedInUserFollowing}
					/>
					{currentUser && currentUser.uid === id && (
						<Button
							text={editable ? 'Save' : 'Edit'}
							handleClick={handleEditProf}
						/>
					)}
				</div>
				<div className="profile__quarters">
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
				</div>
			</ArticleContainer>
		</PageContainer>
	)
}
