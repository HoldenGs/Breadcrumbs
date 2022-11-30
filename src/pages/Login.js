import React, { useState, useEffect } from 'react'
import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import useAuth from '../components/AuthContext'
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
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const { login, currentUser } = useAuth()

	useEffect(() => {
		const navigateIfLoggedIn = async () => {
			if (currentUser) {
				const user = currentUser

				// get user object from db
				const userQuery = query(
					collection(db, 'user'),
					where('userID', '==', user.uid)
				)

				let userSnapshot
				try {
					userSnapshot = await getDocs(userQuery)
				} catch (err) {
					setError(err.toString())
					setLoading(false)
					return
				}

				if (!userSnapshot || !userSnapshot.docs[0]) {
					setError('error: no user login snapshot returned')
					setLoading(false)
					return
				}

				const userId = userSnapshot.docs[0].id
				const loginUpdateRef = doc(db, 'user', userId)
				await updateDoc(loginUpdateRef, { loggedIn: serverTimestamp() }).catch(
					(err) => {
						setError('Error updating user login timestamp: ' + err.toString())
						setLoading(false)
						return
					}
				)

				navigate(`/${userSnapshot.docs[0].data().username}/profile`, {
					state: userSnapshot.docs[0].data(),
				})
			}
		}
		navigateIfLoggedIn()
		// since navigate function won't change
		// eslint-disable-next-line
	}, [currentUser])

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
		let userCred
		try {
			userCred = await login(formData.email, formData.password)
		} catch (err) {
			// TODO: display error message
			console.log('Error logging in', err)
			if (
				err.toString() ===
				'FirebaseError: Firebase: Error (auth/wrong-password).'
			) {
				setError('Wrong Password. Please try again.')
			} else if (
				err.toString() ===
				'FirebaseError: Firebase: Error (auth/user-not-found).'
			) {
				setError('No account exists with this email')
			} else {
				setError(err.toString())
			}

			setLoading(false)
			return
		}

		if (!userCred) {
			setError('error: no user login credential returned')
			setLoading(false)
			return
		}
	}

	return (
		<FullScreenContainer className="login">
			<img
				className="login__logo"
				src="/logo-jet.svg"
				alt="Breadcrumbs Logo - Color"
			/>
			<p className="login__description">A delightful little course journal.</p>
			<form className="login__form" onSubmit={handleLogin}>
				<TextInput
					type="email"
					name="email"
					placeholder="Email Address"
					value={formData.email}
					handleChange={handleFormChange}
					required={true}
					autocomplete="email"
				/>
				<TextInput
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					handleChange={handleFormChange}
					required={true}
					autocomplete="password"
				/>
				<Button text="Login" color="jet" disabled={loading} />
			</form>
			<p className="login__or">or</p>
			<Button
				text="Create Account"
				handleClick={() => navigate('/create-account')}
			/>
			<div style={{ color: 'red' }} hidden={!error}>
				{error}
			</div>
		</FullScreenContainer>
	)
}
