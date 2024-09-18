import React, { useState, useEffect, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DataContext } from './Root';

import '../App.css';
import SwimSetCard from '../components/swimSets/swimSetCard';
import SwimPracticeCard from '../components/swimPractices/swimPracticeCard';
import SearchBox from '../components/search/searchBox';
import TagSelection from '../components/search/tagSelection';
import {FilterSwimPractices }from '../hooks/filter';
import * as allTags from '../allTags';
 
export function generateSwimPracticeCards(swimPractices, allSwimSets, clickHandler=null) {
    //const allSwimSets = useLoaderData()[0];
    return swimPractices.map((item) => {
        return(
            <SwimPracticeCard 
              swimPractice={item} 
              allSwimSets={allSwimSets}
              clickHandler={clickHandler}/>
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

export default function BrowseSwimPractices({clickHandler=null}) {
  let [loading, setLoading] = useState(true);

  let [titleSearch, setTitleSearch] = useState('');
  let [tagsSearch, setTagsSearch] = useState(allTags["allTags"]);
  const allSwimSets = useContext(DataContext)["swimSets"];
  const allSwimPractices = useContext(DataContext)["swimPractices"];
  let [itemList, setItemList] = useState(generateSwimPracticeCards(allSwimPractices, allSwimSets, clickHandler));

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="browse-swim-practices">
        <h3>Search for swim practices here!</h3>
        <SearchBox 
          searchCriteria="Swim Practice Title" 
          search={titleSearch}
          setSearch={setTitleSearch}/>
        <TagSelection 
          tagsSearch={tagsSearch}
          setTagsSearch={setTagsSearch}/>
        <button onClick={() => {
          FilterSwimPractices(titleSearch, tagsSearch, allSwimPractices, allSwimSets, setItemList, generateSwimPracticeCards, clickHandler);
        }}>Search</button>
        <div className="App-displaySwimPracticeCards"> {itemList}</div>
    </div>
  );
}

/*
<button onClick={() => {
          Filter(titleSearch, tagsSearch, swimSets, setItemList, generateSwimSetCards);}}>
          Search
        </button>
        */