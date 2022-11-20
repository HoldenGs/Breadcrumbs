import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Profile from './pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Profile />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
