import FoodController from "./foodControllers";
import { Router } from "express";

const foodRouter = Router();


foodRouter.get("/", FoodController.getAllFoods);
foodRouter.get("/category/:category", FoodController.getFoodByCategory);
foodRouter.get("/:id", FoodController.getFoodById);
foodRouter.post("/", FoodController.createFood);
foodRouter.put("/:id", FoodController.updateFood);
foodRouter.delete("/:id", FoodController.deleteFood);

export default foodRouter;