import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { generateSwimPracticeCards } from '../../routes/BrowseSwimPractices';
import SwimPracticeCard from '../swimPractices/swimPracticeCard';

import { DataContext } from '../../routes/Root';

export default function SideBySideItem( { swimDay } ) {
    console.log("swimDay: ", swimDay);
    //const allSwimSets = useLoaderData()[0];
    //const allSwimPractices = useLoaderData()[1];
    const allSwimSets = useContext(DataContext)["swimSets"];
    const allSwimPractices = useContext(DataContext)["swimPractices"]

    console.log("allSwimSets in SideBySideItem: ", allSwimSets);

    let plannedSwimPractice = allSwimPractices.find((practice) => practice.id === swimDay['planned']);
    let completedSwimPractice = allSwimPractices.find((practice) => practice.id === swimDay['completed']);

    console.log("plannedSwimPractice: ", plannedSwimPractice);
    console.log("completedSwimPractice: ", completedSwimPractice);

    /* return (
        <div className="side-by-side-item">
            <p className="side-by-side-date"> { swimDay['datetime'].toString() } </p>
            <div className="side-by-side-data">
                <p className="sbs-placeholder">{ swimDay['planned'] }</p>
                <p className="sbs-placeholder">{ swimDay['completed'] }</p>
                <p className="sbs-placeholder">{ swimDay['comments'] }</p>
            </div>
        </div>
    ) */

    return (
        <div className="side-by-side-item">
            <p className="side-by-side-date"> { swimDay['datetime'].toString() } </p>
            <div className="side-by-side-data">
                <SwimPracticeCard swimPractice={plannedSwimPractice} allSwimSets={allSwimSets} />
                { completedSwimPractice ? 
                    <SwimPracticeCard swimPractice={completedSwimPractice} allSwimSets={allSwimSets} /> 
                    : null }
                <p className="sbs-placeholder">{ swimDay['comments'] }</p>
            </div>
        </div>
    )
}