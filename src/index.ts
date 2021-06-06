import express from "express";
import socketio from "socket.io";
import http from "http";

import Classroom from './classroom';
import { Coordinates } from "./modules/User";


const PORT = process.env.PORT || 80;


const app = express();
app.set("port", PORT);
app.use(express.static('client'))

const server = new http.Server(app);
let io = new socketio.Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


const classroom = new Classroom();


io.on("connection", function(socket) {
    classroom.addUser(socket);
    
    socket.on("init",
        (data:{uuid:string, username:string, initialPosition:[number,number,number]}, onInit:VoidFunction)=>
        classroom.handleInit(socket, data, onInit)
    )
    socket.on("movement",(isMovingForward:boolean,position:Coordinates)=>classroom.handleMovement(socket,isMovingForward,position))
    socket.on("lookingAt",(lookingAt:[number,number,number])=>classroom.handleRotation(socket,lookingAt));
    socket.on("isSitting",(isSitting:boolean)=>classroom.handleIsSitting(socket,isSitting));

    socket.on("disconnect", ()=>classroom.handleDisconnect(socket))
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
  })


server.listen(PORT, () => console.log(`listening on port ${PORT}`));
