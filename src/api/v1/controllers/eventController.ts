import { Request, Response } from "express";
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
} from "../services/eventService";

export const createEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const event = await createEventService(req.body);
  res.status(201).json({ message: "Event created", data: event });
};

export const getAllEvents = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const events = await getAllEventsService();
  res.status(200).json({
    message: "Events retrieved",
    count: events.length,
    data: events,
  });
};

export const getEventById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const event = await getEventByIdService(req.params.id);

  if (!event) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.status(200).json({ message: "Event retrieved", data: event });
};

export const updateEvent = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const updated = await updateEventService(req.params.id, req.body);

  if (!updated) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.status(200).json({ message: "Event updated", data: updated });
};

export const deleteEvent = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const deleted = await deleteEventService(req.params.id);

  if (!deleted) {
    res.status(404).json({ message: "Event not found" });
    return;
  }

  res.status(200).json({ message: "Event deleted", data: deleted });
};