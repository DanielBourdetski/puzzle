import ModalPopUp from "./ModalPopUp";
import { useState } from "react";
import socketService from "../../services/socketService";

const NewUserModal = ({ handleClose }) => {
  const [name, setName] = useState("");

  const onNameChange = (e) => setName(e.target.value);

  const onNameSubmit = (e) => {
    e.preventDefault();
    console.log(name);

    socketService.connectClient(name);
    handleClose();
  };

  return (
    <ModalPopUp handleClose={handleClose} closeOnSubmitOnly>
      <form
        onSubmit={onNameSubmit}
        className="w-full h-full flex flex-col items-center justify-center py-10"
      >
        <h3 className="text-xl text-gray-900 font-semibold mb-6 tracking-widest">
          Hey! Who are you?
        </h3>
        <div className="w-full flex items-center justify-center mx-10">
          <input
            type="text"
            placeholder="Your name, please!"
            className=" h-10 rounded-l-full py-2 px-4 md:pl-8 text-xs md:text-md m-1"
            onChange={onNameChange}
            value={name}
          />
          <button
            type="submit"
            className="ml-0 px-2 text-xs rounded-r-full h-10 bg-green-300 hover:bg-green-400 duration-150"
          >
            Let me in
          </button>
        </div>
      </form>
    </ModalPopUp>
  );
};

export default NewUserModal;
