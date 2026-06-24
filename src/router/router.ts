import { lazy } from "react";

export const Login = lazy(() => import("../pages/Login/Login")) ;
export const CreateAccount = lazy(() => import("../pages/CreateAccount/CreateAccount")) ;
export const Home = lazy(() => import("../pages/Home/Home")) ;
export const About = lazy(() => import("../pages/About/About")) ;
export const Products = lazy(() => import("../pages/Products/Products"));
export const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
export const Contact = lazy(() => import ("../pages/Contact/Contact"));
export const ProductDetails = lazy(() => import("../pages/ProductDetails/ProductDetails"));
export const Cart = lazy(() => import("../pages/Cart/Cart"));
export const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
export const Profile = lazy(() => import("../pages/Profile/Profile"));