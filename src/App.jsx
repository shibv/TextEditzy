import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CodeEditor from './pages/CodeEditor'
import {Toaster} from 'react-hot-toast'


function App() {


  return (
    <>
      <div>
          <Toaster position='top-center' >

          </Toaster>
      </div>
      <BrowserRouter >
      < Routes>
      <Route path='/' element= {<Home/> } />
      {/* <Route path='/' element= {<Test /> } /> */}
      <Route path='/CodeEditor/:Id' element={<CodeEditor />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
