import { Router } from "express";
import * as eventController from "../controllers/eventController";
import { validate } from "../middleware/validationMiddleware";
import { createEventSchema } from "../validation/eventValidation";

const router: Router = Router();

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", eventController.getAllEvents);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create an event
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Event created
 */
router.post("/", validate(createEventSchema), eventController.createEvent);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
router.get("/:id", eventController.getEventById);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Event updated
 */
router.put("/:id", eventController.updateEvent);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Delete event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Event deleted
 */
router.delete("/:id", eventController.deleteEvent);

export default router;