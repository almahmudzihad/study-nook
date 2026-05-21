"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const amenitiesOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const EditModal = ({
  isOpen,
  onClose,
  room,
  onUpdated,
}) => {
  const [form, setForm] = useState({
    roomName: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  useEffect(() => {
    if (room) {
      setForm({
        roomName: room.roomName || "",
        description: room.description || "",
        image: room.image || "",
        floor: room.floor || "",
        capacity: room.capacity || "",
        hourlyRate: room.hourlyRate || "",
        amenities: room.amenities || [],
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "capacity" ||
        name === "hourlyRate"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckbox = (item) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(item)
        ? prev.amenities.filter((a) => a !== item)
        : [...prev.amenities, item],
    }));
  };

  const handleUpdate = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${room._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.modifiedCount) {
      toast.success(
        "Room updated successfully"
      );

      onUpdated();
      onClose();
    }
  } catch (error) {
    console.log(error);

    toast.error(
      "Failed to update room"
    );
  }
 };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl w-[600px] max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Edit Room
        </h2>

        {/* Inputs */}
        <input
          name="roomName"
          value={form.roomName}
          onChange={handleChange}
          placeholder="Room Name"
          className="w-full border p-2 rounded mb-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded mb-2"
        />

        <div className="grid grid-cols-2 gap-2">

          <input
            name="floor"
            value={form.floor}
            onChange={handleChange}
            placeholder="Floor"
            className="border p-2 rounded"
          />

          <input
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            className="border p-2 rounded"
          />

          <input
            name="hourlyRate"
            value={form.hourlyRate}
            onChange={handleChange}
            placeholder="Hourly Rate"
            className="border p-2 rounded"
          />

        </div>

        {/* Amenities */}
        <div className="mt-3">
          <p className="font-medium mb-2">
            Amenities
          </p>

          <div className="grid grid-cols-2 gap-2">
            {amenitiesOptions.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.amenities.includes(item)}
                  onChange={() => handleCheckbox(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">

          <button
            onClick={onClose}
            className="flex-1 border p-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-600 text-white p-2 rounded"
          >
            Update
          </button>

        </div>

      </div>
    </div>
  );
};

export default EditModal;