"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const odbcConnection_1 = require("../../db/odbcConnection");
class UserService {
    static async getAllUsers() {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM Users`;
        const result = await connection.query(query);
        return result;
    }
}
exports.default = UserService;
