import { useState } from "react";
import { toast } from "sonner";
import { Phone, Mail, Send, ChevronRight, MessageSquareText } from "lucide-react";

// ---------- Types ----------

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormState = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    setSending(true);

    setTimeout(() => {
      setSending(false);
      setForm(initialForm);
      toast.success("Your message has been sent! We'll get back to you soon.");
    }, 1200);
  };

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes floatDot2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(14px) translateX(-10px); }
        }
        @keyframes ringPulse {
          0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.25); }
          100% { box-shadow: 0 0 0 16px rgba(99,102,241,0); }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
        .dot-a { animation: floatDot 6s ease-in-out infinite; }
        .dot-b { animation: floatDot2 7s ease-in-out infinite; }
        .ring-pulse { animation: ringPulse 1.8s ease-out infinite; }
        .input-glow:focus {
          box-shadow: 0 0 0 4px rgba(16,185,129,0.12);
        }
      `}</style>

      {/* Decorative floating dots */}
      <span className="dot-a absolute top-[18%] right-[10%] w-2.5 h-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-indigo-500" />
      <span className="dot-b absolute top-[40%] left-[42%] w-2 h-2 rounded-full bg-gradient-to-br from-indigo-400 to-emerald-400" />
      <span className="dot-a absolute bottom-[12%] right-[6%] w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animationDelay: "1.2s" }} />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-12 fade-up">
          <span className="hover:text-slate-600 transition-colors cursor-pointer">Home</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-medium">Contact</span>
        </div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-7">
          {/* Left info card */}
          <div
            className="fade-up rounded-3xl border border-slate-100 bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-100 p-8"
            style={{ animationDelay: "80ms" }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white shrink-0 ring-pulse">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Call To Us</h3>
                <p className="text-sm text-slate-500 mb-2">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="text-sm text-slate-700 font-medium">
                  Phone: +880 1611 112222
                </p>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent mb-6" />

            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Write To Us</h3>
                <p className="text-sm text-slate-500 mb-2">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="text-sm text-slate-700 font-medium">
                  customer@exclusive.com
                </p>
                <p className="text-sm text-slate-700 font-medium">
                  support@exclusive.com
                </p>
              </div>
            </div>
          </div>

          {/* Right form card */}
          <div
            className="fade-up rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-indigo-50 p-8"
            style={{ animationDelay: "160ms" }}
          >
            <div className="flex items-center gap-2 mb-7">
              <MessageSquareText className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900">Send us a message</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-5">
              {[
                { name: "name", placeholder: "Name" },
                { name: "email", placeholder: "Email" },
                { name: "phone", placeholder: "Phone" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  value={form[field.name as keyof FormState]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  placeholder={field.placeholder}
                  className={`input-glow w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 ${
                    focused === field.name
                      ? "border-emerald-400 -translate-y-0.5"
                      : "border-slate-200"
                  }`}
                />
              ))}
            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              placeholder="Your message"
              rows={6}
              className={`input-glow w-full rounded-xl border px-4 py-3 text-sm text-slate-700 outline-none resize-none transition-all duration-300 mb-6 ${
                focused === "message"
                  ? "border-emerald-400 -translate-y-0.5"
                  : "border-slate-200"
              }`}
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="group relative inline-flex items-center gap-2 rounded-xl px-7 py-3 font-semibold text-white overflow-hidden disabled:opacity-70 transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-indigo-600 transition-transform duration-500 group-hover:scale-110" />
                <span className="relative flex items-center gap-2">
                  {sending ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
