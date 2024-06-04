import React, { useState } from 'react';

import './App.css';
import SwimSetCard from './components/swimSetCard';
import SearchBox from './components/searchBox';
import TagSelection from './components/tagSelection';
import Filter from './hooks/filter';
import { mockSwimSets } from './mockData/mockSwimSets.js';
import * as allTags from './allTags';

function App() {
  let [titleSearch, setTitleSearch] = useState('');
  let [tagsSearch, setTagsSearch] = useState(allTags["allTags"]);
  let [itemList, setItemList] = useState(mockSwimSets.map((item)=>{
    return <SwimSetCard 
    swimSet_title={item.swimSet_title} 
    swimSet_tags={item.swimSet_tags}
    swimSet={item.body} 
    swimSet_notes={item.notes} />})
  );

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
          Filter(titleSearch, tagsSearch, setItemList);}}>
          Submit Query
        </button>
        <div className="App-displaySwimSetCards">{itemList}</div>
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