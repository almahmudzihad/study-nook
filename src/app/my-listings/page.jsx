"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllRooms } from "@/data";

const MyListingsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(rooms);

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">
            My Listings
          </h1>

          <Link
            href="/add-room"
            className="bg-blue-700 text-white px-6 py-3 rounded-2xl"
          >
            + Add Room
          </Link>
        </div>

        {/* Empty State */}
        {rooms.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            You have no rooms listed yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow p-5"
              >
                <img
                  src={room.image}
                  className="h-48 w-full object-cover rounded-xl"
                />

                <h2 className="mt-4 font-bold text-xl">
                  {room.roomName}
                </h2>

                <p className="text-slate-500 text-sm mt-2">
                  {room.description.slice(0, 80)}...
                </p>

                <p className="mt-2 text-blue-700 font-semibold">
                  ${room.hourlyRate}/hr
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-xl">
                    Edit
                  </button>

                  <button className="flex-1 bg-red-600 text-white py-2 rounded-xl">
                    Delete
                  </button>
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