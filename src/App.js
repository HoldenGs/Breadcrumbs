import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Following from './pages/Following'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    databaseURL: "https://breadcrumbs-da3c1.firebaseio.com",
    apiKey: "AIzaSyDvws8ckLINw_dLXPHIX39utdVgjuJi1Q8",
    authDomain: "breadcrumbs-da3c1.firebaseapp.com",
    projectId: "breadcrumbs-da3c1",
    storageBucket: "breadcrumbs-da3c1.appspot.com",
    messagingSenderId: "18644575671",
    appId: "1:18644575671:web:312300072b06e08fb23432",
    measurementId: "G-NVMW372W2C"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Following db={db} />,

    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
