"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersServices_1 = __importDefault(require("./usersServices"));
class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await usersServices_1.default.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving users" });
        }
    }
}
exports.default = UserController;
