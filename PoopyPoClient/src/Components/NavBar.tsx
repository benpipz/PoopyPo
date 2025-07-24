import React, { useEffect, useState } from "react";
import PoopyPoLogo from "./../assets/poopyDog.png";
import LogoText from "./../assets/LogoText.png";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../Styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../util/firebase";
import Hamburger from "./Utils/Hamburger";
import RoundImage from "./Utils/RoundImage";

const NavBar = ({ toggleSidebar }) => {
  const [user, loading] = useAuthState(auth);
  const [userWelcome, setUserWelcome] = useState<string>("");

  useEffect(() => {
    if (user) {
      setUserWelcome(`Hello, ${user.displayName}`);
      setTimeout(() => {
        setUserWelcome(user.displayName || "");
      }, 5000);
    }
  }, [user]);

  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={PoopyPoLogo}
          alt="logo"
          style={{
            height: "5vh",         // responsive to navbar height
            aspectRatio: "1 / 1",  // keeps square shape
            objectFit: "contain",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "8px",
          }}
        >
          <img
            src={LogoText}
            alt="logo text"
            style={{
              height: "4vh",       // slightly smaller than navbar
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <div className="flex" style={{ alignItems: "center" }}>
        {user && user.photoURL && (
          <>
            <RoundImage src={user.photoURL} />
            <Typography
              style={{
                fontSize: "clamp(0.8rem, 1.5vh, 1.2rem)",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {userWelcome}
            </Typography>
          </>
        )}
      </div>

      <ul>
        <Link to="/PoopyPoClient">
          <li className="hideOnMobile">Home</li>
        </Link>
        <Link to="/PoopyPoClient/about">
          <li className="hideOnMobile">About</li>
        </Link>
        {user ? (
          <Link to="/PoopyPoClient">
            <li onClick={() => auth.signOut()} className="hideOnMobile">
              Logout
            </li>
          </Link>
        ) : (
          <Link to="/PoopyPoClient/login">
            <li className="hideOnMobile">Login</li>
          </Link>
        )}
        <li className="menu-button">
          <Hamburger onClick={toggleSidebar} size="4.5vh" />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
