const apiUrl = process.env.REACT_APP_API_URL;
const isMock = process.env.REACT_APP_MOCK === 'true';

/* if (isMock) {
    const mockSwimSets = require('../mockData/mockSwimSets.js'); 
    const mockSwimPractices = require('../mockData/mockSwimPractices.js');
    //const mockSwimSeasons = require ('../mockData/mockSwimSeasons.js');
} */

//-- GET ------------------------------------------------------------------------------------------------------
async function getAllSwimSets (setSwimSets, setLoading, setItemList, generateSwimSetCards) {
    //console.log("In getAllSwimSets");
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('apiUrl: ', apiUrl)
        console.log('isMock: ', typeof isMock)
        console.log('In the isMock=true statement')
        const { mockSwimSets } = require('../mockData/mockSwimSets');
        console.log(mockSwimSets);
        setSwimSets(mockSwimSets);
        //return mockSwimSets;
    } else {
        try {
            fetch(apiUrl+'swimSets', {
                'headers': {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    console.log(response.ok);
                    throw new Error("Something don't work right...");
                }
                //console.log("response:", response);
                return response.json();
            })
            .then(data => {
                //console.log("Data from S3", data);
                //console.log("Raw data is of type: ", typeof data)
                let parsedData = []; //JSON.stringify(data);
                //data = JSON.parse(JSON.stringify(data));
                
                for (const rawObj of data) {
                    /*if (data[i].length > 0) {
                        parsedData.push(JSON.parse(JSON.stringify(data[i])))
                    }*/
                    if (rawObj.length > 0) {
                        let obj = JSON.parse(rawObj);
                        //let obj = rawObj
                        //console.log("obj: ", obj);
                        //console.log(typeof obj);
                        let convertedDataObj = {
                            id: obj["id"],
                            owner: obj["owner"],
                            swimSet_title: obj["swimSet_title"],
                            body: obj["body"],
                            notes: obj["notes"],
                            swimSet_tags: obj["swimSet_tags"],
                            favorite: obj["favorite"],
                            rating: obj["rating"]
                        };
                        //console.log("convertedDataObj", convertedDataObj);
                        parsedData.push(convertedDataObj);
                    }
                    
                }

                //parsedData = JSON.parse(parsedData);
                
                //console.log("parsedData: ", parsedData)
                //console.log(typeof parsedData);
                setSwimSets(parsedData);
                setLoading(false);
                setItemList(generateSwimSetCards(parsedData));
            })
        } catch (error) {
            console.error(error)
        }
    }
    //return swimSets;
};

/*
async function getAllSwimPractices () {
    //replace with API call eventually
    return mockSwimPractices
};

async function getAllSwimSeasons () {
    //replace with API call eventually
    return mockSwimSeason
}

//-- POST -----------------------------------------------------------------------------------------------------
async function postSwimSet (swimSet) {
    //replace with API call eventually
    mockSwimSets.push(swimSet) // actually, check if it exists. If so, update, otherwise push
}

async function postSwimPractice (swimPractice) {
    //replace with API call eventually
    mockSwimPractices.push(swimPractice) // actually, check if it exists. If so, update, otherwise push
}

async function postSwimSeason (swimSeason) {
    //replace with API call eventually
    mockSwimSeasons.push(swimSeason) // actually, check if it exists. If so, update, otherwise push
}

async function postSwimSeasonPlan (swimSeason, practicePlan) {
    // each swimSeason will have a list of practicePlans that correspond to the planned practice, actual practice,
        // comments, date, etc. This way the entire swimSeason obejct doesn't need to get updated every time a
        // practice is completed or the plan is changed. 
}

//-- DELETE -------------------------------------------------------------------------------------------------------
async function deleteSwimSet (swimSet) {
    //replace with API call eventually
}

async function deleteSwimPractice (swimPractice) {
    //replace with API call eventually
}

async function deleteSwimSeason (swimSeason) {
    //replace with API call eventually
}
*/
//-- EXPORT ---------------------------------------------------------------------------------------------------------
export {
    getAllSwimSets,
    /*
    getAllSwimPractices,
    getAllSwimSeasons,

    postSwimSet,
    postSwimPractice,
    postSwimSeason,
    postSwimSeasonPlan,

    deleteSwimSet,
    deleteSwimPractice,
    deleteSwimSeason
    */
}
//*/