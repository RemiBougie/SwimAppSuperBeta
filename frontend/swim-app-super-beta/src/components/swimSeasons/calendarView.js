import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLoaderData } from 'react-router-dom';

import CalendarItem from './calendarItem';

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export default function CalendarView ( { swimSeason } ) {
    const [value, setValue] = useState(new Date());

    //console.log("swimSeason in CalendarView(): ", swimSeason);

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
}