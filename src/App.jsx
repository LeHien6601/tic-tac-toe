
import './App.css'
import {Game} from './Game'
import facebookIcon from '../public/facebook-icon.webp'

function App() {
  return (
    <div className='h-full w-full min-h-screen bg-dark-500 text-light-500 font-header relative'>
      <div className='flex flex-col gap-y-2 items-center p-3'>
        <p className='text-5xl drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]'>TIC TAC TOE</p>
        <p className='text-sm'>by LeNgocHien</p>
      </div>
      <Game/>
      <div className=' w-full p-2 bottom-0 flex flex-col items-center text-center'>
        <div className='flex'>
          <p>Hope you enjoy the game</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFEB00"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>
        </div>
        <p>This is my first project using AI, if the AI exhibited any unusual or unexpected behavior in any games, please send me the log for those games.</p>
        <p>Thank you for your support.</p>
        <a href='https://www.facebook.com/names.no.35977897' target='_blank'>
          <img src={facebookIcon} className='w-10'></img>
        </a>      
      </div>
    </div>
  )
}

export default App
