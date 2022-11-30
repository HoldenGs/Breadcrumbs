import React, { useContext, useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

import { auth } from '../firebase'

const AuthContext = React.createContext()

export default function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)

	function signup(email, password) {
		//todo: change this alert
		if (!email) alert('Enter a valid email')
		else if (!password) alert('Enter a valid password')
		else return createUserWithEmailAndPassword(auth, email, password)
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
	}

	function logout() {
		setCurrentUser()
		return signOut(auth)
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && <Outlet />}
		</AuthContext.Provider>
	)
}
