
import './App.css'
import {Game} from './Game'

function App() {
  return (
    <div className='h-full min-h-screen bg-dark-500 text-light-500 font-header'>
      <div className='flex flex-col gap-y-2 items-center p-3'>
        <p className='text-5xl drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]'>TIC TAC TOE</p>
        <p className='text-sm'>by LeNgocHien</p>
      </div>
      <Game/>
    </div>
  )
}

export default App
