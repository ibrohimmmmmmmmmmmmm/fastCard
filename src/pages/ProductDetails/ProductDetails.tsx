import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useProductDetailsStore } from "./ProductDetailsZustand";
import { useWishlistStore } from "../Wishlist/WishlistZustand";
import { useCartStore } from "../Cart/CartZustand";
import SectionDetails from "./SectionDetails";

const getImageUrl = (img?: any) => {
  if (!img) return "https://via.placeholder.com/400";
  if (typeof img === 'object') {
    img = img.images || img.imageName || img.url || img.image || img.name || img.path;
  }
  if (typeof img !== 'string' || !img) return "https://via.placeholder.com/400";
  if (img.startsWith("http")) return img;
  return `${import.meta.env.VITE_BASE_URL}/images/${img}`;
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, getProductById } = useProductDetailsStore();
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id, getProductById]);

  useEffect(() => {
    if (product) {
      const img = getImageUrl(product.image || (product.images && product.images[0]));
      setMainImage(img);
      if (product.color && product.color.length > 0) {
        setSelectedColor(product.color[0]);
      } else if (typeof product.color === 'string') {
        setSelectedColor(product.color);
      }
    }
  }, [product]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const title = product.productName || product.title || "Unnamed Product";
  const category = product.categoryName || product.category || "Gaming";
  const price = product.hasDiscount && product.discountPrice ? product.discountPrice : product.price;

  // Duplicate the main image 4 times if no other images are provided, to match the layout
  let thumbnails = [mainImage, mainImage, mainImage, mainImage];
  if (product.images && product.images.length > 0) {
    thumbnails = product.images.map(getImageUrl);
    // Pad with main image if less than 4
    while (thumbnails.length < 4) {
      thumbnails.push(thumbnails[0]);
    }
    thumbnails = thumbnails.slice(0, 4);
  }

  const isLiked = wishlistItems.some((item) => item.id === product.id);

  const sizes = ["XS", "S", "M", "L", "XL"];
  
  // Parse colors, ensuring it's an array
  let colors: string[] = [];
  if (Array.isArray(product.color)) {
    colors = product.color;
  } else if (typeof product.color === 'string') {
    colors = [product.color];
  } else {
    colors = ["#A3B1C6", "#E97171"]; // Fallback colors for the UI design
  }

  return (
    <>
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:text-emerald-600 transition-colors">Account</Link>
        <ChevronRight size={14} />
        <span className="hover:text-emerald-600 transition-colors cursor-pointer">{category}</span>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{title}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Images Section */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 h-[500px]">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-32 hide-scrollbar">
            {thumbnails.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-24 h-24 lg:w-32 lg:h-[110px] rounded-lg border-2 flex items-center justify-center p-2 bg-[#F5F5F5] transition-colors ${
                  mainImage === img ? "border-emerald-500" : "border-transparent hover:border-gray-200"
                }`}
              >
                <img src={img} alt="Thumbnail" className="max-w-full max-h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-[#F5F5F5] rounded-xl flex items-center justify-center p-8 relative min-h-[300px]">
            <img src={mainImage} alt={title} className="max-w-full max-h-full object-contain drop-shadow-xl" />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-4 w-4 ${star <= (product.rating || 4) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews || 150} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-emerald-500 font-medium">In Stock</span>
          </div>

          <div className="text-2xl font-medium text-gray-900 mb-4">${price.toFixed(2)}</div>
          
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            {product.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
          </p>

          <hr className="border-gray-200 mb-6" />

          {/* Colours */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-900 font-medium">Colours:</span>
            <div className="flex items-center gap-2">
              {colors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(c)}
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    selectedColor === c ? "ring-2 ring-offset-2 ring-gray-900" : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: c === "q" ? "#E97171" : c }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-900 font-medium">Size:</span>
            <div className="flex items-center gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-8 h-8 rounded border flex items-center justify-center text-xs font-medium transition-colors ${
                    selectedSize === s
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-gray-300 text-gray-900 hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Actions: Qty, Buy, Wishlist */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-10">
            <div className="flex items-center border border-gray-300 rounded h-11 w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 h-full flex items-center justify-center font-medium border-x border-gray-300 text-gray-900">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-colors rounded-r"
              >
                <Plus size={16} />
              </button>
            </div>

            <button 
              onClick={() => {
                addToCart(product as any, quantity);
                navigate("/cart");
              }}
              className="flex-1 sm:flex-none sm:w-44 h-11 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition-colors"
            >
              Buy Now
            </button>

            <button 
              onClick={() => toggleWishlist(product as any)}
              className="w-11 h-11 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <Heart size={20} fill={isLiked ? "red" : "none"} className={isLiked ? "text-red-500" : ""} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-300 rounded divide-y divide-gray-300">
            <div className="flex items-center gap-4 p-4">
              <Truck size={32} className="text-gray-900" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Free Delivery</p>
                <p className="text-xs text-gray-600 mt-1 underline cursor-pointer">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RotateCcw size={32} className="text-gray-900" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Return Delivery</p>
                <p className="text-xs text-gray-600 mt-1">Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <SectionDetails />
    </>
  );
}
