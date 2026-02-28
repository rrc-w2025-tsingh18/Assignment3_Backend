export type EventStatus = "active" | "cancelled" | "completed";

export type EventCategory =
    | "conference"
    | "workshop"
    | "meetup"
    | "seminar"
    | "general";

export interface EventModel {
    id: string;
    name: string;
    date: string;
    capacity: number;
    registrationCount: number;
    status: EventStatus;
    category: EventCategory;
    createdAt: string;
    updatedAt: string;
}