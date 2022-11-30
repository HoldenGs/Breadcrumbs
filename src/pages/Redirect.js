import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { collection, getDocs, query, where } from 'firebase/firestore'

import { db } from '../firebase'

import useAuth from '../components/AuthContext'
import Header from '../components/Header'

export default function Redirect() {
	const location = useLocation()
	const navigate = useNavigate()
	const { currentUser } = useAuth()

	const curPath = location.pathname.split('/').at(-1)

	useEffect(() => {
		if (!currentUser) return navigate('/')

		const fetchUsername = async () => {
			const snapshot = await getDocs(
				query(collection(db, 'user'), where('userID', '==', currentUser.uid))
			)

			if (!snapshot || snapshot.empty) {
				console.error('Could not fetch logged in user username')
				return navigate('/')
			}

			const { username } = snapshot.docs[0].data()

			navigate(`/${curPath}/${username}`)
		}

		fetchUsername()
	}, []) // eslint-disable-line

	return (
		<div className="following">
			<Header />
		</div>
	)
}
