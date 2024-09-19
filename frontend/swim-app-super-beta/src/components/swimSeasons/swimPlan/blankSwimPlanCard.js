import React, { useState } from 'react';
import BrowseSwimPractices from '../../../routes/BrowseSwimPractices';
import WriteSwimPractice from '../../../routes/WriteSwimPractice';

export default function BlankSwimPlanCard( {openModal, setComponentToRender, setDataToEdit, swimPlan, dataHandler} ) {
    let data = {"swimPlan_id": swimPlan["id"], "data": "planned"}

    return(
        <div className="blank-swim-plan-card">
            <button onClick={(e) => {
                e.preventDefault();
                setDataToEdit(data);
                setComponentToRender(<BrowseSwimPractices clickHandler={dataHandler}/>);
                openModal();
                }}>Select Existing Practice</button>
            <button onClick={(e) => {
                e.preventDefault();
                openModal();
                setDataToEdit(data);
                setComponentToRender(<WriteSwimPractice swimPractice_id="new" submitHandler={dataHandler}/>);
                }}>Write New Practice</button>
        </div>
    )
}
