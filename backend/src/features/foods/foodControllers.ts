import FoodServices from "./foodServices";
import { Request, Response } from "express";
import { Food, newFood } from "./types";
import { STATUS_CODES } from "../../utils/statusCodes";

class FoodController {

    static async getAllFoods(req: Request, res: Response): Promise<void> {
        try {
            const foods = await FoodServices.getAll();
            res.status(STATUS_CODES.OK).json(foods);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving foods" });
        }
    }

    static async getFoodById(req: Request, res: Response): Promise<void> {
        const foodId = parseInt(req.params.id);
        try {
            const food = await FoodServices.getById(foodId);
            if (food) {
                res.status(STATUS_CODES.OK).json(food);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Food not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving food" });
        }
    }

    static async getFoodByCategory(req: Request, res: Response): Promise<void> {
        const category = req.params.category;
        try {
            const foods = await FoodServices.getByCategory(category);
            res.status(STATUS_CODES.OK).json(foods);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving foods" });
        }
    }

    static async createFood(req: Request, res: Response): Promise<void> {
        const newFood: newFood = req.body;
        try {
            const food = await FoodServices.create(newFood);
            res.status(STATUS_CODES.CREATED).json(food);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error creating food" });
        }
    }

    static async updateFood(req: Request, res: Response): Promise<void> {
        const foodId = parseInt(req.params.id);
        const updatedFood: Food = req.body;
        try {
            const food = await FoodServices.update(foodId, updatedFood);
            if (food) {
                res.status(STATUS_CODES.OK).json(food);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Food not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error updating food" });
        }
    }   

    static async deleteFood(req: Request, res: Response): Promise<void> {
        const foodId = parseInt(req.params.id);
        try {
            const deleted = await FoodServices.delete(foodId);
            if (deleted) {
                res.status(STATUS_CODES.OK).json({ message: "Food deleted successfully" });
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Food not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error deleting food" });
        }
    }
}

export default FoodController;