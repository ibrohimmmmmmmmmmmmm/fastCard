import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCartStore } from '../Cart/CartZustand';

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cash'>('cash');

  const getImageUrl = (img?: any) => {
    if (!img || typeof img !== 'string') return "https://via.placeholder.com/50";
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_BASE_URL}/images/${img}`;
  };

  const getPrice = (product: any) => {
    return product.hasDiscount && product.discountPrice ? product.discountPrice : product.price;
  };

  const subtotal = items.reduce((acc, item) => acc + getPrice(item.product) * item.quantity, 0);
  const total = subtotal;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    // Simulate API call or processing
    toast.success("Order Placed Successfully!");
    clearCart();
    navigate('/home');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-12">
        <Link to="/home" className="text-gray-500 hover:text-gray-800 transition-colors">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/cart" className="text-gray-500 hover:text-gray-800 transition-colors">View Cart</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">CheckOut</span>
      </div>

      <h1 className="text-3xl font-semibold mb-10">Billing Details</h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-16">
        {/* Left Side - Form */}
        <div className="flex-1 max-w-[500px]">
          <div className="flex flex-col gap-5">
            <div>
              <input 
                type="text" 
                placeholder="First name" 
                required
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Last name" 
                required
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Street address" 
                required
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Apartment, floor, etc. (optional)" 
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Town/City" 
                required
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder="Phone number" 
                required
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email address" 
                required
                className="w-full h-12 bg-[#F5F5F5] rounded px-4 outline-none border-transparent focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <input 
                type="checkbox" 
                id="save-info" 
                className="w-5 h-5 rounded border-gray-300 text-red-500 focus:ring-red-500 accent-red-500 cursor-pointer"
              />
              <label htmlFor="save-info" className="text-gray-900 cursor-pointer">
                Save this information for faster check-out next time
              </label>
            </div>
          </div>
        </div>

        {/* Right Side - Cart Summary */}
        <div className="flex-1 lg:max-w-[450px] lg:ml-auto">
          <div className="flex flex-col gap-6 mb-8">
            {items.map((item) => {
              const price = getPrice(item.product);
              const imgUrl = getImageUrl(item.product.image || (item.product.images && item.product.images[0]));
              const title = item.product.productName || item.product.title || "Unnamed Product";

              return (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={imgUrl} alt={title} className="w-12 h-12 object-contain" />
                    <span className="text-gray-900 line-clamp-1">{title} {item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                  </div>
                  <span className="text-gray-900 font-medium">${price * item.quantity}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-900">Subtotal:</span>
              <span className="text-gray-900">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900">Shipping:</span>
              <span className="text-gray-900">Free</span>
            </div>
          </div>

          <div className="flex justify-between mb-8">
            <span className="text-gray-900">Total:</span>
            <span className="text-gray-900 font-bold">${total}</span>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-col gap-4 mb-8">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-4">
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank" 
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="w-5 h-5 accent-black cursor-pointer"
                />
                <span className="text-gray-900">Bank</span>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <span className="text-[10px] font-bold text-red-600">Bkash</span>
                </div>
                <div className="h-6 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <span className="text-[10px] font-bold text-blue-600">VISA</span>
                </div>
                <div className="h-6 w-10 bg-gray-100 flex items-center justify-center rounded">
                  <div className="flex -space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-red-500 opacity-80 z-10"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80"></div>
                  </div>
                </div>
              </div>
            </label>

            <label className="flex items-center gap-4 cursor-pointer">
              <input 
                type="radio" 
                name="payment" 
                value="cash" 
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="w-5 h-5 accent-black cursor-pointer"
              />
              <span className="text-gray-900">Cash on delivery</span>
            </label>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <input 
              type="text" 
              placeholder="Coupon Code" 
              className="flex-1 h-12 border border-gray-400 rounded px-4 outline-none focus:border-gray-900 transition-colors"
            />
            <button type="button" className="h-12 px-8 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors">
              Apply
            </button>
          </div>

          <button type="submit" className="px-12 py-4 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition-colors w-fit">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
