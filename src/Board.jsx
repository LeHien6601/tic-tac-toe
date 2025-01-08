import { useContext, useEffect, useState } from "react"
import { Square } from "./Square"
import { GameContext } from "./Game"

export const Board = ({size = 3}) => {
    const [squares, setSquares] = useState()
    const createBoard = () => {
        const board = []
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                board.push(<Square key={`${i}-${j}`} position={{r:i,c:j}}></Square>)
            }
        }
        setSquares(<div className={`grid grid-cols-${size} grid-rows-${size} gap-2`}>{board}</div>)
    }
    useEffect(()=>{
        console.log(size)
        createBoard()
    },[size])
    return <div className="bg-dark-300 w-fit rounded-xl p-2 relative after:absolute scale-75 md:scale-100 aspect-square">
        {squares} 
    </div>
}