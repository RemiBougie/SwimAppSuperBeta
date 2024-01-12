import React from 'react';
import Checkbox from './checkbox';
import * as allTags from '../allTags';

export default function TagSelection({ tagsSearch, setTagsSearch }) {
    // needed for the display
    const tagsJSON = allTags["allTags"];

    let div = [];

    console.log("allTags", tagsJSON);
    console.log("tagsSearch", tagsSearch);

    for (const property in tagsJSON) {
        let subdiv = [];
        let category = tagsJSON[property];
        subdiv = [...subdiv, <h3>{property}</h3>]
        for (const label in category) {
            subdiv = [...subdiv, 
                <Checkbox 
                    className="App-Checkbox"
                    category={property}
                    label={label} 
                    value={category[label]}
                    tagsSearch={tagsSearch}
                    setTagsSearch={setTagsSearch}/>]
        }
        div = [...div, <div className="App-checkboxList">{subdiv}</div>];
    }

    console.log(tagsSearch);
    return (<div className="App-tagSelection">{div}</div>);

}