import CleanScheduleService from "./cleanScheduleServices";
import {Request, Response} from "express";
import { CleanSchedule, newCleanSchedule } from "./types";
import { STATUS_CODES } from "../../utils/statusCodes";

class CleanScheduleController {
    static async getAllCleanSchedules(req: Request, res: Response): Promise<void> {
        try {
            const cleanSchedules = await CleanScheduleService.getAllCleanSchedules();
            res.status(STATUS_CODES.OK).json(cleanSchedules);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch clean schedules" });
        }
    }

    static async getCleanScheduleById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const cleanSchedule = await CleanScheduleService.getCleanScheduleById(id);
            if (cleanSchedule) {
                res.status(STATUS_CODES.OK).json(cleanSchedule);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ error: "Clean schedule not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch clean schedule" });
        }
    }

    static async getCleanScheduleByDate(req: Request, res: Response): Promise<void> {
        const date = req.params.date;
        try {
            const cleanSchedules = await CleanScheduleService.getCleanScheduleByDate(date);
            res.status(STATUS_CODES.OK).json(cleanSchedules);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch clean schedules" });
        }
    }

    static async createCleanSchedule(req: Request, res: Response): Promise<void> {
        const newCleanSchedule: newCleanSchedule = req.body;
        try {
            const createdCleanSchedule = await CleanScheduleService.createCleanSchedule(newCleanSchedule);
            res.status(STATUS_CODES.CREATED).json(createdCleanSchedule);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to create clean schedule" });
        }
    }

    static async updateCleanSchedule(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const updatedCleanSchedule: CleanSchedule = req.body;
        try {
            const cleanSchedule = await CleanScheduleService.updateCleanSchedule(id, updatedCleanSchedule);
            if (cleanSchedule) {
                res.json(cleanSchedule);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ error: "Clean schedule not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to update clean schedule" });
        }
    }   

    static async deleteCleanSchedule(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            await CleanScheduleService.deleteCleanSchedule(id);
            res.status(STATUS_CODES.NO_CONTENT).send();
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete clean schedule" });
        }
    }
    
}

export default CleanScheduleController;