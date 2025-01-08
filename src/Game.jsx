import { createContext, useEffect, useState } from "react"
import { Board } from "./Board"

export const GameContext = createContext()
export const Game = () => {
    const [gameState, setGameState] = useState(
        {
            state: "WAIT-X", 
            board: Array(3).fill(Array(3).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: 9,
            mode: '2P',
            winCondition: 3,
            boardSize: 3
        }
    )
    const [options, setOptions] = useState({
        boardSize: 3,
        winCondition: 3,
        mode: '2P'
    })
    const [isChanged, setIsChanged] = useState(false)

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
        return (position.r >= 0) && (position.r < gameState.boardSize) && (position.c >= 0) && (position.c < gameState.boardSize)
    }
    const handleRestart = () => {
        setGameState({
            ...gameState,
            state: "WAIT-X", 
            board: Array(gameState.boardSize).fill(Array(gameState.boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: gameState.boardSize*gameState.boardSize
        })
    }
    const handleApplyChanges = () => {
        console.log(options)
        setGameState({
            ...gameState,
            state: "WAIT-X",
            board: Array(options.boardSize).fill(Array(options.boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: options.boardSize*options.boardSize,
            winCondition: options.winCondition,
            mode: options.mode,
            boardSize: options.boardSize
        })
    }
    useEffect(()=>{
        setIsChanged(options.boardSize !== gameState.boardSize 
            || options.mode !== gameState.mode 
            || options.winCondition !== gameState.winCondition)
    },[options, gameState])
    return (
        <GameContext.Provider value={{gameState, changeGameState}}>
            <div className="bg-dark-400 p-2 m-2 rounded-xl flex flex-col md:flex-row items-center justify-center gap-5">
                <div className=" flex flex-col justify-center items-center gap-y-2 ">
                    <div className="justify-center flex w-max">
                        <Board size={gameState.boardSize}></Board>
                    </div>
                    <p className={`${['X-WIN', 'O-WIN', 'TIE'].includes(gameState.state) 
                        ? "text-light-500 text-5xl" : "text-dark-500 text-xl"}`}>
                        {gameState.state}
                    </p>
                    <button className="bg-dark-500 p-2 text-dark-300 text-xl rounded-xl hover:scale-110 duration-200"
                        onClick={handleRestart}>
                        RESTART
                    </button>
                </div>
                <div className={`p-3 text-light-500 opacity-50 hover:opacity-100 duration-200 flex flex-col gap-y-2 bg-dark-500 rounded-xl`}>
                    <p className="text-3xl">Options</p>
                    <div>
                        <p className="text-2xl">Gamemode</p>
                        <div className="flex flex-wrap text-wrap gap-2">
                            <button className={`${options.mode === '2P' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, mode: '2P'})}>
                                2 Players
                            </button>
                            <button className={`${options.mode === 'AI-0' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, mode: 'AI-0'})}>
                                AI lv.0
                            </button>
                            <button className={`${options.mode === 'AI-1' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, mode: 'AI-1'})}>
                                AI lv.1
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="text-2xl">Grid's size</p> 
                        <select className="p-2 rounded-xl bg-dark-400 text-xl" defaultValue={gameState.boardSize}
                            onChange={(e) => {setOptions({...options, boardSize: parseInt(e.target.value)})}}>
                            <option value={3}>3x3</option>
                            <option value={4}>4x4</option>
                            <option value={5}>5x5</option>
                            <option value={6}>6x6</option>
                        </select>
                    </div>
                    <div>
                        <p className="text-2xl">Number of consecutive symbols to win</p>
                        <select className="p-2 rounded-xl bg-dark-400 text-xl" defaultValue={gameState.winCondition}
                            onChange={(e) => {setOptions({...options, winCondition: parseInt(e.target.value)})}}>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div className="justify-center flex">
                        <button className={`p-2 items-end text-xl rounded-xl bg-dark-300 ${isChanged ? "hover:scale-110 duration-200":"opacity-50"}`}
                            disabled={!isChanged}
                            onClick={() => handleApplyChanges()}>
                            Apply changes
                        </button>
                    </div>
                </div>
            </div>
        </GameContext.Provider>
    )
}