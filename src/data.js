export async function getAllRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
  return res.json();
}