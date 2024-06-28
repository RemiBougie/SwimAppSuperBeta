import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLoaderData } from 'react-router-dom';

import '../App.css';
import * as allTags from '../allTags';
import WriteGroupCard from '../components/writeGroupCard';

export default function WriteSwimSet () {
    let [groups, setGroups] = useState([{id: uuidv4(), groupName: '', workout: ''}]);

    function tagSelection() {
        const tagsJSON = allTags["allTags"];
        let div = [];

        //console.log("allTags", tagsJSON);
        //console.log("tagsSearch", tagsSearch);
        //console.log("tagsJSON: ", tagsJSON);
        for (const property in tagsJSON) {
            let subdiv = [];
            let category = tagsJSON[property];
            subdiv = [...subdiv, <h3 key={`label_${property}`}>{property}</h3>]
            for (const label in category) {
                subdiv = [...subdiv,
                    <input 
                        type="checkbox"
                        id={`${label}`}
                        name={`${label}`}
                        value={`${label}`}
                    />,
                    <label>{`${label}`}</label>,
                    <br/>
                ]
            }
            div = [...div, <div className="App-checkboxList" key={`div_${property}`}>{subdiv}</div>];
            //div = [...div, subdiv]
        }

        //console.log("div: ", div);
        //console.log(tagsSearch);
        return (<div className="App-tagSelection">{div}</div>);
    }

    const addGroup = (e) => {
        e.preventDefault();
        const newGroup = {
            id: uuidv4(),
            groupName: '',
            workout: ''
        }
        setGroups([...groups, newGroup]);
    }

    const removeGroup = (id) => {
        setGroups(groups.filter((group) => group.id !== id))
    }

    const editGroup = (id, groupName, workout) => {
        const targetGroup = (obj) => obj['id'] === id;
        let index = groups.findIndex(targetGroup);
        let newGroup = {id: id, groupName: groupName, workout: workout};
        let temp = groups.slice();
        temp.splice(index, 1, newGroup);
        setGroups(temp);
    }

    return (
        <form>
            <label>Swim Set Title</label><br/>
            <input type="text" id="swim-set-title" name="swim-set-title" /><br/>
            <label>Categories</label><br/>
            {tagSelection()}
            <div className="App-swimSetList1">
                {groups.map((obj) =>
                    <WriteGroupCard group={obj} removeGroup={removeGroup} editGroup={editGroup}/>)
                }
            </div>
            <button onClick={(e) => {
                addGroup(e);
                //e.preventDefault();
                //setGroups([...groups, {id: groups.length, groupName: '', workout: ''}]);
            }
            }>+</button>
        </form>
     )
}