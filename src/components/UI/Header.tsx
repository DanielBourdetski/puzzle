import { Link } from "react-router-dom";

const Header = () => {
  const navButtonClassName =
    "border-2 border-slate-800 rounded-full text-sm py-1 px-4 hover:bg-white hover:bg-opacity-20 duration-150 font-bold";

  return (
    <div className="fixed top-0 left-0 w-full min-h-[1.5em]">
      <header className="w-full min-h-[1.5em] bg-blue-400 bg-opacity-40">
        <ul className="flex h-full gap-x-6 items-center p-2">
          <li>
            <Link to="/" className={navButtonClassName}>
              HOME
            </Link>
          </li>

          <li>
            <Link to="/menu/rooms" className={navButtonClassName}>
              ROOMS
            </Link>
          </li>

          <li>
            <button className={navButtonClassName}>MY ROOMS</button>
          </li>

          <li>
            <button className={navButtonClassName}>ACCOUNT</button>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
