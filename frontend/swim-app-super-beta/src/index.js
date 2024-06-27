import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tachyons';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as rootLoader } from './routes/Root';
import BrowseSwimSets from './routes/BrowseSwimSets';
import BrowseSwimPractices from './routes/BrowseSwimPractices';
import ViewSwimSeason from './routes/ViewSwimSeason';
import ErrorPage from './ErrorPage';

/* 
TO DO
-Create root route that loads all swimSet. 
  - May need to modify getAllSwimSets() to only return an array of swimSets
  - The array of swimSets gets passed to BrowseSwimSets.js as props for the route to display
  - BrowseSwimSets and BrowseSwimPractices will be children routes 

-Write getAllSwimPractices() to return an array of swimPractices
  - For a first pass, just deal with mockSwimPractices
  - Should this function insert corresponding swimSets into the swimPractices?

-Write BrowseSwimPractices route 
  - Takes an array of swimPractices as a prop to display
  - Will need to write swimPracticeCard.js

- Modify the components folder
  - TagsList will be used for swimSets and swimPractices
  - Syntax for components in the "search/" folder should be changed to be generalizable to swimSets
      and swimPractices

*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/BrowseSwimSets",
        element: <BrowseSwimSets />,
        loader: rootLoader
      },
      {
        path: "/BrowseSwimPractices",
        element: <BrowseSwimPractices />,
        loader: rootLoader
      },
      {
        path: "/ViewSwimSeason",
        element: <ViewSwimSeason />,
        loader: rootLoader
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
