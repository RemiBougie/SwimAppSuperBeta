import React, { useState, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import { generateSwimPracticeCards } from '../../routes/BrowseSwimPractices';
import SwimPracticeCard from '../swimPractices/swimPracticeCard';
import BlankSwimPlanCard from './swimPlan/blankSwimPlanCard';
import IncompleteSwimPlanCard from './swimPlan/incompleteSwimPlanCard';

import { DataContext } from '../../routes/Root';
import CanceledCard from './swimPlan/canceledSwimPlanCard';

export default function SideBySideItem( { swimDay, openModal, setComponentToRender, setDataToEdit, dataHandler } ) {
    console.log("swimDay: ", swimDay);
    //const allSwimSets = useLoaderData()[0];
    //const allSwimPractices = useLoaderData()[1];
    const allSwimSets = useContext(DataContext)["swimSets"];
    const allSwimPractices = useContext(DataContext)["swimPractices"]

    //let [swimPlanType, setSwimPlanType] = useState("blank");

    //console.log("allSwimSets in SideBySideItem: ", allSwimSets);

    let plannedSwimPractice = allSwimPractices.find((practice) => practice.id === swimDay['planned']);
    let completedSwimPractice = allSwimPractices.find((practice) => practice.id === swimDay['completed']);

    // blank: nothing planned or completed
    // incomplete: planned but not completed
    // complete: planned and completed
    // canceled: planned but completed="canceled"
    let data = "planned"
    let swimPlanType="blank";
    if (plannedSwimPractice) {
        if (swimDay["completed"] === "canceled") {
            swimPlanType="canceled"
            data="completed"
        } else if (completedSwimPractice) {
            swimPlanType="complete"
            data = "completed"
        } else {
            //setSwimPlanType("incomplete");
            swimPlanType="incomplete"
        }
    }
    //console.log("plannedSwimPractice: ", plannedSwimPractice);
    //console.log("completedSwimPractice: ", completedSwimPractice);
    //console.log("swimPlanType: ", swimPlanType);

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

    const clickHandler = () => {
        console.log("clickHandler!");
    }

    const removeFromPlan = () => {
        console.log("removing from plan...");
        setDataToEdit({"swimPlan_id": swimDay['id'], "data": data});
        dataHandler({'id': null});
    }

    const removeSwimPracticeOptions = [{'onClick': () => removeFromPlan(), 'text': 'Remove from plan'}]

    
    return (
        <div className="side-by-side-item">
            <p className="side-by-side-date"> {swimDay['datetime'].toString()}</p>
            <div className="side-by-side-data">
                { swimPlanType==="blank" ? 
                    <>
                        <BlankSwimPlanCard 
                        openModal={openModal} 
                        setComponentToRender={setComponentToRender} 
                        setDataToEdit={setDataToEdit}
                        swimPlan={swimDay}
                        dataHandler={dataHandler}/>
                    </>
                    : null
                }
                { swimPlanType==="incomplete" ? 
                    <>
                        <SwimPracticeCard 
                            swimPractice={plannedSwimPractice} 
                            allSwimSets={allSwimSets} 
                            additionalMenuOptions={removeSwimPracticeOptions}/>
                        <IncompleteSwimPlanCard 
                            openModal={openModal} 
                            setComponentToRender={setComponentToRender}
                            setDataToEdit={setDataToEdit}
                            swimPlan={swimDay}
                            dataHandler={dataHandler}/>
                    </>
                    : null
                }
                { swimPlanType==="canceled" ? 
                    <>
                        <SwimPracticeCard 
                            swimPractice={plannedSwimPractice} 
                            allSwimSets={allSwimSets}/>
                        <CanceledCard 
                            setDataToEdit={setDataToEdit}
                            swimPlan={swimDay}
                            dataHandler={dataHandler}/>
                    </>
                    : null
                }
                { swimPlanType==="complete" ?
                    <>
                        <SwimPracticeCard 
                            swimPractice={plannedSwimPractice} 
                            allSwimSets={allSwimSets} />
                        <SwimPracticeCard 
                            swimPractice={completedSwimPractice} 
                            allSwimSets={allSwimSets} 
                            additionalMenuOptions={removeSwimPracticeOptions} />
                    </>
                    : null
                }
                <p className="sbs-placeholder">{ swimDay['comments'] }</p>
            </div>
        </div>
    )

    /* 
{ swimPlanType="incomplete" ?
                    <SwimPracticeCard 
                        swimPractice={plannedSwimPractice} 
                        allSwimSets={allSwimSets} 
                        additionalMenuOptions={removeSwimPracticeOptions}/>
                    <IncompleteSwimPlanCard openModal={openModal} setComponentToRender={setComponentToRender}/>
                : null  
            }

    { swimPlan_type="incomplete" ? 
                    <>
                        <SwimPracticeCard 
                            swimPractice={plannedSwimPractice} 
                            allSwimSets={allSwimSets} 
                            additionalMenuOptions={removeSwimPracticeOptions}/>
                        <IncompleteSwimPlanCard openModal={openModal} setComponentToRender={setComponentToRender}/>
                    </>
                    : null}

                { swimPlan_type="complete" ? 
                    <>
                        <SwimPracticeCard 
                            swimPractice={plannedSwimPractice} 
                            allSwimSets={allSwimSets} />
                         <SwimPracticeCard 
                            swimPractice={completedSwimPractice} 
                            allSwimSets={allSwimSets}
                            additionalMenuOptions={removeSwimPracticeOptions} />
                    </>
                    : null} */
   

    /*
    return (
        <div className="side-by-side-item">
            <p className="side-by-side-date"> { swimDay['datetime'].toString() } </p>
            <p className="side-by-side-date">{ swimPlan_type }</p>
            <div className="side-by-side-data">

                { plannedSwimPractice ? 
                    <SwimPracticeCard 
                        swimPractice={plannedSwimPractice} 
                        allSwimSets={allSwimSets} 
                        additionalMenuOptions={removeSwimPracticeOptions}/>
                    : <BlankSwimPlanCard 
                        openModal={openModal} 
                        setComponentToRender={setComponentToRender} 
                        setDataToEdit={setDataToEdit}
                        swimPlan={swimDay}
                        dataHandler={dataHandler}/> }
                
                { completedSwimPractice ? 
                    <SwimPracticeCard swimPractice={completedSwimPractice} allSwimSets={allSwimSets} /> 
                    : plannedSwimPractice && <IncompleteSwimPlanCard openModal={openModal} setComponentToRender={setComponentToRender}/> }
                <p className="sbs-placeholder">{ swimDay['comments'] }</p>
            </div>
        </div>
    )
    */
}