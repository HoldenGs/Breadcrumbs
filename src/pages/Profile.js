import { React, useState, useEffect } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Quarter from '../components/Quarter'
import UserInfo from '../components/UserInfo'
import { useLocation } from 'react-router-dom'
import useAuth from '../components/AuthContext'
import { db } from '../firebase'
import dataStore from '../helpers/DataStore'
import { query, getDocs, collection, where } from 'firebase/firestore'

export default function Profile() {
	const [editable, setEditable] = useState(false)
	const [quarters, setQuarters] = useState([])

	const location = useLocation()
	const { currentUser } = useAuth()
	const [id, setID] = useState(location.state ? location.state.userID : null)
	const username = location.pathname.split('/').at(-1)
	const renderEditProfile = editProf(currentUser.uid.toString(), id)

	// fetch ID on load if not passed in through NavLink
	useEffect(() => {
		const fetchID = async () => {
			const querySnapshot = await getDocs(
				query(collection(db, 'user'), where('username', '==', username))
			)
			setID(querySnapshot.docs[0].data().userID)
		}

		if (!id) fetchID()
	}, [username, id])

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
			<Button
				text={editable ? 'Save' : 'Edit'}
				handleClick={() => setEditable(!editable)}
			/>
		)
	}

	return (
		<div className="profile">
			<Header username={username} id={id} />
			<UserInfo username={username} editable={editable} />
			{/* <Button text={editable ? 'Save' : 'Edit'} handleClick={() => setEditable(!editable)} /> */}
			{renderEditProfile}
			{quarters.map((quarter) => (
				<Quarter key={quarter} name={quarter} editable={editable} />
			))}
		</div>
	)
}
