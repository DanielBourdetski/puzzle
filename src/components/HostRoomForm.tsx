import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socketService from "../services/socketService";

const HostRoomForm = () => {
  const [roomName, setRoomName] = useState("");
  const [image, setImage] = useState<{ imageData; type: string }>({
    imageData: "",
    type: "",
  });

  const navigate = useNavigate();

  const onFileChange = (e) => {
    const imageType = e.target.files[0].type;
    const imageData = e.target.files[0];

    setImage({ imageData, type: imageType });
  };

  const onNameChange = (e) => setRoomName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    const roomData = { roomName, ...image };

    // TODO add validation

    socketService.hostRoom(roomData);

    // TODO navigate to puzzle room
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center"
    >
      <h3 className="text-xl font-bold mb-2">Host a room</h3>
      <div className="flex flex-col items-center w-full mb-4">
        <input
          type="text"
          id="room-name"
          onChange={onNameChange}
          className="rounded-full border border-slate-600 placeholder:text-slate-600 outline-none p-1 px-6 w-5/6 bg-transparent"
          placeholder="Room Name"
        />
      </div>

      <div className="flex justify-center w-full">
        <label
          htmlFor="image"
          className="rounded-full border border-slate-600 bg-cyan-50 bg-opacity-10 min-w-[20%] max-w-[80%] flex items-center pr-1"
        >
          <input
            type="file"
            id="image"
            onChange={onFileChange}
            className="text-sm text-grey-500 cursor-pointer

            file:mr-5 file:py-1 file:px-3
            file:rounded-l-full file:border-0
            file:text-xs file:font-medium
            file:bg-blue-50 file:bg-opacity-30 file:text-blue-700
            file:cursor-pointer hover:file:bg-opacity-70
            file:duration-150
          "
          />
        </label>
      </div>

      <button
        type="submit"
        className="border border-slate-700 rounded-full hover:bg-black hover:bg-opacity-10 duration-150 p-2 px-8 m-4"
      >
        HOST
      </button>
    </form>
  );
};

export default HostRoomForm;
