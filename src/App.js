import {createBrowserRouter, RouterProvider} from "react-router-dom"
import EmptyOne from "./components/EmptyOne"
import EmptyTwo from "./components/EmptyTwo"
import EmptyThree from "./components/EmptyThree"


const router = createBrowserRouter([
  {
    path: "/",
    element: <EmptyOne/>,
    errorElement: <div>Error!</div>,
  },
  {
    path: "/empty-two",
    element: <EmptyTwo/>,
    errorElement: <div>Error!</div>,      
  },
  {
  path: "/empty-three",
  element: <EmptyThree/>,
  errorElement: <div>Error!</div>,
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
