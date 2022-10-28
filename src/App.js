import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Quarter from "./components/Quarter"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Quarter quarterName="Fall 2021"></Quarter>,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
