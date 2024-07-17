import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { postSwimPractice } from '../hooks/requests';
import * as allTags from '../allTags';
import TagSelection from '../components/search/tagSelection';
import SwimSetCard from '../components/swimSets/swimSetCard';
import WriteSwimSet from './WriteSwimSet';
import BrowseSwimSets from './BrowseSwimSets';

const allTagsClone = structuredClone(allTags["allTags"]);

export default function WriteSwimPractice() {
    let [swimSets, setSwimSets] = useState([]);
    let [selectedTags, setSelectedTags] = useState(allTagsClone);
    let [formData, setFormData] = useState({
        swimSet_title: '',
        notes: '',
        rating: 0.0,
        favorite: false
    });
    let [writeSwimSetVisibility, setWriteSwimSetVisibility] = useState(false);
    let [browseSwimSetVisibility, setBrowseSwimSetVisibility] = useState(false);
    let [errors, setErrors] = useState([]);

    useEffect(() => {
        console.log('re-render!')
        console.log('swimSets in useEffect: ', swimSets);
        setWriteSwimSetVisibility(false);
        setBrowseSwimSetVisibility(false);
      }, [swimSets]);

    const addSwimSet = (swimSet) => {
        console.log("addSwimSet() called!");
        setSwimSets([...swimSets, swimSet])
    };

    const removeSwimSet = (selectedSwimSet) => {
        console.log("removeSwimSet() called!");
        setSwimSets(swimSets.filter((swimSet) => swimSet.id !== selectedSwimSet.id))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postSwimPractice(formData)
    }

    return (
        <div className="App">
            <header className="App-header">
                <form onSubmit={handleSubmit}>
                    <label>Swim Practice Title</label><br/>
                    <input 
                        type="text"
                        id="swim-practice-title"
                        name="swim-practice-title"
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
