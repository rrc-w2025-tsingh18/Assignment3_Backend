import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { validate } from "../middleware/validationMiddleware";
import { createEventSchema } from "../validation/eventValidation";

const router = Router();

router.post("/", validate(createEventSchema), eventController.createEvent);

export default router;