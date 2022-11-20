import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Header from './components/Header'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
