import React from 'react';
import '../App.css';

export default function WriteGroupCard( {group, removeGroup, editGroup}) {

    return(
        <div className="App-groupCard" key={group['id']}>
            <label>Group Name</label>
            <textarea
                type="text" 
                value={group.groupName}
                id={`${group['id']}_groupName`} 
                onChange={(e) => {
                    //e.preventDefault();
                    let groupName = e.target.value;
                    editGroup(group['id'], groupName, group['workout']);
                }
            }/>
            <label>Workout</label>
            <textarea
                type="text" 
                value={group.workout} 
                id={`${group['id']}_workout`} 
                onChange={(e) => {
                    let workout = e.target.value;
                    editGroup(group['id'], group['groupName'], workout);
                }
            }/>
            <button onClick={(e)=>{
                removeGroup(group['id'])
            }}>X</button>
        </div>
    )
}

/*
 value={`${groupName}`}
  value={`${workout}`}


  //e.preventDefault();
                console.log("groups: ", groups);
                console.log("id: ", id);
                /* let temp = groups;
                temp.splice(id, 1);
                console.log(temp); 
                setGroups(groups.filter(group => group.id !== id));
                console.log("groups after splice: ", groups);
*/