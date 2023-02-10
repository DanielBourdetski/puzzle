import http from "./http";

export const getRooms = async () => {
  const rooms = await http.get("rooms");
  return rooms.data;
};

export const getRoomData = async (roomName: string) => {
  const room = await http.get(`rooms/${roomName}`);
  return room.data;
};

export default {
  getRooms,
  getRoomData,
};
