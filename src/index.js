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
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/LeaderBoard" element={<LeaderBoard />} />
          <Route path="/Profile" element={<Profilepage />} />
          <Route path="/Signup" element={<PhoneSignup />} />
          <Route path="/MatchHistory" element={<MatchHistory />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
