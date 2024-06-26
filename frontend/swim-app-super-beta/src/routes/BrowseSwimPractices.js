import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import '../App.css';
import SwimSetCard from '../components/swimSets/swimSetCard';
import SwimPracticeCard from '../components/swimPractices/swimPracticeCard';
import SearchBox from '../components/search/searchBox';
import TagSelection from '../components/search/tagSelection';
import Filter from '../hooks/filter';
import * as allTags from '../allTags';

export function generateSwimPracticeCards(swimPractices, allSwimSets) {
    //const allSwimSets = useLoaderData()[0];
    return swimPractices.map((item) => {
        return(
            <SwimPracticeCard swimPractice={item} allSwimSets={allSwimSets}/>
        )
    })
    /*
    return swimPractices.map((item) => {
        return (
            <div>
                <p>{item.swimPractice_title}</p>
                <p>{item.notes}</p>
            </div>
        )
    })
    */
}

export default function BrowseSwimPractices() {
  let [loading, setLoading] = useState(true);

  let [titleSearch, setTitleSearch] = useState('');
  let [tagsSearch, setTagsSearch] = useState(allTags["allTags"]);
  let [allSwimSets, setAllSwimSets] = useState(useLoaderData()[0]);
  let [swimPractices, setSwimPractices] = useState(useLoaderData()[1]);
  let [itemList, setItemList] = useState(generateSwimPracticeCards(swimPractices, allSwimSets));
  console.log("swimSets state variable: ", allSwimSets);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Search for swim practices here!</h3>
        <SearchBox 
          searchCriteria="Swim Practice Title" 
          search={titleSearch}
          setSearch={setTitleSearch}/>
        <TagSelection 
          className="App-tagSelection"
          tagsSearch={tagsSearch}
          setTagsSearch={setTagsSearch}/>
        <div className="App-displaySwimPracticeCards"> {itemList}</div>
      </header>
    </div>
  );
}

/*
<button onClick={() => {
          Filter(titleSearch, tagsSearch, swimSets, setItemList, generateSwimSetCards);}}>
          Search
        </button>
        */