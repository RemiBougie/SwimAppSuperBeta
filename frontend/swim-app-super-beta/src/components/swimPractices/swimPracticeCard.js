import React, { useState, useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SwimSetCard from '../swimSets/swimSetCard';
import TagsList from '../swimSets/tagsList';
import SwimSetList from './swimSetList';
import DropdownMenu from '../dropdownMenu';
import { deleteSwimPractice } from '../../hooks/requests';


function SwimPracticeCard( {swimPractice, allSwimSets, additionalMenuOptions=[], clickHandler=null} ) {
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const navigate=useNavigate();

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuVisible(false);
        }
    }

    const handleDelete = (swimPractice) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this swimPractice?");

        if (confirmDelete) {
            deleteSwimPractice(swimPractice);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /*
    // if menuOptions not passed in as a prop, set to default values
    if (!menuOptions) {
        menuOptions = [
            {'onClick': null, "text": <Link to={`/WriteSwimPractice/${swimPractice["id"]}`}>Edit</Link>},
            {'onClick': () => handleDelete(swimPractice), "text": "Delete"}
        ]

        if (clickHandler) {
            menuOptions.push({'onClick': () => clickHandler(swimPractice), 'text': 'Add to Swim Season'})
        }
    }
    */

    let menuOptions = [
        {'onClick': null, "text": <Link to={`/WriteSwimPractice/${swimPractice["id"]}`}>Edit</Link>},
        {'onClick': () => handleDelete(swimPractice), "text": "Delete"}
    ]

    for (const option of additionalMenuOptions) {
        menuOptions.push(option);
    }
    //console.log("menuOptions: ", menuOptions);


    return(
        <div className="practice-card" key={swimPractice["id"]}
            onClick={(e) => {
                e.preventDefault();
                if (clickHandler) {
                    clickHandler(swimPractice)
                }
            }}>
            <div className="swimCard-header">
                { swimPractice["favorite"] ? <p className="swimCard_favorite">💙</p> : null}
                { swimPractice["swimPractice_title"].length > 0 ? <h3 className="swimCard_title">{swimPractice["swimPractice_title"]}</h3> : null }
                <button
                    className="swimSetCard-button"
                    onClick={toggleMenu}
                >...</button>
            </div>
            { isMenuVisible && (
                <div ref={menuRef}>
                    <DropdownMenu data={menuOptions} />
                </div>
            )}
            <TagsList tagArray={swimPractice["swimPractice_tags"]} />
            <SwimSetList swimSets={swimPractice["body"]} allSwimSets={allSwimSets}/>
            <p style={{"fontSize": "12px"}}>{swimPractice["notes"]}</p>
        </div>
    );
}

export default SwimPracticeCard;