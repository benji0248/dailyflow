import FoodScheduleControllers from "./foodScheduleControllers";
import { Router } from "express";

const foodScheduleRouter = Router();

foodScheduleRouter.get("/", FoodScheduleControllers.getAllFoodSchedules);
foodScheduleRouter.get("/:id", FoodScheduleControllers.getFoodScheduleById);
foodScheduleRouter.get("/date/:date", FoodScheduleControllers.getFoodScheduleByDate);
foodScheduleRouter.get("/category/:category", FoodScheduleControllers.getFoodScheduleByCategory);
foodScheduleRouter.post("/", FoodScheduleControllers.createFoodSchedule);
foodScheduleRouter.put("/:id", FoodScheduleControllers.updateFoodSchedule);
foodScheduleRouter.delete("/:id", FoodScheduleControllers.deleteFoodSchedule);


export default foodScheduleRouter;