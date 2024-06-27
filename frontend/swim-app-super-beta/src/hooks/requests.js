const apiUrl = process.env.REACT_APP_API_URL;
const isMock = process.env.REACT_APP_MOCK === 'true';

//-- GET ------------------------------------------------------------------------------------------------------
async function getAllSwimSets () { //(setSwimSets, setLoading, setItemList, generateSwimSetCards) {
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('isMock: ', typeof isMock)
        const { mockSwimSets } = require('../mockData/mockSwimSets');
        console.log("MOCK DATA: ", mockSwimSets);
        return mockSwimSets
        //setSwimSets(mockSwimSets);
        //setLoading(false);
        //setItemList(generateSwimSetCards(mockSwimSets));
    } else {
        try {
            return fetch(apiUrl+'swimSets', {
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
                //setSwimSets(parsedData);
                //setLoading(false);
                //setItemList(generateSwimSetCards(parsedData));
                return parsedData;
            })
        } catch (error) {
            console.error(error)
        }
    }
};

async function getAllSwimPractices () {
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('isMock: ', typeof isMock)
        const { mockSwimPractices } = require('../mockData/mockSwimPractices');
        console.log("MOCK DATA: ", mockSwimPractices);
        return mockSwimPractices;
        //setSwimSets(mockSwimSets);
        //setLoading(false);
        //setItemList(generateSwimSetCards(mockSwimSets));
    } else {
        try {
            return fetch(apiUrl+'swimPractices', {
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
                            swimPractice_title: obj["swimPractice_title"],
                            body: obj["body"],
                            notes: obj["notes"],
                            swimPractice_tags: obj["swimPractice_tags"],
                            favorite: obj["favorite"],
                            rating: obj["rating"]
                        };
                        parsedData.push(convertedDataObj);
                    }
                    
                }
                //setSwimSets(parsedData);
                //setLoading(false);
                //setItemList(generateSwimSetCards(parsedData));
                return parsedData;
            })
        } catch (error) {
            console.error(error)
        }
    }
};

async function getAllSwimSeasons () {
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('isMock: ', typeof isMock)
        const { mockSwimSeason } = require('../mockData/mockSwimSeason');
        console.log("MOCK DATA: ", mockSwimSeason);
        return mockSwimSeason;
        //setSwimSets(mockSwimSets);
        //setLoading(false);
        //setItemList(generateSwimSetCards(mockSwimSets));
    } else {
        try {
            throw new Error("Live data isn't set up yet, switch to mock");
        } catch (error) {
            console.error(error);
        }
    }
}

/*
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
    getAllSwimPractices,
    getAllSwimSeasons,

    /*
    postSwimSet,
    postSwimPractice,
    postSwimSeason,
    postSwimSeasonPlan,

    deleteSwimSet,
    deleteSwimPractice,
    deleteSwimSeason
    */
}
