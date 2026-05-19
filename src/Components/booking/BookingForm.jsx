"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const BookingForm = ({ room }) => {
  const [date, setDate] = useState("");
  const [start, setStart] = useState(8);
  const [end, setEnd] = useState(9);
  const [loading, setLoading] = useState(false);

  const totalCost =
    (end - start) * room.hourlyRate;

  const handleBooking = async (e) => {
    e.preventDefault();

    setLoading(true);

    const bookingData = {
      roomId: room._id,
      date,
      startTime: start,
      endTime: end,
      totalCost,
      status: "confirmed",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            bookingData
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Room booked successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Book This Room
      </h2>

      <form onSubmit={handleBooking} className="space-y-5">

        {/* Date */}
        <input
          type="date"
          className="w-full border p-3 rounded-xl"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <select
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
            className="border p-3 rounded-xl"
          >
            {[8,9,10,11,12,13,14,15,16,17,18,19,20].map(t => (
              <option key={t} value={t}>
                {t}:00
              </option>
            ))}
          </select>

          <select
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
            className="border p-3 rounded-xl"
          >
            {[8,9,10,11,12,13,14,15,16,17,18,19,20].map(t => (
              <option key={t} value={t}>
                {t}:00
              </option>
            ))}
          </select>
        </div>

        {/* Cost */}
        <div className="text-lg font-semibold text-blue-700">
          Total Cost: ${totalCost}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </form>
    </div>
  );
};

export default BookingForm;