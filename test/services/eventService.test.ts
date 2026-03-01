import * as repository from "../../src/api/v1/repositories/eventRepository";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService
} from "../../src/api/v1/services/eventService";

jest.mock("../../src/api/v1/repositories/eventRepository");

describe("Event Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create event", async () => {
    (repository.createEventRepo as jest.Mock).mockResolvedValue({ id: "evt_00001" });

    const result = await createEventService({
      name: "Tech Event",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 100
    });

    expect(result).toBeDefined();
  });

  it("should get all events", async () => {
    (repository.getAllEventsRepo as jest.Mock).mockResolvedValue([]);

    const result = await getAllEventsService();

    expect(result).toEqual([]);
  });

  it("should get event by id", async () => {
    (repository.getEventByIdRepo as jest.Mock).mockResolvedValue({ id: "evt_00001" });

    const result = await getEventByIdService("evt_00001");

    expect(result).toBeDefined();
  });

  it("should update event", async () => {
    (repository.updateEventRepo as jest.Mock).mockResolvedValue({ id: "evt_00001" });

    const result = await updateEventService("evt_00001", { name: "Updated" });

    expect(result).toBeDefined();
  });

  it("should delete event", async () => {
    (repository.deleteEventRepo as jest.Mock).mockResolvedValue(true);

    const result = await deleteEventService("evt_00001");

    expect(result).toBe(true);
  });

});