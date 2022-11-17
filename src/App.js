import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

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
