import Joi, { ObjectSchema } from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *           example: Tech Conference
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2027-12-25T09:00:00.000Z
 *         capacity:
 *           type: integer
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           example: 0
 *         status:
 *           type: string
 *           example: active
 *         category:
 *           type: string
 *           example: conference
 */

export const createEventSchema: ObjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  date: Joi.date().iso().greater("now").required(),
  capacity: Joi.number().integer().min(5).required(),

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("capacity"))
    .default(0),

  status: Joi.string()
    .valid("active", "cancelled", "completed")
    .default("active"),

  category: Joi.string()
    .valid("conference", "workshop", "meetup", "seminar", "general")
    .default("general"),
});