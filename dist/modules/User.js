"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(socket) {
        this.isInitialized = false;
        this.lookingAt = [0, 0, 0];
        this.isSitting = false;
        this.position = { x: 0, y: 0, z: 0 };
        this.isMovingForward = false;
        this.socket = socket;
    }
    User.prototype.toBasicData = function () {
        return {
            socketId: this.socket.id,
            uuid: this.uuid,
            username: this.username,
            color: this.color,
            position: this.position,
            isMovingForward: this.isMovingForward,
            isSitting: this.isSitting,
            lookingAt: this.lookingAt
        };
    };
    return User;
}());
exports.User = User;
