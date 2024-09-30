import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SwimSetCard from "../swimSets/swimSetCard";
import TagsList from "../swimSets/tagsList";
import SwimSetList from "./swimSetList";
import DropdownMenu from "../dropdownMenu";
import WriteSwimPractice from "../../routes/WriteSwimPractice";
import { deleteSwimPractice } from "../../hooks/requests";

function SwimPracticeCard({
  swimPractice,
  allSwimSets,
  openModal = null,
  closeModal = null,
  setModalComponent = null,
  additionalMenuOptions = [],
  clickHandler = null,
}) {
  let [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // for toggling menu visibility
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

  const handleDelete = (swimPractice) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this swimPractice?"
    );

    if (confirmDelete) {
      deleteSwimPractice(swimPractice);
    }
  };

  let menuOptions = [
    {
      onClick: () => {
        openModal();
        setModalComponent(
          <WriteSwimPractice
            swimPractice_id={swimPractice["id"]}
            submitHandler={closeModal}
          />
        );
      },
      text: "Edit",
    },
    { onClick: () => handleDelete(swimPractice), text: "Delete" },
  ];

  menuOptions = menuOptions.concat(additionalMenuOptions);

  return (
    <div
      className="swim-practice-card"
      key={swimPractice["id"]}
      onClick={(e) => {
        e.preventDefault();
        if (clickHandler) {
          clickHandler(swimPractice);
        }
      }}
    >
      <div className="swimCard-header">
        {swimPractice["swimPractice_title"].length > 0 ? (
          <h3 className="swimCard_title">
            {swimPractice["swimPractice_title"]}
          </h3>
        ) : null}
        {swimPractice["favorite"] ? (
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
          onClick={toggleMenu}
          style={{
            backgroundColor: `${isMenuVisible ? "white" : "transparent"}`,
            color: `${isMenuVisible ? "#757575" : "white"}`,
          }}
        >
          ⋮
        </button>
      </div>
      {isMenuVisible && (
        <div ref={menuRef}>
          <DropdownMenu data={menuOptions} />
        </div>
      )}
      <TagsList tagArray={swimPractice["swimPractice_tags"]} />
      <div className="swim-practice-set-list">
        <SwimSetList swimSets={swimPractice["body"]} allSwimSets={allSwimSets} />
      </div>
      <p style={{ fontSize: "12px" }}>{swimPractice["notes"]}</p>
    </div>
  );
}

export default SwimPracticeCard;
