import { getAllRooms } from "@/data";
import RoomsClient from "@/Components/rooms/RoomsClient";

export default async function RoomsPage() {
  const rooms = await getAllRooms();

  return (
    <section className="bg-slate-50 min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900">
            Find Your Perfect Study Room
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            Search, filter & book your ideal study space
          </p>
        </div>

        {/* Client Component */}
        <RoomsClient rooms={rooms} />

      </div>
    </section>
  );
}