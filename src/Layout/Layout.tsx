import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
        <Toaster position="top-center" richColors />
    </>
  )
}
