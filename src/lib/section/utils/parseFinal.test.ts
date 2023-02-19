import { parseFinal } from "./parseFinal";

// Fri, Dec 9, 8:00-10:00am  -> expects am start
// returns start time (am)
// returns end time (am)

// Mon, Dec 5, 10:30-12:30pm -> expects am start
// returns start time (am)
// returns end time (pm)

// Wed, Dec 7, 4:00-6:00pm -> expects pm start
// returns start time (pm)
// returns end time (pm)

//     TBA -> do not handle

describe("Final", () => {
  it("returns am start date with am end date", () => {
    const parsedFinal = parseFinal("Thu, Dec 8, 8:00-10:00am");

    expect(parsedFinal.start.toISOString()).toBe(
      new Date("Thu, Dec 8, 8:00 AM").toISOString()
    );
  });

  it("returns am end date with am start date", () => {
    const parsedFinal = parseFinal("Thu, Dec 8, 8:00-10:00am");

    expect(parsedFinal.end.toISOString()).toBe(
      new Date("Thu, Dec 8, 10:00 AM").toISOString()
    );
  });

  it("returns am start date with pm end date", () => {
    const parsedFinal = parseFinal("Mon, Dec 5, 10:30-12:30pm");

    expect(parsedFinal.start.toISOString()).toBe(
      new Date("Mon, Dec 5, 10:30 AM").toISOString()
    );
  });

  it("returns am end date with pm start date", () => {
    const parsedFinal = parseFinal("Mon, Dec 5, 10:30-12:30pm");

    expect(parsedFinal.end.toISOString()).toBe(
      new Date("Mon, Dec 5, 12:30 PM").toISOString()
    );
  });

  it("returns pm start date with pm end date", () => {
    const parsedFinal = parseFinal("Wed, Dec 7, 4:00-6:00pm");

    expect(parsedFinal.start.toISOString()).toBe(
      new Date("Wed, Dec 7, 4:00 PM").toISOString()
    );
  });

  it("returns pm end date with pm start date", () => {
    const parsedFinal = parseFinal("Wed, Dec 7, 4:00-6:00pm");

    expect(parsedFinal.end.toISOString()).toBe(
      new Date("Wed, Dec 7, 6:00 PM").toISOString()
    );
  });
});
