import { useState } from "react";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

// ---------- Data ----------

const cards = [
  {
    title: "PlayStation 5",
    desc: "Black and White version of the PS5 coming out on sale.",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Women's Collections",
    desc: "Featured women collections that give you another vibe.",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Speakers",
    desc: "Amazon wireless speakers",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "Perfume",
    desc: "GUCCI INTENSE OUD EDP",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80&auto=format&fit=crop",
  },
];

const perks = [
  { icon: Truck, title: "Free and fast delivery", desc: "Free delivery for all orders over $140" },
  { icon: Headphones, title: "24/7 customer service", desc: "Friendly 24/7 customer support" },
  { icon: ShieldCheck, title: "Money back guarantee", desc: "We return money within 30 days" },
];

// ---------- 3D Tilt card ----------

function TiltCard({
  card,
  className = "",
}: {
  card: (typeof cards)[number];
  className?: string;
}) {
  const [tilt, setTilt] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    setTilt({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
    });
  };

  const reset = () =>
    setTilt({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transition: "transform 0.25s ease-out", ...tilt }}
      className={`group relative overflow-hidden rounded-2xl w-full ${className}`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/95" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-end p-7">
        <h3 className="text-white text-2xl font-bold mb-2 translate-y-0 transition-transform duration-300 group-hover:-translate-y-1">
          {card.title}
        </h3>
        <p className="text-white/70 text-sm mb-4 max-w-[260px]">{card.desc}</p>
        <a
          href="#"
          className="relative inline-block text-white text-sm font-semibold w-fit after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-full after:bg-white after:origin-left after:scale-x-100 group-hover:after:scale-x-0 after:transition-transform after:duration-300"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}

export default function Section7() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes barPulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.6); }
        }
        .s7-fade-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
        .s7-bar { animation: barPulse 1.8s ease-in-out infinite; transform-origin: center; }
      `}</style>

      {/* Heading */}
      <div className="flex items-center gap-3 mb-3 s7-fade-up">
        <span className="s7-bar w-2.5 h-6 rounded-sm bg-red-500" />
        <span className="text-red-500 font-semibold text-sm">Featured</span>
      </div>
      <h2
        className="s7-fade-up text-4xl font-extrabold text-slate-900 mb-10"
        style={{ animationDelay: "60ms" }}
      >
        New Arrival
      </h2>

      {/* Layout matching reference: left tall card + right stacked cards */}
      <div className="flex flex-col lg:flex-row gap-5 mb-20 items-stretch">
        <div className="s7-fade-up lg:w-1/2" style={{ animationDelay: "120ms" }}>
          <TiltCard card={cards[0]} className="h-[360px] lg:h-full" />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-5">
          <div className="s7-fade-up" style={{ animationDelay: "230ms" }}>
            <TiltCard card={cards[1]} className="h-[270px]" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="s7-fade-up" style={{ animationDelay: "340ms" }}>
              <TiltCard card={cards[2]} className="h-[260px]" />
            </div>
            <div className="s7-fade-up" style={{ animationDelay: "420ms" }}>
              <TiltCard card={cards[3]} className="h-[260px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Perks */}
      <div className="grid sm:grid-cols-3 gap-8">
        {perks.map((perk, i) => {
          const Icon = perk.icon;
          return (
            <div
              key={perk.title}
              className="s7-fade-up flex flex-col items-center text-center gap-4"
              style={{ animationDelay: `${600 + i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600">
                <Icon className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 tracking-wide">
                {perk.title.toUpperCase()}
              </h4>
              <p className="text-sm text-slate-400">{perk.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}