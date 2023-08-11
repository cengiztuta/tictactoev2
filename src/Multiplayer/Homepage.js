import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Homepage.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <button
        className="button"
        onClick={() => {
          navigate("/CreateRoom");
        }}
      >
        Create Room
      </button>
      <button
        className="button"
        onClick={() => {
          navigate("/JoinRoom");
        }}
      >
        Join Room
      </button>
      <Outlet />
    </div>
  );
};
export default Homepage;
