
import useAuth from './authContext'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { db } from '../firebase'
import '../scss/components/_login.scss'
import { serverTimestamp } from 'firebase/firestore'
import {
	query,
	getDocs,
	collection,
	where,
	doc,
	updateDoc,
} from 'firebase/firestore'

let userName = []
export let actualname
export let rows = []

export default function Login() {
	const navigate = useNavigate()
	const { currentUser, login } = useAuth()

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	async function handleSubmit() {

		const userCredential = await login(formData.email, formData.password)
		.catch(
			(err) => {
				console.log(err)
				//alert(err.message)
			}
		)
		if (userCredential == null) {
			console.log('error: no user login credential returned')
			return
		}

		const userQuery = query(
			collection(db, 'user'),
			where('userID', '==', currentUser.uid.toString())
		)
		const snapshot = await getDocs(userQuery).catch((err) => {
			console.log(err)
		})
		if (snapshot == null) {
			console.log('error: no user login snapshot returned')
			return
		}

		console.log(snapshot.docs[0])
		const userId = snapshot.docs[0].id
		const loginUpdateRef = await doc(db, 'user', userId)
		await updateDoc(loginUpdateRef, { loggedIn: serverTimestamp() }).catch(
			(err) => {
				console.log('Error updating user login timestamp: ', err)
			}
		)
		
		userName = snapshot.docs[0].data().username
		navigate(`/profile/${userName}`, { state: snapshot.docs[0].data() })
	}

	function handleChangeEmail(event) {
		//console.log(event.target.value)
		const { name, value, type, checked } = event.target
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value,
			}
		})
	}

	function handleChangePassword(event) {
		const { name, value, type, checked } = event.target
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value,
			}
		})
	}

	return (
		<div className='login__body'>
			<form className='login__form'>
				<label> Email</label>
				<input
					className='login__input'
					type='text'
					id='message'
					placeholder='Leave blank to keep the same'
					onChange={handleChangeEmail}
					name='email'
					value={formData.email}
				/>
				<label> Password</label>
				<input
					className='login__input'
					type='text'
					id='message'
					placeholder='Leave blank to keep the same'
					onChange={handleChangePassword}
					name='password'
					value={formData.password}
				/>
				<br />

				<br />
				<button className='login__button' onClick={handleSubmit} type="button">
					Login
				</button>

				<center>
					<h3>or</h3>
				</center>

				<br />
				<Link to='/create-profile'>
					<button className='login__button'>Create Account</button>
				</Link>
			</form>
		</div>
	)
}
