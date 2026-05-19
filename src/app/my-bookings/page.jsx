"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyBookings } from "@/data";

const MyBookingsPage = () => {
  const { data: session } =
    authClient.useSession();

  const userEmail =
    session?.user?.email;

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);

        

        const data = await getMyBookings(userEmail);

        setBookings(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.modifiedCount) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id
              ? {
                  ...b,
                  status:
                    "cancelled",
                }
              : b
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          My Bookings
        </h1>

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            You have no bookings yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col"
              >

                {/* Room Info */}
                <h2 className="text-xl font-bold">
                  {booking.roomName}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {booking.date}
                </p>

                <p className="mt-2 text-slate-600">
                  {booking.startTime} -{" "}
                  {booking.endTime}
                </p>

                <p className="mt-2 font-semibold text-blue-700">
                  ${booking.totalCost}
                </p>

                {/* Status */}
                <span
                  className={`mt-3 inline-block text-xs px-3 py-1 rounded-full w-fit ${
                    booking.status ===
                    "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {booking.status}
                </span>

                {/* Cancel Button */}
                {booking.status !==
                  "cancelled" && (
                  <button
                    onClick={() =>handleCancel(booking._id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                  >
                    Cancel Booking
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default MyBookingsPage;