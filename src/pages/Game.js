import { useState, useEffect } from "react";
import "../game.css";
import Navbar from "../components/Navbar/Navbar";
import React from "react";
import { auth, db } from "./firebase-config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Board({ xIsNext, squares, onPlay }) {
  const [updatedUser, setUpdatedUser] = useState({});
  const loggedUser = auth.currentUser.uid;
  const userDocRef = doc(db, "users", loggedUser);
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = loggedUser;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  });
  const date = new Date();

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await getDoc(userDocRef);
      setUser(userDoc.data());
      setUpdatedUser(userDoc.data());
    };
    getUser();
  }, []);
  const winner = calculateWinner(squares);
  const updateFirestore = async () => {
    if (winner === "X") {
      updatedUser.win += 1;
      updatedUser.TotalGames += 1;
      updatedUser.date += date;
    } else if (winner === "O") {
      updatedUser.loss += 1;
      updatedUser.TotalGames += 1;
      updatedUser.date += date;
    }
    await updateDoc(userDocRef, updatedUser);
  };

  useEffect(() => {
    if (winner) {
      updateFirestore(winner);
    } else {
      updateFirestore();
    }
  }, [squares, winner]);

  let arr = [];
  let id = 0;

  squares.forEach((element) => {
    if (!element) arr.push(id);
    id++;
  });
  function botMove(indexesArray) {
    setTimeout(() => {
      let rand = Math.floor(Math.random() * indexesArray.length);

      handleClick(arr[rand]);
    }, 750);
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = "Winner ";
    status += winner == "X" ? user.username : "Bot";
  } else {
    status = "Play " + (xIsNext ? user.username : "Bot");

    if (!xIsNext) botMove(arr);
  }

  function SaveGameInfo(win) {
    // usersList.forEach((element) => {
    //   if (element.nickname == currentUser) {
    //     if (win) {
    //       element.wins++;
    //       element.totalGames++;
    //       element.scores++;
    //     } else {
    //       element.totalGames++;
    //       element.defeats++;
    //     }
    // }
    // });
  }

  return (
    <>
      <div
        style={{
          fontSize: 40,
          textAlign: "center",
          marginBottom: "2vh",
          width: "60vh",
        }}
        className="status"
      >
        {status}
      </div>
      <div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}
function GameInfo() {
  const [updatedUser, setUpdatedUser] = useState({});
  const loggedUser = auth.currentUser.uid;
  const userDocRef = doc(db, "users", loggedUser);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await getDoc(userDocRef);
      setUpdatedUser(userDoc.data());
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await getDoc(doc(db, "users", loggedUser));
      setUser(userDoc.data());
    };
    getUser();
  }, []);

  return (
    <div className="info">
      <p>Player: {user.username} </p>
      <p>Wins: {user.win} </p>
      <p>Defeats: {user.loss} </p>
      <p>Total games:{user.TotalGames} </p>
      <p>Scores: {user.win - user.loss}</p>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  // const [matchHistory, setMatchHistory] = useState([Array(1).fill(null)]);

  // const winner = calculateWinner()

  // const GameHistory = matchHistory = history.map((results) => {
  //   let asd ; 
  //   if(winner){
  //     asd = winner == "X" ? 'Win' : "Lose";
  //   }
  // })

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li style={{ color: "orange", backgroundColor: "red" }} key={move}>
        <button
          style={{
            backgroundColor: "yellow",
            width: "20vh",
            height: "4vh",
            fontWeight: "bold",
          }}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <Navbar />
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>

          <div className="game-info">
            <GameInfo />

            <div>
              <ol style={{ fontWeight: "bold" }}>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        borderColor: "green",
        fontSize: 80,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        color: "green",
      }}
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
