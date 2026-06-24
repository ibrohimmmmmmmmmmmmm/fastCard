import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import { CreateAccount, Home, Login } from "./router/router"

export default function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Layout />,
      children : [
        {
          index : true,
          element : <CreateAccount />
        },
        {
          path : "login",
          element : <Login />
        },
        {
          path : "home",
          element : <Home />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
