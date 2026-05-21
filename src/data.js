



export async function getAllRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
  return res.json();
}


export async function getMyListings(email) {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-rooms/${email}`);
  return res.json();
}
export async function getMyBookings(email) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${email}`);
  return res.json();
}

export const getLatestRooms = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/latest-rooms`,
      {
        cache: "no-store",
      }
    );

    return res.json();
  };