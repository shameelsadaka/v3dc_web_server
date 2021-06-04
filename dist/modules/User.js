"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(socket) {
        this.isInitialized = false;
        this.position = { x: 0, y: 0, z: 0 };
        this.movement = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };
        this.socket = socket;
    }
    User.prototype.toBasicData = function () {
        return {
            socketId: this.socket.id,
            uuid: this.uuid,
            username: this.username,
            color: this.color,
            position: this.position,
            movement: this.movement
        };
    };
    return User;
}());
exports.User = User;
