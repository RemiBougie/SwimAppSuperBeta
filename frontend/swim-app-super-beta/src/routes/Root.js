import React, { createContext, useState, useEffect, useContext } from "react";
import { Outlet, Link, useLoaderData, useNavigate } from "react-router-dom";
import "../App.css";

import {
  getAllSwimSets,
  getAllSwimPractices,
  getAllSwimSeasons,
} from "../common/requests";
import { logout, isAuthenticated } from "../common/auth";

export async function loader() {
  const allSwimSets = await getAllSwimSets();
  const allSwimPractices = await getAllSwimPractices();
  const allSwimSeasons = await getAllSwimSeasons();
  return [allSwimSets, allSwimPractices, allSwimSeasons];
}

export const DataContext = createContext();

export default function Root() {
  let [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const data = useLoaderData();
  const dataObj = {
    swimSets: data[0],
    swimPractices: data[1],
    swimSeasons: data[2],
  };
  //const [allSwimSets, allSwimPractices, swimSeason] = useLoaderData();
  console.log("allSwimSets in Root(): ", data[0]);
  console.log("allSwimPractices in Root(): ", data[1]);
  console.log("allSwimSeasons in  Root(): ", data[2]);
  //console.log("swimSeason in Root(): ", data[2]);
  console.log("DataContext: ", DataContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // protect this root route: if user isn't authenticated, redirect to login screen
  if (!isAuthenticated()) {
    return navigate("/auth");
  }

  /// stupid lil comment
  return (
    <div className="App">
      <DataContext.Provider value={dataObj}>
        <div id="App-header">
          <div>
            <h1>Swim App Super Beta</h1>
            <button
              onClick={() => {
                logout();
                navigate("/auth");
              }}
            >
              Log Out
            </button>
          </div>

          <h3>This is just a placeholder root route</h3>
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
                <Link to={`WriteSwimSet/new`}>Write Swim Set</Link>
              </li>
              <li>
                <Link to={`WriteSwimPractice/new`}>Write Swim Practice</Link>
              </li>
              <li>
                <Link to={`WriteSwimSeason/`}>Write Swim Season</Link>
              </li>
              <li>
                <Link to={`ViewSwimSeason/testSeason`}>testSeason</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="App-contents">
          <Outlet />
        </div>
      </DataContext.Provider>
    </div>
  );
}
