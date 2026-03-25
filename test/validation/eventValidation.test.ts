import { createEventSchema } from "../../src/api/v1/validation/eventValidation";

describe("Event Validation Schema", () => {

  it("should fail when name is missing", () => {
    const { error } = createEventSchema.validate({
      date: "2027-12-25T09:00:00.000Z",
      capacity: 100
    });

    expect(error).toBeDefined();
  });

  it("should fail when name is too short", () => {
    const { error } = createEventSchema.validate({
      name: "ab",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 100 
    });

    expect(error).toBeDefined();
  });

  it("should fail when capacity is less than 5", () => {
    const { error } = createEventSchema.validate({
      name: "Tech Event",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 2
    });

    expect(error).toBeDefined();
  });

  it("should fail when status is invalid", () => {
    const { error } = createEventSchema.validate({
      name: "Tech Event",
      date: "2027-12-25T09:00:00.000Z",
      capacity: 100,
      status: "pending"
    });

    expect(error).toBeDefined();
  });

});