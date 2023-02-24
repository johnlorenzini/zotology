import React from "react";
import { Schedule, Event } from "./Schedule";

import { parseTime } from "@/lib/section/utils/parseTime";
import { CourseSection } from "./siteConfig";

type Props = {
  events: Array<CourseSection>;
};

// [
//   { time: 11, duration: 1.33, day: 1, course: "Writing 60" },
//   { time: 11, duration: 1.33, day: 3, course: "Writing 60" },
//   { time: 15, duration: 0.833, day: 0, course: "CS 171" },
//   { time: 15, duration: 0.833, day: 2, course: "CS 171" },
//   { time: 15, duration: 0.833, day: 4, course: "CS 171" },
//   { time: 8, duration: 0.833, day: 4, course: "CS 171 Dis" },
//   { time: 8, duration: 1.33, day: 1, course: "ICS 53" },
//   { time: 8, duration: 1.33, day: 3, course: "ICS 53" },
//   { time: 17, duration: 0.833, day: 0, course: "ICS 53 Dis" },
//   { time: 18.5, duration: 0.833, day: 0, course: "ICS 53 Lab" },
//   { time: 18.5, duration: 0.833, day: 2, course: "ICS 53 Lab" },
// ];

const CalendarView = ({ events }: Props) => {
  let parsedEvents: Array<Event> = [];

  events.forEach((evt) => {
    const { meetings, courseTitle, courseFull, sectionType} = evt;

    const location = meetings[0]?.bldg
    const timeString = `${meetings[0]?.days} ${meetings[0]?.time}`;
    const { days, start, end } = parseTime(timeString);

    const [ startHr, startMin] = start.split(':');
 
    const [ endHr, endMin] = end.split(':');
    
    const parsedStart = Number(startHr) + (Number(startMin) / 60)
    const parsedEnd = Number(endHr) + (Number(endMin) / 60)

    console.log(meetings[0]?.time)

    days.forEach((evtDay) => {
        let parsedEvent: Event = {
            day: evtDay,
            time: parsedStart,
            duration: parsedEnd - parsedStart,
            course: courseFull,
            location: location,
            sectionType: sectionType,
        };
        parsedEvents.push(parsedEvent)
    })
  });

  return (
    <div className="w-full h-full flex flex-col">
      {/* Title */}
      <div className="w-full p-5 pb-[10px] z-10 bg-white">
        <h3 className="text-2xl font-semibold text-cardtitle font-title">
          Your Schedule
        </h3>
      </div>
      {/* Calendar Wrapper */}
      <div className="w-full h-full">
        <Schedule events={parsedEvents} />
      </div>
    </div>
  );
};

export default CalendarView;
