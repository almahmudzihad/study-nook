"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { data: session } =
    authClient.useSession();

  const user = session?.user;

  const pathname =
    usePathname();

  const [open, setOpen] =
    useState(false);

  const handleLogout =
    async () => {
      await authClient.signOut({
        callbackURL: "/",
      });
    };

  // active style function
  const navLinkClass = (
    path
  ) => {
    return pathname === path
      ? "text-blue-700 font-semibold"
      : "text-slate-700 hover:text-blue-700 transition";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-700 flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                S
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                StudyNook
              </h2>

              <p className="text-xs text-slate-500">
                Find your study room
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">

            <Link
              href="/"
              className={navLinkClass(
                "/"
              )}
            >
              Home
            </Link>

            <Link
              href="/rooms"
              className={navLinkClass(
                "/rooms"
              )}
            >
              Rooms
            </Link>

            {user && (
              <>
                <Link
                  href="/add-room"
                  className={navLinkClass(
                    "/add-room"
                  )}
                >
                  Add Room
                </Link>

                <Link
                  href="/my-listings"
                  className={navLinkClass(
                    "/my-listings"
                  )}
                >
                  My Listings
                </Link>

                <Link
                  href="/my-bookings"
                  className={navLinkClass(
                    "/my-bookings"
                  )}
                >
                  My Bookings
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex gap-3 items-center">

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 border rounded-xl"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 bg-blue-700 text-white rounded-xl"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">

                <img
                  src={
                    user.image ||
                    "/default-user.png"
                  }
                  alt="user"
                  className="w-9 h-9 rounded-full object-cover border"
                />

                <span className="text-sm font-medium">
                  {user.name}
                </span>

                <button
                  onClick={
                    handleLogout
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() =>
              setOpen(!open)
            }
            className="lg:hidden text-3xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
            
            {/* SIDE PANEL */}
            <div className="absolute right-0 top-0 w-72 h-full bg-white shadow-xl p-6 flex flex-col gap-4">

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="text-right text-2xl mb-4"
              >
                ✕
              </button>

              {/* Links */}
              <Link href="/" onClick={() => setOpen(false)} className={navLinkClass("/")}>
                Home
              </Link>

              <Link href="/rooms" onClick={() => setOpen(false)} className={navLinkClass("/rooms")}>
                Rooms
              </Link>

              {user && (
                <>
                  <Link href="/add-room" onClick={() => setOpen(false)} className={navLinkClass("/add-room")}>
                    Add Room
                  </Link>

                  <Link href="/my-listings" onClick={() => setOpen(false)} className={navLinkClass("/my-listings")}>
                    My Listings
                  </Link>

                  <Link href="/my-bookings" onClick={() => setOpen(false)} className={navLinkClass("/my-bookings")}>
                    My Bookings
                  </Link>
                </>
              )}

              {/* AUTH */}
              <div className="mt-6">
                {!user ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" className="px-4 py-2 border rounded-lg">
                      Login
                    </Link>

                    <Link href="/register" className="px-4 py-2 bg-blue-700 text-white rounded-lg">
                      Register
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg w-full"
                  >
                    Logout
                  </button>
                )}
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;