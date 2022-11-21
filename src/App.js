import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateAccount />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
