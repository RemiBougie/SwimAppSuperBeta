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
        let existingDataIndex = mockSwimSets.findIndex((swimSet) => swimSet["id"] === data["id"])
        //let existingDataIndex = mockSwimSets.find(swimSet => { swimSet["id"] === data["id"]})
        if (existingDataIndex) {
            mockSwimSets.splice(existingDataIndex, 1, data);
        } else {
            mockSwimSets.push(data);
            console.log("new mockSwimSets: ", mockSwimSets)
        }
        // actually, check if it exists. If so, update, otherwise push
        console.log("mockSwimSets after post: ", mockSwimSets);
        return { headers: {mock: "mock response"}, ok: true }
    } else {
        console.log("swimSet to POST: ", data);
        return fetch(apiUrl+'swimSets', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        /*.then((response) => {
            console.log(response);
            return response //response.json()
        })*/
        .catch( error => 
            {console.error("ERROR: ", error);}
        )
    }
    
}


async function postSwimPractice (data) {
    if (isMock) {
        console.log("swimPractice to POST: ", data)
        let existingDataIndex = mockSwimPractices.findIndex((swimPractice) => swimPractice["id"] === data["id"])
        //let existingDataIndex = mockSwimSets.find(swimSet => { swimSet["id"] === data["id"]})
        if (existingDataIndex) {
            mockSwimPractices.splice(existingDataIndex, 1, data);
        } else {
            mockSwimPractices.push(data);
        }
        //console.log("mockSwimPractices after POST: ", mockSwimPractices);
        return { headers: {mock: "mock response"}, ok: true}
    } else {
        //throw new Error("Live data not set up yet, switch to mockData")
        return fetch(apiUrl+'swimPractices',
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
        .catch(error => {
            console.error("ERROR: ", error);
        })
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
*/
//-- DELETE -------------------------------------------------------------------------------------------------------
async function deleteSwimSet (data) {
    if (isMock) {
        console.log("swimSet to delete: ", data);
        let dataIndex = mockSwimSets.findIndex((swimSet) => swimSet["id"] === data["id"]);
        if (dataIndex > 0) {
            //console.log("prior to delete: ", mockSwimSets);
            mockSwimSets.splice(dataIndex, 1);
            console.log("Deleted?");
            console.log(mockSwimSets);
        } else {
            throw new Error("Something went wrong with the delete...")
        }
        return { headers: {mock: "mock response"}, ok: true}
    } else {
        //throw new Error("Live data hasn't been set up yet");
        let queryString = new URLSearchParams({id: data["id"]}).toString();
        return fetch(apiUrl+'swimSets?'+queryString, 
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            console.log("response: ", response);
            return response.json();
        })
        .catch(error => {
            console.error("ERROR: ", error);
        })
    }
}

async function deleteSwimPractice (data) {
    if (isMock) {
        console.log("swimPractice to delete: ", data);
        let dataIndex = mockSwimPractices.findIndex((swimPractice) => swimPractice["id"] === data["id"]);
        if (dataIndex > 0) {
            //console.log("prior to delete: ", mockSwimSets);
            mockSwimPractices.splice(dataIndex, 1);
            console.log("Deleted?");
            console.log(mockSwimPractices);
        } else {
            throw new Error("Something went wrong with the delete...")
        }
        return { headers: {mock: "mock response"}, ok: true}
    } else {
        //throw new Error("Live data hasn't been set up yet");
        let queryString = new URLSearchParams({id: data["id"]}).toString();
        return fetch(apiUrl+'swimPractices?'+queryString, 
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((response) => {
            console.log("response: ", response);
            return response.json();
        })
        .catch(error => {
            console.error("ERROR: ", error);
        })
    }
}

/*
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
    */

    deleteSwimSet,
    deleteSwimPractice,
    /*
    deleteSwimSeason
    */
}
