import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import socketService from "../services/socketService";

const Rooms = () => {
  const [rooms, setRooms] = useState<[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const fetchedRooms = await apiService.getRooms();
      setRooms(fetchedRooms);
    };

    fetchRooms();
  }, []);

  const onRoomSelect = (name: string) => {
    socketService.joinRoom(name);
    navigate(`/room/${name}`);
  };

  if (!rooms.length) return <div>No rooms atm!</div>;
  return (
    <ul className="w-2/3">
      {rooms.map((roomName) => (
        <li
          key={roomName}
          onClick={() => onRoomSelect(roomName)}
          className="border border-slate-500 rounded px-4 py-2 hover:bg-cyan-100 hover:bg-opacity-30 duration-75 cursor-pointer"
        >
          {roomName}
          <span className="ml-20 text-sm text-slate-600">players: 3</span>
        </li>
      ))}
    </ul>
  );
};

export default Rooms;
