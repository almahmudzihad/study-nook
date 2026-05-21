"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import BookingForm from "./BookingForm";

const BookingGate = ({ room }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Login Required
        </h2>

        <p className="text-slate-500 mt-2">
          You need to login to book this room
        </p>

        <Link
          href="/login"
          className="inline-block mt-4 bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Login to Book
        </Link>
      </div>
    );
  }

  return <BookingForm room={room} />;
};

export default BookingGate;