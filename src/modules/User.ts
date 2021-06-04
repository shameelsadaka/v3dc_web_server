import { Socket } from "socket.io"

export type MovementType = {
    forward: boolean,
    backward: boolean,
    left: boolean,
    right: boolean,
}
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
    movement : MovementType
}
export class User{
    socket:Socket

    isInitialized:boolean = false
    uuid?:string
    username?:string
    color?:string
    
    position: Coordinates = {x:0,y:0,z:0};
    movement:MovementType = {
		forward: false,
		backward: false,
		left: false,
		right: false,
	}
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
            movement : this.movement
        }
    }
       
}
