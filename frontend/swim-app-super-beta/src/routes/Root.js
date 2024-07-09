import React, { createContext, useContext } from 'react';
import { Outlet, Link, useLoaderData } from 'react-router-dom';
import '../App.css';
import { getAllSwimSets, getAllSwimPractices, getAllSwimSeasons } from '../hooks/requests'

export async function loader() {
    const allSwimSets = await getAllSwimSets();
    const allSwimPractices = await getAllSwimPractices();
    const allSwimSeasons = await getAllSwimSeasons()
    return [allSwimSets, allSwimPractices, allSwimSeasons];
}

export const DataContext = createContext();

export default function Root() {
    const data = useLoaderData();
    const dataObj = {"swimSets": data[0], "swimPractices": data[1], "swimSeasons": data[2]};
    //const [allSwimSets, allSwimPractices, swimSeason] = useLoaderData();
    console.log("allSwimSets in Root(): ", data[0]);
    console.log("allSwimPractices in Root(): ", data[1]);
    console.log("allSwimSeasons in  Root(): ", data[2]);
    //console.log("swimSeason in Root(): ", data[2]);
    console.log("DataContext: ", DataContext);
    return(
        <div id="root">
            <DataContext.Provider value={dataObj}>
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
                                    <Link to={`BrowseSwimSeasons/`}>Browse Swim Seasons</Link>
                                </li>
                                <li>
                                    <Link to={`WriteSwimSet/`}>Write Swim Set</Link>
                                </li>
                                <li>
                                    <Link to={`ViewSwimSeason/testSeason`}>testSeason</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <Outlet />
                </div>
            </DataContext.Provider>
        </div>
    )
}