import React, { useState, useEffect } from 'react';

import '../App.css';
import SwimSetCard from '../components/swimSets/swimSetCard';
import SearchBox from '../components/search/searchBox';
import TagSelection from '../components/search/tagSelection';
import Filter from '../hooks/filter';
import * as allTags from '../allTags';
import { getAllSwimSets } from '../hooks/requests'

export function generateSwimSetCards(swimSets) {
  return swimSets.map((item)=>{
    return <SwimSetCard 
    swimSet_id={item.id}
    swimSet_title={item.swimSet_title} 
    swimSet_tags={item.swimSet_tags}
    swimSet={item.body} 
    swimSet_notes={item.notes} />})
}

export default function BrowseSwimSets() {
  let [loading, setLoading] = useState(true);

  let [titleSearch, setTitleSearch] = useState('');
  let [tagsSearch, setTagsSearch] = useState(allTags["allTags"]);
  let [swimSets, setSwimSets] = useState([]);
  let [itemList, setItemList] = useState(null);

  useEffect(() => {
    getAllSwimSets(setSwimSets, setLoading, setItemList, generateSwimSetCards);
  }, []);

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
          Filter(titleSearch, tagsSearch, swimSets, setItemList, generateSwimSetCards);}}>
          Search
        </button>
        <div className="App-displaySwimSetCards">{ itemList }</div>
      </header>
    </div>
  );
}