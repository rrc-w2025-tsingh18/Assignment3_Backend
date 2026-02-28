import { db } from "../../../config/firebaseConfig";
import { EventModel } from "../models/eventModel";

const EVENTS_COLLECTION: string = "events";
const COUNTERS_COLLECTION: string = "counters";
const EVENTS_COUNTER_DOC: string = "events";

export const getNextEventId = async (): Promise<string> => {
    const counterRef = db.collection(COUNTERS_COLLECTION).doc(EVENTS_COUNTER_DOC);

    const nextNumber = await db.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(counterRef);

        const currentValue =
            snapshot.exists && snapshot.data() && typeof snapshot.data()?.value === "number"
                ? (snapshot.data()?.value as number)
                : 0;

        const updatedValue = currentValue + 1;

        transaction.set(counterRef, { value: updatedValue }, { merge: true });

        return updatedValue;
    });

    const padded = String(nextNumber).padStart(6, "0");
    return `evt_${padded}`;
};

export const createEvent = async (event: EventModel): Promise<EventModel> => {
    await db.collection(EVENTS_COLLECTION).doc(event.id).set(event);
    return event;
};

export const getAllEvents = async (): Promise<EventModel[]> => {
    const snapshot = await db.collection(EVENTS_COLLECTION).get();
    return snapshot.docs.map((doc) => doc.data() as EventModel);
};

export const getEventById = async (id: string): Promise<EventModel | null> => {
    const docSnap = await db.collection(EVENTS_COLLECTION).doc(id).get();
    if (!docSnap.exists) {
        return null;
    }
    return docSnap.data() as EventModel;
};

export const updateEventById = async (
    id: string,
    updates: Partial<EventModel>
): Promise<EventModel | null> => {
    const ref = db.collection(EVENTS_COLLECTION).doc(id);
    const existing = await ref.get();

    if (!existing.exists) {
        return null;
    }

    await ref.set(updates, { merge: true });

    const updated = await ref.get();
    return updated.data() as EventModel;
};

export const deleteEventById = async (id: string): Promise<boolean> => {
    const ref = db.collection(EVENTS_COLLECTION).doc(id);
    const existing = await ref.get();

    if (!existing.exists) {
        return false;
    }

    await ref.delete();
    return true;
};