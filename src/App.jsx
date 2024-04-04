import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CodeEditor from "./pages/CodeEditor";
import { Toaster } from "react-hot-toast";

import Main from "./pages/Main";
import CreateRoom from "./components/CreateRoom";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-center"></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="Create-Room"  element={<CreateRoom/>}/>
          <Route path="/Join-Room" element={<Home />} />
          <Route path="/CodeEditor/:Id" element={<CodeEditor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/*<div class="relative h-full w-full bg-white"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div> */
