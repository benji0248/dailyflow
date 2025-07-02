"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const odbcConnection_1 = require("../../db/odbcConnection");
class FoodScheduleService {
    static async getAllFoodSchedules() {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = "SELECT * FROM FoodSchedule";
        const result = await connection.query(query);
        return result;
    }
    static async getFoodScheduleById(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM FoodSchedule WHERE id = ${id}`;
        const result = await connection.query(query);
        if (result.length > 0) {
            return result[0];
        }
    }
    static async getFoodScheduleByDate(date) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM FoodSchedule WHERE date = '${date}'`;
        const result = await connection.query(query);
        return result;
    }
    static async getFoodScheduleByCategory(category) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM FoodSchedule WHERE category = '${category}'`;
        const result = await connection.query(query);
        return result;
    }
    static async createFoodSchedule(foodSchedule) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `INSERT INTO FoodSchedule (food_id, category, date) VALUES ('${foodSchedule.category}', '${foodSchedule.date}')`;
        await connection.query(query);
        return foodSchedule;
    }
    static async updateFoodSchedule(id, foodSchedule) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `UPDATE FoodSchedule SET food_id = ${foodSchedule.food_id}, category = '${foodSchedule.category}', date = '${foodSchedule.date}' WHERE id = ${id}`;
        await connection.query(query);
        return foodSchedule;
    }
    static async deleteFoodSchedule(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `DELETE FROM FoodSchedule WHERE id = ${id}`;
        await connection.query(query);
    }
}
exports.default = FoodScheduleService;
