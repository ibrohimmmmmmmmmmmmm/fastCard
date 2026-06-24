import { useEffect, useState } from "react";
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
    <div className="w-[80%] m-auto  pb-15 py-10">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-fade-up {
          opacity: 0;
          animation: fadeUp 0.6s ease-out forwards;
        }
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
      `}</style>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
        {brands.map((brand, i) => {
          const Icon = getCategoryIcon(brand.brandName);
          const isActive = activeId === brand.id;

          return (
            <button
              key={brand.id}
              onClick={() => setActiveId(brand.id)}
              style={{ animationDelay: `${i * 70}ms` }}
              className={`cat-fade-up cat-card ${
                isActive ? "is-active" : ""
              } flex flex-col items-center justify-center gap-4 rounded-2xl px-4 py-8`}
            >
              <Icon className="cat-icon w-9 h-9 text-slate-800" strokeWidth={1.5} />
              <p className="cat-label text-sm font-medium text-slate-700">
                {brand.brandName}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}