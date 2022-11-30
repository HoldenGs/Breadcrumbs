import { useState, useEffect } from 'react'
import FullScreenContainer from '../components/FullScreenContainer'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import StyledSelect from '../components/StyledSelect'
import StyledMultiSelect from '../components/StyledMultiSelect'
import useAuth from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import dataStore from '../helpers/dataStore'
import {
	where,
	query,
	getDocs,
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

	const [error, setError] = useState('')

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
			setError("Passwords don't match")
			return setLoading(false)
		}

		// check if username exists
		const userQuery = query(
			collection(db, 'user'),
			where('username', '==', formData.username)
		)

		let userSnapshot
		try {
			userSnapshot = await getDocs(userQuery)
		} catch (err) {
			setError(err.message)
			return setLoading(false)
		}

		if (!userSnapshot.empty) {
			setError('Username already chosen. Please choose a different username.')
			return setLoading(false)
		}

		// create user with firebase auth
		let userCredential
		try {
			userCredential = await signup(formData.email, formData.password)
		} catch (err) {
			switch (err.code) {
				case 'auth/email-already-in-use':
					setError(
						'This email is already in use. Please use another email or login.'
					)
					break
				case 'auth/weak-password':
					setError('Your password is weak. Like you.')
					break
				default:
					setError('Unknown error occurred. Please try again later.')
					console.error('Unknown error while creating account', err)
					break
			}

			return setLoading(false)
		}

		if (!userCredential || !userCredential.user) {
			setError('Failed to create account. Please try again later.')
			return setLoading(false)
		}

		// create user database entry
		try {
			await addDoc(collection(db, 'user'), {
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
			})
		} catch (err) {
			console.error('Error creating user db entry', err)
			setError('Failed to create account. Please try again later.')
			return setLoading(false)
		}

		setLoading(false)
		navigate(`/${formData.username}/profile`, {
			state: { userID: userCredential.user.uid },
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
					autocomplete="given-name"
				/>
				<TextInput
					name="lastName"
					placeholder="Last Name"
					value={formData.lastName}
					handleChange={handleFormChange}
					required={true}
					autocomplete="family-name"
				/>
				<StyledSelect
					placeholder="Graduation Year"
					searchable
					nothingFound="Invalid Graduation Year"
					data={gradYears}
					value={formData.gradYear}
					onChange={(value) => handleSelectChange('gradYear', value)}
					required={true}
					dark
				/>
				<StyledMultiSelect
					placeholder="Major"
					searchable
					nothingFound="Invalid Major"
					data={majors}
					value={formData.majors}
					onChange={(value) => handleSelectChange('majors', value)}
					required={true}
					maxSelectedValues={3}
					dark
				/>
				<StyledMultiSelect
					placeholder="Minor"
					searchable
					nothingFound="Invalid Minor"
					data={minors}
					value={formData.minors}
					onChange={(value) => handleSelectChange('minors', value)}
					required={false}
					maxSelectedValues={3}
					dark
				/>
				<TextInput
					name="username"
					placeholder="Username"
					value={formData.username}
					handleChange={handleFormChange}
					required={true}
					autocomplete="username"
				/>
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
					autocomplete="new-password"
				/>
				<TextInput
					type="password"
					name="passwordConfirmation"
					placeholder="Confirm Password"
					value={formData.passwordConfirmation}
					handleChange={handleFormChange}
					required={true}
					autocomplete="new-password"
				/>
				<Button text="Create Account" color="jet" disabled={loading} />
			</form>
			<Button text="Cancel" handleClick={handleCancel} disabled={loading} />
			<div style={{ color: 'red' }} hidden={!error}>
				{error}
			</div>
		</FullScreenContainer>
	)
}
