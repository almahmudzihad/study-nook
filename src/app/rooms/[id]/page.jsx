import BookingForm from "@/Components/booking/BookingForm";


async function getRoom(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function RoomDetails({ params }) {
  console.log(params);
  const { id } = await params;
  const room = await getRoom(id);
  

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={room.image}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              {room.roomName}
            </h1>

            <p className="text-slate-500 mt-4">
              {room.description}
            </p>

            <div className="mt-6 space-y-2 text-slate-700">
              <p>📍 Floor: {room.floor}</p>
              <p>👥 Capacity: {room.capacity}</p>
              <p className="text-blue-700 font-semibold">
                💰 ${room.hourlyRate}/hr
              </p>
              <p>📊 Bookings: {room.bookingCount}</p>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mt-5">
              {/* {room.amenities.map((a, i) => {
                <span
                  key={i}
                  className="bg-slate-200 px-3 py-1 rounded-full text-sm"
                >
                  {a}
                </span>
              })} */}
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-12">
          <BookingForm room={room} />
        </div>

      </div>
    </section>
  );
}