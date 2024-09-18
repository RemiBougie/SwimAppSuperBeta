import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DataContext } from './Root';

import { postSwimPractice } from '../hooks/requests';
import * as allTags from '../allTags';
import TagSelection from '../components/search/tagSelection';
import SwimSetCard from '../components/swimSets/swimSetCard';
import WriteSwimSet from './WriteSwimSet';
import BrowseSwimSets from './BrowseSwimSets';

const blankSwimPractice = {
    id: uuidv4(),
    swimPractice_title: '',
    swimPractice_tags: [],
    body: [],
    notes: '',
    rating: 0.0,
    favorite: false
}

export async function loader( {params} ) {
    return params.swimPractice_id;
}

export default function WriteSwimPractice( {swimPractice_id=null, submitHandler=null}) {
    // If this <WriteSwimPractice /> component is mounted within another component (when editing a swimSeason), 
    // then swimPractices and setSwimPractices are hooks used to pass the swimPractice data up to the parent component

    // The below block of code initializes a swimPractice object to either be a blankSwimPractice (when creating
    // a new swimPractice) or an existing swimPractice found by id in the URL (for editing an existing swimPractice)
    let URL_id = useLoaderData();
    if (!swimPractice_id) {
        swimPractice_id = URL_id;
    }
    
    let allSwimSets = useContext(DataContext)['swimSets'];
    let allSwimPractices = useContext(DataContext)['swimPractices'];
    const allTagsClone = structuredClone(allTags["allTags"]);

    let swimPractice = null;
    let existing = false;

    if (swimPractice_id === 'new' || submitHandler) {
        swimPractice = blankSwimPractice;
    } else {
        swimPractice = allSwimPractices.find(swimPractice => swimPractice.id === swimPractice_id);
        existing = true;
    }

    // set swimSets state, the list of swimSets in the swimPractice
    let selectedSwimSets = [];
    for (const swimSet_id of swimPractice['body']) {
        let foundSwimSet = allSwimSets.find(swimSet => swimSet['id'] === swimSet_id);
        if (foundSwimSet) {
            selectedSwimSets.push(foundSwimSet);
        };
    }
    let [swimSets, setSwimSets] = useState(selectedSwimSets);

    // set selectedTags state
    for (const category in allTagsClone) {
        Object.keys(allTagsClone[category]).map((subcategory) => {
            allTagsClone[category][subcategory] = swimPractice['swimPractice_tags'].includes(subcategory);
        })
    }
    let [selectedTags, setSelectedTags] = useState(allTagsClone);

    let [formData, setFormData] = useState({
        id: swimPractice['id'],
        swimPractice_title: swimPractice['swimPractice_title'],
        notes: swimPractice['notes'],
        rating: swimPractice['rating'],
        favorite: swimPractice['favorite']
    });

    const navigate = useNavigate();

    // TEST TO SEE IF STATE IS SET CORRECTLY
    /*
    console.log('swimPractice: ', swimPractice);
    console.log('selectedSwimSets: ', swimSets);
    console.log('selectedTags: ', selectedTags);
    console.log('formData: ', formData);
    */
 
    // The above block of code initializes a swimPractice object to either be a blankSwimPractice (when creating
    // a new swimPractice) or an existing swimPractice found by id in the URL (for editing an existing swimPractice)

    let [writeSwimSetVisibility, setWriteSwimSetVisibility] = useState(false);
    let [browseSwimSetVisibility, setBrowseSwimSetVisibility] = useState(false);
    let [errors, setErrors] = useState([]);

    useEffect(() => {
        setWriteSwimSetVisibility(false);
        setBrowseSwimSetVisibility(false);
      }, [swimSets]);

    const addSwimSet = (swimSet) => {
        setSwimSets([...swimSets, swimSet])
    };

    const removeSwimSet = (selectedSwimSet) => {
        setSwimSets(swimSets.filter((swimSet) => swimSet.id !== selectedSwimSet.id))
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

    const validateData = (saveAsNew) => {
        let formErrors = [];
        /* validating swimPractice: 
        1. There is at least one swimSet
        2. Validate rating
        */
        try {
            let fieldErrors = {};
            if (swimSets.length === 0) {fieldErrors['swimSets'] = 'At least one swim set is required.'};
            //if (Object.keys(fieldErrors).length > 0 ) {formErrors = [...formErrors, fieldErrors]};
            if (Object.keys(fieldErrors).length > 0 ) {formErrors.push('There must be at least one swimSet.')};
        } catch (error) {
            console.error(error);
            formErrors.push('There must be at least one swimSet.')
        }

        if (formData['rating'] <0.0 || formData['rating'] > 5.0) {formErrors.push('Rating must be between 0.0 and 5.0')};

        let temp = formData;
        let body = [];
        for (const swimSet of swimSets) {
            body = [...body, swimSet['id']];
        }

        temp['body'] = body;

        temp['swimPractice_tags'] = findTrueTags(selectedTags);
        temp['owner'] = 'RemiB123';
        if (saveAsNew && existing) {
            temp['id'] = uuidv4();
        }
        setFormData(temp);

        return formErrors;
    }

    const handleSubmit = (saveAsNew) => {
        let formErrors = validateData(saveAsNew);
        console.log('saveAsNew', saveAsNew);

        if (formErrors.length === 0) {
            postSwimPractice(formData)
            .then((response) => {
                console.log('Form Data Submitted: ', formData);
                //console.log('response: ', response);
                return response;
            })
            .then((response) => {
                if (response.ok && submitHandler) {
                    submitHandler(formData);
                }
            })
            .then(() => {
                //navigate('/BrowseSwimPractices');
                // problem with this: if the WriteSwimPractice is a child of another 
                // in-progress form, all progess is lost when clicking "submit"
            })
        } else {
            setErrors(formErrors);
            console.log("ERRORS: ", errors);
        }
        
    }

    return (
        <div className="write-swim-practice">
            <label>Swim Practice Title</label><br/>
            <input 
                type="text"
                id="swim-practice-title"
                name="swim-practice-title"
                defaultValue={formData['swimPractice_title']}
                onChange={(e) => {
                    e.preventDefault();
                    let temp = formData;
                    temp['swimPractice_title'] = e.target.value;
                    setFormData(temp);
                }}
            /><br/>

            <label>Categories</label><br/>
            <TagSelection tagsSearch={selectedTags} setTagsSearch={setSelectedTags}/>

            <label>Swim Sets</label><br/>
            <div className="writeSwimPractice-displaySwimSets">
                {
                    swimSets.map((item) => {
                        //console.log("this swimSet should be displaying...", item);
                        return <SwimSetCard swimSet={item} clickHandler={removeSwimSet}/>
                    })
                }
            </div>

            { writeSwimSetVisibility ? <WriteSwimSet swimSets={swimSets} setSwimSets={setSwimSets}/> : null}
            { browseSwimSetVisibility ? <BrowseSwimSets clickHandler={addSwimSet} /> : null}
            <button
                onClick={(e)=> {
                    e.preventDefault()
                    setWriteSwimSetVisibility(!writeSwimSetVisibility);
                    setBrowseSwimSetVisibility(false);
                }
                }
            >Write New Swim Set</button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setBrowseSwimSetVisibility(!browseSwimSetVisibility);
                    setWriteSwimSetVisibility(false);
                }}
            >Select Existing Swim Set</button><br/>

            <label>Notes</label><br/>
            <textarea
                id="swim-practice-notes"
                name="swim-practice-notes"
                defaultValue={formData['notes']}
                onChange={(e) => {
                    e.preventDefault();
                    let temp = formData;
                    temp['notes'] = e.target.value;
                    setFormData(temp);
                }}
            /><br/>

            <label>Rating</label><br/>
            <input 
                type="number" 
                id="swim-practice-rating" 
                name="swim-practice-rating" 
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
                id="swim-practice-favorite" 
                name="swim-practice-favorite" 
                defaultValue={formData['favorite']}
                onChange={(e) => {
                    e.preventDefault();
                    let temp = formData;
                    temp['favorite'] = !formData['favorite'];
                    setFormData(temp);
                }}/><br/>
            {errors.length > 0 ? <div>{ errors.map(error => <p className="error">{error}</p>) }</div> : null}

            { existing ? 
                <div>
                    <button 
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(true)}}>Save As New</button>
                    <button 
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit(false)}}>Edit Original</button>
                </div>
                : <button 
                onClick={(e)=> {
                    e.preventDefault();
                    handleSubmit(true)
                }}>Save</button>
            }
            
        </div>
    )
}
