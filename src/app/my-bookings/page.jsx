"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getMyBookings } from "@/data";
import Loader from "@/Components/Loader";

const MyBookingsPage = () => {
  const { data: session } =
    authClient.useSession();

  const userEmail =
    session?.user?.email;

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // modal state
  const [openModal, setOpenModal] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userEmail) return;

      try {
        setLoading(true);

        const data =
          await getMyBookings(
            userEmail
          );

        setBookings(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  // cancel booking API
  const handleCancel = async (id) => {
    
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (data.modifiedCount) {
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id
              ? {
                  ...b,
                  status: "cancelled",
                }
              : b
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          My Bookings
        </h1>

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            You have no bookings yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

            <table className="w-full text-left">

              {/* Head */}
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="p-4">
                    Room
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Time
                  </th>

                  <th className="p-4">
                    Cost
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {bookings.map(
                  (booking) => (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 font-semibold text-slate-900">
                        {
                          booking.roomName
                        }
                      </td>

                      <td className="p-4 text-slate-600">
                        {
                          booking.date
                        }
                      </td>

                      <td className="p-4 text-slate-600">
                        {
                          booking.startTime
                        }{" "}
                        -{" "}
                        {
                          booking.endTime
                        }
                      </td>

                      <td className="p-4 font-semibold text-blue-700">
                        $
                        {
                          booking.totalCost
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            booking.status ===
                            "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {
                            booking.status
                          }
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        {booking.status !==
                          "cancelled" && (
                          <button
                            onClick={() => {
                              setSelectedId(
                                booking._id
                              );
                              setOpenModal(
                                true
                              );
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                        )}
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>

          </div>
        )}

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl">

              <h2 className="text-xl font-bold text-slate-900">
                Cancel Booking?
              </h2>

              <p className="text-slate-500 mt-2">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {
                    setOpenModal(false);
                    setSelectedId(null);
                  }}
                  className="flex-1 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
                >
                  No
                </button>

                <button
                  onClick={async () => {
                    await handleCancel(
                      selectedId
                    );
                    setOpenModal(false);
                    setSelectedId(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                >
                  Yes, Cancel
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default MyBookingsPage;