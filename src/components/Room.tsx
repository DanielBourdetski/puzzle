import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

const Room = () => {
  const [roomData, setRoomData] = useState<{
    roomName: string;
    image: { data: any; type: string };
  }>({ roomName: "", image: { data: "", type: "" } });
  const { roomName } = useParams();

  console.log(roomData);

  useEffect(() => {
    const fetchRoomData = async () => {
      const fetchedRoomData = await apiService.getRoomData(roomName);
      setRoomData(fetchedRoomData);
    };

    fetchRoomData();
  }, []);

  const logImageData = () => console.log(roomData.image.data);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-2/3 h-1/4 bg-blue-600 bg-opacity-30 backdrop-blur-md rounded-lg flex flex-col justify-center items-center">
        <span>room name: {roomData.roomName}</span>
        <span>
          data:{" "}
          <button className="px-1 border rounded" onClick={logImageData}>
            click to log data
          </button>
        </span>
        <span>type: {roomData.image.type}</span>
      </div>
    </div>
  );
};

export default Room;
