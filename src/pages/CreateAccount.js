import { useState, useEffect } from 'react'

import { Select, MultiSelect } from '@mantine/core'

import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import useAuth from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import dataStore from '../helpers/dataStore'
import {
	where,
	query,
	getDocs,
	getDoc,
	collection,
	addDoc,
	serverTimestamp,
	arrayUnion,
} from 'firebase/firestore'

// Need to add dialog box or input error states
export default function CreateAccount() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		gradYear: '',
		majors: [],
		minors: [],
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	})
	const [loading, setLoading] = useState(false)
	const { signup } = useAuth()
	const navigate = useNavigate()

	const gradYears = ['2023', '2024', '2025', '2026']
	const [majors, setMajors] = useState([])
	const [minors, setMinors] = useState([])

	useEffect(() => {
		dataStore.majors().then(setMajors)
		dataStore.minors().then(setMinors)
	}, [])

	// For TextInput components
	function handleFormChange(e) {
		const { name, value } = e.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	// For Mantine Select and MultiSelect components
	function handleSelectChange(name, value) {
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	// Remember to:
	// 	* Check password === passwordConfirmation
	// 	* Convert formData to correct data type
	// 	* setLoading(false) after successfully creating account
	async function handleCreateAccount(e) {
		e.preventDefault()
		setLoading(true)

		if (formData.password !== formData.passwordConfirmation) {
			// check if want to send an alert() message
			alert('Passwords do not match')
			return
		}

		// get user object from db
		const userQuery = query(
			collection(db, 'user'),
			where('username', '==', formData.username)
		)

		// check if email or username already exists
		let userSnapshot
		try {
			userSnapshot = await getDocs(userQuery)
		} catch (err) {
			console.error('error getting user snapshot: ', err)
			return
		}

		if (!userSnapshot.empty) {
			console.error(
				'error: username already chosen. Choose a different username'
			)
			return
		}

		// create user with firebase auth
		let userCredential
		try {
			userCredential = await signup(formData.email, formData.password)
		} catch (err) {
			console.error(err)
			alert(err.message)
			return
		}

		if (!userCredential || !userCredential.user) {
			console.error('error: no user login credential returned')
			return
		}

		// create user database entry
		const docRef = await addDoc(collection(db, 'user'), {
			firstName: formData.firstName,
			lastName: formData.lastName,
			username: formData.username,
			gradYear: formData.gradYear,
			majors: formData.majors,
			minors: formData.minors,
			email: formData.email,
			createdAt: serverTimestamp(),
			loggedIn: serverTimestamp(),
			followers: arrayUnion(),
			userID: userCredential.user.uid,
		}).catch((err) => {
			console.error(err)
		})

		if (!docRef) {
			console.error('error: no user login snapshot returned')
			return
		}

		let snapshot
		try {
			snapshot = await getDoc(docRef)
		} catch (err) {
			console.error(err)
			return
		}

		if (!snapshot || !snapshot.exists()) {
			console.error('error: no user login snapshot returned')
			return
		}

		setLoading(false)
		navigate(`/profile/${formData.username}`, {
			state: snapshot.data(),
		})
	}

	// Placeholder function
	function handleCancel() {
		navigate('/')
	}

	return (
		<FullScreenContainer className="create-account">
			<img
				className="login__logo"
				src="/logo-jet.svg"
				alt="Breadcrumbs Logo - Color"
			/>
			<form className="create-account__form" onSubmit={handleCreateAccount}>
				<TextInput
					name="firstName"
					placeholder="First Name"
					value={formData.firstName}
					handleChange={handleFormChange}
					required={true}
				/>
				<TextInput
					name="lastName"
					placeholder="Last Name"
					value={formData.lastName}
					handleChange={handleFormChange}
					required={true}
				/>
				<Select
					placeholder="Graduation Year"
					searchable
					nothingFound="Invalid Graduation Year"
					data={gradYears}
					value={formData.gradYear}
					onChange={(value) => handleSelectChange('gradYear', value)}
					required
				/>
				<MultiSelect
					placeholder="Major"
					searchable
					nothingFound="Invalid Major"
					data={majors}
					value={formData.majors}
					onChange={(value) => handleSelectChange('majors', value)}
					required
					maxSelectedValues={3}
				/>
				<MultiSelect
					placeholder="Minor"
					searchable
					nothingFound="Invalid Minor"
					data={minors}
					value={formData.minors}
					onChange={(value) => handleSelectChange('minors', value)}
					required
					maxSelectedValues={3}
				/>
				<TextInput
					name="username"
					placeholder="Username"
					value={formData.username}
					handleChange={handleFormChange}
					required={true}
				/>
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
				<TextInput
					type="password"
					name="passwordConfirmation"
					placeholder="Confirm Password"
					value={formData.passwordConfirmation}
					handleChange={handleFormChange}
					required={true}
				/>
				<Button
					text="Create Account"
					handleClick={handleCreateAccount}
					color="jet"
					disabled={loading}
				/>
			</form>
			<Button text="Cancel" handleClick={handleCancel} disabled={loading} />
		</FullScreenContainer>
	)
}
