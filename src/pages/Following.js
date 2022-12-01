import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'

import useAuth from '../components/AuthContext'

import PageContainer from '../components/PageContainer'
import ArticleContainer from '../components/ArticleContainer'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'

export default function Following() {
	const navigate = useNavigate()
	const location = useLocation()
	const { currentUser } = useAuth()

	const [following, setFollowing] = useState([])
	const [id, setID] = useState(location.state ? location.state.userID : null)

	const username = location.pathname.split('/').at(1) // /:username/following

	// on load, if no ID, fetch that. then fetch all followers.
	useEffect(() => {
		const asyncFetchFollowing = async () => {
			if (!id) {
				const userSnapshot = await getDocs(
					query(collection(db, 'user'), where('username', '==', username))
				)

				// navigate to / if user does not exist
				if (!userSnapshot || userSnapshot.empty) return navigate('/')

				setID(userSnapshot.docs[0].data().userID)
			}
			const querySnapshot = await getDocs(
				query(collection(db, 'user'), where('followers', 'array-contains', id))
			)
			querySnapshot.docs.forEach((doc) => {
				setFollowing((prevFollowing) => [...prevFollowing, doc.data()])
			})
		}
		asyncFetchFollowing()
	}, [username, id]) // eslint-disable-line

	function followingCards() {
		if (following.length === 0) {
			return <p className="following--empty">Nobody</p>
		}
		return following.map((user) => (
			<ProfileCard
				key={user.userID}
				name={user.firstName + ' ' + user.lastName}
				gradYear={user.gradYear}
				majors={user.majors}
				username={user.username}
				reviewLabel="Latest Review"
				review={user.latestReview}
			/>
		))
	}

	return (
		<PageContainer className="following">
			<Header
				username={currentUser && currentUser.uid === id ? username : null}
				id={currentUser ? currentUser.uid : null}
				active={currentUser && currentUser.uid === id ? 'following' : ''}
			/>
			<ArticleContainer className="following__article">
				<h1 className="following__heading">Following</h1>
				<div className="following__cards">{followingCards()}</div>
			</ArticleContainer>
		</PageContainer>
	)
}
