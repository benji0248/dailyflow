import { connectToAccess } from "../../db/odbcConnection";
import { FoodSchedule, newFoodSchedule } from "./types";

class FoodScheduleService {

   static async getAllFoodSchedules(): Promise<FoodSchedule[]> {
        const connection = await connectToAccess();
        const query = "SELECT * FROM FoodSchedule";
        const result = await connection.query(query);
        return result as FoodSchedule[];
    }

   static async getFoodScheduleById(id: number): Promise<FoodSchedule | undefined> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM FoodSchedule WHERE id = ${id}`;
        const result = await connection.query(query);
        if (result.length > 0) {
            return result[0] as FoodSchedule;
        }
    }

    static async getFoodScheduleByDate(date: string): Promise<FoodSchedule[]> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM FoodSchedule WHERE date = '${date}'`;
        const result = await connection.query(query);
        return result as FoodSchedule[];
    }

    static async getFoodScheduleByCategory(category: string): Promise<FoodSchedule[]> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM FoodSchedule WHERE category = '${category}'`;
        const result = await connection.query(query);
        return result as FoodSchedule[];
    }

   static async createFoodSchedule(foodSchedule: newFoodSchedule): Promise<newFoodSchedule> {
        const connection = await connectToAccess();
        const query = `INSERT INTO FoodSchedule (food_id, category, date) VALUES ('${foodSchedule.category}', '${foodSchedule.date}')`;
        await connection.query(query);
        return foodSchedule;
    }

    static async updateFoodSchedule(id: number, foodSchedule: FoodSchedule): Promise<FoodSchedule | null> {
          const connection = await connectToAccess();
          const query = `UPDATE FoodSchedule SET food_id = ${foodSchedule.food_id}, category = '${foodSchedule.category}', date = '${foodSchedule.date}' WHERE id = ${id}`;
          await connection.query(query);
          return foodSchedule;
     }

    static async deleteFoodSchedule(id: number): Promise<void> {
        const connection = await connectToAccess();
        const query = `DELETE FROM FoodSchedule WHERE id = ${id}`;
        await connection.query(query);
    }
}

export default FoodScheduleService;