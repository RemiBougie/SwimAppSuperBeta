import React from "react";

export default function CanceledSwimPlanCard({
  setDataToEdit,
  swimPlan,
  dataHandler,
}) {
  let data = { swimPlan_id: swimPlan["id"], data: "completed" };

  return (
    <div className="incomplete-swim-plan-card">
      <button
        className="custom-btn"
        onClick={(e) => {
          e.preventDefault();
          setDataToEdit(data);
          dataHandler({ id: "remove" });
        }}
      >
        Undo
      </button>
      <p>Practice Canceled</p>
    </div>
  );
}
