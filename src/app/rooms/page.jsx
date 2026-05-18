
import RoomCard from "@/components/rooms/RoomCard";
import { getAllRooms } from "../../data";



export default async function RoomsPage() {
  const rooms = await getAllRooms();
  
  return (
    <section className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Available Study Rooms
          </h1>
          <p className="text-slate-500 mt-3">
            Browse and book your perfect study space
          </p>
        </div>

        {/* Search Bar (UI only for now) */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search rooms by name..."
            className="w-full md:w-1/2 px-5 py-4 rounded-2xl border border-slate-300 focus:border-blue-600 outline-none"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
          rooms.map(room=> <RoomCard key={room._id} room={room} />)
          }
        </div>
      </div>
    </section>
  );
}