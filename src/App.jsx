import Gameboard from "./components/GameBoard"
import Player from "./components/player"
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winningcombinations";
import Gameover from "./components/Gameover";




function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
     if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPlayer = 'O';
     }
     return currentPlayer;
}

function deriveWinner(playergameBoard,players){
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = playergameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = playergameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = playergameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
     winner = players[firstSquareSymbol];
    }
  }
 return winner;
}

function App() {
  const playerBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [players, setPlayers] = useState({
    'X':'Player 1',
    'O':'Player 2'
  });

  const [gameTurns, setGameTurns] = useState([]);
 
  const activePlayer = deriveActivePlayer(gameTurns);

  let playergameBoard = playerBoard;
   
  for(const turn of gameTurns){
      const{square, player} = turn;
      console.log(turn);
      const{row,col} =square;
      playergameBoard[row][col] = player;
  }

  let winner = deriveWinner(playergameBoard, players);
  const isDraw = (gameTurns.length == 9 && !winner);


  function handlePlayerSymbolSelect(rowIndex,colIndex){
     
     setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
     
      const updatedTurns =[
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns,
      ];
      return updatedTurns;
     })
  }

  function handleRestartGame(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
     return {
      ...prevPlayers,
      [symbol]:newName
     };
    }
    );
  }

  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
      <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onnameChange={handlePlayerNameChange}/>
      <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} onnameChange={handlePlayerNameChange}/>
      </ol>
      {(winner || isDraw) && <Gameover winner={winner} restart={handleRestartGame}/>}
      <Gameboard onSelectSquare={handlePlayerSymbolSelect} turns ={gameTurns} board={playerBoard}/>
      <Log  turns={gameTurns}/>
      </div>
    </main>
  )
}

export default App
