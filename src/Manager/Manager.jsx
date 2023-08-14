import React, { useEffect, useState } from "react";
import Board from "./Board/GameController";
import { doc, getDoc, onSnapshot,deleteDoc } from "@firebase/firestore";
import { db } from "../pages/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import initializePlayers, {
  data,
  handleNameChange,
} from "./HomePage/initializePlayers";
import {
  board,
  chancesLeft,
  changeBoardState,
  changeChancesleft,
  changeGameOver,
  changeTurn,
  currentPlayer,
  gameState,
} from "./Board/GameController.config";
import { deserialize } from "./Helpers/helper";
import Result from "./Replay/replay";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { height } from "@mui/system";
import { async } from "@firebase/util";

function Manager() {
  const players = useSelector(data);
  const boardData = useSelector(board);
  const playerTurn = useSelector(currentPlayer);
  const state = useSelector(gameState);
  const chances = useSelector(chancesLeft);
  const docRef = doc(db, "Gamerooms", players.room);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getDoc(docRef).then((item) => {
      const { player1, player2 } = item.data();
      dispatch(handleNameChange({ name: "player1", value: player1 }));
      dispatch(handleNameChange({ name: "player2", value: player2 }));
    });

    onSnapshot(docRef, (doc) => {
      const { board: fetchedboard, gameOver, turn, chancesLeft } = doc.data();
      const ans = deserialize(fetchedboard);
      const gameOverState = chancesLeft === 0 ? true : gameOver;
      dispatch(changeBoardState(ans));
      dispatch(changeGameOver(gameOverState));
      dispatch(changeTurn(turn));
      dispatch(changeChancesleft(chancesLeft));
    });
  }, []);

  const [countdown, setCountdown] = useState(30);
  const [countdownActive, setCountdownActive] = useState(false);

  


  useEffect(() => {
    if (countdown === 0) {
      // Geri sayım tamamlandı, ana menüye yönlendir
      // Yönlendirme kodu burada olmalı
      setCountdownActive(true);
      navigate("/Homepage");
    }
  }, [countdown]);

  useEffect(() => {
    getDoc(docRef).then((item) => {
      const { player1, player2 } = item.data();
      if (player1 === undefined || player2 === undefined) {
        setCountdownActive(true);
      } else {
        return null;
      }
    });
  }, []);

  useEffect(() => {
    let intervalId;

    if (countdownActive) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [countdownActive]);

  return (
    <>
      <Board
        board={boardData}
        state={state}
        turn={playerTurn}
        isDisabled={players.myself !== playerTurn}
      ></Board>

      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",

          flexDirection: "column",
          height: 150,
        }}
      >
        <Result state={state} chances={chances} turn={playerTurn} />
        {countdownActive && <p>Geriye Kalan Süre: {countdown}</p>}
        <Button size="large" variant="contained">
          Leave Game
        </Button>
      </div>
    </>
  );
}

export default Manager;
