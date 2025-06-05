import FoodScheduleService from "./foodScheduleServices";
import { Request, Response } from "express";
import { FoodSchedule, newFoodSchedule } from "./types";
import { STATUS_CODES } from "../../utils/statusCodes";


class FoodScheduleControllers {

    static async getAllFoodSchedules(req: Request, res: Response): Promise<void>{
        try {
            const foodSchedules: FoodSchedule[] = await FoodScheduleService.getAllFoodSchedules();
            res.status(STATUS_CODES.OK).json(foodSchedules);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedules", error });
        }
    }

    static async getFoodScheduleById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const foodSchedule: FoodSchedule | undefined = await FoodScheduleService.getFoodScheduleById(id);
            if (foodSchedule) {
                res.status(STATUS_CODES.OK).json(foodSchedule);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Food schedule not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedule", error });
        }
    }

    static async getFoodScheduleByDate(req: Request, res: Response): Promise<void> {
        const date = req.params.date;
        try {
            const foodSchedules: FoodSchedule[] = await FoodScheduleService.getFoodScheduleByDate(date);
            res.status(STATUS_CODES.OK).json(foodSchedules);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedules", error });
        }
    }
    
    static async getFoodScheduleByCategory(req: Request, res: Response): Promise<void> {
        const category = req.params.category;
        try {
            const foodSchedules: FoodSchedule[] = await FoodScheduleService.getFoodScheduleByCategory(category);
            res.status(STATUS_CODES.OK).json(foodSchedules);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedules", error });
        }
    }

    static async createFoodSchedule(req: Request, res: Response): Promise<void> {
        const foodSchedule: newFoodSchedule = req.body;
        try {
            const createdFoodSchedule: newFoodSchedule = await FoodScheduleService.createFoodSchedule(foodSchedule);
            res.status(STATUS_CODES.CREATED).json(createdFoodSchedule);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error creating food schedule", error });
        }
    }

    static async updateFoodSchedule(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const foodSchedule: FoodSchedule = req.body;
        try {
            const updatedFoodSchedule: FoodSchedule | null = await FoodScheduleService.updateFoodSchedule(id, foodSchedule);
            if (updatedFoodSchedule) {
                res.status(STATUS_CODES.OK).json(updatedFoodSchedule);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Food schedule not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error updating food schedule", error });
        }
    }   

    static async deleteFoodSchedule(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            await FoodScheduleService.deleteFoodSchedule(id);
            res.status(STATUS_CODES.NO_CONTENT).send();
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error deleting food schedule", error });
        }
    }

}

export default FoodScheduleControllers;