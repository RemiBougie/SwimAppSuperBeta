const apiUrl = process.env.REACT_APP_API_URL;
const isMock = process.env.REACT_APP_MOCK;

/* if (isMock) {
    const mockSwimSets = require('../mockData/mockSwimSets.js'); 
    const mockSwimPractices = require('../mockData/mockSwimPractices.js');
    //const mockSwimSeasons = require ('../mockData/mockSwimSeasons.js');
} */

//-- GET ------------------------------------------------------------------------------------------------------
async function getAllSwimSets (setSwimSets) {
    //replace with API call eventually 
    if (isMock) {
        console.log('Environment: ', process.env.NODE_ENV)
        console.log('apiUrl: ', apiUrl)
        console.log('In the isMock=true statement')
        const { mockSwimSets } = require('../mockData/mockSwimSets');
        console.log(mockSwimSets);
        setSwimSets(mockSwimSets);
        //return mockSwimSets;
    } else {
        try {
            let response = await fetch(apiUrl+'/swimSets')
            if (!response.ok) {
                throw new Error("Something don't work right...")
            }
            let data = await response.json()
            console.log(data)
            return response
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
//*/