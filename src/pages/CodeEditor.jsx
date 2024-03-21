import React, {  useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.svg'
import avatar from '../assets/avatar.svg'
import { initSocket } from '../socket';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'
import Editor from '../components/Editor';
import TextEditor from '../components/TextEditor';

function CodeEditor() {

    const socketRef = useRef(null);
    const location = useLocation();
    const { Id } = useParams();
    
    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
           socketRef.current.emit("join", {
            Id, 
            name: location.state.name
           })
           // Listening for JOIN events 
           socketRef.current.on("joined", ({clients, name, socketId}) => {
           
              if(name !== location.state.name) {
               toast.success(`${name} joined the room`)
              
             
              }
              setClients(clients);  
           })
            // Listening for DISCONNECT events
            
            socketRef.current.on("disconnected", ({socketId, name}) => {
                setClients((prev) => {
                    return prev.filter((client) => {
                        return client.socketId !== socketId
                    })
                })
                toast.success(`${name} left the room`)
            })
        }
        init();


        return () => {
            socketRef.current.disconnect();
            socketRef.current.off("joined");
            socketRef.current.off("disconnected");
        }
    }, [])



        const [clients, setClients] = useState([
          
        ])

  return (
    <div className='grid grid-cols-6 h-[100vh]'>
        <div className='col-span-1 flex flex-col items-center border-r-[1px] bg-[#f5f5f5] border-slate-300'>
            <div className='mt-4 flex gap-2 justify-center items-center'>
                <img src={logo} className='w-10 h-10' alt="" />
                <h1 className='text-2xl font-bold'>CodEditor</h1>
            </div>
            <div className='border-b-[1px] w-full border-slate-300 mt-2'></div>
            <div className='flex flex-col gap-2 mt-4'>
                    {
                        clients.map((client) => {
                            return (
                                <div className='flex gap-2 items-center bg-white px-6 py-2 rounded-lg'>
                                    
                                    <div className='w-10 h-10 rounded-full bg-[#f5f5f5] flex justify-center items-center'>
                                    <img src={avatar} className='w-8 h-8' alt="" />
                                    </div>
                                    <h1 className=' font-semibold'>{client.name}</h1>
                                </div>
                            )
                        })
                    }
            </div>
           <div className='mt-auto flex flex-col gap-2 items-center mb-4'>
                    
                    <button className='px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg ' >Leave</button>
                    <button className='px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg ' >Copy Room Id</button>
            </div> 
        </div>
        <div className='col-span-5 bg-white'>
               
               <TextEditor socketRef={socketRef} roomId={Id} onCodeChange={() => {}} />
        </div>
    </div>
  )
}

export default CodeEditor
