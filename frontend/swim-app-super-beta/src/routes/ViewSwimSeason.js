import React, { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLoaderData } from 'react-router-dom';

import CalendarView from '../components/swimSeasons/calendarView';
import SideBySideGrid from '../components/swimSeasons/sideBySideGrid';
import WriteSwimPractice from './WriteSwimPractice';
import Modal from '../components/modal';

import { DataContext } from './Root';

export async function loader( { params } ) {
    // a clumsy ass way of doing this but idk how else to get the id passed to ViewSwimSeason
    // because I can't use useContext(DataContext) in this function
    return params.swimSeason_id
}

export default function ViewSwimSeason() {
    let swimSeasons = useContext(DataContext)["swimSeasons"];
    let id = useLoaderData();
    let [modalVisibility, setModalVisibility] = useState(false);
    let [componentToRender, setComponentToRender] = useState(null)
    let [swimSeason, setSwimSeason] = useState(swimSeasons.find(season => season["id"] === id))
    let [dataToEdit, setDataToEdit] = useState({"swimPlan_id": "", "data": ""});
    let [swimPracticeId, setSwimPracticeId] = useState('');

    useEffect(() => {
        if (swimPracticeId != '') {
            updateData(swimPracticeId);
            setSwimPracticeId('');
        }
    }, [swimPracticeId]);

    if (!swimSeason) {
        return(
            <h1>Swim Season not found....</h1>
        )
    } 

    const openModal = () => setModalVisibility(true);
    const closeModal = () => setModalVisibility(false);

    /* The below commented-out code is probably best practice, but I don't wanna deal with it rn lol
    const handleComponentChange = (component) => {
        setComponentToRender(component);
    }

    const handleDataToEditChange = (data) => {
        //console.log("handleDataToEditChange called!");
        console.log(data);
        setDataToEdit(data);
    }
    */

    // modifies data that is referenced in the dataToEdit state variable
    const updateData = (newData) => { 
        let temp = swimSeason;
        let swimPlan_id = dataToEdit["swimPlan_id"];
        let data = dataToEdit["data"];

        let dataIndex = temp["body"].findIndex((swimPlan) => swimPlan["id"] === swimPlan_id);
        let oldSwimPlan = temp["body"][dataIndex][data];
        if (dataIndex > 0) {temp["body"][dataIndex][data] = newData;}

        setSwimSeason(temp);     
    };

    const addSwimPractice = (swimPractice) => {
        setSwimPracticeId(swimPractice["id"]);
        closeModal();
    };

    const dataHandler = () => {
        console.log("dataHandler in viewSwimSeason!");
    }

    return(
        <div className="view-swim-season">
            <CalendarView swimSeason={swimSeason} />
            <SideBySideGrid 
                swimSeason={swimSeason} 
                openModal={openModal} 
                setComponentToRender={setComponentToRender}
                setDataToEdit={setDataToEdit}
                dataHandler={addSwimPractice}/>
            <Modal 
                isOpen={modalVisibility} 
                onClose={closeModal} 
                componentToRender={componentToRender}/>
        </div>
    )
}