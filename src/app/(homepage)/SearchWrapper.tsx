"use client";

import { InstantSearch } from "react-instantsearch-hooks-web";

import algoliasearch from "algoliasearch/lite";

import React from "react";
import FuzzySearch from "../FuzzySearch";
type Props = {};

const SearchWrapper = (props: Props) => {
  const searchClient = algoliasearch(
    "YLIHB3D2PU",
    "f5c5771bd7c29cf59e97f41edb2515a8"
  );
  return (
    <InstantSearch searchClient={searchClient} indexName="sections">
      <FuzzySearch />
    </InstantSearch>
  );
};

export default SearchWrapper;
