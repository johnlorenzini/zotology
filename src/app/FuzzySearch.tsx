"use client";

import { useEffect, useState } from "react";

import { Hits } from "react-instantsearch-hooks-web";
import { Accordion } from "../lib/components/legacy/ui/accordion";
import Hit from "./Hit";

import { Input } from "../lib/components/legacy/ui/input";

import { useSearchBox } from "react-instantsearch-hooks-web";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

type props = {};

const FuzzySearch = (props: props) => {
  const { query, refine } = useSearchBox(props);
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

  //     // filter out the results that are not courses
  //     let filtered = Object.entries(results).filter(([courseId, courseData]): any => {
  //       if (courseData?.type != 'DEPARTMENT') {
  //         return [courseId, courseData]
  //       }
  //     })
  //     // if there is only one result, grab all courses from peterportal
  //     // ALEX IMPLEMENT HERE
  //     if((filtered.length == 0)) {
  //       // enter template here
  //       setSearchResults([["No results found", {}]])
  //     } else {

  //       setSearchResults(filtered)
  //     }

  //     setShowResults(true)

  //   } else {
  //     if(searchTerm.length > 0){
  //       setSearchResults([])
  //       setShowResults(false)
  //     }
  //     else{
  //       let template = [["GE-1A", "Lower Division Writing"], ["GE-1B", "Upper Division Writing"], ["GE-2", "Science and Technology"], ["GE-3", "Social and Behavioral Sciences"], ["GE-4", "Arts and Humanities"], ["GE-5A", "Quantitative Literacy"], ["GE-5B", "Formal Reasoning"], ["GE-6", "Language other than English"], ["GE-7", "Multicultural Studies"], ["GE-8", "International/Global Issues"], ["AC ENG", "Academic English"], ["ANATOMY", "Anatomy and Neurobiology"], ["ANTHRO", "Anthropology"], ["BIO SCI", "Biological Sciences"], ["BIOCHEM", "Biological Chemistry"], ["BME", "Biomedical Engineering"], ["CBE", "Chemical and Biomolecular Engineering"], ["COGS", "Cognitive Sciences"], ["CRM/LAW", "Criminology, Law and Society"], ["CSE", "Computer Science and Engineering"], ["DEV BIO", "Developmental and Cell Biology"], ["ECO EVO", "Ecology and Evolutionary Biology"], ["EECS", "Electrical Engineering & Computer Science"], ["ENGLISH", "English"], ["ENGR", "Engineering"], ["ENGRCEE", "Civil and Environmental Engineering"], ["ENGRMAE", "Mechanical and Aerospace Engineering"], ["EPIDEM", "Epidemiology"], ["GDIM", "Game Design and Interactive Media"], ["GEN&SEX", "Gender and Sexuality Studies"], ["GERMAN", "German"], ["GLBL ME", "Global Middle East Studies"], ["GLBLCLT", "Global Cultures"], ["GREEK", "Greek"],["ICS", "Information and Computer Science"], ["LINGUIS", "Linguistics"], ["LPS", "Logic and Philosophy of Science"], ["LSCI", "Language Science"], ["M&MG", "Microbiology and Molecular Genetics"], ["MGMT", "Management"], ["MGMT EP", "Executive MBA"], ["MGMT FE", "Fully Employed MBA"], ["MGMT HC", "Health Care MBA"], ["MGMTMBA", "Management MBA"], ["MGMTPHD", "Management PhD"], ["MOL BIO", "Molecular Biology and Biochemistry"], ["MSE", "Materials Science and Engineering"], ["NEURBIO", "Neurobiology and Behavior"], ["NUR SCI", "Nursing Science"], ["PATH", "Pathology and Laboratory Medicine"], ["PED GEN", "Pediatrics Genetics"], ["PHARM", "Medical Pharmacology"], ["PHYSIO", "Physiology and Biophysics"], ["PORTUG", "Portuguese"], ["PSCI", "Psychological Science"], ["PSYCH", "Psychology"], ["REL STD", "Religious Studies"], ["ROTC", "Reserve Officers' Training Corps"], ["SOC SCI", "Social Science"], ["SOCECOL", "Social Ecology"], ["SOCIOL", "Sociology"], ["SWE", "Software Engineering"], ["UCDC", "UC Washington DC"], ["UPPP", "Urban Policy and Public Planning"], ["WRITING", "Writing"]]
  //       let filtered = []
  //       for(const element of template) {
  //         filtered.push([element[0], {name: element[1]}])
  //       }
  //       setSearchResults(filtered)
  //     }
  //   }
  // }, [searchTerm])

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
            className="absolute top-0 w-full max-h-[1450px] overflow-y-scroll"
            type="multiple"
            defaultValue=""
            collapsible
          >
            <Hits hitComponent={({ hit }) => <Hit hit={hit} />} />
          </Accordion>
        )}
      </div>
    </div>
  );
};
export default FuzzySearch;
