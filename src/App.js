import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Following from './pages/Following'
import Login from './pages/Login'
import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Following />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
