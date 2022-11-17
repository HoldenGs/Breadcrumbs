import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import SearchInput from './components/SearchInput'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchInput />,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
