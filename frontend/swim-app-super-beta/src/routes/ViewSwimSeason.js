import React, { useState, useContext, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLoaderData } from "react-router-dom";

import CalendarView from "../components/swimSeasons/calendarView";
import SideBySideGrid from "../components/swimSeasons/sideBySideGrid";
import WriteSwimPractice from "./WriteSwimPractice";
import Modal from "../components/modal";

import { DataContext } from "./Root";

export async function loader({ params }) {
  // a clumsy ass way of doing this but idk how else to get the id passed to ViewSwimSeason
  // because I can't use useContext(DataContext) in this function
  return params.swimSeason_id;
}

export default function ViewSwimSeason() {
  let swimSeasons = useContext(DataContext)["swimSeasons"];
  let id = useLoaderData();
  let [modalVisibility, setModalVisibility] = useState(false);
  let [componentToRender, setComponentToRender] = useState(null);
  let [swimSeason, setSwimSeason] = useState(
    swimSeasons.find((season) => season["id"] === id)
  );
  let [dataToEdit, setDataToEdit] = useState({ swimPlan_id: "", data: "" });
  let [swimPracticeId, setSwimPracticeId] = useState(null);

  const sectionsRef = useRef(
    swimSeason["body"].reduce((acc, swimPlan) => {
      acc[swimPlan["id"]] = React.createRef();
      return acc;
    }, {})
  );

  const calendarRef = useRef(null);

  console.log("sectionsRef: ", sectionsRef);

  const handleCalendarItemClick = (swimPlan_id) => {
    const sectionRef = sectionsRef.current[swimPlan_id];
    console.log("Calendar Item Clicked!");
    console.log("swimPlan_id: ", swimPlan_id);
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleBackToCalendarClick = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "start", // Align to the top of the viewport
      });
    }
  };

  useEffect(() => {
    if (swimPracticeId) {
      updateData(swimPracticeId);
      setSwimPracticeId(null);
    }
    //setSwimPracticeId('empty');
    // TEST BLOCK
    console.log("TESTING STATE VARIABLES IN ViewSwimSeason!");
    console.log("TESTING STATE VARIABLES IN ViewSwimSeason!");
    console.log("TESTING STATE VARIABLES IN ViewSwimSeason!");
    console.log("swimSeason: ", swimSeason);
    console.log("dataToEdit: ", dataToEdit);
    console.log("swimPracticeId: ", swimPracticeId);
  }, [swimPracticeId]);

  if (!swimSeason) {
    return <h1>Swim Season not found....</h1>;
  }

  const openModal = () => setModalVisibility(true);
  const closeModal = () => setModalVisibility(false);

  /* The below commented-out code is probably best practice, but I don't wanna deal with it rn lol
    const handleComponentChange = (component) => {
        setComponentToRender(component);
    }

    const handleDataToEditChange = (data) => {
        //console.log("handleDataToEditChange called!");
        console.log(data);
        setDataToEdit(data);
    }
    */

  // modifies data that is referenced in the dataToEdit state variable
  const updateData = (newData) => {
    if (newData === "remove") newData = null;

    let temp = swimSeason;
    let swimPlan_id = dataToEdit["swimPlan_id"];
    let data = dataToEdit["data"];

    let dataIndex = temp["body"].findIndex(
      (swimPlan) => swimPlan["id"] === swimPlan_id
    );
    if (dataIndex >= 0) {
      temp["body"][dataIndex][data] = newData;
    }

    // TESTING BLOCK
    console.log("TESTING updateData");
    console.log("TESTING updateData");
    console.log("TESTING updateData");
    console.log("swimPlan_id", swimPlan_id);
    console.log("data: ", data);
    console.log("dataIndex: ", dataIndex);
    console.log("newData:", newData);

    setSwimSeason(temp);
  };

  const handleSwimPracticeId = (swimPractice) => {
    console.log("handling swimPracticeId with id: ", swimPractice["id"]);
    setSwimPracticeId(swimPractice["id"]);
    closeModal();
  };

  const commentsEditor = (newData) => {
    console.log("new comment: ", newData);
    console.log("dataToEdit, should be comments: ", dataToEdit);
    updateData(newData);
  };

  const dataHandler = () => {
    console.log("dataHandler in viewSwimSeason!");
  };

  return (
    <div className="view-swim-season">
      <CalendarView
        swimSeason={swimSeason}
        handleCalendarItemClick={handleCalendarItemClick}
        calendarRef={calendarRef}
      />
      <SideBySideGrid
        swimSeason={swimSeason}
        openModal={openModal}
        setComponentToRender={setComponentToRender}
        setDataToEdit={setDataToEdit}
        commentsEditor={commentsEditor}
        dataHandler={handleSwimPracticeId}
        sectionsRef={sectionsRef}
        handleBackToCalendarClick={handleBackToCalendarClick}
      />
      <Modal
        isOpen={modalVisibility}
        onClose={closeModal}
        componentToRender={componentToRender}
      />
    </div>
  );
}
