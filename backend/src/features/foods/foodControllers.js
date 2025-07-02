"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodServices_1 = __importDefault(require("./foodServices"));
const statusCodes_1 = require("../../utils/statusCodes");
class FoodController {
    static async getAllFoods(req, res) {
        try {
            const foods = await foodServices_1.default.getAll();
            res.status(statusCodes_1.STATUS_CODES.OK).json(foods);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving foods" });
        }
    }
    static async getFoodById(req, res) {
        const foodId = parseInt(req.params.id);
        try {
            const food = await foodServices_1.default.getById(foodId);
            if (food) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(food);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Food not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving food" });
        }
    }
    static async getFoodByCategory(req, res) {
        const category = req.params.category;
        try {
            const foods = await foodServices_1.default.getByCategory(category);
            res.status(statusCodes_1.STATUS_CODES.OK).json(foods);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving foods" });
        }
    }
    static async createFood(req, res) {
        const newFood = req.body;
        console.log("Creating new food:", newFood);
        try {
            const food = await foodServices_1.default.create(newFood);
            res.status(statusCodes_1.STATUS_CODES.CREATED).json(food);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error creating food" });
        }
    }
    static async updateFood(req, res) {
        const foodId = parseInt(req.params.id);
        const updatedFood = req.body;
        try {
            const food = await foodServices_1.default.update(foodId, updatedFood);
            if (food) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(food);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Food not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error updating food" });
        }
    }
    static async deleteFood(req, res) {
        const foodId = parseInt(req.params.id);
        try {
            const deleted = await foodServices_1.default.delete(foodId);
            if (deleted) {
                res.status(statusCodes_1.STATUS_CODES.OK).json({ message: "Food deleted successfully" });
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Food not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error deleting food" });
        }
    }
}
exports.default = FoodController;
