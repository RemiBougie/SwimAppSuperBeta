import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import TagsList from './tagsList';
import GroupList from './groupList';
//import '../App.css';

function SwimSetCard ({swimSet, clickHandler=null}) {//( {swimSet_id, swimSet_title, swimSet_tags, swimSet, swimSet_notes}) {
    //console.log("swimSet in swimSetCard(): ", swimSet);
    let [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    return (
    <div className="App-card grow" key={swimSet["swimSet_id"]}
        onClick={(e) => {
            e.preventDefault();
            if (clickHandler) {
                clickHandler(swimSet)
            }
        }}
    >
        { swimSet["swimSet_title"].length > 0 ? <h3>{swimSet["swimSet_title"]}</h3> : null }
        <button
            className="swimSetCard-button"
            onClick={toggleMenu}
        >...</button>
        { isMenuVisible  && (
            <div className="swimSetCard-menu">
                <ul className="swimSetCard-menu">
                    <li><Link to={`/WriteSwimSet/${swimSet["id"]}`}>Edit</Link></li>
                    <li>Delete</li>
                    <li onClick={()=>{
                        if (clickHandler) {
                            clickHandler(swimSet)
                        }}}>Add to Swim Practice</li>
                </ul>
            </div> 
        )}
        <TagsList tagArray={swimSet["swimSet_tags"]} />
        <GroupList swimSet_id={swimSet["swimSet_id"]} swimSet={swimSet["body"]} />
        <p style={{"fontSize": "12px"}}>{swimSet["swimSet_notes"]}</p>
    </div>
    );
}

export default SwimSetCard;