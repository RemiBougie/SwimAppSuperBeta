import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { DataContext } from '../../routes/Root';

export default function CalendarItem( { swimDay, date, handleCalendarItemClick }) {
    const swimPractices = useContext(DataContext)["swimPractices"];
    const practice = swimPractices.find(practice => practice.id === swimDay.planned);
    const completed = swimDay.completed !== null;
    let color = completed ? 'green' : 'orange';
    if (practice) {
        if (practice.swimPractice_title.length > 0) {
            return <p 
                style={{backgroundColor: color}}
                onClick={(e) => {
                    e.preventDefault();
                    handleCalendarItemClick(swimDay['id'])}}> { practice.swimPractice_title } </p>
        } else {
            return <p 
                background-color={color}
                onClick={(e) => {
                    e.preventDefault();
                    handleCalendarItemClick(swimDay['id'])}}> {`Practice on ${date.getMonth()}/${date.getDay()}`} </p>
        }
        //return <p> { practice.swimPractice_title.length > 0 ? practice.swimPractice_title : `Practice on ${date}`}</p>
    }
    
    return <p>No practice planned</p>
}