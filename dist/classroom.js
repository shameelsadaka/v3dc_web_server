"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var User_1 = require("./modules/User");
var Classroom = /** @class */ (function () {
    function Classroom() {
        this.users = {};
    }
    Classroom.prototype.addUser = function (socket) {
        console.log("New User created connection with id " + socket.id);
        this.users[socket.id] = new User_1.User(socket);
    };
    Classroom.prototype.handleInit = function (socket, data, onInit) {
        var user = this.users[socket.id];
        user.uuid = data.uuid;
        user.username = data.username;
        user.color = helpers_1.getRandomColor();
        user.isInitialized = true;
        console.log("New User " + data.username + " Joined");
        onInit({ color: user.color, otherUsers: Object.values(this.users).filter(function (u) { return u.socket.id != socket.id; }).map(function (u) { return u.toBasicData(); }) });
        socket.broadcast.emit('new-user', user.toBasicData());
    };
    Classroom.prototype.handleMovement = function (socket, movement, position) {
        this.users[socket.id].movement = movement;
        this.users[socket.id].position = position;
        socket.broadcast.emit('movement', this.users[socket.id].uuid, movement, position);
    };
    Classroom.prototype.handleRotation = function (socket, lookingAt) {
        this.users[socket.id].lookingAt = lookingAt;
        socket.broadcast.emit('lookingAt', this.users[socket.id].uuid, lookingAt);
    };
    Classroom.prototype.handleDisconnect = function (socket) {
        console.log("User " + this.users[socket.id].username + " with socket id " + socket.id + " exited");
        socket.broadcast.emit('user-exit', this.users[socket.id].uuid);
        delete this.users[socket.id];
    };
    return Classroom;
}());
exports.default = Classroom;
