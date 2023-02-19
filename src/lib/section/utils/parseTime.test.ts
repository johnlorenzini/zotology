import { parseTime } from "./parseTime";

describe("Time", () => {
  it("returns one day", () => {
    const parsedTime = parseTime("M 5:00-5:50p");

    expect(parsedTime.days).toEqual([1]);
  });

  it("returns multiple days in chronological order", () => {
    const parsedTime = parseTime("MWF 5:00-5:50p");

    expect(parsedTime.days).toEqual([1, 3, 5]);
  });

  it("returns start time in hh:mm", () => {
    const parsedTime = parseTime("MWF 7:00-7:50");

    expect(parsedTime.start).toEqual("07:00");
  });

  it("returns start time in 24 hours", () => {
    const parsedTime = parseTime("MWF 1:00-1:50p");

    expect(parsedTime.start).toBe("13:00");
  });

  it("returns end time in hh:mm", () => {
    const parsedTime = parseTime("MWF 7:00-7:50");

    expect(parsedTime.end).toBe("07:50");
  });

  it("returns end time in 24 hours", () => {
    const parsedTime = parseTime("MWF 1:00-1:50p");

    expect(parsedTime.end).toBe("13:50");
  });
});
