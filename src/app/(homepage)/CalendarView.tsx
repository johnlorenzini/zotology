import React from "react"
import {Schedule} from "./Schedule"

type Props = {}

interface DateInfo {
  title: string
  date: string
}

const dateData: Array<DateInfo> = [
  {
    title: "Waitlist Release",
    date: "03/17/23",
  },
  {
    title: "Planned Maintenance",
    date: "03/22/23",
  },
  {
    title: "Open Enrollment Period",
    date: "03/20/23",
  },
]

const CalendarView = (props: Props) => {
  return (
      <Schedule
        events={[
          { time: 11, duration: 1.33, day: 1, course: "Writing 60" },
          { time: 11, duration: 1.33, day: 3, course: "Writing 60" },
          { time: 15, duration: 0.833, day: 0, course: "CS 171" },
          { time: 15, duration: 0.833, day: 2, course: "CS 171" },
          { time: 15, duration: 0.833, day: 4, course: "CS 171" },
          { time: 8, duration: 0.833, day: 4, course: "CS 171 Dis" },
          { time: 8, duration: 1.33, day: 1, course: "ICS 53" },
          { time: 8, duration: 1.33, day: 3, course: "ICS 53" },
          { time: 17, duration: .833, day: 0, course: "ICS 53 Dis" },
          { time: 18.5, duration: .833, day: 0, course: "ICS 53 Lab" },
          { time: 18.5, duration: .833, day: 2, course: "ICS 53 Lab" },
          { time: 18.5, duration: 1.33, day: 2, course: "ur mom" }
        ]}
      />
  )
}

export default CalendarView
