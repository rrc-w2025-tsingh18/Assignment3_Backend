import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { validate } from "../middleware/validationMiddleware";
import { createEventSchema } from "../validation/eventValidation";

const router: Router = Router();

router.post("/", validate(createEventSchema), eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
export default router;