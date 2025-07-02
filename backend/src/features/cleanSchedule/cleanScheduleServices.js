"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const odbcConnection_1 = require("../../db/odbcConnection");
class CleanScheduleService {
    static async getAllCleanSchedules() {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = "SELECT * FROM CleanSchedule";
        const result = await connection.query(query);
        return result;
    }
    static async getCleanScheduleById(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM CleanSchedule WHERE id = ${id}`;
        const result = await connection.query(query);
        if (result.length > 0) {
            return result[0];
        }
    }
    static async getCleanScheduleByDate(date) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM CleanSchedule WHERE date = '${date}'`;
        const result = await connection.query(query);
        return result;
    }
    static async createCleanSchedule(cleanSchedule) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `INSERT INTO CleanSchedule (category, date) VALUES (${cleanSchedule.task_id}, ${cleanSchedule.user_id}, '${cleanSchedule.date}')`;
        await connection.query(query);
        return cleanSchedule;
    }
    static async updateCleanSchedule(id, cleanSchedule) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `UPDATE CleanSchedule SET category = ${cleanSchedule.task_id}, ${cleanSchedule.user_id} date = '${cleanSchedule.date}' WHERE id = ${id}`;
        await connection.query(query);
        return cleanSchedule;
    }
    static async deleteCleanSchedule(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `DELETE FROM CleanSchedule WHERE id = ${id}`;
        await connection.query(query);
    }
}
exports.default = CleanScheduleService;
