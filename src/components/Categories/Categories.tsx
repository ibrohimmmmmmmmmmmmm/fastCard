import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  ShoppingBag,
} from "lucide-react";
import { useHomeStore } from "../../pages/Home/HomeZustand";

// Maps a brand name to a matching lucide icon.
// Falls back to a generic shopping bag icon if no keyword matches.
function getCategoryIcon(name: string) {
  const key = name.toLowerCase();

  if (key.includes("phone") && !key.includes("head")) return Smartphone;
  if (key.includes("computer") || key.includes("laptop") || key.includes("pc"))
    return Monitor;
  if (key.includes("watch")) return Watch;
  if (key.includes("camera")) return Camera;
  if (key.includes("head") || key.includes("audio")) return Headphones;
  if (key.includes("game") || key.includes("gaming") || key.includes("console"))
    return Gamepad2;

  return ShoppingBag;
}

export default function Categories() {
  const { getBrands, brands } = useHomeStore();
  const [activeId, setActiveId] = useState<number | string | null>(null);

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="w-[80%] m-auto relative pb-15 py-10">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-swiper {
          padding: 10px 4px 30px;
        }
        .cat-swiper .swiper-slide {
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }
        .cat-swiper .swiper-slide:nth-child(1) { animation-delay: 0.05s; }
        .cat-swiper .swiper-slide:nth-child(2) { animation-delay: 0.1s; }
        .cat-swiper .swiper-slide:nth-child(3) { animation-delay: 0.15s; }
        .cat-swiper .swiper-slide:nth-child(4) { animation-delay: 0.2s; }
        .cat-swiper .swiper-slide:nth-child(5) { animation-delay: 0.25s; }
        .cat-swiper .swiper-slide:nth-child(n+6) { animation-delay: 0.3s; }

        .cat-card {
          position: relative;
          isolation: isolate;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.3s ease;
        }
        .cat-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          opacity: 0;
          transform: scale(0.85);
          transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: -1;
        }
        .cat-card.is-active::before,
        .cat-card:hover::before {
          opacity: 1;
          transform: scale(1);
        }
        .cat-card .cat-icon,
        .cat-card .cat-label {
          transition: color 0.3s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cat-card.is-active .cat-icon,
        .cat-card:hover .cat-icon {
          color: #fff;
          transform: scale(1.12) translateY(-2px);
        }
        .cat-card.is-active .cat-label,
        .cat-card:hover .cat-label {
          color: #fff;
        }
        .cat-card:hover,
        .cat-card.is-active {
          border-color: transparent;
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 20px 35px -10px rgba(220, 38, 38, 0.35);
        }

        .cat-nav-btn {
          position: absolute;
          top: 42%;
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #131a2e;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(19, 26, 46, 0.3);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .cat-nav-btn:hover {
          transform: translateY(-50%) scale(1.1);
          background: #1f2a4d;
        }
        .cat-nav-btn.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .cat-prev { left: -22px; }
        .cat-next { right: -22px; }
      `}</style>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".cat-prev",
          nextEl: ".cat-next",
        }}
        spaceBetween={20}
        slidesPerView={6.2}
        breakpoints={{
          0: { slidesPerView: 2.2, spaceBetween: 12 },
          640: { slidesPerView: 3.2, spaceBetween: 16 },
          1024: { slidesPerView: 4.2, spaceBetween: 18 },
          1280: { slidesPerView: 6.2, spaceBetween: 20 },
        }}
        className="cat-swiper"
      >
        {brands.map((brand) => {
          const Icon = getCategoryIcon(brand.brandName);
          const isActive = activeId === brand.id;

          return (
            <SwiperSlide key={brand.id}>
              <button
                onClick={() => setActiveId(brand.id)}
                className={`cat-card ${
                  isActive ? "is-active" : ""
                } flex flex-col items-center justify-center gap-4 rounded-2xl px-4 py-8 w-full`}
              >
                <Icon className="cat-icon w-9 h-9 text-slate-800" strokeWidth={1.5} />
                <p className="cat-label text-sm font-medium text-slate-700">
                  {brand.brandName}
                </p>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="cat-nav-btn cat-prev">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>
      <div className="cat-nav-btn cat-next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  );
}