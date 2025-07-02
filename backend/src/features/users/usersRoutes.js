"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersControllers_1 = __importDefault(require("./usersControllers"));
const express_1 = require("express");
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", usersControllers_1.default.getAllUsers);
exports.default = usersRouter;
