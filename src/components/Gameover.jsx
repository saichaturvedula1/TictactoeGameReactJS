export default function Gameover({winner, restart}){
    return(
        <div id="game-over">
        <h1>Game Over!</h1>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's a Draw</p>}
        <p><button onClick={restart}>Rematch!</button></p>
        </div>
    )
}