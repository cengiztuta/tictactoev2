import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import { Button, Text } from "@chakra-ui/react";
import { auth, db } from "../pages/firebase-config";
import { getDoc, doc } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";

const Game = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      setUser(userDoc.data());
    };
    getUser();
  }, []);

  return (
    <div>
      <Navbar />
      <label
        style={{
          fontSize: 45,
          textAlign: "center",
          color: "teal.500",
          fontWeight: "bold",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          paddingTop: 20,
          paddingBottom: 20,
          color: "#101828",
        }}
      >
        Welcome {user.username} !
      </label>

      <Board />
    </div>
  );
};

export default Game;
