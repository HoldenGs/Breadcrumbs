import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
