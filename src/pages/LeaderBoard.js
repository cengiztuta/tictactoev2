import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./leaderboard.css";
import Navbar from "../components/Navbar/Navbar";
import { auth, db } from "./firebase-config";
import { getDocs, doc, updateDoc, collection } from "firebase/firestore";







export default function LeaderBoard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      const leaderboardDocs = await getDocs(collection(db, "users"));
      setLeaderboard(
        leaderboardDocs.docs
          .map((doc) => doc.data())
          .sort((a, b) => b.win / (b.win + b.loss) - a.win / (a.win + a.loss))
      );
    };
    getLeaderboard();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="leaderboard">
        <div className="leaderboard-statistics">
          <p>Total Wins: </p>
          <p>Total Defeats: </p>
          <p style={{ justifyContent: "flex-start" }}>Total Games:</p>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Players</TableCell>
                <TableCell align="right">Wins</TableCell>
                <TableCell align="right">Defeats</TableCell>
                <TableCell align="right">Total games</TableCell>
                <TableCell align="right">Scores</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.length > 0
                ? leaderboard.map((user, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.win}</TableCell>
                        <TableCell>{user.loss}</TableCell>
                        <TableCell>{user.win + user.loss}</TableCell>
                        <TableCell>{user.win - user.loss || 0}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
