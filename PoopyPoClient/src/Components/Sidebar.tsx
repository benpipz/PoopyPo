import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import Hamburger from "./Utils/Hamburger";
import { FC } from "react";

interface SidebarType {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar: FC<SidebarType> = ({ isOpen, toggleSidebar }) => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-hamburger">
        <Hamburger onClick={toggleSidebar} size="4.5vh" />
      </div>
      {isOpen && (
        <div>
          <ul className="sidebar2">
            <Link onClick={toggleSidebar} to="/PoopyPoClient">
              <li>Home</li>
            </Link>
            <Link onClick={toggleSidebar} to="/PoopyPoClient/about">
              <li>About</li>
            </Link>
            {user ? (
              <Link to="/PoopyPoClient">
                <li
                  onClick={() => {
                    auth.signOut();
                    toggleSidebar();
                  }}
                  className="hideOnMobile"
                >
                  Logout
                </li>
              </Link>
            ) : (
              <Link to="/PoopyPoClient/login">
                <li onClick={toggleSidebar} className="hideOnMobile">
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
