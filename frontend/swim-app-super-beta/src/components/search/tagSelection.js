import React from 'react';
import Checkbox from './checkbox';
import * as allTags from '../../allTags';

export default function TagSelection({ tagsSearch, setTagsSearch }) {
    // needed for the display
    //const tagsJSON = allTags["allTags"];

    let div = [];

    //console.log("allTags", tagsJSON);
    //console.log("tagsSearch", tagsSearch);

    for (const property in tagsSearch) {
        let subdiv = [];
        let category = tagsSearch[property];
        subdiv = [...subdiv, <h3 key={`label_${property}`}>{property}</h3>]
        for (const label in category) {
            subdiv = [...subdiv, 
                <Checkbox 
                    id={`search_${label}`}
                    key={`${label}`}
                    name={`${label}`}
                    className="App-Checkbox"
                    category={property}
                    label={label} 
                    value={category[label]}
                    tagsSearch={tagsSearch}
                    setTagsSearch={setTagsSearch}/>]
        }
        div = [...div, <div className="App-checkboxList" key={`div_${property}`}>{subdiv}</div>];
    }

    //console.log(tagsSearch);
    return (<div className="App-tagSelection">{div}</div>);

}