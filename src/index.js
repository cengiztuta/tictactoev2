import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Game from "./pages/Game";
import LeaderBoard from "./pages/LeaderBoard";
import Profilepage from "./pages/Profile";
import PhoneSignup from "./pages/PhoneSignup";
import MatchHistory from "./pages/MatchHistory";
import Homepage from "./Manager/HomePage/Homepage";
import JoinRoom from "./Manager/HomePage/joinRoom";
import CreateRoom from "./Manager/HomePage/createRoom";
import Manager from "./Manager/Manager";
import { Provider } from "react-redux";
import { store } from "./store";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/LeaderBoard" element={<LeaderBoard />} />
          <Route path="/Profile" element={<Profilepage />} />
          <Route path="/Signup" element={<PhoneSignup />} />
          <Route path="/MatchHistory" element={<MatchHistory />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/CreateRoom" element={<CreateRoom />} />
          <Route path="/JoinRoom" element={<JoinRoom />} />
          <Route path="/start" element={<Manager />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
