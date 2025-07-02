"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanScheduleServices_1 = __importDefault(require("./cleanScheduleServices"));
const statusCodes_1 = require("../../utils/statusCodes");
class CleanScheduleController {
    static async getAllCleanSchedules(req, res) {
        try {
            const cleanSchedules = await cleanScheduleServices_1.default.getAllCleanSchedules();
            res.status(statusCodes_1.STATUS_CODES.OK).json(cleanSchedules);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch clean schedules" });
        }
    }
    static async getCleanScheduleById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const cleanSchedule = await cleanScheduleServices_1.default.getCleanScheduleById(id);
            if (cleanSchedule) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(cleanSchedule);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ error: "Clean schedule not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch clean schedule" });
        }
    }
    static async getCleanScheduleByDate(req, res) {
        const date = req.params.date;
        try {
            const cleanSchedules = await cleanScheduleServices_1.default.getCleanScheduleByDate(date);
            res.status(statusCodes_1.STATUS_CODES.OK).json(cleanSchedules);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch clean schedules" });
        }
    }
    static async createCleanSchedule(req, res) {
        const newCleanSchedule = req.body;
        try {
            const createdCleanSchedule = await cleanScheduleServices_1.default.createCleanSchedule(newCleanSchedule);
            res.status(statusCodes_1.STATUS_CODES.CREATED).json(createdCleanSchedule);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to create clean schedule" });
        }
    }
    static async updateCleanSchedule(req, res) {
        const id = parseInt(req.params.id);
        const updatedCleanSchedule = req.body;
        try {
            const cleanSchedule = await cleanScheduleServices_1.default.updateCleanSchedule(id, updatedCleanSchedule);
            if (cleanSchedule) {
                res.json(cleanSchedule);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ error: "Clean schedule not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to update clean schedule" });
        }
    }
    static async deleteCleanSchedule(req, res) {
        const id = parseInt(req.params.id);
        try {
            await cleanScheduleServices_1.default.deleteCleanSchedule(id);
            res.status(statusCodes_1.STATUS_CODES.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete clean schedule" });
        }
    }
}
exports.default = CleanScheduleController;
