'use client'

import * as React from "react"
import { useState, useEffect, useMemo } from "react"

export type Course = {}

export type Event = {
  day: number
  time: number
  duration: number
  course: Course
}

interface ScheduleTimesProps {
  start: number
  hours: number
}

// LMAO THIS IS SO STUPID - ALEXANDER
export const hourToTime = (hour: number) => {
  if (hour == 12) {
    return "12PM"
  } else if (hour < 12) {
    return `${hour}AM`
  } else {
    return `${hour - 12}PM`
  }
}

const ScheduleTimes = ({ start, hours }: ScheduleTimesProps) => {
  const times = [start]
  for (let i = 1; i <= hours; i++) {
    times.push(start + i)
  }

  return (
    <div className="sticky left-0 grid h-full w-[60px] flex-col items-center justify-items-end border-r px-2">
      {times.map((time) => (
        <span className="font-medium tabular-nums text-uciblue" key={time}>
          {hourToTime(time)}
        </span>
      ))}
    </div>
  )
}

// Should this be in a context: yes
// Am I going to put it in a context: no
interface ScheduleDay {
  day: number
  start: number
  hours: number
  events: Event[]
}

const ScheduleDay = ({ day, start, hours, events }: ScheduleDay) => {
  const times = [start]
  for (let i = 1; i <= hours; i++) {
    times.push(start + i)
  }

  return (
    <div className="relative grid items-center grow">
      {times.map((time) => (
        <div
          key={time}
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
  )
}

interface ScheduleEventProps {
  start: number
  begin: number
  length: number
  hours: number
  title: string
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
        top: `${((begin - start + 0.5) / (hours + 1)) * 100}%`,
        height: `${(length / (hours + 1)) * 100}%`,
      }}
    >
      <div className="px-1 text-white rounded-md bg-uciblue">{title}</div>
    </div>
  )
}

interface ScheduleProps {
  events: Event[]
}

const Schedule = ({ events }: ScheduleProps) => {
  const [early, setEarly] = useState(events[0].time)
  const [late, setLate] = React.useState(0)
  const [start, setStart] = React.useState(7)
  const [hours, setHours] = React.useState(12)

  useEffect(() => {
    events.forEach(({ time }) => {
      if (time < early) setEarly(time)
    })
  }, [events, early])

  useEffect(() => {
    events.forEach(({ time, duration }) => {
      if (time + duration > late) setLate(time + duration)
    })
  }, [events, late])

  useMemo(() => {
    setStart(early - 1)
  }, [early])

  useMemo(() => {
    setHours(late - early + 2)
  }, [early, late])

  return (
    <div className="text-sm rounded-xl h-full">
      <div className="relative flex h-full min-h-[450px] w-full min-w-[450px] flex-col">
        <div className="z-10 sticky top-0 flex bg-gradient-to-l from-[#0064a4] to-[#1b3d6d]">
          <div className="w-[60px]"></div>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day) => (
              <span
                className="z-10 py-2 font-medium text-center text-white border-b grow basis-0"
                key={day}
              >
                {day}
              </span>
            )
          )}
        </div>
        <div className="flex items-stretch grow">
          <ScheduleTimes start={start} hours={hours} />
          <ScheduleDay day={0} start={start} hours={hours} events={events} />
          <ScheduleDay day={1} start={start} hours={hours} events={events} />
          <ScheduleDay day={2} start={start} hours={hours} events={events} />
          <ScheduleDay day={3} start={start} hours={hours} events={events} />
          <ScheduleDay day={4} start={start} hours={hours} events={events} />
        </div>
      </div>
    </div>
  )
}

export { Schedule }