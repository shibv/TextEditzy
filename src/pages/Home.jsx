import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {v4 as uuidV4} from 'uuid'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
function Home() {
    const navigate = useNavigate();


    const [roomId , setRoomId] = useState('');
    const [name, setName] = useState('');
    const [password , setPassword] = useState('');
     


    useEffect(() => {
      // Get the current URL
      const url = new URL(window.location.href);
  
      // Get the search parameters from the URL
      const queryParams = new URLSearchParams(url.search);
  
      // Get a specific query parameter
      const paramValue = queryParams.get('roomId');
  
      setRoomId(paramValue);
    }, []);


    const handleCreateId = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Room Created')
    }
   

    const handlejoinRoom = async() => {
      try {
        const response = await axios.post('http://localhost:3000/api/joinRoom', {roomId, password});
        console.log(response.data);
        if(response.data.error) {
          toast.error(response.data.error)
          return
        } 
        navigate(`/codeeditor/${roomId}`, {state: {name}})
        toast.success('Room Joined')
      } catch (error) {
        toast.error(error.response.data.error)
      }
    }
  


  return (
    <>
   
    <div className='flex justify-center items-center h-[100vh] w-full'>
      <div className='w-[35%] h-[50%] rounded-lg flex flex-col gap-2 m-auto items-center bg-white  shadow-lg'>
        
        <div className='flex gap-1 items-center p-4 mt-4 '>

            <h1 className='text-3xl font-semibold'>Join Room</h1>
        </div>
        {/* <p className='text-sm text-gray-600 flex justify-start  ' >Enter Your RoomId & UserName</p> */}
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} className='w-[80%] p-2 bg-[#f5f5f5]  border-none outline-none shadow-md ' type="text" name='roomId' placeholder='Enter Your RoomId' />
        <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 w-[80%] bg-[#f5f5f5] border-none outline-none shadow-md  ' type="text" name="username" placeholder='Enter Your Name' />
        <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 w-[80%] bg-[#f5f5f5] border-none outline-none shadow-md  ' type="password" name="username" placeholder='Enter Your Password' />
        
        <button onClick={ handlejoinRoom} className='px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg '>
           Join Room
        </button>
        <p className=' w-[70%] text-slate-600 text-sm ' >If you don't have invite link then create <a href='' onClick={handleCreateId} className='text-blue-500 underline cursor-pointer'>new room</a></p>
      </div>
    </div>
    </>
  )
}

export default Home
