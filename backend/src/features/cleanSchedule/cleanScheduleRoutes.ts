import CleanScheduleController from "./cleanScheduleControllers";
import { Router } from "express";

const cleanScheduleRouter = Router();

cleanScheduleRouter.get("/", CleanScheduleController.getAllCleanSchedules);
cleanScheduleRouter.get("/:id", CleanScheduleController.getCleanScheduleById);
cleanScheduleRouter.get("/date/:date", CleanScheduleController.getCleanScheduleByDate);
cleanScheduleRouter.post("/", CleanScheduleController.createCleanSchedule);
cleanScheduleRouter.put("/:id", CleanScheduleController.updateCleanSchedule);
cleanScheduleRouter.delete("/:id", CleanScheduleController.deleteCleanSchedule);

export default cleanScheduleRouter;