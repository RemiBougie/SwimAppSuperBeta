import React, { useState, useEffect, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { DataContext } from './Root';

import '../App.css';
import SwimSetCard from '../components/swimSets/swimSetCard';
import SearchBox from '../components/search/searchBox';
import TagSelection from '../components/search/tagSelection';
import {FilterSwimSets} from '../hooks/filter';
import * as allTags from '../allTags';
import { getAllSwimSets } from '../hooks/requests';

/*export function loader() {
  const allSwimSets = use
}
*/

const tags = structuredClone(allTags["allTags"]);

export function generateSwimSetCards(swimSets, clickHandler=null) {
  //console.log("swimSets in generateSwimSetCards: ", swimSets);
  return swimSets.map((item)=>{
    return <SwimSetCard 
    /* onClick={(e) => {
      e.preventDefault();
      if (selectSwimSet) {
        selectSwimSet(item)
      }
    }} */
    swimSet={item} 
    clickHandler={clickHandler}/>})
}

export default function BrowseSwimSets({clickHandler=null}) {
  let allSwimSets = useContext(DataContext)["swimSets"];

  let [loading, setLoading] = useState(true);

  let [titleSearch, setTitleSearch] = useState('');
  let [tagsSearch, setTagsSearch] = useState(tags);
  //let [swimSets, setSwimSets] = useState(allSwimSets);
  //console.log("swimSets state variable: ", swimSets);
  let [itemList, setItemList] = useState(generateSwimSetCards(allSwimSets, clickHandler));

  useEffect(() => {
    setTagsSearch(tags);
    setLoading(false);
  }, []);

  // only used if practiceSets!=null
  /* const selectSwimSet = (x) => {
    setPracticeSets([...practiceSets, x]);
  } */

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Search for swim sets here!</h3>
        <SearchBox 
          searchCriteria="Swim Set Title" 
          search={titleSearch}
          setSearch={setTitleSearch}/>
        <TagSelection 
          className="App-tagSelection"
          tagsSearch={tagsSearch}
          setTagsSearch={setTagsSearch}/>
        <button onClick={() => {
          FilterSwimSets(titleSearch, tagsSearch, allSwimSets, setItemList, generateSwimSetCards, clickHandler);}}>
          Search
        </button>
        <div className="App-displaySwimSetCards">{ itemList }</div>
      </header>
    </div>
  );
}