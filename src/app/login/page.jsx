"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      return setError("Email and password are required");
    }

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            setLoading(true);
          },

          onSuccess: () => {
            form.reset();
            router.push("/");
          },

          onError: (ctx) => {
            setError(ctx.error.message);
          },
        }
      );
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl border border-slate-200 p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="text-slate-500 mt-2">
            Login to continue booking study rooms
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Enter email"
              className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Enter password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white py-4 rounded-2xl font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-[1px] bg-slate-300"></div>
          <span className="text-slate-400 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-slate-300"></div>
        </div>

        {/* Google Button */}
        <button className="w-full border border-slate-300 hover:bg-slate-100 py-4 rounded-2xl font-medium transition">
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-slate-500 mt-7">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;