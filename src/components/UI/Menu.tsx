import { Link } from "react-router-dom";
import socketService from "../../services/socketService";

const Menu = () => {
  const liClassName =
    "border border-slate-700 rounded-full hover:bg-black hover:bg-opacity-10 duration-150 p-2 px-8 m-4 text-center";

  const onAbout = () => {};

  return (
    <ul>
      <li className={liClassName}>
        <Link to="../rooms">Rooms</Link>
      </li>
      <li className={liClassName}>
        <Link to="../host-room">Host Room</Link>
      </li>
      <li className={liClassName}>
        <button onClick={onAbout}>About</button>
      </li>
    </ul>
  );
};

export default Menu;
