import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Store,
  DollarSign,
  ShoppingBag,
  Wallet,
  Share2,
  Link2,
  Globe,
  Truck,
  Headphones,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// ---------- Data ----------

const stats = [
  { icon: Store, value: "10.5k", label: "Sellers active on our site", highlight: false },
  { icon: DollarSign, value: "33k", label: "Monthly product sale", highlight: true },
  { icon: ShoppingBag, value: "45.5k", label: "Customers active on our site", highlight: false },
  { icon: Wallet, value: "25k", label: "Annual gross sale on our site", highlight: false },
];

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "Lead Engineer",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "James Carter",
    role: "Marketing Head",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
  },
];

const perks = [
  { icon: Truck, title: "Free and fast delivery", desc: "Free delivery for all orders over $140" },
  { icon: Headphones, title: "24/7 customer service", desc: "Friendly 24/7 customer support" },
  { icon: ShieldCheck, title: "Money back guarantee", desc: "We return money within 30 days" },
];

// ---------- 3D Tilt wrapper ----------

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
    });
  };

  const handleLeave = () => {
    setStyle({
      transform:
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.2s ease-out", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}

// ---------- Main Component ----------

export default function About() {
  return (
    <div className="bg-white">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.35); }
          50% { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.7s ease-out forwards;
        }
        .float-slow { animation: floatSlow 5s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 2.4s ease-out infinite; }
        .team-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .team-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(90deg,#10b981,#6366f1);
          width: 22px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 text-sm text-slate-400 mb-12 fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="hover:text-slate-600 transition-colors cursor-pointer">Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-medium">About</span>
        </div>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-28">
          <div className="fade-up" style={{ animationDelay: "80ms" }}>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-indigo-600 bg-clip-text text-transparent">
                Story
              </span>
            </h1>
            <p className="text-slate-500 leading-relaxed mb-5">
              Launched in 2015, Exclusive is South Asia's premier online shopping
              marketplace with an active presence in Bangladesh. Supported by a
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sellers and 300 brands and serves 3 million
              customers across the region.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Exclusive has more than 1 million products to offer, growing very
              fast. Exclusive offers a diverse assortment of categories ranging
              from consumer goods to lifestyle essentials.
            </p>
          </div>

          <TiltCard className="fade-up rounded-3xl" >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 float-slow">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop"
                alt="Friends shopping with bags"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-emerald-400/10" />
            </div>
          </TiltCard>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <TiltCard key={stat.label} className="fade-up" >
                <div
                  style={{ animationDelay: `${120 + i * 90}ms` }}
                  className={`fade-up h-full rounded-2xl border p-7 flex flex-col items-center text-center gap-4 transition-colors duration-300 ${
                    stat.highlight
                      ? "bg-gradient-to-br from-emerald-500 to-indigo-600 border-transparent text-white"
                      : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      stat.highlight
                        ? "bg-white/15 glow-pulse"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-extrabold">{stat.value}</div>
                  <div
                    className={`text-sm ${
                      stat.highlight ? "text-white/90" : "text-slate-500"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Team Swiper */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2 fade-up">
            Meet the team
          </h2>
          <p className="text-slate-500 mb-10 fade-up" style={{ animationDelay: "60ms" }}>
            The people building the experience behind every order.
          </p>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="team-swiper !pb-12"
          >
            {team.map((member) => (
              <SwiperSlide key={member.name}>
                <TiltCard className="group">
                  <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100 transition-shadow duration-300">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-3">{member.role}</p>
                      <div className="flex items-center gap-3 text-slate-400">
                        <Share2 className="w-4 h-4 hover:text-emerald-500 cursor-pointer transition-colors" />
                        <Globe className="w-4 h-4 hover:text-emerald-500 cursor-pointer transition-colors" />
                        <Link2 className="w-4 h-4 hover:text-emerald-500 cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Perks */}
        <div className="grid sm:grid-cols-3 gap-8">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="fade-up flex flex-col items-center text-center gap-4"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200 hover:scale-110 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-indigo-600 transition-all duration-300">
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
    </div>
  );
}
