import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import { About, Contact, CreateAccount, Home, Login, Products, Wishlist, ProductDetails, Cart, Checkout, Profile } from "./router/router"
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
          path : "wishlist",
          element : <Wishlist />
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
  ])
  return <RouterProvider router={router} />
}
