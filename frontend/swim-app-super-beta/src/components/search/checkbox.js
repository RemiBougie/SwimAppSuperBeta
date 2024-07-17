import React, { useState } from 'react';

export default function Checkbox ({ id, category, label, value, tagsSearch, setTagsSearch }) {
    // copy current JSON of current selection to temp variable that will be updated with the selection
    let temp = Object.assign({}, tagsSearch);
    //let [IAmCategory, setIAmCategory] = useState(category);
    //let [IAmLabel, setIAmLabel] = useState(label);
    let IAmCategory = category;
    let IAmLabel = label;
    let [checked, setChecked] = useState(value);

    return (
        <label className="App-Checkbox" key={id}>
            <input 
                type="checkbox" 
                name={label}
                id={label}
                checked={checked} 
                onChange={e => {
                    temp[IAmCategory][IAmLabel]=!checked;
                    //console.log("temp:", temp);
                    //console.log("temp[category]", temp[IAmCategory])
                    setTagsSearch(temp)
                    setChecked(!checked)
                    }}/>
            {label}
        </label>
    )
}