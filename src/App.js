import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import CourseCard from './components/CourseCard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CourseCard></CourseCard>,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
