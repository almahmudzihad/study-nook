"use client";

import { useState } from "react";
import RoomCard from "@/Components/rooms/RoomCard";

const RoomsClient = ({ rooms }) => {
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.roomName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search rooms by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-5 py-4 rounded-2xl border"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>

    </div>
  );
};

export default RoomsClient;