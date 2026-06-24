import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { Search, Heart, ShoppingCart, Menu, X, User, Package, LogOut } from "lucide-react"
import img from "../../assets/Group 1116606595 (6).png"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    { to: "/", label: "Sign Up" },
  ]

  const accountMenuItems = [
    { icon: User, label: "Account", to: "/profile" },
    { icon: Package, label: "My Order", to: "/orders" },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors duration-200 hover:text-emerald-600
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-emerald-600 after:transition-all after:duration-300
     ${isActive ? "text-gray-900 after:w-full" : "text-gray-700 after:w-0 hover:after:w-full"}`

  const handleLogout = () => {
    localStorage.removeItem("token")
    setAccountOpen(false)
  }

  return (
    <header className="w-full border-b border-gray-100 bg-white relative z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-gray-800 transition-transform duration-200 active:scale-90"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-900">Exclusive</span>
        </div>

        {/* Desktop logo */}
        <Link to="/" className="hidden md:flex items-center shrink-0">
          <img src={img} alt="fastcart logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop search + icons */}
        <div className="hidden md:flex items-center gap-5">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-56 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 placeholder:text-gray-400
                outline-none transition-all duration-200 focus:w-64 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <button
            type="button"
            aria-label="Wishlist"
            className="text-gray-700 transition-colors duration-200 hover:text-emerald-600"
          >
            <Heart size={22} />
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative text-gray-700 transition-transform duration-200 hover:text-emerald-600 hover:scale-105"
          >
            <ShoppingCart size={22} />
          </Link>

          <div className="relative">
            <div
              onClick={() => setAccountOpen(true)}
              className="cursor-pointer text-gray-700 transition-transform duration-200 hover:text-emerald-600 hover:scale-105"
            >
              <User size={22} />
            </div>

            {accountOpen && (
              <>
                <div onClick={() => setAccountOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 top-full mt-3 w-44 rounded-2xl bg-gray-900/90 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10 z-50">
                  {accountMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                        transition-colors duration-150 hover:bg-white/10"
                    >
                      <item.icon size={17} />
                      {item.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                      transition-colors duration-150 hover:bg-white/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile icons (always visible top-right) */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" aria-label="Cart" className="relative text-gray-800">
            <ShoppingCart size={22} />
          </Link>

          <div className="relative">
            <div
              onClick={() => setAccountOpen(true)}
              className="cursor-pointer text-gray-800"
            >
              <User size={22} />
            </div>

            {accountOpen && (
              <>
                <div onClick={() => setAccountOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 top-full mt-3 w-44 rounded-2xl bg-gray-900/90 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10 z-50">
                  {accountMenuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                        transition-colors duration-150 hover:bg-white/10"
                    >
                      <item.icon size={17} />
                      {item.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                      transition-colors duration-150 hover:bg-white/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />

        {/* sliding panel */}
        <div
          className={`absolute inset-y-0 left-0 w-full bg-white shadow-2xl
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          style={{ transformOrigin: "left center" }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <img src={img} alt="fastcart logo" className="h-8 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-gray-800 transition-transform duration-300 hover:rotate-90"
            >
              <X size={26} />
            </button>
          </div>

          <nav className="flex flex-col items-start gap-2 px-6 py-8">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `w-full text-2xl font-semibold py-4 border-b border-gray-100 transition-all duration-500
                  ${isActive ? "text-emerald-600" : "text-gray-800"}`
                }
                style={{
                  transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="px-6 mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400
                  outline-none transition-all duration-200 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
