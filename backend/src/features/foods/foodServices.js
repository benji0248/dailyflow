"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const odbcConnection_1 = require("../../db/odbcConnection");
class FoodServices {
    static async getAll() {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM foods`;
        const result = await connection.query(query);
        return result;
    }
    static async getById(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM foods WHERE id = ?`;
        const result = await connection.query(query, [id]);
        return result.length > 0 ? result[0] : null;
    }
    static async getByCategory(category) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM foods WHERE category = ?`;
        const result = await connection.query(query, [category]);
        return result;
    }
    static async create(newFood) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const description = newFood.description ?? "";
        const query = `INSERT INTO foods (name, description, category) VALUES (?, ?, ?)`;
        const result = await connection.query(query, [newFood.name, description, newFood.category]);
        const idResult = await connection.query(`SELECT MAX(id) as id FROM foods`);
        const id = idResult[0].id;
        return { ...newFood, id };
    }
    static async update(id, updatedFood) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const description = updatedFood.description ?? "";
        const query = `UPDATE foods SET name = ?, description = ?, category = ?, updated_at = now() WHERE id = ?`;
        await connection.query(query, [updatedFood.name, description, updatedFood.category, id]);
        return { ...updatedFood, id };
    }
    static async delete(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `DELETE FROM foods WHERE id = ?`;
        const result = await connection.query(query, [id]);
        return result.count > 0;
    }
}
exports.default = FoodServices;
