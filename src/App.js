import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import Following from './pages/Following'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CreateAccount from './pages/CreateAccount'
import React from 'react'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<AuthProvider>
				<Login />
			</AuthProvider>
		),
	},
	{
		path: '/profile/:username',
		element: (
			<AuthProvider>
				<Profile />
			</AuthProvider>
		),
	},
	{
		path: '/following/:username',
		element: (
			<AuthProvider>
				<Following />
			</AuthProvider>
		),
	},
	{
		path: '/create-account',
		element: (
			<AuthProvider>
				<CreateAccount />
			</AuthProvider>
		),
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
