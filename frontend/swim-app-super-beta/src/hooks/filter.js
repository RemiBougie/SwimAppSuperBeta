import { mockData } from '../mockData.js';
import SwimSetCard from '../components/swimSetCard';

export default function Filter (titleSearch='', tagsSearch, setItems) {
    let user_id="RemiB123";

    // manipulate input data to correct format and find selected tags
    //titleSearch = titleSearch.toLowerCase();
    let selectedTags = findTrueTags(tagsSearch);

    console.log("selected tags: ", selectedTags);

    function titleFilter(data, user_id, title) {
        return data.filter(swimSet => swimSet.user_id.includes(user_id))
            .filter(swimSet => swimSet.swimSet_title.toLowerCase().includes(title))
    }

    function tagsFilter(data, user_id, tags) {
        return data.filter(swimSet => swimSet.user_id.includes(user_id))
            .filter(swimSet =>
                tags.every(tag => swimSet.swimSet_tags.includes(tag)))
    }

    function findTrueTags(tagsArg) {
        let tags = [];
        console.log('TESTING MY FINDTRUETAGS FUNCTION');
        console.log('tagsSearch in the function:', tagsArg)
        for (const property in tagsArg) {
            let category = tagsArg[property];
            console.log("property:", property);
            console.log("category: ", category);
            for (const label in category) {
                if (tagsArg[property][label]) {
                    console.log("label:", label);
                    tags = [...tags, label];
                }
            }
        }
        return tags;
    }

    let titleMatches = titleFilter(mockData, user_id, titleSearch);
    let matches = tagsFilter(titleMatches, user_id, selectedTags);

    console.log("matches:", matches);

    setItems(matches.map((item)=>{
        return <SwimSetCard 
        swimSet_title={item.swimSet_title} 
        swimSet_tags={item.swimSet_tags}
        swimSet={item.body} 
        swimSet_notes={item.notes} />})
    );
}