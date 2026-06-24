import { Heart, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../pages/Wishlist/WishlistZustand";
import { useCartStore } from "../../pages/Cart/CartZustand";

interface ProductCardProps {
  product: {
    id: number;
    productName?: string;
    title?: string;
    price: number;
    discountPrice?: number;
    image: string;
    images?: string[];
    rating?: number;
    reviews?: number;
    isNew?: boolean;
    discount?: number;
    [key: string]: any;
  };
  isWishlistPage?: boolean;
}

export default function ProductCard({ product, isWishlistPage }: ProductCardProps) {
  const navigate = useNavigate();
  const { items, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const isLiked = items.some((item) => item.id === product.id);

  const title = product.productName || product.title || "Unnamed Product";
  
  const getImageUrl = (img?: any) => {
    if (!img) return "https://via.placeholder.com/200";
    if (typeof img === 'object') {
      img = img.imageName || img.url || img.image || img.name || img.path;
    }
    if (typeof img !== 'string' || !img) return "https://via.placeholder.com/200";
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_BASE_URL}/images/${img}`;
  };

  const displayImage = getImageUrl(product.image || (product.images && product.images[0]));

  return (
    <div className="group relative rounded-xl bg-[#F5F5F5] p-4 transition-all hover:shadow-lg flex flex-col justify-between h-full">
      {/* Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {product.hasDiscount && (
          <span className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            {product.price > 0 && product.discountPrice ? `-${Math.round(((product.price - product.discountPrice) / product.price) * 100)}%` : "Sale"}
          </span>
        )}
        {(product.isNew || product.discount) && !product.hasDiscount && (
          <span className="rounded bg-[#00FF66] px-2 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}
      </div>

      {/* Action Icons */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
        {isWishlistPage ? (
          <button
            onClick={() => toggleWishlist(product as any)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
          >
            <Trash2 size={16} className="text-gray-600" />
          </button>
        ) : (
          <button
            onClick={() => toggleWishlist(product as any)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
          >
            <Heart size={16} fill={isLiked ? "black" : "none"} className={isLiked ? "text-black" : "text-gray-600"} />
          </button>
        )}
        {!isWishlistPage && (
          <button 
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* Image */}
      <div className="relative mb-4 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-white p-4">
        <img
          src={displayImage}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Add to Cart Overlay */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product as any);
          }}
          className="absolute bottom-0 left-0 right-0 flex w-full translate-y-full items-center justify-center gap-2 bg-black py-2.5 text-sm font-medium text-white transition-all duration-300 ease-in-out group-hover:translate-y-0"
        >
          Add To Cart
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mt-auto">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{title}</h3>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-red-500">
            ${product.hasDiscount && product.discountPrice ? product.discountPrice : product.price}
          </span>
          {product.hasDiscount && product.discountPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">${product.price}</span>
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          {/* Static stars for demo */}
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-4 w-4 ${
                star <= (product.rating || 5) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews || 65})</span>
        </div>
        
        {/* Colors */}
        {product.color && (
          <div className="flex gap-1 mt-2">
            {(Array.isArray(product.color) ? product.color : [product.color]).map((c: string, idx: number) => (
              <div
                key={idx}
                className="h-3 w-3 rounded-full ring-1 ring-gray-300 ring-offset-1"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
