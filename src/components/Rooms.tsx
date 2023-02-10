import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import socketService from "../services/socketService";

const Rooms = () => {
  const [rooms, setRooms] = useState<
    [{ name: string; id: string; playerCounter: number }] | []
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = await apiService.getRooms();
      setRooms(fetchedRooms);
      console.log(fetchedRooms);
    };

    fetchRooms();
  }, []);

  const onRoomSelect = (name: string) => {
    socketService.joinRoom(name);
    navigate(`/room/${name}`);
  };

  if (!rooms.length) return <div>No rooms atm!</div>;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Rooms</h2>
      <div className="max-h-[20%] overflow-y-auto overflow-x-hidden">
        <ul className="w-full h-full">
          {rooms.map((room) => (
            <li
              key={room.id}
              onClick={() => onRoomSelect(room.id)}
              className="border border-slate-500 rounded px-4 py-2 hover:bg-cyan-100 hover:bg-opacity-30 duration-75 cursor-pointer flex items-center justify-between gap-x-5"
            >
              {room.name}
              <span className="text-sm text-slate-600">
                players: {room.playerCounter}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
