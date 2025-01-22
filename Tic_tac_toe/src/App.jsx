// import Player from './Components/Player.jsx';
// import React,{useState} from 'react';
// import GameBoard from './Components/GameBoard.jsx';
// import Log from './Components/Log.jsx';
// function App() {
//    const [activePlayer , setActivePlayer] = useState('X');
//    const [gameTurns,setGameTurns] = useState([]);
//    function handleSelectSquare(rowIndex,colIndex){
//       setActivePlayer((curActivePlayer)=>curActivePlayer === 'X' ?'O':'X');
//       setGameTurns((prevTurns) => {
//         let currentPlayer = 'X';
//         if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
//           currentPlayer = 'o';
//         }
//         const updatedTurns = [{ square:{row:rowIndex , col:colIndex}, player: activePlayer },...prevTurns

//         ];
//       })
//    }
  

//   return (
//     <div>
//        <header>
//         <h1>React Tic-Tac-Toe</h1>
//         <img src="/game-logo.png" alt="Game Logo"/>
//     </header>
//     <main>
//         <div id="game-container">
//             <ol id="players" className='highlight-player'>
//                <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'}/>
//                <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'}/>
//             </ol>
//             <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
//             <Log/>
//         </div>
//     </main>    
//     </div>
   
//   )
// }

// export default App
import React, { useState } from "react";
import GameBoard from "./Components/GameBoard.jsx";
import Player from "./Components/Player.jsx";
import Log from "./Components/Log.jsx";
import WINNING_COMBINATIONS  from '../src/winning-combinations.js';
import GameOver from "./Components/GameOver.jsx";


const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

const PLAYERS = {
  X:'Player 1',
  O:'Player 2'
}

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}


function derivedGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
 for(const turn of gameTurns){
     const {square,player} = turn;
     const{row,col} = square;
     gameBoard[row][col] = player;
 }
 return gameBoard;
}

function derivedWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
     const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
     const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
     const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

     if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
     ) {
        winner = players[firstSquareSymbol];
     }
  }

  return winner;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const[players,setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); // Always initialize as an array
  // const [hasWinner,setHasWinner] = useState(false);

 const activePlayer = derivedActivePlayer(gameTurns)
  


const gameBoard = derivedGameBoard(gameTurns);
 const winner = derivedWinner(gameBoard,players);
const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      // const isSquareTaken = prevTurns.some(
      //   (turn) => turn.square.row === rowIndex && turn.square.col === colIndex
      // );
      // if (isSquareTaken) return prevTurns; // Ignore clicks on taken squares

      // const newTurn = {
      //   square: { row: rowIndex, col: colIndex },
      //   player: activePlayer,
      // };
       const updatedTurns = [
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns,
       ];
      // return [newTurn, ...prevTurns]; // Add the new turn
      return updatedTurns;
    });

    // setActivePlayer((curActivePlayer) =>
    //   curActivePlayer === "X" ? "O" : "X"
    // );
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]:newName
      }
    });
    
  }

  return (
    <div>
      <header>
        <h1>React Tic-Tac-Toe</h1>
        <img src="/game-logo.png" alt="Game Logo" />
      </header>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChange={handlePlayerNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChange={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        

          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
          <Log turns={gameTurns} />
        </div>
      </main>
    </div>
  );
}

export default App;
