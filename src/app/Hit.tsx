import React from "react"
import { useLocalStorage } from "react-use"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../lib/components/legacy/ui/accordion"
import { BsPlusCircle, BsFillCheckCircleFill } from "react-icons/bs"
import { Highlight } from "react-instantsearch-hooks-web"
import { Separator } from "../lib/components/legacy/ui/separator"

type props = {
    hit: any
}

const Hit = ({ hit } : props) => {
  const [classes, setClasses] = useLocalStorage("classes", [])

  if (!hit) return <></>

  const { objectID, deptCode, courseNumber, courseTitle, sections } = hit

  return (
    <AccordionItem className="my-2 AccordionItem" value={objectID}>
      <AccordionTrigger>
        <table>
          <tbody className="border-spacing-2.5">
            <tr>
              <td className="font-semibold text-uciblue">
                <Highlight attribute="deptCode" hit={hit}>
                  {deptCode}
                </Highlight>{" "}
                <Highlight attribute="courseNumber" hit={hit}>
                  {courseNumber}
                </Highlight>
              </td>
              <td className="px-5 text-cardtitle">-</td>
              <td className="text-cardtitle">{courseTitle}</td>
            </tr>
          </tbody>
        </table>
      </AccordionTrigger>
      <AccordionContent>
        <div className="pb-4 overflow-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b-2 border-cardtitle text-cardtitle">
                <th>Code</th>
                <th>Type</th>
                <th>Instructor</th>
                <th>Date/Time</th>
                <th>Location</th>
                <th>Enrollment</th>
                <th>Add?</th>
              </tr>
            </thead>
            <tbody>
              {sections.map(
                (
                  {
                    sectionCode,
                    sectionType,
                    meetings,
                    instructors,
                    numCurrentlyEnrolled,
                    maxCapacity,
                  }: any,
                  i: any
                ) => (
                  <tr className="font-medium " key={sectionCode}>
                    <td>
                      <Highlight
                        attribute={`sections.${i}.sectionCode`}
                        hit={hit}
                      >
                        {sectionCode}
                      </Highlight>
                    </td>
                    <td>
                      <Highlight
                        attribute={`sections.${i}.sectionType`}
                        hit={hit}
                      >
                        {sectionType}
                      </Highlight>
                    </td>
                    <td>{instructors[0]}</td>
                    <td>
                      {meetings[0]?.days} {meetings[0]?.time}
                    </td>
                    <td>{meetings[0]?.bldg}</td>
                    <td>
                      {numCurrentlyEnrolled.totalEnrolled} / {maxCapacity}
                    </td>
                    <td
                      onClick={() => {
                        // @ts-ignore
                        setClasses([...classes, sectionCode])
                      }}
                    >
                      {
                        // @ts-ignore
                        classes?.includes(sectionCode) ? (
                          <BsFillCheckCircleFill />
                        ) : (
                          <BsPlusCircle />
                        )
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default Hit
