"use client";

import { InstantSearch } from "react-instantsearch-hooks-web";
import {CourseSection} from '../siteConfig'

import algoliasearch from "algoliasearch/lite";

import React, {SetStateAction} from "react";
import FuzzySearch from "../FuzzySearch";
import PlanSearch from "./PlanSearch";
import { HoverSection } from "./PlanCalendar"

type Props = {
    setPlanCourses: React.Dispatch<SetStateAction<CourseSection[]>>
    setSectionHover: React.Dispatch<SetStateAction<HoverSection|null>>;
    sectionHover: HoverSection|null;
};

const PlanSearchWrapper = ({ setPlanCourses, setSectionHover, sectionHover }: Props) => {
  const searchClient = algoliasearch(
    "YLIHB3D2PU",
    "f5c5771bd7c29cf59e97f41edb2515a8"
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="sections">
      <PlanSearch setPlanCourses={setPlanCourses} setSectionHover={setSectionHover} sectionHover={sectionHover}/>
    </InstantSearch>
  );
};

export default PlanSearchWrapper;
