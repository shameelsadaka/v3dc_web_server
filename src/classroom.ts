import { Socket } from "socket.io";
import { Coordinates, MovementType, User, UserBasicData } from "./modules/User";


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
            data:{uuid:string, username:string, color:string},
            onInit: (data:{otherUsers:UserBasicData[]})=>void
        ){
        const user = this.users[socket.id];

        user.uuid = data.uuid;
        user.username = data.username;
        user.color = data.color;
        user.isInitialized = true;
        
        console.log(`New User ${data.username} Joined`)

        onInit({otherUsers: Object.values(this.users).filter(u=>u.socket.id != socket.id).map(u=>u.toBasicData())});

        socket.broadcast.emit('new-user', user.toBasicData())
    }
    handleMovement(socket:Socket,movement:MovementType,position:Coordinates){
        console.log(movement)
        this.users[socket.id].movement = movement;
        this.users[socket.id].position = position;
        
        socket.broadcast.emit('movement', this.users[socket.id].uuid, movement, position);
    }

    handleDisconnect(socket:Socket){
        console.log(`User ${this.users[socket.id].username} with socket id ${socket.id} exited`)
        socket.broadcast.emit('user-exit', this.users[socket.id].uuid);
        delete this.users[socket.id];
    }
}