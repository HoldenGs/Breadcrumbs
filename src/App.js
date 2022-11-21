import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Following from "./pages/Following";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CreateAccount />,
		errorElement: <div>Error!</div>,
	},
]);

export default function App() {
	return <RouterProvider router={router} />;
}
