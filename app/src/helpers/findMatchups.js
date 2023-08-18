const findMatchups = (id, matchups) => {
    return matchups?.map(matchup => Object.entries(matchup).map(game => game[1])).map(matchup => matchup.reduce((acc, team) => {
        if (team.filter(owner => owner.roster_id === Number(id)).length > 0) {
            return team;
        };
        return acc;
    })).map(match => match.sort((a,b) => b.points - a.points));
};

export default findMatchups;