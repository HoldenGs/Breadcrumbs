import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import Following from './pages/Following'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CreateAccount from './pages/CreateAccount'
import React from 'react'
import Search from './pages/Search'
import Redirect from './pages/Redirect'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthProvider />,
		children: [
			{
				path: 'create-account',
				element: <CreateAccount />,
			},
			{
				path: '',
				element: <Login />,
			},
			{
				path: 'profile/:username',
				element: <Profile />,
			},
			{
				path: 'following/:username',
				element: <Following />,
			},
			{
				path: 'profile',
				element: <Redirect />,
			},
			{
				path: 'following',
				element: <Redirect />,
			},
			{
				path: 'search/:query',
				element: <Search />,
			},
		],
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
