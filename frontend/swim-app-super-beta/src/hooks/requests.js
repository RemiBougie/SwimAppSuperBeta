const apiUrl = process.env.REACT_APP_API_URL;
const isMock = process.env.REACT_APP_MOCK === 'true';

//-- GET ------------------------------------------------------------------------------------------------------
async function getAllSwimSets (setSwimSets, setLoading, setItemList, generateSwimSetCards) {
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('isMock: ', typeof isMock)
        const { mockSwimSets } = require('../mockData/mockSwimSets');
        setSwimSets(mockSwimSets);
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
                return response.json();
            })
            .then(data => {
                let parsedData = []; 
                
                for (const rawObj of data) {
                    if (rawObj.length > 0) {
                        let obj = JSON.parse(rawObj);
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
                        parsedData.push(convertedDataObj);
                    }
                    
                }
                setSwimSets(parsedData);
                setLoading(false);
                setItemList(generateSwimSetCards(parsedData));
            })
        } catch (error) {
            console.error(error)
        }
    }
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
