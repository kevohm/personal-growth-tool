"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function signAccessToken(userId) {
    console.log(config_1.ACCESS_SECRET);
    return jsonwebtoken_1.default.sign({ id: userId }, config_1.ACCESS_SECRET, { expiresIn: "3h" });
}
function signRefreshToken(userId) {
    console.log(config_1.REFRESH_SECRET);
    return jsonwebtoken_1.default.sign({ id: userId }, config_1.REFRESH_SECRET, { expiresIn: "6h" });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.ACCESS_SECRET);
}
