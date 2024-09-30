import React from 'react';

export default function GroupList ({ swimSet_id, swimSet }) {
    let groupNames = Object.keys(swimSet);

    if (groupNames.length > 1) {
        return (
            <div className="App-swimSetList1" >
                <ul>
                    {groupNames.map((groupName)=>{
                        return (
                            <li className="App-groupCard" key={`${swimSet_id}_${groupName}`}>
                                <p style={{fontWeight: "bold"}}>{groupName}</p>
                                <p style={{display: "flex", textAlign: "justify", textJustify: "left", justifyContent: "center"}}>{swimSet[groupName]}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    } else {
        return (
            <div className="App-swimSetList2">
                <div className="App-groupCard" key={`${swimSet_id}`}>
                    <p style={{fontWeight: "bold"}}>{groupNames[0]}</p>
                    <p style={{display: "flex", textAlign: "justify", textJustify: "left", justifyContent: "center"}}>{swimSet[groupNames[0]]}</p>
                </div>
            </div>
        )
    }

    
}