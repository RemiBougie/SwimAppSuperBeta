import React from "react";
import { useLoaderData } from "react-router-dom";

import SideBySideItem from "./sideBySideItem";

export default function SideBySideGrid({
  swimSeason,
  openModal,
  setComponentToRender,
  setDataToEdit,
  commentsEditor,
  dataHandler,
  sectionsRef,
  handleBackToCalendarClick
}) {
  // pseudo-code:
  // for every "swimDay" in the swimSeason body:
  // HEADERS: have "Planned", "Completed", and "Comments" headers frozen at the top
  // CONTENT: scroll through SideBySideItems with the following:
  // the date and time
  // the "planned", "completed", and "comments" elements of the swimDay
  // if completed is null, should still leave a gap

  //console.log("swimSeason in SideBySideGrid(): ", swimSeason);
  const body = swimSeason["body"];

  function generateSwimDays(body) {
    return body.map((swimDay) => {
      return (
        <SideBySideItem
          swimDay={swimDay}
          openModal={openModal}
          setComponentToRender={setComponentToRender}
          setDataToEdit={setDataToEdit}
          commentsEditor={commentsEditor}
          dataHandler={dataHandler}
          sectionsRef={sectionsRef}
        />
      );
    });
  }

  let items = generateSwimDays(body);

  return (
    <div className="side-by-side-grid">
      <div className="side-by-side-headers">
        <h3>PLANNED</h3>
        <h3>COMPLETED</h3>
        <h3>COMMENTS</h3>
      </div>
      <div className="side-by-side-list">{items}</div>
      <button className="back-to-calendar-btn" onClick={handleBackToCalendarClick}>Back to Calendar</button>
    </div>
  );

  /*
    return(
        <table className="side-by-side-grid">
            <thead>
                <tr className="side-by-side-headers">
                    <th>PLANNED</th>
                    <th>COMPLETED</th>
                    <th>COMMENTS</th>
                </tr>
            </thead>
            <td>
                { items }
            </td>
        </table>
    )
        */
}
