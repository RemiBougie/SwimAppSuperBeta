import React, { useState } from 'react';

export default function IncompleteSwimPlanCard() {
    return(
        <div className="incomplete-swim-plan-card">
            <button>Completed As Planned</button>
            <button>Modified From Planned</button>
            <button>New Practice</button>
            <button>Practice Canceled</button>
        </div>
    )
}