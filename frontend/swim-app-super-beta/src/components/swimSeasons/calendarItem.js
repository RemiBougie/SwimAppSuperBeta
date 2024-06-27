import React from 'react';
import { useLoaderData } from 'react-router-dom';

export default function CalendarItem( { swimDay, date }) {
    const swimPractice = useLoaderData()[1];
    const practice = swimPractice.find(practice => practice.id === swimDay.planned);
    const completed = swimDay.completed !== null;
    let color = completed ? 'green' : 'orange';
    if (practice) {
        if (practice.swimPractice_title.length > 0) {
            return <p style={{backgroundColor: color}}> { practice.swimPractice_title } </p>
        } else {
            return <p background-color={color}> {`Practice on ${date.getMonth()}/${date.getDay()}`} </p>
        }
        //return <p> { practice.swimPractice_title.length > 0 ? practice.swimPractice_title : `Practice on ${date}`}</p>
    }
    
    return <p>Couldn't find the practice...</p>
}