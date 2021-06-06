"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var classroom_1 = __importDefault(require("./classroom"));
var PORT = process.env.PORT || 3500;
var app = express_1.default();
app.set("port", PORT);
app.use(express_1.default.static('client'));
var server = new http_1.default.Server(app);
var io = new socket_io_1.default.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
var classroom = new classroom_1.default();
io.on("connection", function (socket) {
    classroom.addUser(socket);
    socket.on("init", function (data, onInit) {
        return classroom.handleInit(socket, data, onInit);
    });
    socket.on("movement", function (isMovingForward, position) { return classroom.handleMovement(socket, isMovingForward, position); });
    socket.on("lookingAt", function (lookingAt) { return classroom.handleRotation(socket, lookingAt); });
    socket.on("isSitting", function (isSitting) { return classroom.handleIsSitting(socket, isSitting); });
    socket.on("disconnect", function () { return classroom.handleDisconnect(socket); });
});
app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
server.listen(PORT, function () { return console.log("listening on port " + PORT); });
