"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const RoomOwnerActions = ({
  room,
}) => {
  const { data: session } =
    authClient.useSession();

  const currentUserEmail =
    session?.user?.email;

  const isOwner =
    currentUserEmail ===
    room?.ownerEmail;

  if (!isOwner) return null;

  return (
    <div className="flex gap-4 mt-8">

      <Link
        href={`/update-room/${room._id}`}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl transition"
      >
        Edit Room
      </Link>

      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl transition">
        Delete Room
      </button>

    </div>
  );
};

export default RoomOwnerActions;