import { React, useState, useEffect } from 'react'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import {
	collection,
	getDocs,
	where,
	query,
	orderBy,
	limit,
} from 'firebase/firestore'

export default function Following() {
	const [following, setFollowing] = useState([])
	const location = useLocation()
	const [id, setID] = useState(location.state ? location.state.userID : null)
	const [reviews, setReviews] = useState([])
	const username = location.pathname.split('/').at(-1) // /following/:username
	// on load, if no ID, fetch that. then fetch all followers.
	useEffect(() => {
		const asyncFetchFollowing = async () => {
			if (!id) {
				const userSnapshot = await getDocs(
					query(collection(db, 'user'), where('username', '==', username))
				)
				setID(userSnapshot.docs[0].data().userID)
			}

			const querySnapshot = await getDocs(
				query(collection(db, 'user'), where('followers', 'array-contains', id))
			)
			querySnapshot.docs.forEach((doc) => {
				setFollowing((arr) => [...arr, doc.data()])
			})

			// following.map((usr) => async () => {
			// 	console.log('hi')
			// 	const reviewSnapshot = await getDocs(
			// 		query(
			// 			collection(db, 'Reviews'),
			// 			where('userID', '==', usr.id),
			// 			orderBy('creationDate', 'desc'),
			// 			limit(1)
			// 		)
			// 	)
			// 	console.log(reviewSnapshot.docs[0])
			// })
		}
		asyncFetchFollowing()

		// const asyncFetchReviews = async () => {
		// 	following.map((usr) => {
		// 		console.log('hi')
		// 	})
		// }
		// asyncFetchReviews()

		//orderBy("timestamp", "desc")

		//access followers
		//for each follower
		//query for their reviews
		//get their most recent review
		//add it to follower's entry
	}, [username, id])

	useEffect(() => {
		const asyncFetchReviews = async () => {
			// following.map((usr) => {
			// 	console.log('hi')
			// })
			following.map((usr) => console.log(usr.firstName))
		}
		asyncFetchReviews()

		//orderBy("timestamp", "desc")

		//access followers
		//for each follower
		//query for their reviews
		//get their most recent review
		//add it to follower's entry
	}, [])

	return (
		<div className="following">
			<Header username={username} id={id} />
			<h1 className="following--name">@{username}: following</h1>
			{following.map((usr) => (
				<ProfileCard
					name={usr.firstName + ' ' + usr.lastName}
					gradYear={usr.gradYear}
					major={usr.majors ? usr.majors[0] : null}
					username={usr.username}
					id={usr.userID}
					reviews={reviews}
					//following.review
				/>
			))}
			<ProfileCard />
		</div>
	)
}
