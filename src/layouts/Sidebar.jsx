import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed flex h-screen w-24 flex-col items-center gap-10 py-8">
      <Link to="/" className="mb-4 text-xl font-semibold">
        <img className="w-10" src={logo} alt="Nusa" title="Nusa" />
      </Link>

      <NavLink
        to="/order"
        className={({ isActive }) =>
          `flex w-16 flex-col items-center justify-center rounded-xl border pb-2 pt-3 shadow transition-colors ${
            isActive || ["/payment"].includes(pathname)
              ? "bg-[#FF2351] text-white hover:bg-[#e81e48]"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-shop-window h-5 w-5"
          viewBox="0 0 16 16"
        >
          <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
        </svg>
        <h1 className="pt-1 text-sm">Order</h1>
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) =>
          `flex w-16 flex-col items-center justify-center rounded-xl border pb-2 pt-3 shadow transition-colors ${
            isActive
              ? "bg-[#FF2351] text-white hover:bg-[#e81e48]"
              : "bg-white text-gray-500 hover:bg-gray-100"
          }`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-hourglass h-5 w-5"
          viewBox="0 0 16 16"
        >
          <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z" />
        </svg>
        <h1 className="pt-1 text-sm">History</h1>
      </NavLink>
    </aside>
  );
}

export default Sidebar;
