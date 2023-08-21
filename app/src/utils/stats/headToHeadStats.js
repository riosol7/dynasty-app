export const getMatchups = (id, matchups) => {
    return Object.entries(matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
        acc[team.matchup_id] = acc[team.matchup_id] || [];
        acc[team.matchup_id].push(team);
        return acc;
    }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
        if(team.filter(owner => owner.roster_id === Number(id)).length > 0){
            return team;
        }  
        return acc;
    })).map(match => match.sort((a,b) => b.points - a.points)).filter(game => game.length === 2);
};

export const getHeadToHeadStats = (id, league, matchups) => {
    let myHeadtoHead = [];
    let games = [];

    const legacyMatchups = league.history?.map(season => getMatchups(id, season.matchups));

    legacyMatchups?.push(matchups);

    legacyMatchups?.map(season => season.map(game => {
        const myMatchupInfo = game?.find(t => t.roster_id === Number(id));
        let wins = 0;
        let losses = 0;
        let opponent = game.find(team => team.roster_id !== Number(id));
        
        if(myMatchupInfo?.matchup_id !== undefined) {
            games.push(game);
            if(myMatchupInfo?.points === 0 && opponent.points === 0) {
                wins = 0;
                losses = 0;
                opponent = opponent.roster_id;
            }
            if(game[0].roster_id === Number(id)){
                wins++;
            } else {
                losses++;
            };
            return {
                w: wins,
                l: losses,
                oID: opponent.roster_id,
            };
        } return null;
    }).filter(result => result.oID !== undefined).forEach(game => {
        let obj = myHeadtoHead.find(w => w.oID === game.oID) || false;
        if(obj){
            obj.w = obj.w + game.w;
            obj.l = obj.l + game.l;
        } else {
            myHeadtoHead.push(game);
        }
    }));

    return {
        games: games,
        h2h: myHeadtoHead,
    };
};