import { GameBoard } from "./components/GameBoard.jsx"
import PlayerInfo from "./components/PlayerInfo.jsx"
import { useState } from "react"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import { GameOver } from "./components/GameOver.jsx";


const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function derivedActivePlayer(gameTurns){
  let currentPlayer= 'X';

  if(gameTurns.length>0 && gameTurns[0].player==='X')
  currentPlayer = 'O';

  return currentPlayer;
}


function App() {

  //const [activePlayer, setActivePlayer]= useState('X');

  const  [gameTurns, setGameTurns]=useState([]);

const activePlayer= derivedActivePlayer(gameTurns);

let gameBoard=[...initialGameBoard.map((array)=> [...array])];

for(const turn of gameTurns){
    const {square,player}=turn;
    const{row,col}=square;
    gameBoard[row][col]=player;
}

let winner;

for(const combination of WINNING_COMBINATIONS){

  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];


  if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol ===thirdSquareSymbol){
winner=firstSquareSymbol;
  }
}


const hasDrawn = gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    //setActivePlayer((currentActivePlayer)=>currentActivePlayer==='X'? 'O':'X' );


    setGameTurns(prevTurns =>{

   const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns =[
        {square:{row:rowIndex, col:colIndex}, player:currentPlayer},
        ...prevTurns,];
       return updatedTurns;
    });
  

  }

function handleRestart(){
  setGameTurns([]);
}


  return (
<main>
  <div id ="game-container">
    <ol id="players" className="highlight-player">
      <PlayerInfo name="Player1" symbol="X" isActive={activePlayer==='X'}/>
      <PlayerInfo name="Player2" symbol="O" isActive={activePlayer==='O'}/>
    
    </ol>
    {(winner || hasDrawn) &&  <GameOver winner={winner} onRestart={handleRestart}/> }
    <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
  </div>
 <Log turns={gameTurns}/>
    </main>
  ) 
}

export default App
