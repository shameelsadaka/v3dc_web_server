import { Socket } from "socket.io"

export type Coordinates = {
    x:number,
    y:number,
    z:number
}

export type UserBasicData = {
    socketId: string,
    uuid:string
    username:string
    color:string
    position: Coordinates
    isMovingForward: boolean,
    lookingAt: [number,number,number]
    isSitting: boolean
}
export class User{
    socket:Socket

    isInitialized:boolean = false
    uuid?:string
    username?:string
    color?:string
    lookingAt: [number,number,number] = [0,0,0]
    isSitting: boolean = false
    
    position: Coordinates = {x:0,y:0,z:0};
    isMovingForward:boolean = false
    constructor(socket:Socket){
        this.socket=socket;
    }

    toBasicData():UserBasicData{
        return {
            socketId: this.socket.id,
            uuid:this.uuid as string,
            username: this.username as string,
            color: this.color as string,
            position: this.position,
            isMovingForward : this.isMovingForward,    
            isSitting: this.isSitting,
            lookingAt: this.lookingAt
        }
    }
       
}
