import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
//import { useLoaderData, useNavigate } from "react-router-dom";
import { DataContext } from "./Root";

import "react-datepicker/dist/react-datepicker.css";

import { postSwimSeason } from "../common/requests";

export default function WriteSwimSeason() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    owner: "RemiB123",
    title: "",
    notes: "",
    startDate: startDate,
    endDate: endDate,
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const validateData = () => {
    let formErrors = [];
    try {
      //let fieldErrors = {};
      if (formData["title"].length === 0) {
        //fieldErrors["title"] = "Title must be present.";
        formErrors.push("Title cannot be blank.");
      }

      if (!formData["startDate"]) {
        //fieldErrors["startDate"] = "Start date must be selected.";
        formErrors.push("Start date must be selected.")
      }

      if (!formData["endDate"]) {
        //fieldErrors["endDate"] = "End date must be selected.";
        formErrors.push("End date must be selected.");
      }

      /* if (Object.keys(fieldErrors).length > 0) {
        formErrors.push(fieldErrors);
      } */
    } catch (error) {
      console.error(error);
      formErrors.push(error);
    }

    return formErrors;
  };

  const handleSubmit = () => {
    //e.preventDefault();
    let formErrors = validateData();
    if (formErrors.length === 0) {
      console.log("Info to submit!!!", formData);
      postSwimSeason(formData);
      navigate(`/ViewSwimSeason/${formData["id"]}`);
      //.then(() => );
    } else {
      setErrors(formErrors);
      console.log("ERRORS: ", formErrors);
    }
  };

  return (
    <div className="write-swim-season">
      <label>Season Title</label>
      <br />
      <input
        type="text"
        id="swim-season-title"
        name="swim-season-title"
        defaultValue=""
        onChange={(e) => {
          e.preventDefault();
          formData["title"] = e.target.value;
          setFormData(formData);
        }}
      />
      <br />

      <label>Notes (optional)</label>
      <br />
      <textarea
        id="swim-season-notes"
        name="swim-season-notes"
        defaultValue=""
        onChange={(e) => {
          e.preventDefault();
          formData["notes"] = e.target.value;
          setFormData(formData);
        }}
      />
      <br />

      <label>Start Date</label>
      <br />
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          formData["startDate"] = date;
          setFormData(formData);
        }}
      />
      <br />

      <label>End Date</label>
      <br />
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
          formData["endDate"] = date;
          setFormData(formData);
        }}
      />
      <br />

      {errors.length > 0
        ? errors.map((error) => {
            return <p className="error">{error}</p>;
          })
        : null}
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
