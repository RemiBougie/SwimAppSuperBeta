import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import TagsList from './tagsList';
import GroupList from './groupList';
import { deleteSwimSet } from '../../hooks/requests';
//import '../App.css';

function SwimSetCard ({swimSet, clickHandler=null}) {//( {swimSet_id, swimSet_title, swimSet_tags, swimSet, swimSet_notes}) {
    //console.log("swimSet in swimSetCard(): ", swimSet);
    let [isMenuVisible, setIsMenuVisible] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuVisible(false);
        }
    }

    const handleDelete = (swimSet) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this swimSet?");

        if (confirmDelete) {
            deleteSwimSet(swimSet);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
    <div className="App-card" key={swimSet["swimSet_id"]}
        onClick={(e) => {
            e.preventDefault();
            if (clickHandler) {
                clickHandler(swimSet)
            }
        }}>

        <div className="swimCard-header">
            { swimSet["favorite"] ? <p className="swimCard_favorite">❤️</p> : null}
            { swimSet["swimSet_title"].length > 0 ? <h3 className="swimCard_title">{swimSet["swimSet_title"]}</h3> : null }
            <button
                className="swimSetCard-button"
                onClick={toggleMenu}
            >...</button>
        </div>
        
        { isMenuVisible && (
            <ul className="swimSetCard-menu" ref={menuRef}>
                <li><Link to={`/WriteSwimSet/${swimSet["id"]}`}>Edit</Link></li>
                <li onClick={()=>{
                    handleDelete(swimSet);
                }}>Delete</li>
                <li onClick={()=>{
                    if (clickHandler) {
                        clickHandler(swimSet)
                    }}}>Add to Swim Practice</li>
            </ul>
        )}
        <TagsList tagArray={swimSet["swimSet_tags"]} />
        <GroupList swimSet_id={swimSet["swimSet_id"]} swimSet={swimSet["body"]} />
        <p style={{"fontSize": "12px"}}>{swimSet["notes"]}</p>
    </div>
    );
}

export default SwimSetCard;