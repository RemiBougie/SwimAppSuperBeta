import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLoaderData } from 'react-router-dom';

import CalendarView from '../components/swimSeasons/calendarView';
import SideBySideGrid from '../components/swimSeasons/sideBySideGrid';
//import CalendarItem from '../components/swimSeasons/calendarItem';
//import { mockSwimSeason } from '../mockData/mockSwimSeason';

export default function Testing() {
    let swimSeason = useLoaderData()[2];

    let [view, setView] = useState('calendar');

    console.log("view: ", view);

    return(
        <div className="App">
            <header className="App-header">
                <button onClick={() => {
                    setView(view==='calendar' ? 'side-by-side' : 'calendar')
                }}>{view==='calendar' ? 'side-by-side' : 'calendar'}</button>
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