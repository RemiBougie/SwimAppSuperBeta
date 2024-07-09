import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLoaderData } from 'react-router-dom';

import '../App.css';
import * as allTags from '../allTags';
import WriteGroupCard from '../components/writeGroupCard';
import TagSelection from '../components/search/tagSelection';

import { postSwimSet } from '../hooks/requests';

export default function WriteSwimSet () {
    let [groups, setGroups] = useState([{id: uuidv4(), groupName: '', workout: ''}]);
    let [selectedTags, setSelectedTags] = useState(allTags['allTags']);
    let [formData, setFormData] = useState({
        swimSet_title: '',
        notes: '',
        rating: 0.0,
        favorite: false
    });
    let [errors, setErrors] = useState([]);

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

    function findTrueTags(tagsArg) {
        let tags = [];
        for (const property in tagsArg) {
            let category = tagsArg[property];
            for (const label in category) {
                if (tagsArg[property][label]) {
                    tags = [...tags, label];
                }
            }
        }
        return tags;
    }

    const validateData = () => {
        let temp = formData;
        let body = [];
        for (const group of groups) {
            let data = {};
            data[group['groupName']] = group['workout'];
            body.push(data);
        }
        temp['body'] = body;

        temp['swimSet_tags'] = findTrueTags(selectedTags);
        temp['owner'] = 'RemiB123';
        temp['id'] = uuidv4();
        setFormData(temp);

        console.log('formData after submission: ', formData)

        let formErrors = [];
        // validate groups
        try {
            formData['body'].forEach((group) => {
                let fieldErrors = {};
                if (group['groupName'].length === 0) fieldErrors['groupName'] = 'Group Name is required.';
                if (group['workout'].length === 0) fieldErrors['workout'] = 'Workout is required.';
                // TO DO: make sure groupName is unique within the body
                if (Object.keys(fieldErrors).length > 0 ) formErrors = [...formErrors, fieldErrors];
            })
        } catch (error) {
            console.error(error);
            formErrors.push({'groups': 'There must be at least one group in the swimSet.'});
        }
        // validate rating
        if (formData['rating'] < 0.0 || formData['rating'] > 5.0) formErrors.push({'rating': 'Rating must be between 0.0 and 5.0'});

        return formErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = validateData();

        if (formErrors.length === 0) {
            postSwimSet(formData)
            .then((response) => {
                console.log('Form Data Submitted:', formData);
                console.log('response: ', response);
            })
        } else {
            setErrors(formErrors);
            console.log("ERRORS: ", errors);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <label>Swim Set Title</label><br/>
                    <input 
                        type="text" 
                        id="swim-set-title" 
                        name="swim-set-title" 
                        onChange={(e) => {
                            e.preventDefault();
                            let temp=formData;
                            temp['swimSet_title'] = e.target.value;
                            setFormData(temp);
                        }}/><br/>
                    <label>Categories</label><br/>
                    <TagSelection tagsSearch={selectedTags} setTagsSearch={setSelectedTags}/>
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
                    }>+</button><br/>
                    <label>Notes</label><br/>
                    <input 
                        type="text" 
                        id="swim-set-notes" 
                        name="swim-set-notes" 
                        onChange={(e) => {
                            e.preventDefault();
                            let temp=formData;
                            temp['notes'] = e.target.value;
                            setFormData(temp);
                        }} /><br/>
                    <label>Rating</label><br/>
                    <input 
                        type="number" 
                        id="swim-set-rating" 
                        name="swim-set-rating" 
                        onChange={(e) => {
                            e.preventDefault();
                            let temp=formData;
                            temp['rating'] = e.target.value;
                            setFormData(temp);
                        }}/><br/>
                    <label>Favorite</label><br/>
                    <input 
                        type="checkbox" 
                        id="swim-set-favorite" 
                        name="swim-set-favorite" 
                        onChange={(e) => {
                            e.preventDefault();
                            let temp = formData;
                            temp['favorite'] = !formData['favorite'];
                            setFormData(temp);
                        }}/><br/>
                    <button type="submit">Submit</button>
                </form>
            </header>
        </div>
     )
}