import { useContext, useEffect, useState } from "react"
import { Square } from "./Square"
import { GameContext } from "./Game"

export const Board = () => {
    const [squares, setSquares] = useState()
    const {gameState} = useContext(GameContext)
    const createBoard = () => {
        const board = []
        for (let i = 0; i < gameState.boardSize; i++) {
            for (let j = 0; j < gameState.boardSize; j++) {
                board.push(<Square key={`${i}-${j}`} position={{r:i,c:j}}></Square>)
            }
        }
        setSquares(<div className={`grid grid-cols-${gameState.boardSize} grid-rows-${gameState.boardSize} gap-2`}>{board}</div>)
    }
    useEffect(()=>{
        createBoard()
    },[gameState.boardSize])
    return <div className="bg-dark-300 w-fit rounded-xl p-2 relative after:absolute scale-75 md:scale-100 aspect-square">
        {squares} 
    </div>
}