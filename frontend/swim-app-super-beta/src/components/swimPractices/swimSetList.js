import React from "react";
import { useLoaderData } from "react-router-dom";
import { generateSwimSetCards } from "../../routes/BrowseSwimSets";

function SwimSetList({ swimSets, allSwimSets }) {
  let swimSetData = [];
  for (const swimSet_id of swimSets) {
    //console.log("swimSet_id: ", swimSet_id);
    //console.log("found swimSet object: ", allSwimSets.find(swimSet => swimSet.id === swimSet_id));
    let swimSet_data = allSwimSets.find((swimSet) => swimSet.id === swimSet_id);
    if (swimSet_data) {
      swimSetData.push(swimSet_data);
    }
  }

  return generateSwimSetCards(swimSetData);
}

export default SwimSetList;
