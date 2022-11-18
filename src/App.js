import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./components/Profile";
import UpdateProfile from "./components/updateProfile";
import { AuthProvider } from "./components/authContext";
import CreateProfile from "./components/createProfile";
import Login from "./components/Login";

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
				<Profile />
			</AuthProvider>
		),
	},
	{
		path: "/create-profile",
		element: (
			<AuthProvider>
				<CreateProfile />
			</AuthProvider>
		),
	},
	{
		path: "/update-profile",
		element: (
			<AuthProvider>
				<UpdateProfile />
			</AuthProvider>
		),
	},
]);

export default function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}
