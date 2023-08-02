import React from "react";


const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let playerNickName;
let countTotalGames = 0;
let countTotalWins = 0;
let countTotalDefeats = 0;
let rows = [];
let game
let history = []


function createData(nickName, wins, defeats, totalGames, scores, password) {
  return { nickName, wins, defeats, totalGames, scores };
}



export default function Profilepage() {
  return (
    <main>
      <div className="leaderboard">
      <div>
      <h2>{`${currentUser}'s Game History`}</h2>
    
    </div>
      </div>
    </main>
  );
}
