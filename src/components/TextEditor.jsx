import React, { useEffect, useState } from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill';
import {io} from 'socket.io-client'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  
 

function TextEditor({ socketRef, roomId, onCodeChange }) {

  const [socket , setSocket ] = useState();
  const [quill, setQuill] = useState();

    useEffect(() => {       
        const quillServer = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            }
        })
        setQuill(quillServer);
    }, [])

    // useEffect(() => {
    //  const socketServer = io('http://localhost:5000');
    //  setSocket(socketServer);

    //  return () => socketServer.disconnect();
    // }, [])


    const handleTextChange = (delta, oldDelta, source) =>{
      if(source !== 'user') return;
        // sending data(changes) to server
         socketRef.current.emit('send-changes', {
          roomId,
          delta
        }); 
    }

    useEffect(() => {
      if( quill == null) return;

        quill && quill.on('text-change', handleTextChange);

        return () => {
          quill && quill.off('text-change', handleTextChange);
        }

      }, [quill, socket])



      useEffect(() => {
        if(quill == null) return;

        const handleChange = (delta) => {
         quill && quill.updateContents(delta);
        }
  
        socketRef.current.on('receive-changes', handleChange);
  
          return () => {
            socketRef.current.off('receive-changes', handleChange);
          }
  
        }, [quill, socketRef])


   
  return (
    <div className='bg-[#f5f5f5] h-[100vh]  '>
        <div id='editor' className=' text-editor w-[50%] flex mt-4  m-auto bg-white  shadow-lg cursor-text  '></div>
    </div>
  )
}

export default TextEditor
