"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyListings } from "@/data";
import { authClient } from "@/lib/auth-client";

const MyListingsPage = () => {
  const { data: session } =
    authClient.useSession();

  const userEmail =
    session?.user?.email;

  const [rooms, setRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchMyRooms = async () => {
      if (!userEmail) return; // 🔥 IMPORTANT FIX

      try {
        setLoading(true);

        const data =
          await getMyListings(
            userEmail
          );

        setRooms(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, [userEmail]); // 🔥 IMPORTANT FIX

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Listings
            </h1>

            <p className="text-slate-500">
              Manage your study rooms easily
            </p>
          </div>

          <Link
            href="/add-room"
            className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition text-center"
          >
            + Add Room
          </Link>

        </div>

        {/* Empty State */}
        {rooms.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No rooms found. Start by adding your first room.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-[28px] shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
              >

                {/* Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={room.image}
                    alt={room.roomName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">

                  <h2 className="text-xl font-bold text-slate-900">
                    {room.roomName}
                  </h2>

                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                    {room.description}
                  </p>

                  {/* Info */}
                  <div className="flex justify-between text-sm text-slate-600 mt-4">
                    <span>📍 {room.floor}</span>
                    <span>👥 {room.capacity}</span>
                  </div>

                  <p className="mt-2 text-blue-700 font-semibold">
                    ${room.hourlyRate}/hr
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {room.bookingCount} bookings
                  </p>

                  {/* Actions */}
                  <div className="mt-auto pt-5 flex gap-3">

                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition">
                      Edit
                    </button>

                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition">
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default MyListingsPage;