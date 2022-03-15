import React from "react";
import { UseAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

const loggedInLinks = [
  { id: 1, to: "/posts", name: "Posts" },
  { id: 2, to: "/posts/new", name: "+ New Post" },
  { id: 3, to: "/me", name: "My Profile" },
];
const loggedOutLinks = [
  { id: 1, to: "/posts", name: "Posts" },
  { id: 2, to: "/home", name: "Home" },
  { id: 3, to: "/login", name: "Login" },
  { id: 4, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = UseAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;
  return (
    <nav>
      {navLinks.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="navLink">
          {name}
        </NavLink>
      ))}
      {isLoggedIn && (
        <div className="material-icons-outlined" onClick={logout}>
          logout
        </div>
        // <button className="logout" onClick={logout}>
        //   Logout
        // </button>
      )}
    </nav>
  );
}
