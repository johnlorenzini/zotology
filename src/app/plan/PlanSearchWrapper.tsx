"use client";

import { InstantSearch } from "react-instantsearch-hooks-web";
import {CourseSection} from '../siteConfig'

import algoliasearch from "algoliasearch/lite";

import React, {SetStateAction} from "react";
import FuzzySearch from "../FuzzySearch";
import PlanSearch from "./PlanSearch";
type Props = {
    setPlanCourses: React.Dispatch<SetStateAction<CourseSection[]>>
};

const PlanSearchWrapper = ({ setPlanCourses }: Props) => {
  const searchClient = algoliasearch(
    "YLIHB3D2PU",
    "f5c5771bd7c29cf59e97f41edb2515a8"
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="sections">
      <PlanSearch setPlanCourses={setPlanCourses}/>
    </InstantSearch>
  );
};

export default PlanSearchWrapper;
