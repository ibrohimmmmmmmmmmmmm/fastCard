import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { useCartStore } from "./CartZustand";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, resetNewCount } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset the notification counter when entering the Cart page
    resetNewCount();
  }, [resetNewCount]);

  const getImageUrl = (img?: any) => {
    if (!img) return "https://via.placeholder.com/200";
    if (typeof img === 'object') {
      img = img.imageName || img.url || img.image || img.name || img.path;
    }
    if (typeof img !== 'string' || !img) return "https://via.placeholder.com/200";
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_BASE_URL}/images/${img}`;
  };

  const getPrice = (product: any) => {
    return product.hasDiscount && product.discountPrice ? product.discountPrice : product.price;
  };

  const subtotal = items.reduce((acc, item) => acc + getPrice(item.product) * item.quantity, 0);
  const total = subtotal; // Assuming free shipping for now

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-12">
        <Link to="/home" className="text-gray-500 hover:text-gray-800 transition-colors">Home</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Cart</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-6">Your cart is empty.</p>
          <Link to="/home" className="inline-block px-8 py-3 border border-gray-400 rounded hover:bg-gray-50 transition-colors font-medium">
            Return To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 bg-white py-4 px-8 rounded shadow-[0_4px_20px_rgb(0,0,0,0.05)] text-gray-900 font-medium">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
            <div className="w-6"></div> {/* Spacer for the remove icon */}
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-6">
            {items.map((item) => {
              const price = getPrice(item.product);
              const itemSubtotal = price * item.quantity;
              const imgUrl = getImageUrl(item.product.image || (item.product.images && item.product.images[0]));
              const title = item.product.productName || item.product.title || "Unnamed Product";

              return (
                <div key={item.product.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-4 bg-white py-4 px-8 rounded shadow-[0_4px_20px_rgb(0,0,0,0.05)] relative group">
                  
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 bg-[#F5F5F5] rounded flex items-center justify-center p-1">
                      <img src={imgUrl} alt={title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="text-gray-900 font-medium line-clamp-1 pr-4">{title}</span>
                  </div>

                  {/* Price */}
                  <div className="text-gray-900">
                    ${price}
                  </div>

                  {/* Quantity */}
                  <div>
                    <div className="inline-flex items-center justify-between border border-gray-300 rounded w-[72px] h-11 px-3">
                      <span className="text-gray-900 font-medium">
                        {item.quantity.toString().padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-1 items-center justify-center h-full text-gray-600">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="hover:text-black hover:bg-gray-100 rounded"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="hover:text-black hover:bg-gray-100 rounded"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-gray-900 font-bold">
                    ${itemSubtotal}
                  </div>

                  {/* Remove Icon */}
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 hover:bg-red-600"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>

                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
            <Link to="/home" className="px-10 py-3 border border-gray-400 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors">
              Return To Shop
            </Link>
            <div className="flex gap-4">
              <button className="px-10 py-3 border border-gray-400 rounded font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                Update Cart
              </button>
              <button 
                onClick={clearCart}
                className="px-10 py-3 border border-red-500 rounded font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Remove all
              </button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mt-12">
            {/* Coupon */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                className="flex-1 lg:w-72 h-12 border border-gray-400 rounded px-4 outline-none focus:border-gray-900 transition-colors placeholder:text-gray-400"
              />
              <button className="h-12 px-10 border border-red-500 rounded font-medium text-red-500 hover:bg-red-50 transition-colors">
                Apply
              </button>
            </div>

            {/* Cart Total */}
            <div className="w-full lg:w-[470px] border-2 border-gray-800 rounded p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Total</h2>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-900">Subtotal:</span>
                <span className="text-gray-900">${subtotal}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-900">Shipping:</span>
                <span className="text-gray-900">Free</span>
              </div>
              
              <div className="flex justify-between items-center py-4 mb-4">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900 font-bold">${total}</span>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full sm:w-auto px-12 py-3 bg-[#DB4444] text-white rounded font-medium hover:bg-red-600 transition-colors"
                >
                  Procees to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
