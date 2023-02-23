import React from "react";
import { useLocalStorage } from "react-use";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../lib/components/legacy/ui/accordion";
import { BsPlusCircle, BsFillCheckCircleFill } from "react-icons/bs";
import { Highlight } from "react-instantsearch-hooks-web";
import { Separator } from "../lib/components/legacy/ui/separator";

import cn from "classnames";

type props = {
  hit: any;
};

const Hit = ({ hit }: props) => {
  const [classes, setClasses] = useLocalStorage("classes", []);

  if (!hit) return <></>;

  const { objectID, deptCode, courseNumber, courseTitle, sections } = hit;

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
              <td className="text-cardtitle">
                <Highlight attribute="courseTitle" hit={hit}>
                  {courseTitle}
                </Highlight>
              </td>
            </tr>
          </tbody>
        </table>
      </AccordionTrigger>
      <AccordionContent>
        {sections && Object.keys(sections).length > 0 ? (
          <div className="pb-4 overflow-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="border-b-2 border-cardtitle text-cardtitle">
                  <th>Code</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Date/Time</th>
                  <th>Instructor</th>
                  <th>Enrollment</th>
                  <th>Add?</th>
                </tr>
              </thead>
              <tbody>
                {sections?.map(
                  (
                    {
                      sectionCode,
                      sectionType,
                      units,
                      instructors,
                      meetings,
                      finalExam,
                      maxCapacity,
                      numCurrentlyEnrolled,
                      totalEnrolled,
                      numOnWaitlist,
                      numRequested,
                      numNewOnlyReserved,
                      restrictions,
                      status,
                      sectionComment,
                    }: any,
                    i: number
                  ) => {
                    const isHeader = sectionType == "Lec";
                    return (
                      <>
                        {sectionType == "Lec" && (
                          // Lecture section padding
                          <div className={i == 0 ? "h-2" : "h-3"} />
                        )}
                        <tr
                          className={cn(
                            "font-medium",
                            isHeader ? "bg-[#E9E9E6]" : ""
                          )}
                          key={sectionCode}
                        >
                          <td
                            className={cn(
                              "p-1",
                              isHeader ? "rounded-l-md" : ""
                            )}
                          >
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
                              className=""
                            >
                              {sectionType}
                            </Highlight>
                          </td>
                          <td>{meetings[0]?.bldg}</td>
                          <td>
                            {meetings[0]?.days} {meetings[0]?.time}
                          </td>
                          <td>
                            <Highlight
                              attribute={`sections.${i}.instructors`}
                              hit={hit}
                            >
                              {instructors[0]}
                            </Highlight>
                          </td>
                          <td>
                            {numCurrentlyEnrolled.totalEnrolled} / {maxCapacity}
                          </td>
                          <td
                            onClick={() => {
                              // @ts-ignore
                              setClasses([...classes, sectionCode]);
                            }}
                            className={cn(
                              "p-1",
                              isHeader ? "rounded-r-md" : ""
                            )}
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
                      </>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center py-8 gap-2 flex-col">
            <div className="text-xl text-left text-cardtitle font-bold">
              No sections found for Spring 2023
            </div>
            <button className="px-4 py-2 bg-uciblue text-white font-bold rounded-full hover:bg-cardtitle transition ease-in-out">
              Add to Wishlist?
            </button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Hit;
