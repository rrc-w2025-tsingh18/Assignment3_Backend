import type {
  Transaction,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase-admin/firestore";

import { db } from "../../../../config/firebaseConfig";
import { EventModel } from "../models/eventModel";

const EVENTS_COLLECTION = "events";
const COUNTERS_COLLECTION = "counters";
const EVENTS_COUNTER_DOC = "events";

export const getNextEventId = async (): Promise<string> => {
  const counterRef = db.collection(COUNTERS_COLLECTION).doc(EVENTS_COUNTER_DOC);

  const nextNumber = await db.runTransaction(
    async (transaction: Transaction): Promise<number> => {
      const snapshot = await transaction.get(counterRef);

      const data = snapshot.data() as { value?: number } | undefined;
      const currentValue = typeof data?.value === "number" ? data.value : 0;

      const updatedValue = currentValue + 1;

      transaction.set(counterRef, { value: updatedValue }, { merge: true });

      return updatedValue;
    }
  );

  const padded = String(nextNumber).padStart(5, "0");
  return `evt_${padded}`;
};

export const createEventRepo = async (event: EventModel): Promise<EventModel> => {
  await db.collection(EVENTS_COLLECTION).doc(event.id).set(event);
  return event;
};

export const getAllEventsRepo = async (): Promise<EventModel[]> => {
  const snapshot = await db.collection(EVENTS_COLLECTION).get();

  const events: EventModel[] = [];

  snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    events.push(doc.data() as EventModel);
  });

  return events;
};

export const getEventByIdRepo = async (id: string): Promise<EventModel | null> => {
  const snap = await db.collection(EVENTS_COLLECTION).doc(id).get();

  if (!snap.exists) return null;

  return snap.data() as EventModel;
};

export const updateEventRepo = async (
  id: string,
  updates: Partial<EventModel>
): Promise<EventModel | null> => {
  const ref = db.collection(EVENTS_COLLECTION).doc(id);
  const existing = await ref.get();

  if (!existing.exists) return null;

  await ref.set(updates, { merge: true });

  const updated = await ref.get();
  return updated.data() as EventModel;
};

export const deleteEventRepo = async (id: string): Promise<boolean> => {
  const ref = db.collection(EVENTS_COLLECTION).doc(id);
  const existing = await ref.get();

  if (!existing.exists) return false;

  await ref.delete();
  return true;
};