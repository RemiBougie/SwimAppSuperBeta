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

function FilterSwimSets(
  titleSearch = "",
  tagsSearch,
  swimSets,
  setItems,
  generateSwimSetCards,
  openModal = null,
  closeModal = null,
  setComponentToRender = null,
  clickHandler = null
) {
  let user_id = "RemiB123";

  // manipulate input data to correct format and find selected tags
  let selectedTags = findTrueTags(tagsSearch);

  function titleFilter(data, user_id, title) {
    return data
      .filter((swimSet) => swimSet.owner.includes(user_id))
      .filter((swimSet) => swimSet.swimSet_title.toLowerCase().includes(title));
  }

  function tagsFilter(data, user_id, tags) {
    return data
      .filter((swimSet) => swimSet.owner.includes(user_id))
      .filter((swimSet) =>
        tags.every((tag) => swimSet.swimSet_tags.includes(tag))
      );
  }

  let titleMatches = titleFilter(swimSets, user_id, titleSearch);
  let matches = tagsFilter(titleMatches, user_id, selectedTags);

  setItems(
    generateSwimSetCards(
      matches,
      openModal,
      closeModal,
      setComponentToRender,
      clickHandler
    )
  );
}

function FilterSwimPractices(
  titleSearch = "",
  tagsSearch,
  swimPractices,
  allSwimSets,
  setItems,
  generateSwimPracticeCards,
  openModal = null,
  closeModal = null,
  setModalComponent = null,
  clickHandler = null
) {
  const user_id = "RemiB123";
  console.log("in FilterSwimPractices()!");

  let selectedTags = findTrueTags(tagsSearch);

  function titleFilter(data, user_id, title) {
    return data
      .filter((swimPractice) => swimPractice.owner.includes(user_id))
      .filter((swimPractice) =>
        swimPractice.swimPractice_title.toLowerCase().includes(title)
      );
  }

  function tagsFilter(data, user_id, tags) {
    return data
      .filter((swimPractice) => swimPractice.owner.includes(user_id))
      .filter((swimPractice) =>
        tags.every((tag) => swimPractice.swimPractice_tags.includes(tag))
      );
  }

  let titleMatches = titleFilter(swimPractices, user_id, titleSearch);
  let matches = tagsFilter(titleMatches, user_id, selectedTags);

  setItems(
    generateSwimPracticeCards(
      matches,
      allSwimSets,
      openModal,
      closeModal,
      setModalComponent,
      clickHandler
    )
  );
}

export { FilterSwimSets, FilterSwimPractices };
