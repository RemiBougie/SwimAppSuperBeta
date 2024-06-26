import React from 'react';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import '../App.css';
import { getAllSwimSets, getAllSwimPractices } from '../hooks/requests'

export async function loader() {
    const allSwimSets = await getAllSwimSets();
    const allSwimPractices = await getAllSwimPractices();
    return [allSwimSets, allSwimPractices];
}

export default function Root() {
    const [allSwimSets, allSwimPractices] = useLoaderData();
    console.log("allSwimSets in Root(): ", allSwimSets);
    console.log("allSwimPractices in Root(): ", allSwimPractices);
    return(
        <div id="root">
            <div id="header">
                <h1>Swim App Super Beta</h1>
                <h3>This is just a placeholder root route</h3>
            </div>
            <div className="contents">
                <div className="sidebar">
                    <nav>
                        <ul className="menu">
                            <li>
                                <Link to={`BrowseSwimSets/`}>Browse Swim Sets</Link>
                            </li>
                            <li>
                                <Link to={`BrowseSwimPractices/`}>Browse Swim Practices</Link>
                            </li>
                            <li>
                                <Link to={`testing/`}>Testing</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Outlet />
            </div>
        </div>
    )
}