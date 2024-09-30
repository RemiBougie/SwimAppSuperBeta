import React, { useState } from 'react';
import WriteSwimPractice from '../../../routes/WriteSwimPractice';
import BrowseSwimPractices from '../../../routes/BrowseSwimPractices';

export default function IncompleteSwimPlanCard( {openModal, setComponentToRender, setDataToEdit, swimPlan, dataHandler} ) {
    let data = {"swimPlan_id": swimPlan["id"], "data": "completed"};

    return(
        <div className="incomplete-swim-plan-card">
            <button onClick={(e) => {
                e.preventDefault();
                setDataToEdit(data);
                dataHandler({"id": swimPlan["planned"]});
            }}>✓ Completed As Planned</button>

            <button onClick={(e) => {
                e.preventDefault();
                setDataToEdit(data);
                setComponentToRender(<WriteSwimPractice swimPractice_id={swimPlan["planned"]} submitHandler={dataHandler}/>);
                openModal();
            }}>✎ Modified From Planned</button>

            <button onClick={(e) => {
                e.preventDefault();
                setDataToEdit(data);
                setComponentToRender(<BrowseSwimPractices clickHandler={dataHandler} />);
                openModal()
            }}>🔍 Different Existing Practice</button>

            <button onClick={(e) => {
                e.preventDefault();
                openModal();
                setDataToEdit(data);
                setComponentToRender(<WriteSwimPractice swimPractice_id="new" submitHandler={dataHandler} />)
            }}>+  New Practice</button>

            <button onClick={(e) => {
                e.preventDefault();
                setDataToEdit(data);
                dataHandler({"id": "canceled"});
            }}>✕ Practice Canceled</button>
        </div>
    )
}