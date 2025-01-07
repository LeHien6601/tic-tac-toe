import { createContext, useEffect, useState } from "react"
import { Board } from "./Board"

const boardSize = 3
export const GameContext = createContext(
    {
        state: "WAIT-X", 
        board: Array(boardSize).fill(Array(boardSize).fill('')),
        lastMove: {position:{r:0, c:0}, move:''},
        remainingMove: boardSize*boardSize
    }
)
export const Game = () => {
    const [gameState, setGameState] = useState(
        {
            state: "WAIT-X", 
            board: Array(boardSize).fill(Array(boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: boardSize*boardSize
        }
    )
    const changeGameState = (newState) => {
        let newGameState = checkWinState(newState.lastMove, newState.board, newState.remainingMove)
        console.log(newGameState)
        newState.state = newGameState
        setGameState(newState)
    }
    const checkWinState = (lastMove, newBoard, remainingMove) => {
        const directions = {horizontal: 1, vertical: 1, topLeft: 1, topRight: 1}
        // Check vertical
        // Up
        let temp = {r: lastMove.position.r - 1, c: lastMove.position.c}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.vertical++
            temp = {r: lastMove.position.r - 2, c: lastMove.position.c}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.vertical++
            }
        }
        // Down
        temp = {r: lastMove.position.r + 1, c: lastMove.position.c}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.vertical++
            temp = {r: lastMove.position.r + 2, c: lastMove.position.c}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.vertical++
            }
        }
        // Check horizontal
        // Left
        temp = {r: lastMove.position.r, c: lastMove.position.c - 1}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.horizontal++
            temp = {r: lastMove.position.r, c: lastMove.position.c - 2}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.horizontal++
            }
        }
        // Right
        temp = {r: lastMove.position.r, c: lastMove.position.c + 1}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.horizontal++
            temp = {r: lastMove.position.r, c: lastMove.position.c + 2}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.horizontal++
            }
        }
        // Check topLeft
        // TopLeft
        temp = {r: lastMove.position.r - 1, c: lastMove.position.c - 1}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.topLeft++
            temp = {r: lastMove.position.r - 2, c: lastMove.position.c - 2}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.topLeft++
            }
        }
        // DownRight
        temp = {r: lastMove.position.r + 1, c: lastMove.position.c + 1}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.topLeft++
            temp = {r: lastMove.position.r + 2, c: lastMove.position.c + 2}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.topLeft++
            }
        }
        // Check topRight
        // TopRight
        temp = {r: lastMove.position.r - 1, c: lastMove.position.c + 1}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.topRight++
            temp = {r: lastMove.position.r - 2, c: lastMove.position.c + 2}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.topRight++
            }
        }
        // DownLeft
        temp = {r: lastMove.position.r + 1, c: lastMove.position.c - 1}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                directions.topRight++
            temp = {r: lastMove.position.r + 2, c: lastMove.position.c - 2}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    directions.topRight++
            }
        }
        console.log(directions)
        for (let count of Object.values(directions)) {
            if (count >= 3) {
                return lastMove.move.toUpperCase()+'-WIN'
            }
        }
        if (remainingMove === 0) return 'TIE'
        console.log(remainingMove)
        return lastMove.move === 'x' ? 'WAIT-O' : 'WAIT-X'
    }
    const checkValidSquare = (position) => {
        return (position.r >= 0) && (position.r < boardSize) && (position.c >= 0) && (position.c < boardSize)
    }
    const handleRestart = () => {
        setGameState({
            state: "WAIT-X", 
            board: Array(boardSize).fill(Array(boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: boardSize*boardSize
        })
    }
    return (
        <GameContext.Provider value={{gameState, changeGameState}}>
            <div className="bg-dark-400 p-2 m-2 rounded-xl flex justify-center">
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <Board size={boardSize}></Board>
                    <p className="text-xl">{gameState.state}</p>
                    <button className="bg-dark-500 p-2 text-dark-300 text-xl rounded-xl hover:scale-110 duration-200"
                        onClick={handleRestart}>
                        RESTART
                    </button>
                </div>
            </div>
        </GameContext.Provider>
    )
}