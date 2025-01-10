import { useContext, useEffect } from "react";
import { GameContext } from "./Game";

export const Square = ({position}) => {
    const {gameState, changeGameState} = useContext(GameContext)
    const handleClick = () => {
        if (gameState.board[position.r][position.c] !== "") return
        if (gameState.state in ['TIE', 'X-WIN', 'Y-WIN']) return
        if (gameState.state == 'WAIT-X') {
            const newBoard = gameState.board.map(row => [...row])
            newBoard[position.r][position.c] = 'X' 
            const newLastMove = {move:"X", position}
            changeGameState({board: newBoard, lastMove: newLastMove, remainingMove: gameState.remainingMove-1})
        }
        else if (gameState.state == 'WAIT-O') {
            const newBoard = gameState.board.map(row => [...row])
            newBoard[position.r][position.c] = 'O'
            const newLastMove = {move:"O", position}
            changeGameState({board: newBoard, lastMove: newLastMove, remainingMove: gameState.remainingMove-1})
        }
        else {
            console.log(gameState.state)
        }
    }
    useEffect(()=>{},[gameState])
    if (position.r < 0 || position.r >= gameState.boardSize || position.c < 0 || position.c >= gameState.boardSize) return <></>
    return (
        <button className={`${gameState.boardSize < 5 ? "w-16 md:w-32" : "w-12 md:w-20"} aspect-square flex items-center justify-center rounded-xl 
            ${gameState.board[position.r][position.c]==="" ? "hover:bg-dark-500 duration-200 bg-dark-400" : "bg-dark-500"}
            ${gameState.lastMove.position.r === position.r && gameState.lastMove.position.c === position.c 
                ? "outline outline-4 outline-white" : ""
            }
            ${gameState.blockedSquares[position.r][position.c] ? "outline outline-4 outline-red-500" : "outline outline-4 outline-green-500"}
            `} 
            disabled={gameState.board[position.r][position.c] !== ""} onClick={handleClick}>
            <p className={`${gameState.boardSize < 5 ? "text-5xl md:text-8xl" : "text-4xl md:text-6xl"} 
                ${(['O-WIN', 'X-WIN'].includes(gameState.board[position.r][position.c])) ? 
                    "drop-shadow-[0_10px_10px_rgba(255,255,255,0.9)]" : ""}`}>
                {gameState.board[position.r][position.c].length > 0 ? gameState.board[position.r][position.c][0] : ""}
            </p>
        </button>
      );
}