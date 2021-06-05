import express from "express";
import socketio from "socket.io";
import http from "http";

import Classroom from './classroom';
import { MovementType, Coordinates } from "./modules/User";


const PORT = process.env.PORT || 9987;


const app = express();
app.set("port", PORT);

const server = new http.Server(app);
let io = new socketio.Server(server,{
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


const classroom = new Classroom();


io.on("connection", function(socket) {
    classroom.addUser(socket);
    
    socket.on("init",
        (data:{uuid:string, username:string}, onInit:VoidFunction)=>
        classroom.handleInit(socket, data, onInit)
    )
    socket.on("movement",(movement:MovementType,position:Coordinates)=>classroom.handleMovement(socket,movement,position))
    socket.on("lookingAt",(lookingAt:[number,number,number])=>classroom.handleRotation(socket,lookingAt));

    socket.on("disconnect", ()=>classroom.handleDisconnect(socket))
});

app.get("/", (request,response) => {
    return response.send('Hello');
});


server.listen(PORT, () => console.log(`listening on port ${PORT}`));
