import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Quarter from "./components/Quarter"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Quarter></Quarter>,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
