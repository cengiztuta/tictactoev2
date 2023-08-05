import React, { useState, useEffect } from "react";
import "./leaderboard.css";
import Navbar from "../components/Navbar/Navbar";
import { auth, db } from "./firebase-config";
import { getDocs, doc, updateDoc, collection } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import userEvent from "@testing-library/user-event";
const MatchHistory = ({ matches }) => {
  const d = new Date();

  return (
    <div>
      <Navbar />
      <div className="leaderboard">
        <div className="leaderboard-statistics">
          <p style={{alignSelf:'flex-start'}}>nickname</p>
          <p>Result </p>
          <p>Date </p>
          <p>Rival </p>
          <p style={{ justifyContent: "flex-start" }}>Total Games:</p>
        </div>
      </div>
    </div>
  );
};

export default MatchHistory;
