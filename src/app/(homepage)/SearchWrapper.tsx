"use client";

import { InstantSearch } from "react-instantsearch-hooks-web";

import algoliasearch from "algoliasearch/lite";

import React from "react";
import FuzzySearch from "../tempsearchbar";
type Props = {};

const SearchWrapper = (props: Props) => {
  const searchClient = algoliasearch(
    "2224KHIU20",
    "b30fa2c9df4a117934227a4770d289d3"
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="sections">
      <FuzzySearch />
    </InstantSearch>
  );
};

export default SearchWrapper;
