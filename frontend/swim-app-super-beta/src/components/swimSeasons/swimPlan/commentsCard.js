import React, {useState} from 'react';

export default function CommentsCard({swimPlan, setDataToEdit, commentsEditor}) {
    let [editMode, setEditMode] = useState(false);
    let [comment, setComment] = useState(swimPlan['comments']);
    let data = {"swimPlan_id": swimPlan['id'], "data": "comments"};

    console.log("editMode for swimPlan comments", swimPlan['id'], editMode);

    if (editMode) {
        return(
            <div className='swim-plan-comments'>
                <textarea 
                    defaultValue={comment}
                    onChange={(e) => {
                        e.preventDefault();
                        setComment(e.target.value);
                        console.log("comment: ", comment);
                        setDataToEdit(data);
                    }}
                /> <br />
                <button onClick={(e) => {
                    e.preventDefault();
                    console.log("comment after click: ", comment);
                    commentsEditor(comment);
                    setEditMode(false);
                }}>Save</button>
            </div>
        )
    } else {
        return (
            <div className='swim-plan-comments'>
                <p>{swimPlan['comments']}</p>
                <button onClick={(e) => {
                    e.preventDefault();
                    setEditMode(true);
                    }}>Edit</button>
            </div>
        )
    }
    
}