"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomColor = exports.colors = void 0;
var colorIndex = 0;
exports.colors = ['#E55137', '#00BB2D', '#DE4C8A', '#0ba3bb', '#afb21e', '#2aa57e', '#1421be', '#ff7905'];
var getRandomColor = function () {
    var color = colorIndex++;
    colorIndex = colorIndex % exports.colors.length;
    return exports.colors[color];
};
exports.getRandomColor = getRandomColor;
