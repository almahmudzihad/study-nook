"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const image = form.photoURL.value.trim();
    const password = form.password.value;

    // password validation
    if (password.length < 6) {
      return setError(
        "Password must be at least 6 characters"
      );
    }

    if (!/[A-Z]/.test(password)) {
      return setError(
        "Password must contain one uppercase letter"
      );
    }

    if (!/[a-z]/.test(password)) {
      return setError(
        "Password must contain one lowercase letter"
      );
    }

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          image,
          callbackURL: "/",
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
      setError("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl border border-slate-200 p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join StudyNook and start booking study rooms
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600 transition"
            />
          </div>

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

          {/* Photo URL */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Photo URL
            </label>

            <input
              type="text"
              name="photoURL"
              required
              placeholder="Paste your profile image URL"
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
              placeholder="Create password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600 transition"
            />

            <p className="text-xs text-slate-500 mt-2">
              Must contain uppercase, lowercase & 6+ characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white py-4 rounded-2xl font-semibold transition"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-[1px] bg-slate-300"></div>

          <span className="text-slate-400 text-sm">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-slate-300"></div>
        </div>

        {/* Google Button */}
        <button
          className="w-full border border-slate-300 hover:bg-slate-100 py-4 rounded-2xl font-medium transition"
        >
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-slate-500 mt-7">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;