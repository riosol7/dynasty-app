const getAllPlayStats = (id, year, league, matches) => {
    const historicalRecord = [];
    const seasonalRecord = [];
    const weeklyRecord = [];
    if(year === "All Time") {
        const legacyMatches = league.history?.map(szn => 
            Number(szn.year) > 2020 ? 
                Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
            :
                Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
        );
        legacyMatches?.push(matches.slice(0, 14));

        legacyMatches?.map(season => season.map(match => {
            const myMatchupInfo = match.find(t => t.roster_id === Number(id));
            let wins = 0;
            let losses = 0;
            let opponentID = 0;
            
            match.filter(team => Number(id) !== team.roster_id).map(opponent => {
                if (myMatchupInfo.points === 0 && opponent.points === 0) {
                    wins = 0;
                    losses = 0;
                    opponentID = opponent.roster_id;
                } else if(myMatchupInfo.points > opponent.points){
                    wins = +1;
                    losses = 0;
                    opponentID = opponent.roster_id;
                } else {
                    losses = +1;
                    wins = 0;
                    opponentID = opponent.roster_id;
                }
                let obj = historicalRecord.find(w => w.oID === opponentID) || false;
                if(obj){
                    obj.w = obj.w + wins
                    obj.l = obj.l + losses
                } else {
                    historicalRecord.push({
                        w: wins,
                        l: losses,
                        oID: opponentID
                    })
                }
                return {
                    w: wins,
                    l: losses,
                    oID: opponentID
                };
            });
            return {
                w: wins,
                l: losses,
                oID: opponentID,
            };
        }));    
    
    } else {
        const filteredMatches = league.season === year ? 
            matches.slice(0,14)
        : league.history?.filter(l => l.year === year)?.map(szn => 
                Number(year) > 2020 ? 
                    Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
                : Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
        )[0];   
        filteredMatches?.map(match => {
            const myMatchupInfo = match?.find(team => team.roster_id === Number(id));
            let wins = 0;
            let losses = 0;
            let opponentID = 0;

            weeklyRecord.push(match.filter(team => Number(id) !== team.roster_id).map(opponent => {
                if(myMatchupInfo?.points === 0 && opponent.points === 0) {
                    wins = 0;
                    losses = 0;
                    opponentID = opponent.roster_id;
                } else if(myMatchupInfo?.points > opponent.points) {
                    wins = +1;
                    losses = 0;
                    opponentID = opponent.roster_id;
                } else {
                    losses = +1;
                    wins = 0;
                    opponentID = opponent.roster_id;
                }
                let obj = seasonalRecord.find(w => w.oID === opponentID) || false;
                if(obj){
                    obj.w = obj.w + wins;
                    obj.l = obj.l + losses;
                } else {
                    seasonalRecord.push({
                        w: wins,
                        l: losses,
                        oID: opponentID
                    })
                };
                return {
                    w: wins,
                    l: losses,
                    oID: opponentID
                };
            }));
            return {
                w: wins,
                l: losses,
                oID: opponentID
            };
        });
    };
    return {
        historicalRecord: historicalRecord,
        seasonalRecord: seasonalRecord,
        weeklyRecord: weeklyRecord,
    };
};

export default getAllPlayStats;