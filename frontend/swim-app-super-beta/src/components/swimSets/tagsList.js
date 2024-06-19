import React from 'react';
//import '../App.css';

export default function TagsList ({ tagArray }) {
    let tagList = tagArray.map(tag => <p className="App-tagCard" key={tag}>{tag}</p>)

    return (
        <div className="App-tagList">
            {tagList}
        </div>
    );
}