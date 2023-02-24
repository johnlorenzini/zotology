"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CourseSection } from "./siteConfig";

type ContextValue = {
  courseContext: Array<CourseSection>;
  setCourseContext: React.Dispatch<React.SetStateAction<Array<any>>>;
};

const UserContext = createContext<ContextValue>({
  courseContext: [],
  setCourseContext: () => {},
});

const SectionsContext = ({ children }: { children: React.ReactNode }) => {
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    console.log('courses in context updated', courses)
  }, [courses])

  return (
    <>
      <UserContext.Provider
        value={{ courseContext: courses, setCourseContext: setCourses }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}

export default SectionsContext;
