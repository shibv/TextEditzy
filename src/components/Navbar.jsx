import React from 'react'
import logo from '../assets/logo.svg'
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
  return (
    <div className='fixed z-50  text-black w-full top-0 left-0 px-8 py-4 lg:px-20 xl:px-36'>
    <div className="flex justify-between items-center text-white">
        
        <div className='flex items-center  gap-2 '>
            <p className='text-2xl text-slate-400 font-bold'>Text Editor</p>
            <img src={logo} className="App-logo w-10 " alt="logo" />
        </div>
       
        <a href="/Create-Room" className='hover:scale-105 transition-all duration-500 cursor-pointer' >
        <button onClick={() => navigate(`/Create-Room`)}  className='inline-flex h-12  items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50'>
    Create Room
  </button>
        </a>
    </div>
</div>
  )
}
