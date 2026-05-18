import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-700 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  S
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  StudyNook
                </h2>
                <p className="text-sm text-slate-400">
                  Smart Study Booking
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              Find and book quiet, productive study
              rooms in your library with ease.
              Discover the perfect environment for
              focused learning.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Useful Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/rooms"
                  className="hover:text-blue-400 transition"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdEmail className="text-blue-400 text-xl" />
                <p>support@studynook.com</p>
              </div>

              <div className="flex items-center gap-3">
                <MdPhone className="text-blue-400 text-xl" />
                <p>+880 1700-000000</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Follow Us
            </h3>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} StudyNook.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;