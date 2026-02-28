import { EventModel } from "../models/eventModel";
import {
    createEvent,
    deleteEventById,
    getAllEvents,
    getEventById,
    getNextEventId,
    updateEventById,
} from "../repositories/eventRepository";

export interface CreateEventInput {
    name: string;
    date: string;
    capacity: number;
    registrationCount?: number;
    status?: "active" | "cancelled" | "completed";
    category?: "conference" | "workshop" | "meetup" | "seminar" | "general";
}

export interface UpdateEventInput {
    name?: string;
    date?: string;
    capacity?: number;
    registrationCount?: number;
    status?: "active" | "cancelled" | "completed";
    category?: "conference" | "workshop" | "meetup" | "seminar" | "general";
}

export const createEventService = async (input: CreateEventInput): Promise<EventModel> => {
    const id = await getNextEventId();
    const now = new Date().toISOString();

    const event: EventModel = {
        id,
        name: input.name,
        date: input.date,
        capacity: input.capacity,
        registrationCount: input.registrationCount ?? 0,
        status: input.status ?? "active",
        category: input.category ?? "general",
        createdAt: now,
        updatedAt: now,
    };

    return createEvent(event);
};

export const getAllEventsService = async (): Promise<EventModel[]> => {
    return getAllEvents();
};

export const getEventByIdService = async (id: string): Promise<EventModel | null> => {
    return getEventById(id);
};

export const updateEventService = async (
    id: string,
    updates: UpdateEventInput
): Promise<EventModel | null> => {
    const now = new Date().toISOString();
    return updateEventById(id, { ...updates, updatedAt: now });
};

export const deleteEventService = async (id: string): Promise<boolean> => {
    return deleteEventById(id);
};