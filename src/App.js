import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Search from './pages/Search'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
