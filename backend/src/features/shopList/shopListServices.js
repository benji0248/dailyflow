"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const odbcConnection_1 = require("../../db/odbcConnection");
class ShopListServices {
    static async getAllShopLists() {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = "SELECT * FROM ShopList";
        const result = await connection.query(query);
        return result;
    }
    static async getShopListById(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM ShopList WHERE id = ${id}`;
        const result = await connection.query(query);
        if (result.length > 0) {
            return result[0];
        }
    }
    static async getShopListByDate(date) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `SELECT * FROM ShopList WHERE date = '${date}'`;
        const result = await connection.query(query);
        return result;
    }
    static async createShopList(shopList) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `INSERT INTO ShopList (name, description, priority, user_id, food_id, asociate_to, date) VALUES ('${shopList.name}', '${shopList.description}', ${shopList.priority}, ${shopList.user_id}, ${shopList.food_id}, '${shopList.asociate_to}', '${shopList.date}')`;
        await connection.query(query);
        return shopList;
    }
    static async updateShopList(id, shopList) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `UPDATE ShopList SET name = '${shopList.name}', description = '${shopList.description}', priority = ${shopList.priority}, user_id = ${shopList.user_id}, food_id = ${shopList.food_id}, asociate_to = '${shopList.asociate_to}', date = '${shopList.date}' WHERE id = ${id}`;
        await connection.query(query);
        return shopList;
    }
    static async deleteShopList(id) {
        const connection = await (0, odbcConnection_1.connectToAccess)();
        const query = `DELETE FROM ShopList WHERE id = ${id}`;
        await connection.query(query);
    }
}
exports.default = ShopListServices;
