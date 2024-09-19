import React from 'react';

export default function DropdownMenu ( {data} ) {
    console.log("data in dropdownMenu: ", data);
    return(
        <ul className="swimSetCard-menu">
            {
                data.map((item) => {
                    return (
                        <li
                            onClick={item['onClick']}
                        >{item['text']}</li>
                    )  
                })
            }
        </ul>
    )
}

// data will generally look like this:
// [{onClick: exampleFunction1, text: "exampleText1"}, {onClick: exampleFunction2 ...} ...]