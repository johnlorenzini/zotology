"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";

export type Course = {};

export type Event = {
  day: number;
  time: number;
  duration: number;
  course: Course;
};

interface ScheduleTimesProps {
  start: number;
  hours: number;
}

// LMAO THIS IS SO STUPID - ALEXANDER
export const hourToTime = (hour: number, showPM: boolean = true) => {
  if (hour == 12) {
    return "12PM";
  } else if (hour < 12) {
    return `${hour}${showPM ? "AM" : ""}`;
  } else {
    return `${hour - 12}${showPM ? "PM" : ""}`;
  }
};

const ScheduleTimes = ({ start, hours }: ScheduleTimesProps) => {
  const times = [start];
  for (let i = 1; i <= hours; i++) {
    times.push(start + i);
  }

  return (
    <div className="sticky left-0 grid h-full w-[60px] flex-col items-center justify-items-end border-r px-2">
      {times.map((time) => (
        <span className="font-medium tabular-nums text-uciblue" key={time}>
          {hourToTime(time)}
        </span>
      ))}
    </div>
  );
};

// Should this be in a context: yes
// Am I going to put it in a context: no
interface ScheduleDay {
  day: number;
  start: number;
  hours: number;
  events: Event[];
}

const ScheduleDay = ({ day, start, hours, events }: ScheduleDay) => {
  const times = [start];
  for (let i = 1; i <= hours; i++) {
    times.push(start + i);
  }

  return (
    <div className="relative grid items-center grow">
      {times.map((time) => (
        <div
          key={`${day * 100 + time}pain`}
          className="h-[1px] border-b border-dashed text-center"
        ></div>
      ))}

      {events
        .filter(({ day: eventDay }) => eventDay == day)
        .map((event) => (
          // eslint-disable-next-line react/jsx-key
          <ScheduleEvent
            start={start}
            begin={event.time}
            length={event.duration}
            hours={hours}
            // @ts-ignore
            title={event.course}
          />
        ))}
    </div>
  );
};

interface ScheduleEventProps {
  start: number;
  begin: number;
  length: number;
  hours: number;
  title: string;
}

const ScheduleEvent = ({
  start,
  begin,
  length,
  hours,
  title,
}: ScheduleEventProps) => {
  return (
    <div
      className="absolute grid w-full p-1"
      style={{
        top: `${((begin - start + 0.5) / (hours + 1)) * 102}%`,
        height: `${(length / (hours + 1)) * 120}%`,
      }}
    >
      <div className="px-1 text-white rounded-md border-t-[3px] border-uciblue bg-slate-300 bg-opacity-30 flex flex-col justify-start overflow-x-scroll scrollbar-hide">
        <span className="text-gray-700 font-bold uppercase">{title}</span>
        <span className="text-gray-500 text-xs">
          {hourToTime(begin, false)}-{hourToTime(begin + length)}
        </span>
      </div>
    </div>
  );
};

interface ScheduleProps {
  events: Event[];
}

const Schedule = ({ events }: ScheduleProps) => {
  const [early, setEarly] = useState(events[0].time);
  const [late, setLate] = React.useState(0);
  const [start, setStart] = React.useState(7);
  const [hours, setHours] = React.useState(12);

  useEffect(() => {
    events.forEach(({ time }) => {
      if (time < early) setEarly(time);
    });
  }, [events, early]);

  useEffect(() => {
    events.forEach(({ time, duration }) => {
      if (time + duration > late) setLate(time + duration);
    });
  }, [events, late]);

  useMemo(() => {
    setStart(early - 1);
  }, [early]);

  useMemo(() => {
    setHours(late - early + 2);
  }, [early, late]);

  // bg-gradient-to-l from-[rgba(0,100,164,0.3)] to-[rgba(27,61,109,0.3)]

  return (
    <div className="text-sm rounded-xl h-full">
      <div className="relative flex h-full min-h-[450px] w-full min-w-[450px] flex-col">
        <div className="z-10 relative top-0 flex bg-slate-100 bg-opacity-60">
          <div className="w-[60px]"></div>
          {["Mon", "Tues", "Wed", "Thurs", "Fri"].map((day) => (
            <span
              className="z-10 py-2 font-medium text-center text-gray-700 grow basis-0"
              key={day}
            >
              {day}
            </span>
          ))}
          <hr className="absolute bottom-0 min-h-[3px] mt-4 rounded-lg w-full border-none ucigold" />
        </div>
        <div className="flex items-stretch grow">
          <ScheduleTimes start={start} hours={hours} />
          <ScheduleDay
            key={0}
            day={0}
            start={start}
            hours={hours}
            events={events}
          />
          <ScheduleDay
            key={1}
            day={1}
            start={start}
            hours={hours}
            events={events}
          />
          <ScheduleDay
            key={2}
            day={2}
            start={start}
            hours={hours}
            events={events}
          />
          <ScheduleDay
            key={3}
            day={3}
            start={start}
            hours={hours}
            events={events}
          />
          <ScheduleDay
            key={4}
            day={4}
            start={start}
            hours={hours}
            events={events}
          />
        </div>
      </div>
    </div>
  );
};

export { Schedule };
