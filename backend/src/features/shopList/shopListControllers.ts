import { STATUS_CODES } from "../../utils/statusCodes";
import ShopListServices from "./shopListServices";
import { Request, Response } from "express";

class ShopListControllers{

    static async getAllShopLists(req: Request, res: Response): Promise<void> {
        try {
            const shopLists = await ShopListServices.getAllShopLists();
            res.status(STATUS_CODES.OK).json(shopLists);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving shop lists", error });
        }
    }

    static async getShopListById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            const shopList = await ShopListServices.getShopListById(id);
            if (shopList) {
                res.status(STATUS_CODES.OK).json(shopList);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Shop list not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving shop list", error });
        }
    }

    static async getShopListByDate(req: Request, res: Response): Promise<void> {
        const date = req.params.date;
        try {
            const shopLists = await ShopListServices.getShopListByDate(date);
            res.status(STATUS_CODES.OK).json(shopLists);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error retrieving shop lists by date", error });
        }
    }

    static async createShopList(req: Request, res: Response): Promise<void> {
        const newShopList = req.body;
        try {
            const createdShopList = await ShopListServices.createShopList(newShopList);
            res.status(STATUS_CODES.CREATED).json(createdShopList);
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error creating shop list", error });
        }
    }

    static async updateShopList(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const updatedShopList = req.body;
        try {
            const result = await ShopListServices.updateShopList(id, updatedShopList);
            if (result) {
                res.status(STATUS_CODES.OK).json(result);
            } else {
                res.status(STATUS_CODES.NOT_FOUND).json({ message: "Shop list not found" });
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error updating shop list", error });
        }
    }

    static async deleteShopList(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        try {
            await ShopListServices.deleteShopList(id);
            res.status(STATUS_CODES.NO_CONTENT).send();
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Error deleting shop list", error });
        }
    }
}

export default ShopListControllers;