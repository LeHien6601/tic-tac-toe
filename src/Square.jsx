import { useContext, useEffect, useState } from "react";
import { GameContext } from "./Game";

export const Square = ({position}) => {
    const {gameState, changeGameState} = useContext(GameContext)
    const handleClick = () => {
        if (gameState.board[position.r][position.c] !== "") return
        if (gameState.state in ['TIE', 'X-WIN', 'Y-WIN']) return
        if (gameState.state == 'WAIT-X') {
            const newBoard = gameState.board.map(row => [...row])
            newBoard[position.r][position.c] = 'x' 
            const newLastMove = {move:"x", position}
            changeGameState({state: 'WAIT-O', board: newBoard, lastMove: newLastMove, remainingMove: gameState.remainingMove-1})
        }
        else if (gameState.state == 'WAIT-O') {
            const newBoard = gameState.board.map(row => [...row])
            newBoard[position.r][position.c] = 'o'
            const newLastMove = {move:"o", position}
            changeGameState({state: 'WAIT-X', board: newBoard, lastMove: newLastMove, remainingMove: gameState.remainingMove-1})
        }
        else {
            console.log(gameState.state)
        }
    }
    useEffect(()=>{},[gameState])
    if (position.r < 0 || position.r >= gameState.boardSize || position.c < 0 || position.c >= gameState.boardSize) return <></>
    return (
        <button className={`${gameState.boardSize < 5 ? "w-16" : "w-12"} md:w-32 aspect-square flex items-center justify-center rounded-xl 
            ${gameState.board[position.r][position.c]==="" ? "hover:bg-dark-500 duration-200 bg-dark-400" : "bg-dark-500"}`
            } 
            disabled={gameState.board[position.r][position.c] !== ""} onClick={handleClick}>
            <p className={`${gameState.boardSize < 5 ? "text-5xl" : "text-4xl"} md:text-8xl
                ${(['o-win', 'x-win'].includes(gameState.board[position.r][position.c])) ? 
                    "drop-shadow-[0_10px_10px_rgba(255,255,255,0.9)]" : ""}`}>
                {gameState.board[position.r][position.c].length > 0 ? gameState.board[position.r][position.c][0] : ""}
            </p>
        </button>
      );
}