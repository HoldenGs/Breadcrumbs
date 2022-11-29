import React, { useState } from 'react'
import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import useAuth from '../components/AuthContext'
import StyledMultiSelect from '../components/StyledMultiSelect'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import {
	query,
	getDocs,
	collection,
	where,
	doc,
	updateDoc,
	serverTimestamp,
} from 'firebase/firestore'

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [loading, setLoading] = useState(false)
	const [minors, setMinors] = useState('')
	const navigate = useNavigate()
	const { login } = useAuth()

	function handleFormChange(e) {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	async function handleLogin(e) {
		e.preventDefault()
		setLoading(true)

		// login with firestore
		let userCredential
		try {
			userCredential = await login(formData.email, formData.password)
		} catch (err) {
			// TODO: display error message
			console.log('Error logging in', err)
			return
		}

		if (!userCredential) {
			console.error('error: no user login credential returned')
			return
		}

		const { user } = userCredential

		// get user object from db
		const userQuery = query(
			collection(db, 'user'),
			where('userID', '==', user.uid)
		)

		let userSnapshot
		try {
			userSnapshot = await getDocs(userQuery)
		} catch (err) {
			console.error('error getting user snapshot: ', err)
			return
		}

		if (!userSnapshot || !userSnapshot.docs[0]) {
			console.error('error: no user login snapshot returned')
			return
		}

		const userId = userSnapshot.docs[0].id
		const loginUpdateRef = doc(db, 'user', userId)
		await updateDoc(loginUpdateRef, { loggedIn: serverTimestamp() }).catch(
			(err) => {
				console.log('Error updating user login timestamp: ', err)
			}
		)

		const userName = userSnapshot.docs[0].data().username
		navigate(`/profile/${userName}`, { state: userSnapshot.docs[0].data() })
	}

	return (
		<FullScreenContainer className="login">
			<img
				className="login__logo"
				src="/logo-jet.svg"
				alt="Breadcrumbs Logo - Color"
			/>
			<p className="login__description">
				A human-centered course recommendation platform.
			</p>
			<form className="login__form" onSubmit={handleLogin}>
				<TextInput
					type="email"
					name="email"
					placeholder="Email Address"
					value={formData.email}
					handleChange={handleFormChange}
					required={true}
				/>
				<TextInput
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					handleChange={handleFormChange}
					required={true}
				/>
				<Button text="Login" color="jet" disabled={loading} />
			</form>
			<p className="login__or">or</p>
			<Button
				text="Create Account"
				handleClick={() => navigate('/create-account')}
			/>
		</FullScreenContainer>
	)
}
