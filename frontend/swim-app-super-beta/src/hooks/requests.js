const apiUrl = process.env.REACT_APP_API_URL;
const isMock = process.env.REACT_APP_MOCK === 'true';

const { mockSwimSets } = require('../mockData/mockSwimSets');
const { mockSwimPractices } = require('../mockData/mockSwimPractices');
const { mockSwimSeasons } = require('../mockData/mockSwimSeasons');

//-- GET ------------------------------------------------------------------------------------------------------
async function getAllSwimSets () { //(setSwimSets, setLoading, setItemList, generateSwimSetCards) {
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('isMock: ', typeof isMock)
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
                console.log("raw swimPractices data: ", data)
                for (const rawObj of data) {
                    console.log("rawObj.length in getSwimPractices: ", rawObj.length)
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
        console.log("MOCK DATA: ", mockSwimSeasons);
        return mockSwimSeasons;
        //setSwimSets(mockSwimSets);
        //setLoading(false);
        //setItemList(generateSwimSetCards(mockSwimSets));
    } else {
        try {
            return fetch(apiUrl+'swimSeasons')
            .then(response => {
                if (!response.ok) {
                    console.log(response.ok);
                    throw new Error("Something don't work right...");
                }
                return response.json();
            })
            .then(data => {
                let parsedData = []; 
                console.log("Raw allSwimSeasons data: ", data);
                
                for (const rawObj of data) {
                    console.log("rawObj.length: ", rawObj.length)
                    if (rawObj.length > 0) {
                        let obj = JSON.parse(rawObj);
                        let rawBody = obj["body"]
                        let parsedBody = []
                        for (const swimDay of rawBody) {
                            if (swimDay.length > 0) {
                                let swimDayObj = JSON.parse(swimDay);
                                let convertedSwimDay = {
                                    id: swimDayObj["id"],
                                    datetime: new Date(swimDayObj["datetime"]),
                                    planned: swimDayObj["planned"],
                                    completed: swimDayObj["completed"],
                                    comments: swimDayObj["comments"]
                                }
                                parsedBody.push(convertedSwimDay);
                            }
                        }
                        let convertedDataObj = {
                            id: obj["id"],
                            owner: obj["owner"],
                            title: obj["title"],
                            active: obj["active"],
                            favorite: obj["favorite"],
                            notes: obj["notes"],
                            rating: obj["rating"],
                            body: parsedBody
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
}


//-- POST -----------------------------------------------------------------------------------------------------
async function postSwimSet (data) {
    //replace with API call eventually
    if(isMock) {
        mockSwimSets.push(data); // actually, check if it exists. If so, update, otherwise push
        console.log("mockSwimSets after post: ", mockSwimSets);
        return { headers: {mock: "mock response"} }
    } else {
        return fetch(apiUrl+'swimSets', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            console.log(response);
            return response.json()
        })
        .catch( error => 
            {console.error("ERROR: ", error);}
        )
    }
    
}


async function postSwimPractice (swimPractice) {
    if (isMock) {
        console.log("swimPractice to POST: ", swimPractice)
        //mockSwimPractices.push(swimPractice);
        //console.log("mockSwimPractices after POST: ", mockSwimPractices);
        return { headers: {mock: "mock response"}}
    } else {
        throw new Error("Live data not set up yet, switch to mockData")
    }
    //replace with API call eventually
    //mockSwimPractices.push(swimPractice) // actually, check if it exists. If so, update, otherwise push
}

/*
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

    postSwimSet,
    postSwimPractice,
    /*
    postSwimSeason,
    postSwimSeasonPlan,

    deleteSwimSet,
    deleteSwimPractice,
    deleteSwimSeason
    */
}
