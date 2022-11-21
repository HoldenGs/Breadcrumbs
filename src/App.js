import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthProvider } from "./components/AuthContext";
import Following from './pages/Following'
import Login from './pages/Login'
import Profile from './pages/Profile'
import React from 'react'

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthProvider>
				<Login />
			</AuthProvider>
		),
	},
	{
		path: "/profile/:username",
		element: (
			<AuthProvider>
				<Profile/>
			</AuthProvider>
		),
	  },
	  {
		path: "/following",
		element: (
			<AuthProvider>
				<Following/>
			</AuthProvider>
		),
	  },
])

export default function App() {
  return <RouterProvider router={router} />
}
