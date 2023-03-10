"use client";
import { supabase } from "@/lib/supabase/utils/supabase-secret";
import React, { useEffect, useState, useRef, useContext } from "react";
import PlanSearchWrapper from "./PlanSearchWrapper";
import { useSearchParams } from "next/navigation";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import PlanList from "../PlanList";

import { useRouter } from "next/navigation";
import {
  RiEdit2Fill,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";
import { CourseSection } from "../siteConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanSearch from "./PlanSearch";
import PlanCalendar from "./PlanCalendar";

import { HoverSection } from "./PlanCalendar";
import { useLocalStorage } from "react-use";

// import FuzzySearch from "../FuzzySearch";
// import ListView, { EnrolledView } from "../ListView";
// import { sampleEvents, sampleWaitlist } from "../siteConfig";

export default function Home() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const inputRef = useRef(null);
  const [sectionHover, setSectionHover] = useState<HoverSection | null>(null);

  const searchParams = useSearchParams();
  const data = searchParams.get("id");

  const [planData, setPlanData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<any>(null);

  const [planCourses, setPlanCourses] = useState<Array<CourseSection>>([]);

  const [currentView, setCurrentView] = useState<boolean>(true);

  const [autoEnroll, setAutoEnroll, removeAutoEnroll] = useLocalStorage(
    "autoenroll",
    ""
  );
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleView = () => {
    setCurrentView(!currentView);
  };

  const handleClick = () => {
    if (isEditing) {
      supabase
        .from("plans")
        .update({ name: text })
        .eq("id", data)
        .then((result) => {
          if (result.error) {
            setFetchError(result.error);
          }
        });
      setIsEditing(false);
      toast.success("Success", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (event: any) => {
    setText(event.target.value);
    event.target.style.width = `${event.target.value.length}ch`;
  };

  const handleEnterKey = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setText(planData?.data?.at(0)?.name);
    }
  };
  async function deletePlan() {
    await supabase.from("plans").delete().eq("id", data);

    //route to homepage
    router.push("/");
  }
  useEffect(() => {
    async function retrievePlan() {
      // check if id in query params
      if (data) {
        // query for the plan data
        supabase
          .from("plans")
          .select("name, termId, created_at, updated_at, courses")
          .eq("id", data)
          .then((result) => {
            // take the plan data and query their description
            if (result.error) {
              setFetchError(result.error);
            }
            // @ts-ignore
            setText(result.data?.at(0).name);
            setPlanData(result);
            const resultData = result.data?.at(0);

            let courseLength = resultData?.courses?.length ?? 0;

            if (courseLength > 0) {
              supabase
                .from("sections")
                .select()
                .in("sectionCode", resultData?.courses) // ["XXXXX", "XXXXX", "XXXXX"]
                .then((allCourses) => {
                  if (allCourses?.data) {
                    setPlanCourses(allCourses?.data);
                  }
                });
            }
          });
        setIsChecked(data === autoEnroll);
      }
    }
    retrievePlan().then(() => {});
  }, [data]);

  // useEffect(() => {
  //   console.log(planData);
  // }, [planData]);

  // const authsession = supabase.auth.getSession();
  // if (authsession) {
  //     authsession.then((result) => {
  //         const userId = result.data.session?.user.id;
  //         if (userId) {
  //             supabase
  //                 .from("plans")
  //                 .select("name, termId, created_at, updated_at, courses")
  //                 .eq("userId", userId)
  //                 //.eq("name", "current")
  //                 .then((result) => setPlanData(result));
  //         }
  //     });
  // }
  const inputStyle = {
    width: isEditing ? "auto" : "100%",
  };
  return (
    <main className="min-h-screen w-full flex justify-center">
      {fetchError && <div className="h-screen">{fetchError}</div>}
      {planData && (
        <div className="w-full flex flex-col justify-start items-center max-w-screen-2xl pb-16">
          {/* Back to home */}
          <div className="w-full flex justify-start px-10 py-5">
            <Link
              href="/"
              className="flex items-center text-lg font-light text-gray-700 font-body"
            >
              <MdOutlineKeyboardArrowLeft className="text-xl" />
              <span className="font-semibold">Home</span>
            </Link>
            {/* Delete Plan Button */}
            <div className="w-full flex justify-end">
              <button
                onClick={deletePlan}
                className="flex items-center text-lg font-light text-rose-900 font-body"
              >
                <span className="font-semibold">Delete Plan</span>
              </button>
            </div>
          </div>

          {/* Grid layout */}
          <div className="flex-grow grid grid-flow-row-dense gap-6 font-body grid-cols-12 w-full px-10">
            {/* Left: search to add classes */}
            <div className="card col-span-12 lg:col-span-6 p-5">
              <PlanSearchWrapper
                setPlanCourses={setPlanCourses}
                setSectionHover={setSectionHover}
                sectionHover={sectionHover}
              />
            </div>
            {/* Right: edit current plan */}
            <div className="card col-span-12 lg:col-span-6 p-5">
              <div className="flex flex-col md:flex-row gap-3 max-w-full overflow-ellipsis">
                <div className="flex max-w-full md:max-w-[75%] lg:max-w-[60%]">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterKey}
                        className="md:py-2 text-2xl font-semibold text-cardtitle font-title focus:outline-none border-b-2 border-gray-400"
                        // @ts-ignore
                        onBlur={() => (inputRef.current.style.width = "")}
                        ref={inputRef}
                        style={{
                          minWidth: "50px",
                          // @ts-ignore
                          width: `${inputRef.current?.scrollWidth}px`,
                        }}
                      />
                      <button
                        onClick={handleClick}
                        className="text-2xl text-uciblue"
                      >
                        <RiCheckboxCircleLine />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center max-w-full">
                      <h3
                        onClick={handleClick}
                        className="text-2xl font-semibold text-cardtitle font-title truncate"
                      >
                        {text}
                      </h3>
                      <button
                        onClick={handleClick}
                        className="text-2xl text-uciblue"
                      >
                        <RiEdit2Fill />
                      </button>
                    </div>
                  )}

                  {isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setText(planData?.data?.at(0)?.name);
                      }}
                      className="text-2xl text-rose-500"
                    >
                      <RiCloseCircleLine />
                    </button>
                  )}
                </div>
                <div className="flex flex-col justify-center items-end md:justify-end w-full">
                  <button
                    className="bg-[#f3f3f2] border-2 border-[#e7e7e5] px-4 py-1 rounded-md h-10 w-[10rem] "
                    onClick={handleToggleView}
                  >
                    {currentView ? "Calendar View" : "List View"}
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="autoenroll"
                  id="autoenrollbox"
                  className="w-4 h-4 accent-uciyellow color-white"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (isChecked == true) {
                      console.log("removing auto enroll");
                      setAutoEnroll("");
                      setIsChecked(false);

                      toast.success(
                        `Plan "${text}" will no longer auto-enroll`,
                        {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          progress: undefined,
                          theme: "light",
                          transition: Slide,
                        }
                      );
                    } else {
                      setIsChecked(true);
                      console.log("auto enrolling");
                      setAutoEnroll(data ?? "");

                      toast.success(
                        `Plan "${text}" will be automatically enrolled during your registration window.`,
                        {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          progress: undefined,
                          theme: "light",
                          transition: Slide,
                        }
                      );
                    }
                  }}
                  // default checked state
                  checked={isChecked}
                />
                <p>Auto-Enroll</p>
              </div>
              <div className="h-full">
                {currentView ? (
                  <PlanList
                    events={planCourses}
                    setPlanCourses={setPlanCourses}
                  />
                ) : (
                  <PlanCalendar
                    events={planCourses}
                    sectionHover={sectionHover}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </main>
  );
}
