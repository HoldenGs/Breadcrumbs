import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World!</div>,
    errorElement: <div>Error!</div>
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
