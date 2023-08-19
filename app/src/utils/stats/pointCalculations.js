import getPrimeIndicatorColor from "./getPrimeIndicatorColor";

export const calculatePositionStats = (players, playerType, league, matches, rID) => {
    const count = players.length;
    const avgAge = roundToHundredth(players.reduce((sum, player) => sum + Number(player.age), 0) / count);
    const totalPts = roundToHundredth(players.map((player) => getTotalPts(league, matches, rID, player.player_id).pts).reduce((sum, pts) => sum + pts, 0));
    const totalMaxPts = roundToHundredth(players.map((player) => getTotalPts(league, matches, rID, player.player_id).maxPts).reduce((sum, maxPts) => sum + maxPts, 0));
    return {
        count,
        avgAge,
        totalPts,
        totalMaxPts,
        primeIndicator: getPrimeIndicatorColor(avgAge, playerType.thresholds)
    };
};

export const getLeagueAveragePts = (league, matchups, year) => {
    if(league.season === year) {
        return matchups?.map(m => roundToHundredth(Object.entries(m).map(t => t[1].map(s => s.points).reduce((a,b) => a +b,0)/2).reduce((a,b) => a +b,0)/6)).slice(0, 14) || 0;
    } else {
        const sliceEnd = year > 2020 ? 14 : 13;
        const weeklyLeagueAvgPts = league?.history?.filter(szn => szn.year === year).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
            acc[team.matchup_id] = acc[team.matchup_id] || [];
            acc[team.matchup_id].push(team);
            return acc;
        }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(match => match.sort((a,b) => b.points - a.points))
        .map(m => roundToHundredth(Object.entries(m).map(t => t[1].map(s => s.points).reduce((a,b) => a +b,0)/2).reduce((a,b) => a +b,0)/6)));
        return weeklyLeagueAvgPts[0]?.slice(0 , sliceEnd)
    };
};

export const getTotalPts = (league, matches, rID, pID) => {
    let historyMaxPts = 0;
    let currentMaxPts = 0;
    let historyPts=0; 
    let currentPts=0;

    if( rID !== undefined && pID !== undefined) {
        historyPts = league && league.history && league.history.map(l => 
            Object.entries(l.matchups).map(g => g[1].filter(t => t.roster_id === rID)[0].starters
                .find(s => s === pID) !== undefined ? 
                    Object.entries(g[1].filter(t => t.roster_id === rID)[0].players_points)
                        .filter(p => p[0] === pID)[0][1]
                    :0
            ).reduce((partialSum,a) => partialSum + a, 0)
        ).reduce((partialSum,a) => partialSum + a, 0)

        currentPts = matches && matches.map(m => 
            m.filter(r => r.roster_id === rID)[0] &&
            m.filter(r => r.roster_id === rID)[0].starters.find(s => s === pID) !== undefined ?
                Object.entries(m.filter(t => t.roster_id === rID)[0].players_points)
                    .filter(p => p[0] === pID)[0][1]
                :0
            ).reduce((partialSum,a) => partialSum + a, 0)

        let checkHUndefined = league && league.history && league.history.map(l => Object.entries(l.matchups)
            .map(g => Object.entries(g[1].filter(t => t.roster_id === rID)[0].players_points)
                .filter(p => p[0] === pID)[0]).filter(t => t !== undefined)).filter(t => t.length > 0)
      
        let checkCUndefined = []

        if (matches[0] && matches[0]?.length > 0) {
            checkCUndefined = matches && matches.map(m => 
                Object.entries(m.filter(r => r.roster_id === rID)[0]) && 
                    Object.entries(m.filter(r => r.roster_id === rID)[0].players_points)
                        .filter(p => p[0] === pID)[0]).filter(t => t !== undefined).filter(t => t !== [])
        }

        if (checkHUndefined && checkHUndefined[0] && checkHUndefined[0].length > 0 && checkCUndefined.length > 0) {
            historyMaxPts = checkHUndefined.map(l => l.map(a => a[1]).reduce((partialSum,a) => partialSum + a, 0)).reduce((partialSum,a) => partialSum + a, 0)
            currentMaxPts = checkCUndefined.map((a) => a[1]).reduce((partialSum,a) => partialSum + a, 0)

        } else if(checkHUndefined && checkHUndefined[0] && checkHUndefined[0].length > 0 && checkCUndefined.length === 0){
            historyMaxPts = checkHUndefined.map(l => l.map(a => a[1]).reduce((partialSum,a) => partialSum + a, 0)).reduce((partialSum,a) => partialSum + a, 0)

        } else if(checkCUndefined && checkCUndefined.length > 0){
            currentMaxPts = checkCUndefined.map((a) => a[1]).reduce((partialSum,a) => partialSum + a, 0)
        }
    };
    return {
        pts:roundToHundredth(historyPts + currentPts),
        maxPts:roundToHundredth(historyMaxPts + currentMaxPts)
    };
};

export const isOdd = (num) => {
    return num % 2
}

export const lineupEfficiency = (pf, maxPF) => {
    return roundToHundredth((pf/maxPF)*100); 
};

export const roundToHundredth = (value) => {
    if (typeof value === "number" && !isNaN(value)) {
        return Number(value.toFixed(2));
    
    } else return 0;
};

export const winPCT = (w, l) => {
    return roundToHundredth((w/(w + l))*100);
};