import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '../firebase'

import useAuth from '../components/AuthContext'
import Header from '../components/Header'
import PageContainer from '../components/PageContainer'

export default function Redirect() {
	const location = useLocation()
	const navigate = useNavigate()
	const { currentUser } = useAuth()

	const path = location.pathname.split('/')

	useEffect(() => {
		if (path.length <= 1) return navigate('/')

		const usernameRedirect = async () => {
			if (!currentUser) return navigate('/')

			const snapshot = await getDocs(
				query(collection(db, 'user'), where('userID', '==', currentUser.uid))
			)

			if (!snapshot || snapshot.empty) {
				console.error('Could not fetch logged in user username')
				return navigate('/')
			}

			const { username } = snapshot.docs[0].data()

			navigate(`/${username}/${path[1]}`)
		}

		if (['following', 'profile'].includes(path[1])) usernameRedirect()
		else if (path.length === 2 || (path.length === 3 && !path[2]))
			navigate(`/${path[1]}/profile`)
	}, []) // eslint-disable-line

	return (
		<PageContainer>
			<Header />
		</PageContainer>
	)
}
