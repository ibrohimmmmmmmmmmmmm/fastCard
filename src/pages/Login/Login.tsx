import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "./LoginZustand";

export default function Login() {
  const { postLogin } = useLoginStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    const newAccount = {
      userName: data.name,
      password: data.password,
    };

    try {
      const token = await postLogin(newAccount);
      console.log("TOKEN:", token);
      if (token) {
        navigate("/home");
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Log in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-500">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "80ms", animationFillMode: "forwards" }}
          >
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-700
                placeholder:text-gray-400 outline-none transition-all duration-300
                focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100
                hover:border-gray-300"
            />
          </div>

          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "140ms", animationFillMode: "forwards" }}
          >
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-sm text-gray-700
                placeholder:text-gray-400 outline-none transition-all duration-300
                focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100
                hover:border-gray-300"
            />
          </div>

          <div
            className="opacity-0 animate-fade-up pt-2"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3.5 text-sm font-semibold text-white
                shadow-lg shadow-emerald-200 transition-all duration-300
                hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5 hover:brightness-105
                active:translate-y-0 active:shadow-md
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </div>

          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "260ms", animationFillMode: "forwards" }}
          >
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3.5
                text-sm font-medium text-gray-700 transition-all duration-300
                hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-md
                active:translate-y-0"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.81 2.73v2.27h2.92c1.71-1.57 2.69-3.88 2.69-6.64z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.47-.8 5.96-2.16l-2.92-2.27c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.97 10.73c-.18-.54-.28-1.12-.28-1.73s.1-1.19.28-1.73V4.93H.96A8.99 8.99 0 0 0 0 9c0 1.45.35 2.83.96 4.07l3.01-2.34z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.42 0 9 0 5.48 0 2.44 2.02.96 4.93l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>

        <p
          className="mt-6 text-center text-sm text-gray-500 opacity-0 animate-fade-up"
          style={{ animationDelay: "320ms", animationFillMode: "forwards" }}
        >
          Don't have an account?{" "}
          <Link
            to="/"
            className="font-medium text-gray-900 underline underline-offset-2 transition-colors duration-200 hover:text-emerald-600"
          >
            Sign up
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}