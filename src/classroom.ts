import { Socket } from "socket.io";
import { getRandomColor } from "./helpers";
import { Coordinates, User, UserBasicData } from "./modules/User";


export default class Classroom{
    users: {[socketId:string]:User} = {}


    constructor(){

    }
    addUser(socket:Socket){
        console.log(`New User created connection with id ${socket.id}`)
        this.users[socket.id] = new User(socket);
    }
    handleInit(
            socket:Socket,
            data:{uuid:string, username:string, initialPosition:[number,number,number]},
            onInit: (data:{color: string, otherUsers:UserBasicData[]})=>void
        ){
        const user = this.users[socket.id];
        user.position = {x:data.initialPosition[0],y:data.initialPosition[1],z:data.initialPosition[2]}
        user.uuid = data.uuid;
        user.username = data.username;
        user.color = getRandomColor();
        user.isInitialized = true;
        
        console.log(`New User ${data.username} Joined`)

        onInit({color: user.color , otherUsers: Object.values(this.users).filter(u=>u.socket.id != socket.id).map(u=>u.toBasicData())});

        socket.broadcast.emit('new-user', user.toBasicData())
    }
    handleMovement(socket:Socket,isMovingForward:boolean,position:Coordinates){
        this.users[socket.id].isMovingForward = isMovingForward;
        this.users[socket.id].position = position;
        
        socket.broadcast.emit('movement', this.users[socket.id].uuid, isMovingForward);
    }
    handleRotation(socket:Socket, lookingAt:[number,number,number]){
        this.users[socket.id].lookingAt = lookingAt;
        socket.broadcast.emit('lookingAt', this.users[socket.id].uuid, lookingAt);
    }
    handleIsSitting(socket:Socket, isSitting: boolean){
        this.users[socket.id].isSitting = isSitting;
        socket.broadcast.emit('isSitting', this.users[socket.id].uuid, isSitting);        
    }

    handleDisconnect(socket:Socket){
        console.log(`User ${this.users[socket.id].username} with socket id ${socket.id} exited`)
        socket.broadcast.emit('user-exit', this.users[socket.id].uuid);
        delete this.users[socket.id];
    }
}