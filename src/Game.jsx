import { createContext, useEffect, useState } from "react"
import { Board } from "./Board"

const boardSize = 4
export const GameContext = createContext()
export const Game = () => {
    const [gameState, setGameState] = useState(
        {
            state: "WAIT-X", 
            board: Array(boardSize).fill(Array(boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: boardSize*boardSize,
            mode: '2P'
        }
    )

    const changeGameState = (newState) => {
        let newGameState1 = checkWinState(newState)
        setGameState({...gameState, ...newGameState1})
    }
    const checkWinState = ({lastMove, board, remainingMove}) => {
        const directions = {horizontal: 1, vertical: 1, topLeft: 1, topRight: 1}
        // Check vertical
        // Up
        let temp = {r: lastMove.position.r - 1, c: lastMove.position.c}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.vertical++
            temp = {r: lastMove.position.r - 2, c: lastMove.position.c}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.vertical++
            }
        }
        // Down
        temp = {r: lastMove.position.r + 1, c: lastMove.position.c}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.vertical++
            temp = {r: lastMove.position.r + 2, c: lastMove.position.c}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.vertical++
            }
        }
        // Check horizontal
        // Left
        temp = {r: lastMove.position.r, c: lastMove.position.c - 1}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.horizontal++
            temp = {r: lastMove.position.r, c: lastMove.position.c - 2}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.horizontal++
            }
        }
        // Right
        temp = {r: lastMove.position.r, c: lastMove.position.c + 1}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.horizontal++
            temp = {r: lastMove.position.r, c: lastMove.position.c + 2}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.horizontal++
            }
        }
        // Check topLeft
        // TopLeft
        temp = {r: lastMove.position.r - 1, c: lastMove.position.c - 1}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.topLeft++
            temp = {r: lastMove.position.r - 2, c: lastMove.position.c - 2}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.topLeft++
            }
        }
        // DownRight
        temp = {r: lastMove.position.r + 1, c: lastMove.position.c + 1}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.topLeft++
            temp = {r: lastMove.position.r + 2, c: lastMove.position.c + 2}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.topLeft++
            }
        }
        // Check topRight
        // TopRight
        temp = {r: lastMove.position.r - 1, c: lastMove.position.c + 1}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.topRight++
            temp = {r: lastMove.position.r - 2, c: lastMove.position.c + 2}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.topRight++
            }
        }
        // DownLeft
        temp = {r: lastMove.position.r + 1, c: lastMove.position.c - 1}
        if (checkValidSquare(temp)) {
            if (board[temp.r][temp.c] == lastMove.move) 
                directions.topRight++
            temp = {r: lastMove.position.r + 2, c: lastMove.position.c - 2}
            if (checkValidSquare(temp)) {
                if (board[temp.r][temp.c] == lastMove.move) 
                    directions.topRight++
            }
        }
        for (let direction of Object.keys(directions)) {
            if (directions[direction] >= 3) {
                board = highlightWinningSymbol(direction, lastMove, board)
                return (
                    {
                        state: lastMove.move.toUpperCase()+'-WIN',
                        lastMove: lastMove,
                        board: board,
                        remainingMove: remainingMove
                    }
                )
            }
        }
        if (remainingMove === 0) 
            return (
                {
                    state:'TIE',
                    lastMove: lastMove,
                    board: board,
                    remainingMove: remainingMove
                }
            )
        return (
            {
                state: lastMove.move === 'x' ? 'WAIT-O' : 'WAIT-X',
                lastMove: lastMove,
                board: board,
                remainingMove: remainingMove
            }
        )
    }
    const highlightWinningSymbol = (direction, lastMove, board) => {
        const newBoard = board.map(row => [...row])
        const directory = {
            'horizontal': [0, 1, 0, 2, 0, -1, 0, -2],
            'vertical': [1, 0, 2, 0, -1, 0, -2, 0],
            'topLeft': [1, 1, 2, 2, -1, -1, -2, -2],
            'topRight': [-1, 1, -2, 2, 1, -1, 2, -2]
        }
        let add = directory[direction]
        let temp = {r: lastMove.position.r + add[0], c: lastMove.position.c + add[1]}
        newBoard[lastMove.position.r][lastMove.position.c] += '-win'
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                newBoard[temp.r][temp.c] += '-win'
            temp = {r: lastMove.position.r + add[2], c: lastMove.position.c + add[3]}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    newBoard[temp.r][temp.c] += '-win'
            }
        }
        temp = {r: lastMove.position.r + add[4], c: lastMove.position.c + add[5]}
        if (checkValidSquare(temp)) {
            if (newBoard[temp.r][temp.c] == lastMove.move) 
                newBoard[temp.r][temp.c] += '-win'
            temp = {r: lastMove.position.r + add[6], c: lastMove.position.c + add[7]}
            if (checkValidSquare(temp)) {
                if (newBoard[temp.r][temp.c] == lastMove.move) 
                    newBoard[temp.r][temp.c] += '-win'
            }
        }
        return newBoard
    }
    const checkValidSquare = (position) => {
        return (position.r >= 0) && (position.r < boardSize) && (position.c >= 0) && (position.c < boardSize)
    }
    const handleRestart = () => {
        setGameState({
            state: "WAIT-X", 
            board: Array(boardSize).fill(Array(boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: boardSize*boardSize,
            mode: '2P'
        })
    }
    return (
        <GameContext.Provider value={{gameState, changeGameState}}>
            <div className="bg-dark-400 p-2 m-2 rounded-xl flex justify-center gap-x-20">
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <Board size={boardSize} changeBoard={boardSize}></Board>
                    <p className={`${['X-WIN', 'O-WIN', 'TIE'].includes(gameState.state) 
                        ? "text-light-500 text-5xl" : "text-dark-500 text-xl"}`}>
                        {gameState.state}
                    </p>
                    <button className="bg-dark-500 p-2 text-dark-300 text-xl rounded-xl hover:scale-110 duration-200"
                        onClick={handleRestart}>
                        RESTART
                    </button>
                </div>
                <div className="p-3 text-light-500 opacity-80 flex flex-col gap-y-2 bg-dark-500 rounded-xl">
                    <p className="text-3xl">Options</p>
                    <div>
                        <p className="text-2xl">Gamemode</p>
                        <div className="flex flex-wrap gap-2">
                            <button className={`${gameState.mode === '2P' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setGameState({...gameState, mode: '2P'})}>
                                2 Players
                            </button>
                            <button className={`${gameState.mode === 'AI-0' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setGameState({...gameState, mode: 'AI-0'})}>
                                AI lv.0
                            </button>
                            <button className={`${gameState.mode === 'AI-1' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setGameState({...gameState, mode: 'AI-1'})}>
                                AI lv.1
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </GameContext.Provider>
    )
}