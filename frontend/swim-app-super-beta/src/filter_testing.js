import { mockData } from './mockData.mjs';
//const { mockData } = require('./mockData');

let user_id = "RemiB123";
let swimSet_title = null;
let swimSet_tags = null;

function userIdOnly(data, user_id) {
    return data.filter(swimSet => swimSet.user_id.toLowerCase()===user_id)
}

function titleOnly(data, title) {
    data.filter(swimSet => 
        swimSet.user_id.toLowerCase()===user_id)
        .filter(swimSet => swimSet.swimSet_title.toLowerCase()===title)
}

if (swimSet_title && swimSet_tags) {
    console.log("user_id: ", user_id);
    console.log("swimSet_title: ", swimSet_title);
    console.log("swimSet_tags: ", swimSet_tags);
    return [user_id, swimSet_title, swimSet_tags, swimSet_body];
} else if (!swimSet_title) {
    console.log("user_id: ", user_id);
    console.log("swimSet_tags: ", swimSet_tags);
    return [user_id, swimSet_tags, swimSet_body];
} else if (!swimSet_tags) {
    console.log("user_id: ", user_id);
    console.log("swimSet_title: ", swimSet_title);
    return [user_id, swimSet_title, swimSet_body];
} else {
    let matches = userIdOnly(mockData, user_id);
    console.log("user_id: ", user_id);
    console.log(matches);
    return [user_id, matches];
}
