import React, { useEffect, useState } from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill';
import QuillCursors from 'quill-cursors';


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
  

   Quill.register('modules/cursors', QuillCursors);

 

function TextEditor({ socket, roomId, onCodeChange }) {
 
  const [quill, setQuill] = useState();

  useEffect(() => {     
    
    const quillServer = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions,
            cursors: true,

        }
    })

   
    setQuill(quillServer);
}, [])
  

  const handleTextChange = (delta, oldDelta, source) =>{
    if(source !== 'user') return;
      // sending data(changes) to server
      socket && socket.emit('send-changes', {
        roomId,
        delta
      });
  }

  useEffect(() => {
    if(socket == null || quill == null) return;

      quill && quill.on('text-change', handleTextChange);

      return () => {
        quill && quill.off('text-change', handleTextChange);
      }

    }, [quill, socket])


    useEffect(() => {
      if(socket == null || quill == null) return;

      const handleChange = ({delta}) => {
       
       quill && quill.updateContents(delta);
      }

        socket && socket.on('receive-changes', handleChange);

        return () => {
          socket && socket.off('receive-changes', handleChange);
        }

      }, [quill, socket])


   
  return (
   
        <div id='editor' className=' text-editor w-[50%] flex mt-4  m-auto bg-white  shadow-lg cursor-text  '></div>
  
  )
}

export default TextEditor
