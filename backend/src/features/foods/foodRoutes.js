"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodControllers_1 = __importDefault(require("./foodControllers"));
const express_1 = require("express");
const foodRouter = (0, express_1.Router)();
foodRouter.get("/", foodControllers_1.default.getAllFoods);
foodRouter.get("/category/:category", foodControllers_1.default.getFoodByCategory);
foodRouter.get("/:id", foodControllers_1.default.getFoodById);
foodRouter.post("/", foodControllers_1.default.createFood);
foodRouter.put("/:id", foodControllers_1.default.updateFood);
foodRouter.delete("/:id", foodControllers_1.default.deleteFood);
exports.default = foodRouter;
