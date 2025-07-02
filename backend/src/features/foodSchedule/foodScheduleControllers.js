"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodScheduleServices_1 = __importDefault(require("./foodScheduleServices"));
const statusCodes_1 = require("../../utils/statusCodes");
class FoodScheduleControllers {
    static async getAllFoodSchedules(req, res) {
        try {
            const foodSchedules = await foodScheduleServices_1.default.getAllFoodSchedules();
            res.status(statusCodes_1.STATUS_CODES.OK).json(foodSchedules);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedules", error });
        }
    }
    static async getFoodScheduleById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const foodSchedule = await foodScheduleServices_1.default.getFoodScheduleById(id);
            if (foodSchedule) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(foodSchedule);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Food schedule not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedule", error });
        }
    }
    static async getFoodScheduleByDate(req, res) {
        const date = req.params.date;
        try {
            const foodSchedules = await foodScheduleServices_1.default.getFoodScheduleByDate(date);
            res.status(statusCodes_1.STATUS_CODES.OK).json(foodSchedules);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedules", error });
        }
    }
    static async getFoodScheduleByCategory(req, res) {
        const category = req.params.category;
        try {
            const foodSchedules = await foodScheduleServices_1.default.getFoodScheduleByCategory(category);
            res.status(statusCodes_1.STATUS_CODES.OK).json(foodSchedules);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving food schedules", error });
        }
    }
    static async createFoodSchedule(req, res) {
        const foodSchedule = req.body;
        try {
            const createdFoodSchedule = await foodScheduleServices_1.default.createFoodSchedule(foodSchedule);
            res.status(statusCodes_1.STATUS_CODES.CREATED).json(createdFoodSchedule);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error creating food schedule", error });
        }
    }
    static async updateFoodSchedule(req, res) {
        const id = parseInt(req.params.id);
        const foodSchedule = req.body;
        try {
            const updatedFoodSchedule = await foodScheduleServices_1.default.updateFoodSchedule(id, foodSchedule);
            if (updatedFoodSchedule) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(updatedFoodSchedule);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Food schedule not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error updating food schedule", error });
        }
    }
    static async deleteFoodSchedule(req, res) {
        const id = parseInt(req.params.id);
        try {
            await foodScheduleServices_1.default.deleteFoodSchedule(id);
            res.status(statusCodes_1.STATUS_CODES.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error deleting food schedule", error });
        }
    }
}
exports.default = FoodScheduleControllers;
