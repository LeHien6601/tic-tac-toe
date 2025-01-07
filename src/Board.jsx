import { useContext } from "react"
import { Square } from "./Square"
import { GameContext } from "./Game"

export const Board = ({size}) => {
    // const gameState = useContext(GameContext)
    const createBoard = () => {
        const board = []
        for (let i = 0; i < size; i++) {
            const row = []
            for (let j = 0; j < size; j++) {
                board.push(<Square key={`${i}-${j}`} position={{r:i,c:j}}></Square>)
            }
        }
        return board
    }
    return <div className="bg-dark-300 w-fit rounded-xl p-2 relative after:absolute">
        <div className={`grid grid-rows-${size} grid-cols-${size}`}>
            {createBoard()}
        </div>
    </div>
}