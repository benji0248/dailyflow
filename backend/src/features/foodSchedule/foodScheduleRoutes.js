"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodScheduleControllers_1 = __importDefault(require("./foodScheduleControllers"));
const express_1 = require("express");
const foodScheduleRouter = (0, express_1.Router)();
foodScheduleRouter.get("/", foodScheduleControllers_1.default.getAllFoodSchedules);
foodScheduleRouter.get("/:id", foodScheduleControllers_1.default.getFoodScheduleById);
foodScheduleRouter.get("/date/:date", foodScheduleControllers_1.default.getFoodScheduleByDate);
foodScheduleRouter.get("/category/:category", foodScheduleControllers_1.default.getFoodScheduleByCategory);
foodScheduleRouter.post("/", foodScheduleControllers_1.default.createFoodSchedule);
foodScheduleRouter.put("/:id", foodScheduleControllers_1.default.updateFoodSchedule);
foodScheduleRouter.delete("/:id", foodScheduleControllers_1.default.deleteFoodSchedule);
exports.default = foodScheduleRouter;
