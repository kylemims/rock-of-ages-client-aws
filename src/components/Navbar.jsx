import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full border-b border-zinc-700/60 bg-zinc-900/40 backdrop-blur sticky top-0 z-50 shadow-sm">
      <ul className="navbar container mx-auto flex items-center gap-6 py-4 px-6">
        {/* Brand mark */}
        <li className="navbar__item mr-2">
          <NavLink to="/" className="no-underline flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-rust" aria-hidden="true"></span>
            <span className="text-[#ce9e62] font-semibold tracking-wide">ROA</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) =>
              `text-left no-underline text-silver hover:text-[#ce9e62] ${
                isActive ? "text-[#ce9e62] border-b-2 border-[#ce9e62] pb-0.5" : ""
              }`
            }
            to={"/allrocks"}>
            All Rocks
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) =>
              `text-left no-underline text-silver hover:text-[#ce9e62] ${
                isActive ? "text-[#ce9e62] border-b-2 border-gold pb-0.5" : ""
              }`
            }
            to={"/create"}>
            Collect a Rock
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) =>
              `text-left no-underline text-silver hover:text-[#ce9e62] ${
                isActive ? "text-[#ce9e62] border-b-2 border-gold pb-0.5" : ""
              }`
            }
            to={"/mine"}>
            My Rocks
          </NavLink>
        </li>
        <div className="flex-1" />
        {localStorage.getItem("rock_token") !== null ? (
          <li className="navbar__item">
            <button
              className="no-underline text-silver hover:text-rust"
              onClick={() => {
                localStorage.removeItem("rock_token");
                navigate("/login");
              }}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="navbar__item">
              <NavLink
                className={({ isActive }) =>
                  `text-left no-underline text-silver hover:text-[#ce9e62] ${
                    isActive ? "text-[#ce9e62]" : ""
                  }`
                }
                to={"/login"}>
                Login
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink
                className={({ isActive }) =>
                  `text-left no-underline text-silver hover:text-[#ce9e62] ${
                    isActive ? "text-[#ce9e62]" : ""
                  }`
                }
                to={"/register"}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
