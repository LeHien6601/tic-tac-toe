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
            boardSize: 3,
            AI: 'O',
            winEvenBeBlocked: true
        }
    )
    const [options, setOptions] = useState({
        boardSize: 3,
        winCondition: 3,
        mode: '2P',
        AI: 'O',
        winEvenBeBlocked: true
    })
    const [isChanged, setIsChanged] = useState(false)

    const changeGameState = (newState) => {
        let newGameState = checkWinState(newState)
        setGameState({...gameState, ...newGameState})
    }
    const handleAI = () => {
        if (gameState.mode === '2P') return
        if (gameState.state !== 'WAIT-'+gameState.AI) return
        console.log("AI play " + gameState.AI)
        const newBoard = gameState.board.map(row => [...row])
        const remainingSquares = []
        for (let i = 0; i < gameState.boardSize; i++) {
            for (let j = 0; j < gameState.boardSize; j++) {
                if (newBoard[i][j] === '') 
                    remainingSquares.push({r:i, c:j, value:0})
            }
        }
        //Get square with max value
        let maxValue = Math.max(...remainingSquares.map(item => item.value));
        const maxItems = remainingSquares.filter(item => item.value === maxValue);
        const randomIndex = Math.floor(Math.random() * maxItems.length);
        const maxItem = maxItems[randomIndex]
        //AI plays
        newBoard[maxItem.r][maxItem.c] = gameState.AI
        changeGameState(
            {
                board: newBoard, 
                lastMove: {move: gameState.AI, position: {r: maxItem.r, c: maxItem.c}},
                remainingMove: gameState.remainingMove - 1
            })
    } 
    const checkWinState = ({lastMove, board, remainingMove}) => {
        const directory = {
            'horizontal': [0, 1],
            'vertical': [1, 0],
            'topLeft': [1, 1],
            'topRight': [-1, 1]
        }
        const directions = {horizontal: 1, vertical: 1, topLeft: 1, topRight: 1}
        for (let direction of Object.keys(directions)) {
            for (let i = 1; i < gameState.winCondition; i++) {
                let temp = {r: lastMove.position.r + i * directory[direction][0], c: lastMove.position.c + i * directory[direction][1]}
                if (!checkValidSquare(temp)) 
                    break;
                if (board[temp.r][temp.c] !== lastMove.move) 
                    break;
                directions[direction] = directions[direction] + 1
            }
            for (let i = 1; i < gameState.winCondition; i++) {
                let temp = {r: lastMove.position.r - i * directory[direction][0], c: lastMove.position.c - i * directory[direction][1]}
                if (!checkValidSquare(temp)) 
                    break;
                if (board[temp.r][temp.c] !== lastMove.move) 
                    break;
                directions[direction] = directions[direction] + 1
            }
        }
        for (let direction of Object.keys(directions)) {
            //WIN
            if ((directions[direction] > gameState.winCondition)
                || (directions[direction] === gameState.winCondition && gameState.winEvenBeBlocked)) {
                board = highlightWinningSymbol(direction, lastMove, board)
                return (
                    {
                        state: lastMove.move+'-WIN',
                        lastMove: lastMove,
                        board: board,
                        remainingMove: remainingMove
                    }
                )
            }
            //Check if blocked
            if (directions[direction] === gameState.winCondition && !gameState.winEvenBeBlocked) {
                let block = 0
                for (let i = 1; i <= gameState.winCondition; i++) {
                    let temp = {r: lastMove.position.r + i * directory[direction][0], c: lastMove.position.c + i * directory[direction][1]}
                    if (!checkValidSquare(temp)) 
                        break;
                    if (board[temp.r][temp.c] === '')
                        break;
                    if (board[temp.r][temp.c] !== lastMove.move) {
                        block++;
                        break;
                    }
                }
                for (let i = 1; i <= gameState.winCondition; i++) {
                    let temp = {r: lastMove.position.r - i * directory[direction][0], c: lastMove.position.c - i * directory[direction][1]}
                    if (!checkValidSquare(temp)) 
                        break;
                    if (board[temp.r][temp.c] === '')
                        break;
                    if (board[temp.r][temp.c] !== lastMove.move) {
                        block++;
                        break;
                    }
                }
                //WIN
                if (block < 2) {
                    board = highlightWinningSymbol(direction, lastMove, board)
                    return (
                        {
                            state: lastMove.move+'-WIN',
                            lastMove: lastMove,
                            board: board,
                            remainingMove: remainingMove
                        }
                    )
                }
            }
        }
        if (remainingMove === 0)  {
            return (
                {
                    state:'TIE',
                    lastMove: lastMove,
                    board: board,
                    remainingMove: remainingMove
                }
            )
        }
        return (
            {
                state: lastMove.move === 'X' ? 'WAIT-O' : 'WAIT-X',
                lastMove: lastMove,
                board: board,
                remainingMove: remainingMove
            }
        )
    }
    const highlightWinningSymbol = (direction, lastMove, board) => {
        const newBoard = board.map(row => [...row])
        const directory = {
            'horizontal': [0, 1],
            'vertical': [1, 0],
            'topLeft': [1, 1],
            'topRight': [-1, 1]
        }
        newBoard[lastMove.position.r][lastMove.position.c] += '-WIN'
        for (let i = 1; i < gameState.winCondition; i++) {
            let temp = {r: lastMove.position.r + i * directory[direction][0], c: lastMove.position.c + i * directory[direction][1]}
            if (!checkValidSquare(temp)) 
                break;
            if (board[temp.r][temp.c] !== lastMove.move) 
                break;
            newBoard[temp.r][temp.c] += '-WIN'
        }
        for (let i = 1; i < gameState.winCondition; i++) {
            let temp = {r: lastMove.position.r - i * directory[direction][0], c: lastMove.position.c - i * directory[direction][1]}
            if (!checkValidSquare(temp)) 
                break;
            if (board[temp.r][temp.c] !== lastMove.move) 
                break;
            newBoard[temp.r][temp.c] += '-WIN'
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
        setGameState({
            ...gameState,
            state: "WAIT-X",
            board: Array(options.boardSize).fill(Array(options.boardSize).fill('')),
            lastMove: {position:{r:0, c:0}, move:''},
            remainingMove: options.boardSize*options.boardSize,
            ...options
        })
    }
    useEffect(()=>{
        let temp = false
        for (let field of Object.keys(options)) {
            if (options[field] !== gameState[field]) {
                temp = true
                console.log(options[field] +" "+ gameState[field])
                break;
            }
        }
        setIsChanged(temp)
    },[options, gameState.AI, gameState.mode, gameState.winCondition, gameState.winEvenBeBlocked, gameState.boardSize])
    useEffect(()=>{
        handleAI()
    },[gameState])
    return (
        <GameContext.Provider value={{gameState, changeGameState}}>
            <div className="bg-dark-400 p-2 m-2 rounded-xl flex flex-col md:flex-row justify-center gap-5">
                <div className=" flex flex-col gap-y-2 items-start md:items-center overflow-scroll md:overflow-clip">
                    <div className="flex w-max">
                        <Board></Board>
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
                    {options.mode !== '2P' && <div>
                        <p className="text-2xl">Your symbol</p>
                        <div className="flex gap-2">
                            <button className={`${options.AI === 'O' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, AI: 'O'})}>
                                X
                            </button>
                            <button className={`${options.AI === 'X' ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, AI: 'X'})}>
                                O
                            </button>
                        </div>
                    </div>}
                    <div>
                        <p className="text-2xl">Grid's size</p> 
                        <select className="p-2 rounded-xl bg-dark-400 text-xl" defaultValue={gameState.boardSize}
                            onChange={(e) => {setOptions({...options, boardSize: parseInt(e.target.value)})}}>
                            <option value={3}>3x3</option>
                            <option value={4}>4x4</option>
                            <option value={5}>5x5</option>
                            <option value={6}>6x6</option>
                            <option value={7}>7x7</option>
                            <option value={8}>8x8</option>
                            <option value={9}>9x9</option>
                            <option value={10}>10x10</option>
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
                    <div>
                        <p className="text-2xl">Still win when be blocked both sides of the sequence of symbols</p>
                        <div className="flex gap-2">
                            <button className={`${options.winEvenBeBlocked ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, winEvenBeBlocked: true})}>
                                YES
                            </button>
                            <button className={`${!options.winEvenBeBlocked ? 'bg-dark-400 text-white' : 'bg-white text-dark-500'}  
                                p-2 rounded-xl hover:scale-110 duration-200`}
                                onClick={() => setOptions({...options, winEvenBeBlocked: false})}>
                                NO
                            </button>
                        </div>
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