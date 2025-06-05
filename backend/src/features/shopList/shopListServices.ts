import { connectToAccess } from "../../db/odbcConnection";
import { ShopList, newShopList } from "./types";

class ShopListServices{

    static async getAllShopLists(): Promise<any[]> {
        const connection = await connectToAccess();
        const query = "SELECT * FROM ShopList";
        const result = await connection.query(query);
        return result;
    }

    static async getShopListById(id: number): Promise<any | undefined> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM ShopList WHERE id = ${id}`;
        const result = await connection.query(query);
        if (result.length > 0) {
            return result[0];
        }
    }

    static async getShopListByDate(date: string): Promise<any[]> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM ShopList WHERE date = '${date}'`;
        const result = await connection.query(query);
        return result;
    }

    static async createShopList(shopList: newShopList): Promise<any> {
        const connection = await connectToAccess();
        const query = `INSERT INTO ShopList (name, description, priority, user_id, food_id, asociate_to, date) VALUES ('${shopList.name}', '${shopList.description}', ${shopList.priority}, ${shopList.user_id}, ${shopList.food_id}, '${shopList.asociate_to}', '${shopList.date}')`;
        await connection.query(query);
        return shopList;
    }

    static async updateShopList(id: number, shopList: ShopList): Promise<any | null> {
        const connection = await connectToAccess();
        const query = `UPDATE ShopList SET name = '${shopList.name}', description = '${shopList.description}', priority = ${shopList.priority}, user_id = ${shopList.user_id}, food_id = ${shopList.food_id}, asociate_to = '${shopList.asociate_to}', date = '${shopList.date}' WHERE id = ${id}`;
        await connection.query(query);
        return shopList;
    }

    static async deleteShopList(id: number): Promise<void> {
        const connection = await connectToAccess();
        const query = `DELETE FROM ShopList WHERE id = ${id}`;
        await connection.query(query);
    }
}

export default ShopListServices;