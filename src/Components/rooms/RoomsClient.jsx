"use client";

import { useState } from "react";
import RoomCard from "./RoomCard";

const RoomsClient = ({ rooms }) => {
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // FILTER LOGIC
  const filteredRooms = rooms
    .filter((room) =>
      room.roomName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((room) =>
      selectedAmenities.length > 0
        ? selectedAmenities.every((a) =>
            room.amenities?.includes(a)
          )
        : true
    )
    .filter((room) => {
      if (!minPrice && !maxPrice) return true;
      if (minPrice && room.hourlyRate < Number(minPrice)) return false;
      if (maxPrice && room.hourlyRate > Number(maxPrice)) return false;
      return true;
    });

  // AMENITIES TOGGLE
  const toggleAmenity = (value) => {
    setSelectedAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((a) => a !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="grid lg:grid-cols-4 gap-8 items-start">

      {/* FILTER SIDEBAR */}
      <div className="bg-white p-6 rounded-[28px] shadow-md h-fit sticky top-24">

        <h2 className="text-xl font-bold mb-5">
          Filters
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 border rounded-2xl mb-6"
        />

        {/* AMENITIES */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">
            Amenities
          </h3>

          {["WiFi", "AC", "Projector", "Whiteboard"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-2"
              >
                <input
                  type="checkbox"
                  onChange={() => toggleAmenity(item)}
                />
                {item}
              </label>
            )
          )}
        </div>

        {/* PRICE */}
        <div>
          <h3 className="font-semibold mb-3">
            Price Range
          </h3>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value)
              }
              className="w-full border px-3 py-2 rounded-xl"
            />

            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="w-full border px-3 py-2 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="lg:col-span-3 min-w-0">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Available Rooms
          </h2>

          <p className="text-slate-500">
            {filteredRooms.length} Rooms Found
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))
          ) : (
            <p className="text-slate-500">
              No rooms found 😢
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default RoomsClient;