const getAllPlayStats = (id, year, league, matches) => {
    const historicalRecord = [];
    const seasonalRecord = [];
    const weeklyRecord = [];

    if(league.season === year) {
        matches.slice(0,14).map(match => {
            const myMatchupInfo = match.find(team => team.roster_id === Number(id));
            let wins = 0;
            let losses = 0;
            let opponentID = 0;

            weeklyRecord.push(match.filter(team => Number(id) !== team.roster_id).map(opponent => {
                if (myMatchupInfo.points === 0 && opponent.points === 0) {
                    wins = 0;
                    losses = 0;
                    opponentID = opponent.roster_id;
                } else if (myMatchupInfo.points > opponent.points) {
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
                }
                return {
                    w: wins,
                    l: losses,
                    oID: opponentID
                }
            }));
            return {
                w: wins,
                l: losses,
                oID: opponentID
            }
        })
    } else if(year === "All Time") {
        // ### NEEDS TO UPDATE w/ in season stats wins and losses
      
        league.history?.map(szn => {
            const filteredMatches = Number(year) > 2020 ? 
                Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
            :
                Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
            
            filteredMatches.map(match => {
                let myMatchupInfo = match.find(t => t.roster_id === Number(id));
                let wins = 0;
                let losses = 0;
                let opponentID = 0;
                match.filter(team => Number(id) !== team.roster_id).map(opponent => {
                    if(myMatchupInfo.points > opponent.points){
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
                        obj.oW = obj.oW + losses
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
            })
            
            return null
        })
    } else {
        // SELECT ALL PLAY // 
        league.history?.filter(l => l.year === year)?.map(szn => {
            const filteredMatches = Number(year) > 2020 ? 
                Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
            :
                Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1])
            
            filteredMatches.map(match => {
                const myMatchupInfo = match.find(team => team.roster_id === Number(id));
                let wins = 0;
                let losses = 0;
                let opponentID = 0;
                weeklyRecord.push(match.filter(team => Number(id) !== team.roster_id).map(opponent => {
                    if(myMatchupInfo.points > opponent.points){
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
                        obj.oW = obj.oW + losses;
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
                }
            })
            return null
        })
    };
    return {
        historicalRecord: historicalRecord,
        seasonalRecord: seasonalRecord,
        weeklyRecord: weeklyRecord,
    }
};

export default getAllPlayStats;