import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../App.css';
import { getAllSwimSets } from '../hooks/requests'

export async function loader() {
    const allSwimSets = getAllSwimSets()

}

export default function Root() {
    return(
        <div id="root">
            <div id="header">
                <h1>Swim App Super Beta</h1>
                <h3>This is just a placeholder root route</h3>
            </div>
            <div id="contents">
                <div id="sidebar">
                    <nav>
                        <ul>
                            <li>
                                <Link to={`BrowseSwimSets/`}>Browse Swim Sets</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Outlet />
            </div>
        </div>
    )
}