import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import {v4 as uuidV4} from 'uuid'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
function Home() {
    const navigate = useNavigate();

    const [roomId , setRoomId] = useState('');
    const [name, setName] = useState('');

    const handleCreateId = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Room Created')
    }
    const handleJoinRoom = () => {
        
        if(!roomId || !name) {
            toast.error('All fields are required')
            return
        }
        if(roomId.trim() === '' || name.trim() === '') {
            toast.error('All fields are required')
            return
        }
        navigate(`/codeeditor/${roomId}`, {state: {name}})
        toast.success('Room Joined')
    }
  return (
    <div className='flex justify-center items-center h-[100vh] w-full'>
      <div className='w-[35%] h-[50%] flex flex-col gap-2 m-auto items-center bg-white  shadow-lg'>
        
        <div className='flex gap-1 items-center p-4 mt-4 '>
            <img src={logo} className='h-10 w-10' alt="" />
            <h1 className='text-3xl font-semibold'>CodEditor</h1>
        </div>
        {/* <p className='text-sm text-gray-600 flex justify-start  ' >Enter Your RoomId & UserName</p> */}
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} className='w-[80%] p-2 bg-[#f5f5f5]  border-none outline-none shadow-md ' type="text" name='roomId' placeholder='Enter Your RoomId' />
        <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 w-[80%] bg-[#f5f5f5] border-none outline-none shadow-md  ' type="text" name="username" placeholder='Enter Your Name' />
        <button onClick={handleJoinRoom} className='px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg '>
          Join
        </button>
        <p className=' w-[70%] text-slate-600 text-sm ' >If you don't have invite link then create <a href='' onClick={handleCreateId} className='text-blue-500 underline cursor-pointer'>new room</a></p>
      </div>
    </div>
  )
}

export default Home
