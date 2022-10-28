import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CourseCard from './components/CourseCard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CourseCard courseName='COM SCI 35L'></CourseCard>,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
