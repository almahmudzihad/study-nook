import RoomCard from "../rooms/RoomCard";
import { getLatestRooms } from "@/data";
import Link from "next/link";

const LatestRooms = async () => {
  const rooms =
    await getLatestRooms();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="flex justify-between items-center mb-12">

          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              Latest Study Rooms
            </h2>

            <p className="text-slate-500 mt-2">
              Explore newly added
              study spaces
            </p>
          </div>

          <Link
            href="/rooms"
            className="hidden md:block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl transition"
          >
            View All Rooms
          </Link>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))}

        </div>

        {/* Mobile button */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/rooms"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl transition inline-block"
          >
            View All Rooms
          </Link>
        </div>

      </div>
    </section>
  );
};

export default LatestRooms;