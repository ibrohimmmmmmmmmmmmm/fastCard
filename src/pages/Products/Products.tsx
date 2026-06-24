import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProductsStore } from "./ProductsZustand";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get("category");
  
  const { products, categories, brands, colors, minMaxPrice, loading, getProducts, getCategories, getBrands } = useProductsStore();

  const [visibleCount, setVisibleCount] = useState(12);
  const [sortBy, setSortBy] = useState("Popularity");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryQuery);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
  const [selectedCondition, setSelectedCondition] = useState<string>("Any");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    colors: true,
    features: true,
    price: true,
    condition: true,
    ratings: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
  }, [getProducts, getCategories, getBrands]);

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [categoryQuery]);

  useEffect(() => {
    if (minMaxPrice) {
      setPriceRange({ min: minMaxPrice.minPrice, max: minMaxPrice.maxPrice });
    }
  }, [minMaxPrice]);

  // Handle Brand toggle
  const toggleBrand = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
  };

  // Handle Color toggle
  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  // Handle Rating toggle
  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  // Client-side filtering and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase() || p.categoryName?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => {
        const pBrand = p.brandName || p.brand;
        return pBrand && selectedBrands.includes(pBrand);
      });
    }

    if (selectedColors.length > 0) {
      result = result.filter(p => {
        const pColor = p.colorName || p.color;
        if (!pColor) return false;
        if (Array.isArray(pColor)) {
          return pColor.some(c => selectedColors.includes(c));
        }
        return selectedColors.includes(pColor);
      });
    }

    if (selectedCondition !== "Any") {
      result = result.filter(p => p.condition === selectedCondition);
    }

    if (selectedRatings.length > 0) {
      result = result.filter(p => selectedRatings.includes(Math.floor(p.rating || 5)));
    }

    // Price
    result = result.filter(p => {
      const pPrice = (p.hasDiscount && p.discountPrice) ? p.discountPrice : (p.price || 0);
      return pPrice >= priceRange.min && pPrice <= priceRange.max;
    });

    // Sorting
    if (sortBy === "Newest") {
      result.sort((a, b) => (b.id || 0) - (a.id || 0)); // Assuming higher ID means newer, if date isn't available
    } else if (sortBy === "Oldest") {
      result.sort((a, b) => (a.id || 0) - (b.id || 0));
    } else if (sortBy === "Popularity") {
      result.sort((a, b) => (b.reviews || b.quantity || 0) - (a.reviews || a.quantity || 0));
    }

    return result;
  }, [products, selectedCategory, selectedBrands, selectedColors, selectedCondition, selectedRatings, priceRange, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Mock features for UI if API doesn't provide them
  const featuresList = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-red-500">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">Explore Our Products</span>
      </div>

      <div className="flex gap-8">
        {/* Left Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          
          {/* Category */}
          <div className="mb-6">
            <h3 
              className="font-semibold text-gray-900 mb-4 flex justify-between items-center cursor-pointer select-none"
              onClick={() => toggleSection('category')}
            >
              Category {openSections.category ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </h3>
            {openSections.category && (
              <>
                <ul className="flex flex-col gap-3">
                  <li 
                    onClick={() => setSelectedCategory(null)}
                    className={`text-sm cursor-pointer ${!selectedCategory ? 'text-red-500 font-medium' : 'text-gray-600 hover:text-red-500'}`}
                  >
                    All products
                  </li>
                  {categories.map((c: any) => {
                    const catName = c.categoryName || c.name || "Unknown Category";
                    return (
                      <li 
                        key={c.id} 
                        onClick={() => setSelectedCategory(catName)}
                        className={`text-sm cursor-pointer ${selectedCategory === catName ? 'text-red-500 font-medium' : 'text-gray-600 hover:text-red-500'}`}
                      >
                        {catName}
                      </li>
                    );
                  })}
                </ul>
                <button className="text-sm text-red-500 mt-3 font-medium">See all</button>
              </>
            )}
          </div>
          <hr className="my-6 border-gray-100" />

          {/* Brands */}
          <div className="mb-6">
            <h3 
              className="font-semibold text-gray-900 mb-4 flex justify-between items-center cursor-pointer select-none"
              onClick={() => toggleSection('brands')}
            >
              Brands {openSections.brands ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </h3>
            {openSections.brands && (
              <>
                <div className="flex flex-col gap-3">
                  {brands.slice(0, 5).map((b: any) => {
                    const brandName = b.brandName || b.name || "Unknown Brand";
                    return (
                      <label key={b.id} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                          checked={selectedBrands.includes(brandName)}
                          onChange={() => toggleBrand(brandName)}
                        />
                        <span className="text-sm text-gray-600">{brandName}</span>
                      </label>
                    );
                  })}
                </div>
                <button className="text-sm text-red-500 mt-3 font-medium">See all</button>
              </>
            )}
          </div>
          <hr className="my-6 border-gray-100" />

          {/* Colors */}
          {colors && colors.length > 0 && (
            <div className="mb-6">
              <h3 
                className="font-semibold text-gray-900 mb-4 flex justify-between items-center cursor-pointer select-none"
                onClick={() => toggleSection('colors')}
              >
                Colors {openSections.colors ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </h3>
              {openSections.colors && (
                <>
                  <div className="flex flex-col gap-3">
                    {colors.slice(0, 5).map((c: any) => {
                      const colorName = c.colorName || c.name || "Unknown Color";
                      return (
                        <label key={c.id || colorName} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                            checked={selectedColors.includes(colorName)}
                            onChange={() => toggleColor(colorName)}
                          />
                          <span className="text-sm text-gray-600">{colorName}</span>
                        </label>
                      );
                    })}
                  </div>
                  {colors.length > 5 && <button className="text-sm text-red-500 mt-3 font-medium">See all</button>}
                </>
              )}
            </div>
          )}
          <hr className="my-6 border-gray-100" />

          {/* Price Range */}
          <div className="mb-6">
            <h3 
              className="font-semibold text-gray-900 mb-4 flex justify-between items-center cursor-pointer select-none"
              onClick={() => toggleSection('price')}
            >
              Price range {openSections.price ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </h3>
            {openSections.price && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <input type="range" min="0" max="999999" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})} className="w-full accent-red-500" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-400">Min</span>
                    <input type="number" value={priceRange.min} onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})} className="w-full border border-gray-200 rounded p-2 text-sm outline-none focus:border-red-500" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-2 -top-2 bg-white px-1 text-[10px] text-gray-400">Max</span>
                    <input type="number" value={priceRange.max} onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})} className="w-full border border-gray-200 rounded p-2 text-sm outline-none focus:border-red-500" />
                  </div>
                </div>
                <button className="w-full border border-red-500 text-red-500 py-2 rounded-md mt-4 text-sm font-semibold hover:bg-red-50 transition-colors">Apply</button>
              </>
            )}
          </div>
          <hr className="my-6 border-gray-100" />

          {/* Condition */}
          <div className="mb-6">
            <h3 
              className="font-semibold text-gray-900 mb-4 flex justify-between items-center cursor-pointer select-none"
              onClick={() => toggleSection('condition')}
            >
              Condition {openSections.condition ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </h3>
            {openSections.condition && (
              <div className="flex flex-col gap-3">
                {['Any', 'Refurbished', 'Brand new', 'Old items'].map(c => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="condition"
                      className="w-4 h-4 border-gray-300 text-red-500 focus:ring-red-500"
                      checked={selectedCondition === c}
                      onChange={() => setSelectedCondition(c)}
                    />
                    <span className="text-sm text-gray-600">{c}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <hr className="my-6 border-gray-100" />

          {/* Ratings */}
          <div className="mb-6">
            <h3 
              className="font-semibold text-gray-900 mb-4 flex justify-between items-center cursor-pointer select-none"
              onClick={() => toggleSection('ratings')}
            >
              Ratings {openSections.ratings ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </h3>
            {openSections.ratings && (
              <div className="flex flex-col gap-3">
                {[5, 4, 3, 2, 1].map(stars => (
                  <label key={stars} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                      checked={selectedRatings.includes(stars)}
                      onChange={() => toggleRating(stars)}
                    />
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} className={`w-4 h-4 ${s <= stars ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

        </aside>

        {/* Right Side Product Grid */}
        <div className="flex-1">
          {/* Top Sort */}
          <div className="flex justify-end mb-6">
            <select 
              className="border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-700 outline-none focus:border-red-500 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Popularity">Popularity</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-20 text-red-500 font-semibold text-lg">Loading Products...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-gray-500">No products found matching these filters.</div>
              )}

              {/* Load More Button */}
              {visibleCount < filteredProducts.length && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
                  >
                    More Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
