import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import { About, Contact, CreateAccount, Home, Login, Products, Wishlist, ProductDetails, Cart, Checkout, Profile } from "./router/router"
import { ProtectedRoute } from "./router/ProtectedRoute"

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
        },
        {
          path : "about",
          element : <About />
        },
        {
          path : "products",
          element : <Products />
        },
        {
          path : "contact",
          element : <Contact />
        },
        {
          path: "product/:id",
          element: <ProductDetails />
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path : "wishlist",
              element : <Wishlist />
            },
            {
              path: "cart",
              element: <Cart />
            },
            {
              path: "checkout",
              element: <Checkout />
            },
            {
              path: "profile",
              element: <Profile />
            }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
