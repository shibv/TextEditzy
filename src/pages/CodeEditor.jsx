import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import TextEditor from "../components/TextEditor";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { usePDF } from 'react-to-pdf';


const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

Quill.register("modules/cursors", QuillCursors);

function CodeEditor() {
  const navigate = useNavigate();
  const [sideBar, setSidebar] = useState(false);
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [clients, setClients] = useState([]);
 

  // const socketRef = useRef(null);
  const location = useLocation();
  const { Id } = useParams();
  const { toPDF, targetRef } = usePDF({filename: Id + '.pdf'});

  // Implemented the quill server
  useEffect(() => {
    const quillServer = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
        cursors: true,
      },
    });

    setQuill(quillServer);
  }, []);

  // Make socket connection with server at port 5000
  useEffect(() => {
    const socketServer = io("http://localhost:5000");
    setSocket(socketServer);
    return () => socketServer.disconnect();
  }, []);

  // Listening for JOIN events
  useEffect(() => {
    const init = () => {
      // Joining the room for first time 
      socket &&
        socket.emit("join", {
          Id,
          name: location.state.name,
        });
      // Listening for JOIN events
      socket &&
        socket.on("joined", ({ clients, name, socketId }) => {
          if (name !== location.state.name) {
            toast.success(`${name} joined the room`);
          }
          setClients(clients);
        
        //   const con = doc?.data?.data;
        //  if(doc){
        //   quill && quill.setContents(con);
        //  quill && quill.enable();
        //  }

        socket && socket.once('load-document', ({doc} )=> {
          const con = doc?.data?.data;
           quill && quill.setContents(con);
        
        })




        });
      // Listening for DISCONNECT events

      socket &&
        socket.on("disconnected", ({ socketId, name }) => {
          setClients((prev) => {
            return prev.filter((client) => {
              return client.socketId !== socketId;
            });
          });
          toast.success(`${name} left the room`);
        });
    };
    init();

    return () => {
      socket && socket.disconnect();
      socket && socket.off("joined");
      socket && socket.off("disconnected");
    };
  }, [socket, Id]);

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(Id);
      toast.success("Room Id copied");
    } catch (error) {
      toast.error("Error copying room id");
    }
  };

  return (
    <div className="grid grid-cols-6 h-[100vh]">
      {sideBar ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          sideBar
            ? "fixed top-0 left-0 w-[300px] flex flex-col items-center h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-23%] w-[300px]  h-screen bg-white z-10 duration-300"
        }
      >
        {sideBar ? (
          <IoIosArrowBack
            onClick={() => setSidebar(!sideBar)}
            size={30}
            className="absolute -right-4 bottom-0 top-0 m-auto  cursor-pointer"
          />
        ) : (
          <IoIosArrowForward
            onClick={() => setSidebar(!sideBar)}
            size={30}
            className="absolute -right-4 bottom-0 top-0 m-auto  cursor-pointer"
          />
        )}
        <div className="mt-4 flex gap-2 justify-center items-center">
          <img src={logo} className="w-10 h-10" alt="" />
          <h1 className="text-2xl font-bold">CodEditor</h1>
        </div>
        <div className="border-b-[1px] w-full border-slate-300 mt-[11px]"></div>
        <div className="flex flex-col gap-2 mt-4">
          {clients.map((client) => {
            return (
              <div
                key={client.socketId}
                className="flex gap-2 items-center bg-white px-6 py-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex justify-center items-center">
                  <img src={avatar} className="w-8 h-8" alt="" />
                </div>
                <h1 className=" font-semibold">{client.name}</h1>
              </div>
            );
          })}
        </div>
        
        <div className="mt-auto flex flex-col gap-2 items-center mb-4 border-t-[1px] border-slate-300 ">
        <button
           onClick={() => toPDF()}
            className="px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg "
          >
            Download PDF
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg "
          >
            Leave
          </button>
          <button
            onClick={handleCopyRoomId}
            className="px-10 py-2 bg-slate-400 border-none outline-none shadow-md mt-2  font-semibold hover:bg-[#f5f5f5] rounded-lg "
          >
            Copy Room Id
          </button>
        </div>
      </div>

      <div className={` col-span-6  bg-[#f5f5f5] h-[100vh]  `}>
        <TextEditor
          quill={quill}
          socket={socket}
          roomId={Id}
          onCodeChange={() => {}}
          targetRef = {targetRef}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
