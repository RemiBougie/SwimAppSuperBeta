import React from 'react';
import SwimSetCard from '../swimSets/swimSetCard';
import TagsList from '../swimSets/tagsList';
import SwimSetList from './swimSetList';

function SwimPracticeCard( {swimPractice} ) {
    return(
        <div classname="practice-card grow" key={swimPractice.id}>
            { swimPractice.swimPractice_title.length > 0 ? <h3>{swimPractice.swimPractice_title}</h3> : null }
            <TagsList tagArray={swimPractice.swimPractice_tags} />

        </div>
    )
}

export default SwimPracticeCard;