"use client";

import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast } from "react-toastify";

const amenitiesOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomForm = () => {
  const router = useRouter();
  const {data: session} = authClient.useSession() 
  const  userEmail = session?.user?.email;
  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const selectedAmenities =
    amenitiesOptions.filter(
      (item) => form[item]?.checked
    );

  const roomData = {
    roomName: form.roomName.value,
    description: form.description.value,
    image: form.image.value,
    floor: form.floor.value,
    capacity: Number(
      form.capacity.value
    ),
    hourlyRate: Number(
      form.hourlyRate.value
    ),
    amenities:
      selectedAmenities,
    bookingCount: 0,
    ownerEmail: userEmail
  };
  const {data: tokenData} = await authClient.token();

  console.log(tokenData);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`,
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(roomData),
      }
    );

    const data = await res.json();


    if (data.insertedId) {
      toast.success("Room added successfully");

      router.push("/my-listings");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <section className="min-h-screen bg-slate-50 py-14">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-xl rounded-[32px] p-8 md:p-12 border border-slate-200">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-900">
              Add Study Room
            </h1>

            <p className="text-slate-500 mt-2">
              Create a new study room listing
              for students and library users.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Room Name */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Room Name
              </label>

              <input
                type="text"
                name="roomName"
                required
                placeholder="Enter room name"
                className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                required
                rows={5}
                placeholder="Write room description..."
                className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600 resize-none"
              />
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image URL */}
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  required
                  placeholder="Paste image URL"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600"
                />
              </div>

              {/* Floor */}
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Floor
                </label>

                <input
                  type="text"
                  name="floor"
                  required
                  placeholder="e.g. 3rd Floor"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600"
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Capacity
                </label>

                <input
                  type="number"
                  name="capacity"
                  required
                  placeholder="e.g. 4"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600"
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Hourly Rate ($)
                </label>

                <input
                  type="number"
                  name="hourlyRate"
                  required
                  placeholder="e.g. 5"
                  className="w-full px-5 py-4 rounded-2xl border border-slate-300 outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block mb-4 font-medium text-slate-700">
                Amenities
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenitiesOptions.map(
                  (item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 bg-slate-100 px-4 py-4 rounded-2xl cursor-pointer hover:bg-blue-50 transition"
                    >
                      <input
                        type="checkbox"
                        name={item}
                        className="w-5 h-5"
                      />
                      <span className="text-slate-700">
                        {item}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg transition"
            >
              Post Room
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoomForm;