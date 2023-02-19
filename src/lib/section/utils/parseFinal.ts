export interface ParsedFinal {
  start: Date;
  end: Date;
}

export const parseFinal = (time: string): ParsedFinal => {
  const finalRegex =
    /(?<day>.+)\W+((?<startTime>\d+:\d+)-(?<endTime>\d+:\d+))(?<isPM>(a|p)m)/;

  const matchGroups = time?.match(finalRegex)?.groups!;

  const parsedEnd = new Date(
    `${matchGroups.day} ${matchGroups.endTime} ${matchGroups.isPM}`
  );

  // assume start time is PM
  let parsedStart = new Date(`${matchGroups.day} ${matchGroups.startTime} pm`);

  // if not PM, then convert parsedStart time to AM
  if (parsedStart > parsedEnd) {
    parsedStart = new Date(`${matchGroups.day} ${matchGroups.startTime} am`);
  }

  return {
    start: parsedStart,
    end: parsedEnd,
  };
};
