import { useEffect, useState } from "react";
import localstorageService from "../services/localstorageService";
import socketService from "../services/socketService";
import NewUserModal from "./modals/NewUserModal";
import Menu from "./UI/Menu";
import UI from "./UI/UI";
import { Routes, Route } from "react-router-dom";
import HostRoomForm from "./HostRoomForm";
import Rooms from "./Rooms";
import BaseModal from "./modals/BaseModal";

const Main: React.FC<{ username: string }> = ({ username }) => {
  const [isNewUser, setNewUser] = useState(false);

  useEffect(() => {
    setNewUser(!username);
  }, [username]);

  return (
    <BaseModal handleClose={() => {}}>
      <div
        className={`min-h-[33%] min-w-[33%] max-h-[90%] flex flex-col justify-center items-center`}
      >
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/host-room" element={<HostRoomForm />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </div>

      {isNewUser && <NewUserModal handleClose={() => setNewUser(false)} />}
    </BaseModal>
  );
};

export default Main;
