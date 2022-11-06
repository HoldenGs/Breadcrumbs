import React from "react"
import Profile from "./components/Profile"
import UpdateProfile from "./components/updateProfile"
import { AuthProvider } from "./components/authContext"
import CreateProfile from "./components/createProfile"
import Login from "./components/Login"


import {  createBrowserRouter,
  RouterProvider,} from "react-router-dom"

const router = createBrowserRouter([
  {
    path:"/",
    element: <AuthProvider><Login/></AuthProvider>,
  },
  {
    path: "/profile",
    element: <AuthProvider><Profile/></AuthProvider>,
  },
  {
    path:"/create-profile",
    element: <AuthProvider><CreateProfile/></AuthProvider>,
  },
  {
    path:"/update-profile",
    element: <AuthProvider><UpdateProfile/></AuthProvider>,
  },

])

export default function App() {
  return <RouterProvider router={router} />
}
