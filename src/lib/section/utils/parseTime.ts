export interface ParsedTime {
  days: number[];
  start: string /* hh:mm */;
  end: string /* hh:mm */;
}
// Example Time: 'M   5:00- 5:50p'
// Example Time: 'MW   11:00-12:20p'
// Example Time: 'TuTh   9:30-10:50'
// Example Time: 'MWF   8:00- 9:20'
// Example Time: 'MTuWThF   12:00-12:50p'

// 'MW   2:30- 3:50p	'
// 'MW   4:00- 4:50p	'

const convertTime12to24 = (time12h: string, isPM: string) => {
  const [start, end] = time12h.split(" ");

  let [sHours, sMinutes] = start.split(":");
  let [eHours, eMinutes] = end.split(":");

  if (sHours === "12") {
    sHours = "00";
  }
  if (eHours === "12") {
    eHours = "00";
  }
  if (isPM != "") {
    if (sHours > eHours) {
      eHours = (parseInt(eHours, 10) + 12).toString();
    } else {
      sHours = (parseInt(sHours, 10) + 12).toString();
      eHours = (parseInt(eHours, 10) + 12).toString();
    }
  }
  if (sHours.length === 1) {
    sHours = "0" + sHours;
  }
  if (eHours.length === 1) {
    eHours = "0" + eHours;
  }
  return [`${sHours}:${sMinutes}`, `${eHours}:${eMinutes}`];
};

export const parseTime = (time: string): ParsedTime => {
  const regex =
    /(?<Monday>M)?(?<Tuesday>Tu)?(?<Wednesday>W)?(?<Thursday>Th)?(?<Friday>F)? +(?<startHr>\d+):(?<startMin>\d+)- *(?<endHr>\d+):(?<endMin>\d+)(?<isPM>p?)/;
  const regMatch = regex.exec(time)!;

  let {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    startHr,
    startMin,
    endHr,
    endMin,
    isPM,
  } = regMatch.groups!;
  const days = [Monday, Tuesday, Wednesday, Thursday, Friday];
  const [mStart, mEnd] = convertTime12to24(
    startHr + ":" + startMin + " " + endHr + ":" + endMin,
    isPM
  );
  const fDays = [];
  for (var i = 0; i < 5; i++) {
    if (days[i]) {
      fDays.push(i + 1);
    }
  }

  return {
    days: fDays,
    start: mStart,
    end: mEnd,
  };
};
