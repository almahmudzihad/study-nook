import Image from "next/image";
import Link from "next/link";

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-[28px] shadow-lg overflow-hidden hover:shadow-2xl transition">

      {/* Image */}
      <div className="relative h-52 w-full">
        <Image
          src={room.image}
          alt={room.roomName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">

        <h2 className="text-xl font-bold text-slate-900">
          {room.roomName}
        </h2>

        <p className="text-slate-500 text-sm line-clamp-2">
          {room.description}
        </p>

        {/* Info */}
        <div className="flex justify-between text-sm text-slate-600">
          <span>📍 {room.floor}</span>
          <span>👥 {room.capacity}</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold text-blue-700">
            ${room.hourlyRate}/hr
          </p>

          <p className="text-xs text-slate-500">
            {room.bookingCount} bookings
          </p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((a, i) => (
            <span
              key={i}
              className="text-xs bg-slate-100 px-3 py-1 rounded-full"
            >
              {a}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link
          href={`/rooms/${room.id}`}
          className="block text-center mt-4 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-2xl font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;