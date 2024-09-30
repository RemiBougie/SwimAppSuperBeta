import React from 'react';
import { allTags } from '../../allTags';
//import '../App.css';

/*
const colorMapping = {
    "strokes": "#15FA00",
    "focus": "#A97CF8",
    "intensity": "#FD0303",
    "distance": "#FFBB00",
    "equipment": "#FF00D0"
}
*/

const colorMapping = {
    "strokes": "#00AF54",
    "focus": "#FFD639",
    "intensity": "#FFA3AF",
    "distance": "#007CBE",
    "equipment": "#A14DA0"
}

export default function TagsList ({ tagArray }) {
    let tagList = tagArray.map(tag => {
        let color = "white";
        for (const key in allTags) {
            if (allTags[key].hasOwnProperty(tag)) {
                color = colorMapping[key];
            }
        }
        return <p className="App-tagCard" key={tag} style={{'backgroundColor': color}}>{tag}</p>
    }
    )

    return (
        <div className="App-tagList">
            {tagList}
        </div>
    );
}