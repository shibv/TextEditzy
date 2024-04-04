import Connection from "./database/db.js";
import express from "express";
import { Server } from "socket.io";
import getDoc from './routes/getDoc.js'
import cors from 'cors';
import {
    getDocument,
    updateDocument,
  } from "./controller/documentController.js";

const PORT = 5000

Connection();

const app = express();
app.use(express.json());
app.use(cors());


app.listen(3000, () =>{
    console.log('Example app listening on port 3000!!')
})

// socket io
const io = new Server(PORT , {
    cors :{
        origin : "http://localhost:5173",
        methods : ["GET","POST"]
    }
});

app.use("/api", getDoc);


const userSocketMap = {};

const getAllConntectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        const name = userSocketMap[socketId];
        io.to(socketId).emit("user-connected", name);

        return {
            socketId,
            name
        }
    })
}


io.on("connection", (socket) => {
    
    socket.on("join", async({Id, name}) => {
       
        
        userSocketMap[socket.id] = name; 
        socket.join(Id);   
        var doc = await getDocument(Id);
        const clients =  getAllConntectedClients ( Id );
       
        clients.forEach(({socketId}) => {
            io.to(socketId).emit("joined", {
                clients,
                name,
                socketId : socket.id ,
                
            });
        })
        clients.forEach(({socketId}) => {
            io.to(socketId).emit("load-document", {
                doc
                
            });
        })
    })
    
  

    socket.on("send-changes", ({roomId, delta}) => {
        // console.log("send-changes", roomId, delta);
        socket.to(roomId).emit("receive-changes", {delta})
        //io.to(roomId).emit("receive-changes", {delta})
    })

    socket.on("save-document", async (data, roomId) => {
    const ID = data.roomId;
    await updateDocument(ID, data);
  });

    socket.on("disconnecting", ({Id, name, message}) => {
        const rooms = Array.from(socket.rooms);
        rooms.forEach((roomId) => {
            socket.in(roomId).emit("disconnected", {
                socketId : socket.id,
                name : userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id] ;
        socket.leave();
    })
})
