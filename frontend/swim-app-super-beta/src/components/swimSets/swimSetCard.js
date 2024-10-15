import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import TagsList from "./tagsList";
import GroupList from "./groupList";
import { deleteSwimSet } from "../../utils/requests";
import DropdownMenu from "../dropdownMenu";
import Modal from "../modal";
import WriteSwimSet from "../../routes/WriteSwimSet";
//import '../App.css';

function SwimSetCard({
  swimSet,
  openModal = null,
  closeModal = null,
  setModalComponent = null,
  additionalMenuOptions = [],
  removeSwimSet = null,
  clickHandler = null,
}) {
  //( {swimSet_id, swimSet_title, swimSet_tags, swimSet, swimSet_notes}) {
  //console.log("swimSet in swimSetCard(): ", swimSet);
  let [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuVisible(false);
    }
  };

  const handleDelete = (swimSet) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this swimSet?"
    );

    if (confirmDelete) {
      deleteSwimSet(swimSet);
    }
  };

  let menuOptions = [
    //{'onClick': null, "text": <Link to={`/WriteSwimSet/${swimSet["id"]}`}>Edit</Link>},
    {
      onClick: () => {
        openModal();
        setModalComponent(
          <WriteSwimSet swimSet_id={swimSet["id"]} submitHandler={closeModal} />
        );
      },
      text: "Edit",
    },
    { onClick: () => handleDelete(swimSet), text: "Delete" },
  ];

  //menuOptions = menuOptions.concat(additionalMenuOptions);
  if (removeSwimSet) {
    console.log("removeSwimSet got passed to swimSetCard!");
    menuOptions = menuOptions.concat([
      { onClick: () => removeSwimSet(swimSet), text: "Remove from practice" },
    ]);
  }

  return (
    <div
      className="swim-set-card"
      key={swimSet["swimSet_id"]}
      onClick={(e) => {
        e.preventDefault();
        if (clickHandler) {
          clickHandler(swimSet);
        }
      }}
    >
      <div className="swimCard-header">
        {swimSet["swimSet_title"].length > 0 ? (
          <h3 className="swimCard_title">{swimSet["swimSet_title"]}</h3>
        ) : null}
        {swimSet["favorite"] ? (
          <p className="swimCard_favorite" style={{ color: "red" }}>
            ♡
          </p>
        ) : (
          <p className="swimCard_favorite" style={{ color: "white" }}>
            ♡
          </p>
        )}
        <button
          className="swimSetCard-button"
          style={{
            backgroundColor: `${isMenuVisible ? "white" : "transparent"}`,
            color: `${isMenuVisible ? "#757575" : "white"}`,
          }}
          onClick={toggleMenu}
        >
          ⋮
        </button>
      </div>

      {isMenuVisible && (
        <div ref={menuRef}>
          <DropdownMenu data={menuOptions} />
        </div>
      )}
      <TagsList tagArray={swimSet["swimSet_tags"]} />
      <GroupList swimSet_id={swimSet["swimSet_id"]} swimSet={swimSet["body"]} />
      {swimSet["notes"] !== "" ? (
        <div className="swim-practice-set-list" >
            <p className="swim-set-card-notes">{swimSet["notes"]}</p>
        </div>
      ) : null}
    </div>
  );
}

export default SwimSetCard;

/*
<li><Link to={`/WriteSwimSet/${swimSet["id"]}`}>Edit</Link></li>
                <li onClick={()=>{
                    handleDelete(swimSet);
                }}>Delete</li>
                <li onClick={()=>{
                    if (clickHandler) {
                        clickHandler(swimSet)
                    }}}>Add to Swim Practice</li>
*/
