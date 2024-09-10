import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DataContext } from './Root';

import '../App.css';
import * as allTags from '../allTags';
import WriteGroupCard from '../components/writeGroupCard';
import TagSelection from '../components/search/tagSelection';

import { postSwimSet } from '../hooks/requests';

const blankSwimSet = {
    id: uuidv4(),
    swimSet_title: '',
    swimSet_tags: [],
    body: {'': ''},
    notes: '',
    rating: 0.0,
    favorite: false
}

export async function loader( {params}) {
    return params.id;
    //allSwimSets.find(swimSet => swimSet.id === swimSet_id)
}

export default function WriteSwimSet ( {swimSets=null, setSwimSets=null} ) {
    // The below block of code initializes a swimSet object to either be a blankSwimSet (when creating
    // a new swimSet) or an existing swimSet found by id in the URL (for editing an existing swimSet)
    let id = useLoaderData();
    let allSwimSets = useContext(DataContext)['swimSets'];
    const allTagsClone = structuredClone(allTags["allTags"]);

    let swimSet = null;

    if (id === 'new' || swimSets) {
        swimSet = blankSwimSet;
    } else {
        swimSet = allSwimSets.find(swimSet => swimSet.id === id)
    }

    // set groups state
    let allGroups = []
    for (const groupName of Object.keys(swimSet['body'])) {
        allGroups = [...allGroups, {id: uuidv4(), groupName: groupName, workout: swimSet['body'][groupName]}]
    }
    let [groups, setGroups] = useState(allGroups);

    // set selectedTags state
    for (const category in allTagsClone) {
        Object.keys(allTagsClone[category]).map((subcategory) => {
            allTagsClone[category][subcategory] = swimSet['swimSet_tags'].includes(subcategory);
        })
    }
    let [selectedTags, setSelectedTags] = useState(allTagsClone);

    let [formData, setFormData] = useState({
        id: swimSet['id'],
        swimSet_title: swimSet['swimSet_title'],
        notes: swimSet['notes'],
        rating: swimSet['rating'],
        favorite: swimSet['favorite']
    });
    let [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    // The above block of code initializes a swimSet object to either be a blankSwimSet (when creating
    // a new swimSet) or an existing swimSet found by id in the URL (for editing an existing swimSet)


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
        let formErrors = [];
        // validate groups
        try {
            groups.forEach((group) => {
                let fieldErrors = {};
                console.log("GROUP: ", group);
                console.log("group[groupName].length", group['groupName'].length);
                if (group['groupName'].length === 0) {fieldErrors['groupName'] = 'Group Name is required.'};
                if (group['workout'].length === 0) {fieldErrors['workout'] = 'Workout is required.'};
                // TO DO: make sure groupName is unique within the body
                //if (Object.keys(fieldErrors).length > 0 ) {formErrors = [...formErrors, fieldErrors]};
                if (Object.keys(fieldErrors).length > 0 ) {formErrors.push("There is an issue with the groups. Make sure groups are named and each group has a workout.")};
            })
        } catch (error) {
            console.error(error);
            //formErrors.push({'groups': 'There must be at least one group in the swimSet.'});
            formErrors.push("There is an issue with the groups. Make sure groups are named and each group has a workout.")
        }
        // validate rating
        if (formData['rating'] < 0.0 || formData['rating'] > 5.0) formErrors.push('Rating must be between 0.0 and 5.0');

        // reformat the formData to match what should get written to the DB
        let temp = formData;
        let body = {};
        for (const group of groups) {
            body[group['groupName']] = group['workout'];
            //body.push(data);
        }
        temp['body'] = body;

        temp['swimSet_tags'] = findTrueTags(selectedTags);
        temp['owner'] = 'RemiB123';
        //temp['id'] = uuidv4();
        setFormData(temp);

        console.log('formData after validation: ', formData)

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
                return response
            })
            .then((response) => {
                console.log('response.ok', response.ok);
                console.log('setSwimSets', setSwimSets);
                if (response.ok && setSwimSets) {
                    console.log('Setting swimSets!');
                    setSwimSets([...swimSets, formData]);
                }
            })
            .then(() => {
                navigate('/BrowseSwimSets');
            })
        } else {
            setErrors(formErrors);
            console.log("ERRORS: ", errors);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="writeSwimSetForm">
                    <label>Swim Set Title</label><br/>
                    <input 
                        type="text" 
                        id="swim-set-title" 
                        name="swim-set-title" 
                        defaultValue={formData['swimSet_title']}
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
                    <textarea
                        id="swim-set-notes" 
                        name="swim-set-notes" 
                        defaultValue={formData['notes']}
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
                        defaultValue={formData['rating']}
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
                        defaultValue={formData['favorite']}
                        onChange={(e) => {
                            e.preventDefault();
                            let temp = formData;
                            temp['favorite'] = !formData['favorite'];
                            setFormData(temp);
                        }}/><br/>
                    {errors.length > 0 ? <div>{ errors.map(error => <p className="error">{error}</p>) }</div> : null}
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </header>
        </div>
     )
}