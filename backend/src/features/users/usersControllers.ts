import UserService from "./usersServices";
import { Request, Response } from "express";

class UserController{

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving users" });
        }
    }

    /* static async getUserById(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const user = await userServices.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error retrieving user" });
        }
    } */

}

export default UserController;