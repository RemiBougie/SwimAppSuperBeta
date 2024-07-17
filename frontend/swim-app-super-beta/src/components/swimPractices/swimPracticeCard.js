import React from 'react';
import SwimSetCard from '../swimSets/swimSetCard';
import TagsList from '../swimSets/tagsList';
import SwimSetList from './swimSetList';

function SwimPracticeCard( {swimPractice, allSwimSets} ) {
    return(
        <div className="practice-card" key={swimPractice.id}>
            { swimPractice.swimPractice_title.length > 0 ? <h3>{swimPractice.swimPractice_title}</h3> : null }
            <TagsList tagArray={swimPractice.swimPractice_tags} />
            <SwimSetList swimSets={swimPractice.body} allSwimSets={allSwimSets}/>
            <p style={{"fontSize": "12px"}}>{swimPractice.notes}</p>
        </div>
    )
}

export default SwimPracticeCard;