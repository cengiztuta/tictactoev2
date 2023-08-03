import React, { useEffect, useState } from "react";
import Square from "./Square";
import "./Board.css";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../pages/firebase-config";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [status, setStatus] = useState("");
  const [updatedUser, setUpdatedUser] = useState({});
  const loggedUser = auth.currentUser.uid;
  const userDocRef = doc(db, "users", loggedUser);
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const userDoc = await getDoc(userDocRef);
      setUpdatedUser(userDoc.data());
      setUser(userDoc.data());
    };
    getUser();
  }, []);

  const calculateWinner = (squares) => {
    const winningPatterns = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // left diagonal
      [2, 4, 6], // right diagonal
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // X or O
      }
    }
    return null;
  };

  const handleRestart = () => {
    setIsUserTurn(true);
    setSquares(Array(9).fill(null));
  };
  const makeBotMove = (board) => {
    setTimeout(() => {
      const availableMoves = [];
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          availableMoves.push(i);
        }
      }
      if (availableMoves.length === 0) return;

      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      const botMove = availableMoves[randomIndex];
      const updatedBoard = [...board];
      updatedBoard[botMove] = "O";
      setSquares(updatedBoard);
      setIsUserTurn(true);
    }, 750);
  };

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const updatedBoard = [...squares];
    updatedBoard[index] = isUserTurn ? "X" : "O";
    setSquares(updatedBoard);
    setIsUserTurn(!isUserTurn);
  };

  const winner = calculateWinner(squares);

  const updateFirestore = async (winner) => {
    if (winner === "X") {
      updatedUser.win += 1;
    } else if (winner === "O") {
      updatedUser.loss += 1;
    } else {
      updatedUser.tie += 1;
    }
    await updateDoc(userDocRef, updatedUser);
  };

  useEffect(() => {
    if (winner) {
      setStatus(`Winner: ${winner == "X" ? user.username : "Bot"}`);
      updateFirestore(winner);
    } else if (!squares.includes(null)) {
      setStatus("Tie Game");
      updateFirestore();
    } else {
      setStatus(`Next Player: ${isUserTurn ? user.username : "O"}`);

      if (!isUserTurn) {
        makeBotMove(squares);
      }
    }
  }, [squares, isUserTurn, winner]);

  return (
    <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <div className="status">{status}</div>
      <button className="restart" onClick={handleRestart}>
        Restart Game!
      </button>
    </div>
  );
};

export default Board;
