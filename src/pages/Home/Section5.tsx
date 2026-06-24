import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// ---------- Countdown logic ----------

function getTimeLeft(targetDate: number) {
  const total = Math.max(targetDate - Date.now(), 0);
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function Section5() {
  const [target] = useState(() => Date.now() + 5 * 24 * 60 * 60 * 1000 + 59 * 60 * 1000);
  const [time, setTime] = useState(getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const blocks = [
    { value: time.hours, label: "Hours" },
    { value: time.days, label: "Days" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <div className="relative w-[80%] m-auto  mt-20 overflow-hidden rounded-3xl bg-[#0b0f0c]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatProduct {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-1.2deg); }
        }
        @keyframes glowDrift {
          0%, 100% { opacity: 0.55; transform: translate(0,0) scale(1); }
          50% { opacity: 0.9; transform: translate(20px,-10px) scale(1.08); }
        }
        @keyframes ctaPulse {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
          70% { box-shadow: 0 0 0 18px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        @keyframes flipDigit {
          0% { transform: rotateX(90deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        .s5-fade-up { opacity: 0; animation: fadeUp 0.8s ease-out forwards; }
        .s5-float { animation: floatProduct 6s ease-in-out infinite; }
        .s5-glow { animation: glowDrift 8s ease-in-out infinite; }
        .s5-cta { animation: ctaPulse 2.6s ease-out infinite; }
        .s5-digit {
          display: inline-block;
          animation: flipDigit 0.5s ease-out;
        }
      `}</style>

      {/* Ambient glow blobs */}
      <div className="s5-glow absolute -left-10 top-10 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div
        className="s5-glow absolute right-10 bottom-0 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative grid lg:grid-cols-2 items-center gap-10 px-8 sm:px-14 py-14 lg:py-0 lg:min-h-[460px]">
        {/* Left content */}
        <div>
          <p
            className="s5-fade-up text-emerald-400 font-semibold tracking-wide mb-3"
            style={{ animationDelay: "60ms" }}
          >
            Categories
          </p>
          <h2
            className="s5-fade-up text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-8"
            style={{ animationDelay: "140ms" }}
          >
            Enhance Your
            <br />
            Music Experience
          </h2>

          {/* Countdown */}
          <div
            className="s5-fade-up flex flex-wrap gap-4 mb-9"
            style={{ animationDelay: "220ms" }}
          >
            {blocks.map((b) => (
              <div
                key={b.label}
                className="relative w-[72px] h-[72px] rounded-full bg-white flex flex-col items-center justify-center shadow-lg shadow-black/40"
              >
                <span
                  key={b.value}
                  className="s5-digit text-slate-900 font-bold text-base leading-none"
                >
                  {pad(b.value)}
                </span>
                <span className="text-slate-500 text-[11px] mt-0.5">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          <button
            className="s5-fade-up s5-cta group relative inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-8 py-3.5 font-bold text-slate-900 transition-transform duration-300 hover:scale-105 hover:bg-emerald-300"
            style={{ animationDelay: "300ms" }}
          >
            Buy Now!
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right product image */}
        <div
          className="s5-fade-up relative flex items-center justify-center"
          style={{ animationDelay: "200ms" }}
        >
          <div className="s5-float relative w-full max-w-[520px]">
            <div className="absolute inset-0 bg-emerald-400/10 blur-3xl rounded-full scale-90" />
            <img
              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1000&q=80&auto=format&fit=crop"
              alt="Bluetooth speaker"
              className="relative w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}