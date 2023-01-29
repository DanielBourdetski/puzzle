import { useEffect, useState } from "react";
import localstorageService from "../services/localstorageService";
import socketService from "../services/socketService";
import NewUserModal from "./modals/NewUserModal";
import Menu from "./UI/Menu";
import UI from "./UI/UI";
import { Routes, Route } from "react-router-dom";
import HostRoomForm from "./HostRoomForm";
import Rooms from "./Rooms";

const Main = () => {
  const [isNewUser, setNewUser] = useState(false);
  const [isHostFormOpen, setHostFormOpen] = useState(false);

  useEffect(() => {
    const username = localstorageService.getUserData();

    if (!username) return setNewUser(true);

    socketService.connectClient(username);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
      {/* <UI /> */}

      <div className="min-h-[33%] min-w-[33%] bg-cyan-300 bg-opacity-30 rounded-xl backdrop-blur-md flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/host-room" element={<HostRoomForm />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </div>

      {isNewUser && <NewUserModal handleClose={() => setNewUser(false)} />}
    </div>
  );
};

export default Main;
