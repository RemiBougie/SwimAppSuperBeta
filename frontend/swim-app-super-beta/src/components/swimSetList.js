import React from 'react';
import '../App.css';

export default function SwimSetList ({ swimSet }) {
    let groupNames = Object.keys(swimSet);

    if (groupNames.length > 1) {
        return (
            <section className="App-swimSetList1" >
                <ul>
                    {groupNames.map((groupName)=>{
                        return (
                            <li className="App-groupCard">
                                <p style={{fontWeight: "bold"}}>{groupName}</p>
                                <p style={{display: "flex", textAlign: "justify", textJustify: "left", justifyContent: "center"}}>{swimSet[groupName]}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    } else {
        return (
            <section className="App-swimSetList2">
                <div className="App-groupCard">
                    <p style={{fontWeight: "bold"}}>{groupNames[0]}</p>
                    <p style={{display: "flex", textAlign: "justify", textJustify: "left", justifyContent: "center"}}>{swimSet[groupNames[0]]}</p>
                </div>
            </section>
        )
    }

    
}