import { React, useState, useEffect } from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, where, query } from 'firebase/firestore'
import useAuth from '../components/AuthContext'

export default function Following() {
	const [following, setFollowing] = useState([])
	const location = useLocation()
	const navigate = useNavigate()
	const { currentUser } = useAuth()
	const [id, setID] = useState(location.state ? location.state.userID : null)
	const username = location.pathname.split('/').at(1) // /:username/following
	const renderFollowingUsers = followingUsers()

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
				setFollowing((arr) => [...arr, doc.data()])
			})
		}
		asyncFetchFollowing()
	}, [username, id]) // eslint-disable-line

	function followingUsers() {
		if (following.length === 0) {
			return <h2 className="following--name">Nobody</h2>
		}
		return following.map((usr) => (
			<ProfileCard
				key={usr.userID}
				name={usr.firstName + ' ' + usr.lastName}
				gradYear={usr.gradYear}
				majors={usr.majors ? usr.majors : null}
				username={usr.username}
				id={usr.userID}
				reviewLabel="Latest review"
				review={usr.latestReview}
				minors={usr.minors ? usr.minors : null}
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
			{renderFollowingUsers}
		</PageContainer>
	)
}
