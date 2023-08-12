function sortObjectKeys(obj) {
    // Extract keys and sort them
    const keys = Object.keys(obj).sort();
  
    // Create a new object with sorted keys
    const sortedObject = {};
  
    // Populate the new object with the sorted keys and corresponding values
    for (const key of keys) {
      sortedObject[key] = obj[key];
    };
  
    return sortedObject;
}

const processLeague = (league) => {
    if (league !== null) {
      return {...league, history: league?.history?.map(season => { return {...season, matchups: sortObjectKeys(season.matchups)}})};
    } else {
      return null
    }
};

export default processLeague;