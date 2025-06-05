import { connectToAccess } from "../../db/odbcConnection";
import { CleanSchedule, newCleanSchedule } from "./types";

class CleanScheduleService {
    
    static async getAllCleanSchedules(): Promise<any[]> {
        const connection = await connectToAccess();
        const query = "SELECT * FROM CleanSchedule";
        const result = await connection.query(query);
        return result;
    }

    static async getCleanScheduleById(id: number): Promise<any | undefined> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM CleanSchedule WHERE id = ${id}`;
        const result = await connection.query(query);
        if (result.length > 0) {
            return result[0];
        }
    }

    static async getCleanScheduleByDate(date: string): Promise<any[]> {
        const connection = await connectToAccess();
        const query = `SELECT * FROM CleanSchedule WHERE date = '${date}'`;
        const result = await connection.query(query);
        return result;
    }

    static async createCleanSchedule(cleanSchedule: newCleanSchedule): Promise<any> {
        const connection = await connectToAccess();
        const query = `INSERT INTO CleanSchedule (category, date) VALUES (${cleanSchedule.task_id}, ${cleanSchedule.user_id}, '${cleanSchedule.date}')`;
        await connection.query(query);
        return cleanSchedule;
    }

    static async updateCleanSchedule(id: number, cleanSchedule: CleanSchedule): Promise<any | null> {
        const connection = await connectToAccess();
        const query = `UPDATE CleanSchedule SET category = ${cleanSchedule.task_id}, ${cleanSchedule.user_id} date = '${cleanSchedule.date}' WHERE id = ${id}`;
        await connection.query(query);
        return cleanSchedule;
    }

    static async deleteCleanSchedule(id: number): Promise<void> {
        const connection = await connectToAccess();
        const query = `DELETE FROM CleanSchedule WHERE id = ${id}`;
        await connection.query(query);
    }
}

export default CleanScheduleService;