import React, { useState, useEffect } from 'react';

import './App.css';
import SwimSetCard from './components/swimSets/swimSetCard';
import SearchBox from './components/search/searchBox';
import TagSelection from './components/search/tagSelection';
import Filter from './hooks/filter';
//import { mockSwimSets } from './mockData/mockSwimSets.js';
import * as allTags from './allTags';
import { getAllSwimSets } from './hooks/requests'

function generateSwimSetCards(swimSets) { //}, setItemList) {
  //console.log("allSwimSets passed to generateSwimSetCards: ", swimSets);
  /*setItemList(swimSets.map((item)=>{
    return <SwimSetCard 
    swimSet_title={item.swimSet_title} 
    swimSet_tags={item.swimSet_tags}
    swimSet={item.body} 
    swimSet_notes={item.notes} />})
  )*/
  return swimSets.map((item)=>{
    return <SwimSetCard 
    swimSet_id={item.id}
    swimSet_title={item.swimSet_title} 
    swimSet_tags={item.swimSet_tags}
    swimSet={item.body} 
    swimSet_notes={item.notes} />})
}

function App() {
  let [loading, setLoading] = useState(true);

  let [titleSearch, setTitleSearch] = useState('');
  let [tagsSearch, setTagsSearch] = useState(allTags["allTags"]);
  let [swimSets, setSwimSets] = useState([]);
  let [itemList, setItemList] = useState(null);

  useEffect(() => {
    //console.log("In the useEffect block of code!");
    getAllSwimSets(setSwimSets, setLoading, setItemList, generateSwimSetCards);
    //.then((allSwimSets) => {generateSwimSetCards(allSwimSets, setItemList)});
    //setTimeout(() => {setLoading(false)}, "1000");
  }, []);

  //console.log("swimSets", swimSets);
  //console.log("itemList", itemList);

  //let [itemList, setItemList] = useState(generateSwimSetCards(swimSets, setItemList)};

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
          Filter(titleSearch, tagsSearch, swimSets, setItemList);}}>
          Search
        </button>
        <div className="App-displaySwimSetCards">{ itemList }</div>
      </header>
    </div>
  );
}

export default App;

/*
        <SearchBox 
          searchCriteria="Swim Set Tags" 
          search={newTag}
          setSearch={setNewTag}/>
        <button onClick={()=> {
          console.log(newTag.toLowerCase());
          console.log(tagsSearch);
          setTagsSearch([...tagsSearch, newTag.toLowerCase()])}}>
          Add tag to list
        </button>


          setTitleSearch('');
          setTagsSearch(allTags["allTags"]);
          setNewTag('')
*/