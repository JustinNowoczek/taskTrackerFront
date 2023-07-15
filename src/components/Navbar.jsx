import Cookies from "js-cookie";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const userID = Cookies.get("userID");

  let navNames = [
    ["Dashboard", "Logout"],
    ["Register", "Login"],
  ];
  let navLinks = [
    ["/dashboard/" + userID, "/logout"],
    ["/register", "/login"],
  ];
  let navI = 1;
  let navActive = "";

  if (pathname.startsWith("/register") || pathname.startsWith("/login")) {
    navActive = navNames[navI][pathname.startsWith("/register") ? 0 : 1];
  }
  if (pathname.startsWith("/dashboard")) {
    navI = 0;
    navActive = navNames[navI][0];
  }

  return (
    <>
      <div className="navbar tabs tabs-boxed flex-row rounded-b-3xl bg-base-200 py-4">
        <h1 className="mb-2 ml-32 flex-grow text-6xl font-bold text-primary-focus">TaskTracker</h1>
        {navNames[navI].map((el, i) => {
          return (
            <Link name={navNames[navI][i]} key={navNames[navI][i]} className={"tab my-4 mr-8 self-end bg-base-200 pb-9 text-2xl" + (navActive == navNames[navI][i] ? " tab-active" : "")} to={navLinks[navI][i]}>
              {navNames[navI][i]}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
