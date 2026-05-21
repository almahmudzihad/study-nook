"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyListings } from "@/data";
import { authClient } from "@/lib/auth-client";
import DeleteModal from "@/Components/rooms/DeleteModal";
import EditModal from "@/Components/rooms/EditModal";
import { toast } from "react-toastify";


const MyListingsPage = () => {
  const { data: session } = authClient.useSession();

  const userEmail = session?.user?.email;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchMyRooms = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);

        const data = await getMyListings(userEmail);

        setRooms(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, [userEmail]);
  const handleDelete = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/${deleteId}`,
      {
        method: "DELETE",
      }
    );

    const data = await res.json();

    if (data.deletedCount) {
      setRooms((prev) =>
        prev.filter(
          (r) => r._id !== deleteId
        )
      );
      toast.error(
        "Room deleted successfully"
      );

      setOpenDelete(false);
      setDeleteId(null);
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchMyRooms = async () => {
  if (!userEmail) return;

  const data = await getMyListings(userEmail);
  setRooms(data || []);
};
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Listings
            </h1>

            <p className="text-slate-500">
              Manage your study rooms
            </p>
          </div>

          <Link
            href="/add-room"
            className="bg-blue-700 text-white px-6 py-3 rounded-2xl hover:bg-blue-800 transition"
          >
            + Add Room
          </Link>
        </div>

        {/* Empty State */}
        {rooms.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No rooms found
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

            <table className="w-full text-left">

              {/* Table Head */}
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-4">Room</th>
                  <th className="p-4">Floor</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Bookings</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="border-b hover:bg-slate-50"
                  >

                    {/* Room */}
                    <td className="p-4 flex items-center gap-3">

                      <img
                        src={room.image}
                        alt={room.roomName}
                        className="w-12 h-12 rounded-xl object-cover"
                      />

                      <div>
                        <p className="font-semibold text-slate-900">
                          {room.roomName}
                        </p>

                        <p className="text-xs text-slate-500 line-clamp-1">
                          {room.description}
                        </p>
                      </div>
                    </td>

                    {/* Floor */}
                    <td className="p-4 text-slate-700">
                      {room.floor}
                    </td>

                    {/* Capacity */}
                    <td className="p-4 text-slate-700">
                      {room.capacity} people
                    </td>

                    {/* Price */}
                    <td className="p-4 font-semibold text-blue-700">
                      ${room.hourlyRate}/hr
                    </td>

                    {/* Bookings */}
                    <td className="p-4">
                      {room.bookingCount}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">

                        <button
                          onClick={() => {
                            setEditRoom(room);
                            setOpenEdit(true);
                          }}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          Edit
                        </button>

                        <button
                        onClick={() => {
                            setDeleteId(room._id);
                            setOpenDelete(true);
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                        >
                          Delete
                        </button>                       

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
      <DeleteModal
        isOpen={openDelete}
        onClose={() =>
          setOpenDelete(false)
        }
        onConfirm={handleDelete}
      />
      <EditModal
        isOpen={openEdit}
        room={editRoom}
        onClose={() => setOpenEdit(false)}
        onUpdated={fetchMyRooms}
      />
    </section>
  );
};

export default MyListingsPage;