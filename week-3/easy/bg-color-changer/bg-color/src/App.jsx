import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('bg-gray-500')

  return (
    <>
      <div className={`${color} w-full h-screen duration-200 flex justify-center items-end`}>
        <div className='flex flex-wrap justify-center items-center gap-5 bg-white rounded-2xl shadow-lg p-6 max-w-3xl m-2'>
          <button
            className='bg-red-400 text-white font-semibold rounded-xl px-6 py-3'
            onClick={() => setColor('bg-red-400')}
          >
            Red
          </button>
          <button
            className='bg-blue-400 text-white font-semibold rounded-xl px-6 py-3'
            onClick={() => setColor('bg-blue-400')}
          >
            Blue
          </button>
          <button
            className='bg-green-500 text-white font-semibold rounded-xl px-6 py-3'
            onClick={() => setColor('bg-green-500')}
          >
            Green
          </button>
          <button
            className='bg-yellow-400 text-white font-semibold rounded-xl px-6 py-3'
            onClick={() => setColor('bg-yellow-400')}
          >
            Yellow
          </button>
        </div>
      </div>
    </>
  )
}

export default App
