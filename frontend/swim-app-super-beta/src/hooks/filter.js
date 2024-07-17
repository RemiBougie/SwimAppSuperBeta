export default function Filter (titleSearch='', tagsSearch, swimSets, setItems, generateSwimSetCards, selectSwimSet=null) {
    let user_id="RemiB123";

    // manipulate input data to correct format and find selected tags
    let selectedTags = findTrueTags(tagsSearch);

    function titleFilter(data, user_id, title) {
        return data.filter(swimSet => swimSet.owner.includes(user_id))
            .filter(swimSet => swimSet.swimSet_title.toLowerCase().includes(title))
    }

    function tagsFilter(data, user_id, tags) {
        return data.filter(swimSet => swimSet.owner.includes(user_id))
            .filter(swimSet =>
                tags.every(tag => swimSet.swimSet_tags.includes(tag)))
    }

    function findTrueTags(tagsArg) {
        let tags = [];
        for (const property in tagsArg) {
            let category = tagsArg[property];
            for (const label in category) {
                if (tagsArg[property][label]) {
                    tags = [...tags, label];
                }
            }
        }
        return tags;
    }

    let titleMatches = titleFilter(swimSets, user_id, titleSearch);
    let matches = tagsFilter(titleMatches, user_id, selectedTags);

    setItems(generateSwimSetCards(matches, selectSwimSet));
}