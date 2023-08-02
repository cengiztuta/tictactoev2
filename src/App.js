import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Game from "./pages/Game";
import HomePage from "./pages/HomePage";
import LeaderBoard from "./pages/LeaderBoard";
import Profilepage from "./pages/Profile";


const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/Game" element={<Game/>} />
          <Route path="/Leaderboard" element={<LeaderBoard/>} />
          <Route path="/Profile" element={<Profilepage/>} />      
        </Routes>
    </div>
  );
};

export default App;
