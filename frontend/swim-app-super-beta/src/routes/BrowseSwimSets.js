import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { DataContext } from "./Root";

import "../App.css";
import SwimSetCard from "../components/swimSets/swimSetCard";
import SearchBox from "../components/search/searchBox";
import TagSelection from "../components/search/tagSelection";
import { FilterSwimSets } from "../hooks/filter";
import * as allTags from "../allTags";
import Modal from "../components/modal";

/*export function loader() {
  const allSwimSets = use
}
*/

//const tags = structuredClone(allTags["allTags"]);

export function generateSwimSetCards(
  swimSets,
  openModal = null,
  closeModal = null,
  setModalComponent = null,
  clickHandler = null
) {
  //console.log("swimSets in generateSwimSetCards: ", swimSets);
  return swimSets.map((item) => {
    return (
      <SwimSetCard
        swimSet={item}
        openModal={openModal}
        closeModal={closeModal}
        setModalComponent={setModalComponent}
        clickHandler={clickHandler}
      />
    );
  });
}

export default function BrowseSwimSets({ clickHandler = null }) {
  let allSwimSets = useContext(DataContext)["swimSets"];
  const tags = structuredClone(allTags["allTags"]);

  let [loading, setLoading] = useState(true);
  let [titleSearch, setTitleSearch] = useState("");
  let [tagsSearch, setTagsSearch] = useState(tags);
  //console.log("tags: ", tags);
  //let [swimSets, setSwimSets] = useState(allSwimSets);
  //console.log("swimSets state variable: ", swimSets);

  let [modalVisibility, setModalVisibility] = useState(false);
  let [modalComponent, setModalComponent] = useState(null);
  const openModal = () => setModalVisibility(true);
  const closeModal = () => setModalVisibility(false);

  let [itemList, setItemList] = useState(
    generateSwimSetCards(
      allSwimSets,
      openModal,
      closeModal,
      setModalComponent,
      clickHandler
    )
  );

  useEffect(() => {
    setTagsSearch(tags);
    setLoading(false);
  }, [allSwimSets]);

  // only used if practiceSets!=null
  /* const selectSwimSet = (x) => {
    setPracticeSets([...practiceSets, x]);
  } */

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="browse-swim-sets">
      <h3>Search for swim sets here!</h3>
      <SearchBox
        searchCriteria="Swim Set Title"
        search={titleSearch}
        setSearch={setTitleSearch}
      />
      <TagSelection
        className="App-tagSelection"
        tagsSearch={tagsSearch}
        setTagsSearch={setTagsSearch}
      />
      <button
        onClick={() => {
          FilterSwimSets(
            titleSearch,
            tagsSearch,
            allSwimSets,
            setItemList,
            generateSwimSetCards,
            openModal,
            closeModal,
            setModalComponent,
            clickHandler
          );
        }}
      >
        Search
      </button>
      <div className="App-displaySwimSetCards">{itemList}</div>
      <Modal
        isOpen={modalVisibility}
        onClose={closeModal}
        componentToRender={modalComponent}
      />
    </div>
  );
}
