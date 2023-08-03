import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

import { auth } from "../../pages/firebase-config";

import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const userID = useRef();
  const password = useRef();
  const localSignUp = localStorage.getItem("signUp");
  const localUserID = localStorage.getItem("userID");
  const localPassword = localStorage.getItem("password");
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };


  return (
    <nav className="app_navbar">
      <a href="/Game" className="app_header">TIC TAC TOE</a>
      <ul className="navlist">
        {/* <li className="item active">
          <a href="/MatchHistory">Match History </a>
        </li> */}
        <li className="item active">
          <a href="/Game">Game</a>
        </li>

        <li className="item active">
          <a href="/LeaderBoard">Leader Board</a>
        </li>

        {/* <li className="item active">
          <a href="/Profile">Profile</a>
        </li> */}

        <li className="item active">
          <a onClick={logout}>Log Out</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
