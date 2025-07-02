"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanScheduleControllers_1 = __importDefault(require("./cleanScheduleControllers"));
const express_1 = require("express");
const cleanScheduleRouter = (0, express_1.Router)();
cleanScheduleRouter.get("/", cleanScheduleControllers_1.default.getAllCleanSchedules);
cleanScheduleRouter.get("/:id", cleanScheduleControllers_1.default.getCleanScheduleById);
cleanScheduleRouter.get("/date/:date", cleanScheduleControllers_1.default.getCleanScheduleByDate);
cleanScheduleRouter.post("/", cleanScheduleControllers_1.default.createCleanSchedule);
cleanScheduleRouter.put("/:id", cleanScheduleControllers_1.default.updateCleanSchedule);
cleanScheduleRouter.delete("/:id", cleanScheduleControllers_1.default.deleteCleanSchedule);
exports.default = cleanScheduleRouter;
