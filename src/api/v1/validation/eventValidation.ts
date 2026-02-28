import Joi from "joi";

export const createEventSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.base": "\"name\" must be a string",
      "string.empty": "\"name\" is required",
      "string.min": "\"name\" length must be at least 3 characters long",
      "any.required": "\"name\" is required",
    }),

  date: Joi.date()
    .iso()
    .greater("now")
    .required()
    .messages({
      "date.base": "\"date\" must be a valid date",
      "date.format": "\"date\" must be in ISO format",
      "date.greater": "\"date\" must be greater than \"now\"",
      "any.required": "\"date\" is required",
    }),

  capacity: Joi.number()
    .integer()
    .min(5)
    .required()
    .messages({
      "number.base": "\"capacity\" must be a number",
      "number.integer": "\"capacity\" must be an integer",
      "number.min": "\"capacity\" must be greater than or equal to 5",
      "any.required": "\"capacity\" is required",
    }),

  registrationCount: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("capacity"))
    .default(0)
    .messages({
      "number.base": "\"registrationCount\" must be a number",
      "number.integer": "\"registrationCount\" must be an integer",
      "number.min": "\"registrationCount\" must be greater than or equal to 0",
      "number.max": "\"registrationCount\" must be less than or equal to ref:capacity",
    }),

  status: Joi.string()
    .valid("active", "cancelled", "completed")
    .default("active")
    .messages({
      "any.only": "\"status\" must be one of [active, cancelled, completed]",
    }),

  category: Joi.string()
    .valid("conference", "workshop", "meetup", "seminar", "general")
    .default("general")
    .messages({
      "any.only": "\"category\" must be one of [conference, workshop, meetup, seminar, general]",
    }),
});