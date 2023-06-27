import { Server } from "socket.io"

export default function SocketHandler(req, res) {
    if(res.socket.server.io){
        console.log("Already set up");
        res.end();
        return;
    }
    
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket)=>{
        socket.on("send-message", (obj) => {
            console.log("send message activated!")
            console.log(obj)
            io.emit("receive-message", obj)
            
        })

        socket.on("receive-message", (obj) => {
            console.log("message received:")
            console.log(obj)
        })
        socket.onAny((obj) => {
            console.log("this is any")
            console.log(obj)
        })
    })
    
    console.log("Setting socket")
    res.end();
}