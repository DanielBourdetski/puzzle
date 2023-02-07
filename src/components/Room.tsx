import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";

const Room = () => {
  const [roomData, setRoomData] = useState<{
    name: string;
    image: { data: any; type: string };
    id: string;
    playerCounter: number;
  }>({ name: "", image: { data: "", type: "" }, id: "", playerCounter: 0 });

  const { roomId: id } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      const fetchedRoomData = await apiService.getRoomData(id);
      setRoomData(fetchedRoomData);
    };

    fetchRoomData();
  }, []);

  const logImageData = () => console.log(roomData.image.data);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-2/3 h-1/4 bg-gradient-to-tr from-blue-500 to-cyan-400 bg-opacity-30 backdrop-blur-md rounded-lg flex flex-col justify-center items-center">
        <div>
          <span className="font-bold">room name:</span> {roomData.name}
        </div>
        <div>
          <span className="font-bold">room id:</span> {roomData.id}
        </div>
        <div>
          <span className="font-bold">image data:</span>{" "}
          <button className="px-1 border rounded" onClick={logImageData}>
            log data
          </button>
        </div>
        <div>
          <span className="font-bold">type:</span> {roomData.image.type}
        </div>
      </div>
    </div>
  );
};

export default Room;
