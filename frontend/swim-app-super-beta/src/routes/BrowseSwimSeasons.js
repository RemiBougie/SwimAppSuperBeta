import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export default function BrowseSwimSeasons() {
    let swimSeasons = useLoaderData()[2]

    return(
        <ul className="browse-swim-seasons">
            {swimSeasons.map((swimSeason) => {
                return (
                    <li>
                        <Link to={`/ViewSwimSeason/${swimSeason["id"]}`}>{swimSeason.title}</Link>
                    </li>)
            })}
        </ul>
    )
}