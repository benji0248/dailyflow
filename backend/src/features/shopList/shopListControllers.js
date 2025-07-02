"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodes_1 = require("../../utils/statusCodes");
const shopListServices_1 = __importDefault(require("./shopListServices"));
class ShopListControllers {
    static async getAllShopLists(req, res) {
        try {
            const shopLists = await shopListServices_1.default.getAllShopLists();
            res.status(statusCodes_1.STATUS_CODES.OK).json(shopLists);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving shop lists", error });
        }
    }
    static async getShopListById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const shopList = await shopListServices_1.default.getShopListById(id);
            if (shopList) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(shopList);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Shop list not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving shop list", error });
        }
    }
    static async getShopListByDate(req, res) {
        const date = req.params.date;
        try {
            const shopLists = await shopListServices_1.default.getShopListByDate(date);
            res.status(statusCodes_1.STATUS_CODES.OK).json(shopLists);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving shop lists by date", error });
        }
    }
    static async createShopList(req, res) {
        const newShopList = req.body;
        try {
            const createdShopList = await shopListServices_1.default.createShopList(newShopList);
            res.status(statusCodes_1.STATUS_CODES.CREATED).json(createdShopList);
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error creating shop list", error });
        }
    }
    static async updateShopList(req, res) {
        const id = parseInt(req.params.id);
        const updatedShopList = req.body;
        try {
            const result = await shopListServices_1.default.updateShopList(id, updatedShopList);
            if (result) {
                res.status(statusCodes_1.STATUS_CODES.OK).json(result);
            }
            else {
                res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ message: "Shop list not found" });
            }
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error updating shop list", error });
        }
    }
    static async deleteShopList(req, res) {
        const id = parseInt(req.params.id);
        try {
            await shopListServices_1.default.deleteShopList(id);
            res.status(statusCodes_1.STATUS_CODES.NO_CONTENT).send();
        }
        catch (error) {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error deleting shop list", error });
        }
    }
}
exports.default = ShopListControllers;
