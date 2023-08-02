import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Game from "./pages/Game";
import LeaderBoard from "./pages/LeaderBoard";
import Profilepage from "./pages/Profile";
import PhoneSignup from "./pages/PhoneSignup";
import MatchHistory from "./pages/MatchHistory";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={ <HomePage /> }/>      
        <Route path="/Game" element={ <Game /> }/>      
        <Route path="/LeaderBoard" element={ <LeaderBoard /> }/>      
        <Route path="/Profile" element={<Profilepage/>}/>
        <Route path="/Signup" element={<PhoneSignup/>}/>
        <Route path="/MatchHistory" element={<MatchHistory/>}/>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
