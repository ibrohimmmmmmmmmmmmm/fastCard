import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useWishlistStore } from "./WishlistZustand";
import CrudSection from "../../components/CrudSection/CrudSection";

export default function Wishlist() {
  const { items, resetNewCount, clearWishlist } = useWishlistStore();

  useEffect(() => {
    // Reset the notification counter when entering the Wishlist page
    resetNewCount();
  }, [resetNewCount]);

  return (
    <>
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Wishlist</span>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-medium text-gray-900">Wishlist ({items.length})</h2>
        <button 
          onClick={clearWishlist}
          className="border border-gray-400 text-gray-700 px-8 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
        >
          Move All To Bag
        </button>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          Your wishlist is empty. Explore our products and add some!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} isWishlistPage={true} />
          ))}
        </div>
      )}
    </div>
    <div className="w-[80%] m-auto mt-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-10 bg-red-500 rounded"></div>
          <span className="text-red-500 font-semibold">Just for you</span>
        </div>
      </div>
    <CrudSection />
    </>
  );
}
