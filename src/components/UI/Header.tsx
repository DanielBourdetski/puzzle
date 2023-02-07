import { Link } from "react-router-dom";

const Header = () => {
  const navButtonClassName = "duration-150 font-bold rounded-full px-6 ";

  const navListItemClassName =
    "border border-slate-800 rounded-full bg-white bg-opacity-0 text-sm hover:scale-[1.02] hover:bg-opacity-10 duration-150 hover:shadow-sm hover:shadow-slate-700 cursor-pointer py-1 flex items-center justify-center";
  return (
    <div className="fixed top-0 left-0 w-full min-h-[1.5em]">
      <header className="w-full min-h-[1.5em] bg-gradient-to-t from-cyan-500 to-sky-600 backdrop-filter bg-opacity-40 scale">
        <ul className="flex h-full gap-x-6 items-center justify-center p-2">
          <li className={navListItemClassName}>
            <Link to="/" className={navButtonClassName}>
              HOME
            </Link>
          </li>

          <li className={navListItemClassName}>
            <Link to="/menu/rooms" className={navButtonClassName}>
              ROOMS
            </Link>
          </li>

          <li className={navListItemClassName + " ml-auto"}>
            <Link to={"/"} className={navButtonClassName}>
              CHANGE NAME
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
