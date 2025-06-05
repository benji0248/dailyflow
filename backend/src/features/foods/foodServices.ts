import e from "express";
import { connectToAccess } from "../../db/odbcConnection";
import { Food, newFood } from "./types";

class FoodServices{

    static async getAll(): Promise<Food[]> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM foods`;
        const result = await connection.query(query);
        return result as Food[];
    }

    static async getById(id: number): Promise<Food | null> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM foods WHERE id = ?`;
        const result = await connection.query(query, [id]);
        return result.length > 0 ? (result[0] as Food) : null;
    }

    
    static async getByCategory(category: string): Promise<Food[]> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM foods WHERE category = ?`;
        const result = await connection.query(query, [category]);
        return result as Food[];
    }

    static async create(newFood: newFood): Promise<Food> {
        const connection = await connectToAccess();
        const description = newFood.description ?? "";
        const query = `INSERT INTO foods (name, description, category) VALUES (?, ?, ?)`;
        const result = await connection.query(query, [newFood.name, description, newFood.category]);
        const idResult = await connection.query(`SELECT MAX(id) as id FROM foods`) as { id: number }[];
        const id = idResult[0].id;
        return { ...newFood, id } as Food;
    }
    static async update(id: number, updatedFood: newFood): Promise<Food | null> {
        const connection = await connectToAccess();
        const description = updatedFood.description ?? "";
        const query = `UPDATE foods SET name = ?, description = ?, category = ?, updated_at = now() WHERE id = ?`;
        await connection.query(query, [updatedFood.name, description, updatedFood.category, id]);
        return { ...updatedFood, id } as Food;
    }

    static async delete(id: number): Promise<boolean> {
        const connection = await connectToAccess();
        const query = `DELETE FROM foods WHERE id = ?`;
        const result = await connection.query(query, [id]);
        return result.count > 0;
    }
}

export default FoodServices;