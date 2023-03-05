"use client";

import { InstantSearch, useSearchBox } from "react-instantsearch-hooks-web";

import algoliasearch from "algoliasearch/lite";

import React, { useEffect, useState, SetStateAction } from "react";
import FuzzySearch from "../FuzzySearch";

import { Hits } from "react-instantsearch-hooks-web";

import { Accordion } from "../../lib/components/legacy/ui/accordion";
import PlanHit from "./PlanHit";

import { Input } from "../../lib/components/legacy/ui/input";

import { supabase } from "@/lib/supabase/utils/supabase-secret";
import { CourseSection } from "../siteConfig";

import { HoverSection } from "./PlanCalendar"

type Props = {
  setPlanCourses: React.Dispatch<SetStateAction<CourseSection[]>>;
  setSectionHover: React.Dispatch<SetStateAction<HoverSection|null>>;
  sectionHover: HoverSection|null;
};

const PlanSearch = ({ setPlanCourses, setSectionHover, sectionHover }: Props) => {
  const { query, refine } = useSearchBox({});
  const [classes, setClasses] = useState([]);

  // const [searchResults, setSearchResults] = useState([])
  // const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    if (query) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [query]);

  useEffect(() => {
    async function getCourses() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("id", session.user.id);

        if (data) {
          const sections = data.at(0).sections;
          setClasses(sections);
        }
      }
    }
    getCourses();
  }, []);

  return (
    <div className="relative z-20 w-full mt-6 mb-12">
      <div className="relative w-full flex justify-center">
        <Input
          type="search"
          value={query}
          placeholder="Search for courses, instructors or enter a 5-digit course code:"
          onChange={(e) => refine(e.target.value)}
          className="max-w-5xl text-black z-10 h-12 w-full rounded-full border-[1.5px] border-zinc-400 bg-zinc-50"
        />
      </div>
      <div className="relative h-0 w-full">
        {showResults && (
          /* @ts-ignore */
          <Accordion
            className="scrollbar-hide absolute top-0 w-full max-h-screen overflow-y-scroll"
            type="multiple"
            defaultValue=""
            collapsible
          >
            <Hits
              hitComponent={({ hit }) => (
                <PlanHit hit={hit} setPlanCourses={setPlanCourses} setSectionHover={setSectionHover} sectionHover={sectionHover}/>
              )}
            />
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default PlanSearch;
