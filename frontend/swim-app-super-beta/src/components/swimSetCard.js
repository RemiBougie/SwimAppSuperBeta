import React from 'react';
import TagsList from './tagsList';
import SwimSetList from './swimSetList';
import '../App.css';

function SwimSetCard ( {swimSet_title, swimSet_tags, swimSet, swimSet_notes}) {
    return (
    <div className="App-card grow">
        { swimSet_title.length > 0 ? <h3>{swimSet_title}</h3> : null }
        <TagsList tagArray={swimSet_tags} />
        <SwimSetList swimSet={swimSet} />
        <p style={{"fontSize": "12px"}}>{swimSet_notes}</p>
    </div>
    );
}

export default SwimSetCard;