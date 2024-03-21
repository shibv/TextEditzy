import io from "socket.io-client"

export const initSocket = async () =>{
    return io("http://localhost:5000");
}