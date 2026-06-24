import { ChevronRight, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
export default function Section1() {
     const categories = [
    { label: "Woman's Fashion", hasSubmenu: true },
    { label: "Men's Fashion", hasSubmenu: true },
    { label: "Electronics", hasSubmenu: false },
    { label: "Home & Lifestyle", hasSubmenu: false },
    { label: "Medicine", hasSubmenu: false },
    { label: "Sports & Outdoor", hasSubmenu: false },
    { label: "Baby's & Toys", hasSubmenu: false },
    { label: "Groceries & Pets", hasSubmenu: false },
    { label: "Health & Beauty", hasSubmenu: false },
  ]

  const slides = [
    {
      brand: "iPhone 14 Series",
      title: "Up to 10%",
      titleLine2: "off Voucher",
      image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.news_app_ed.jpg",
    },
    {
      brand: "Galaxy Z Series",
      title: "Up to 15%",
      titleLine2: "off Voucher",
      image: "https://media.karousell.com/media/photos/products/2025/11/14/apple_iphone_14_pro_max_256gb__1763079958_71317989_progressive.jpg",
    },
    {
      brand: "Sony Headphones",
      title: "Up to 20%",
      titleLine2: "off Voucher",
      image: "https://i5.walmartimages.com/seo/Restored-Apple-iPhone-14-Pro-Max-Carrier-Unlocked-128GB-Deep-Purple-MQ8R3LL-A-Refurbished_cb8f75e5-1b8e-4c06-9776-0d995a314ada.88ab53492f6fe7e653033585616419b1.jpeg",
    },
  ]
  return (
    <>
<div className="flex gap-8 px-6 py-5 max-w-7xl mx-auto">
      {/* Sidebar categories */}
      <div className="hidden lg:block w-64 shrink-0 border-r border-gray-200 pr-6">
        <ul className="flex flex-col gap-4">
          {categories.map((cat) => (
            <li
              key={cat.label}
              className="flex items-center justify-between text-sm text-gray-700 cursor-pointer
                transition-colors duration-200 hover:text-emerald-600"
            >
              <span>{cat.label}</span>
              {cat.hasSubmenu && (
                <ChevronRight size={16} className="text-gray-400" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Hero banner carousel */}
      <div className="flex-1 w-[80%]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="rounded-lg overflow-hidden [--swiper-pagination-color:#ef4444] [--swiper-pagination-bullet-inactive-color:#6b7280] [--swiper-pagination-bullet-inactive-opacity:0.6]"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative bg-black h-[280px] md:h-[320px] flex items-center overflow-hidden">
                <div className="relative z-10 px-8 md:px-14 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-2xl"></span>
                    <span className="text-white text-sm">{slide.brand}</span>
                  </div>

                  <h1 className="text-white text-4xl md:text-5xl font-semibold leading-tight">
                    {slide.title}
                    <br />
                    {slide.titleLine2}
                  </h1>

                  <a
                    href="#"
                    className="group flex items-center gap-2 text-white text-sm font-medium
                      underline underline-offset-4"
                  >
                    Shop Now
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </div>

                <img
                  src={slide.image}
                  alt={slide.brand}
                  className="absolute right-0 top-0 h-full w-auto object-cover opacity-90 pointer-events-none"
                />

                {/* radial glow behind product */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-pink-500/30 blur-3xl pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
        </>
  )
}
