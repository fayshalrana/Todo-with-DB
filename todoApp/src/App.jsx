import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Background from './components/Background/Background'
import Foreground from './components/Foreground/Foreground'
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-screen bg-gray-900'>
      <Background/>
      <Foreground/>
      <Toaster position="bottom-right"
  reverseOrder={false}/>
    </div>
  )
}

export default App
