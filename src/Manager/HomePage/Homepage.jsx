import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Homepage.module.css";
import Button from "@mui/material/Button";

function Homepage() {
  return (
    <div className={styles.bam}>
      <div className={styles.homepage}>
        <Button
          size="large"
          variant="contained"
          component={Link}
          color='secondary'
          to="/CreateRoom "
        >
          Create Room
        </Button>
        <Button
          size="large"
          variant="contained"
          component={Link}  
          color='secondary'
          to="/JoinRoom"
        >
          {" "}
          Join Room{" "}
        </Button>
        <Outlet />
      </div>
    </div>
  );
}

export default Homepage;
