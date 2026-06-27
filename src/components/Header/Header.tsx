import { useState, useEffect } from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { Search, Heart, ShoppingCart, Menu, X, User, LogOut } from "lucide-react"
import img from "../../assets/Group 1116606595 (6).png"
import { useWishlistStore } from "../../pages/Wishlist/WishlistZustand"
import { useCartStore } from "../../pages/Cart/CartZustand"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const { newItemsCount: newWishlistCount } = useWishlistStore()
  const { newItemsCount: newCartCount, fetchCart } = useCartStore()
  const location = useLocation()
  const token = localStorage.getItem("access")
  
  // Hide user icon and treat as logged out on auth pages
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';
  const isLoggedIn = !isAuthPage && Boolean(token && token !== "undefined" && token !== "null" && token.trim() !== "");

  useEffect(() => {
    // If the user lands on auth pages, clear stale tokens
    if (isAuthPage) {
      localStorage.removeItem("access");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    }
  }, [isAuthPage]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, fetchCart]);

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    ...(isLoggedIn ? [] : [{ to: "/", label: "Sign Up" }]),
  ]

  const accountMenuItems = [
    { icon: User, label: "Account", to: "/profile" },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-semibold transition-colors duration-200 hover:text-emerald-600
     after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-emerald-500 after:to-indigo-500 after:transition-all after:duration-300
     ${isActive ? "text-gray-900 after:w-full" : "text-gray-700 after:w-0 hover:after:w-full"}`

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setAccountOpen(false)
    window.location.href = "/login"
  }

  return (
<header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">      <style>{`
        @keyframes headerFadeIn {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileLinkIn {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .header-anim { animation: headerFadeIn 0.6s ease-out; }
        .logo-3d { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); transform-style: preserve-3d; }
        .logo-3d:hover { transform: rotateY(8deg) rotateX(4deg) scale(1.05); }
        .icon-pop { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .icon-pop:hover { transform: translateY(-3px) scale(1.15) rotate(-6deg); }
        .badge-glow { animation: glowPulse 1.8s ease-in-out infinite; }
        .search-glow:focus-within {
          box-shadow: 0 0 0 3px rgba(16,185,129,0.15), 0 8px 20px -8px rgba(16,185,129,0.4);
        }
      `}</style>

      <div className="container mx-auto flex items-center justify-between px-6 py-4 header-anim">
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-gray-800 transition-transform duration-200 active:scale-90 hover:text-emerald-600"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
            Exclusive
          </span>
        </div>

        {/* Desktop logo */}
        <Link to="/" className="hidden md:flex items-center shrink-0 logo-3d">
          <img src={img} alt="fastcart logo" className="h-8 w-auto drop-shadow-sm" />
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
          <div className="relative search-glow rounded-lg transition-all duration-300">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-56 rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-2 text-sm text-gray-600 placeholder:text-gray-400
                outline-none transition-all duration-300 focus:w-64 focus:border-emerald-400 focus:bg-white"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200" />
          </div>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative text-gray-700 icon-pop hover:text-rose-500"
          >
            <Heart size={22} />
            {newWishlistCount > 0 && (
              <span className="badge-glow absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-[10px] font-bold text-white shadow-md">
                {newWishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative text-gray-700 icon-pop hover:text-emerald-600"
          >
            <ShoppingCart size={22} />
            {newCartCount > 0 && (
              <span className="badge-glow absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-[10px] font-bold text-white shadow-md">
                {newCartCount}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <div className="relative">
              <div
                onClick={() => setAccountOpen(true)}
                className="cursor-pointer text-gray-700 icon-pop hover:text-indigo-600"
              >
                <User size={22} />
              </div>

              {accountOpen && (
                <>
                  <div onClick={() => setAccountOpen(false)} className="fixed inset-0 z-40" />
                  <div className="absolute right-0 top-full mt-3 w-44 rounded-2xl bg-gray-900/90 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10 z-50 animate-[headerFadeIn_0.25s_ease-out]">
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                          transition-all duration-150 hover:bg-white/10 hover:translate-x-1"
                      >
                        <item.icon size={17} />
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                        transition-all duration-150 hover:bg-white/10 hover:translate-x-1"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile icons (always visible top-right) */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/wishlist" aria-label="Wishlist" className="relative text-gray-800 icon-pop">
            <Heart size={22} />
            {newWishlistCount > 0 && (
              <span className="badge-glow absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-[10px] font-bold text-white shadow-md">
                {newWishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" aria-label="Cart" className="relative text-gray-800 icon-pop">
            <ShoppingCart size={22} />
            {newCartCount > 0 && (
              <span className="badge-glow absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-[10px] font-bold text-white shadow-md">
                {newCartCount}
              </span>
            )}
          </Link>

          {isLoggedIn && (
            <div className="relative">
              <div onClick={() => setAccountOpen(true)} className="cursor-pointer text-gray-800 icon-pop">
                <User size={22} />
              </div>

              {accountOpen && (
                <>
                  <div onClick={() => setAccountOpen(false)} className="fixed inset-0 z-40" />
                  <div className="absolute right-0 top-full mt-3 w-44 rounded-2xl bg-gray-900/90 backdrop-blur-xl p-2 shadow-2xl ring-1 ring-white/10 z-50 animate-[headerFadeIn_0.25s_ease-out]">
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                          transition-all duration-150 hover:bg-white/10 hover:translate-x-1"
                      >
                        <item.icon size={17} />
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-200
                        transition-all duration-150 hover:bg-white/10 hover:translate-x-1"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        />

        <div
          className={`absolute inset-y-0 left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl
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
                  `w-full text-2xl font-semibold py-4 border-b border-gray-100 transition-colors duration-300
                  ${isActive ? "text-emerald-600" : "text-gray-800"}`
                }
                style={{
                  animation: menuOpen ? `mobileLinkIn 0.5s ease-out ${i * 0.08}s both` : "none",
                }}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="px-6 mt-4">
            <div className="relative search-glow rounded-lg transition-all duration-300">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 placeholder:text-gray-400
                  outline-none transition-all duration-200 focus:border-emerald-400 focus:bg-white"
              />
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}