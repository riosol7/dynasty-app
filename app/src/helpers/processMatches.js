const processMatchups = (matches) => {
    if (!matches || !matches[0] || matches[0].length === 0) {
        return [];
    }
  
    return matches.filter((m) => m !== null).map((wk) => wk.reduce((acc, team) => {
        acc[team.matchup_id] = acc[team.matchup_id] || [];
        acc[team.matchup_id].push(team);
        return acc;
    }, Object.create(null)));
};
  
export default processMatchups;