import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLoaderData } from 'react-router-dom';

import CalendarView from '../components/swimSeasons/calendarView';
import SideBySideGrid from '../components/swimSeasons/sideBySideGrid';

import { DataContext } from './Root';
//import CalendarItem from '../components/swimSeasons/calendarItem';
//import { mockSwimSeason } from '../mockData/mockSwimSeason';

export async function loader( { params } ) {
    // a clumsy ass way of doing this but idk how else to get the id passed to ViewSwimSeason
    // because I can't use useContext(DataContext) in this function
    console.log("id in viewSwimSetLoader: ", params.id)
    return params.id
}

export default function ViewSwimSeason() {
    //let id = "testSeason";
    //let swimSeasons = useLoaderData()[2];
    //let swimSeason = swimSeasons.find((season) => season["id"] === id)
    let swimSeasons = useContext(DataContext)["swimSeasons"];
    let id = useLoaderData();
    console.log("swimSeasons in ViewSwimSeason: ", swimSeasons);
    const swimSeason = swimSeasons.find(season => season["id"] === id)

    //const swimSeason = useLoaderData();

    if (!swimSeason) {
        return(
            <h1>Swim Season not found....</h1>
        )
    }

    return(
        <div className="App">
            <header className="App-header">
                <CalendarView swimSeason={swimSeason} />
                <SideBySideGrid swimSeason={swimSeason} />
            </header>
        </div>
    )

    /*
            { view==='calendar' ? CalendarView(swimSeason={swimSeason}) : SideBySideGrid(swimSeason={swimSeason}) }

    const [value, setValue] = useState(new Date());
    const testValue = "Just a test value!";
    let swimSeason = useLoaderData()[2];

    function onChange(nextValue) {
        setValue(nextValue);
    }

    function tileContent ( {date, view} ) {
        const body = swimSeason["body"];
        const swimDay = body.find(swimDay => isSameDay(swimDay.datetime, date))
        if (swimDay) {
            //return plan.planned;
            // to be:
            //console.log(swimDay);
            return <CalendarItem swimDay={swimDay} date={date}/>
        }
    }

    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={value}
                tileContent={tileContent}
            />
        </div>
    );
    */
}