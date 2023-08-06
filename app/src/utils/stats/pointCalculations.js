export const roundToHundredth = (value) => {
    if (typeof value === "number" && !isNaN(value)) {
        return Number(value.toFixed(2));
    
    } else return 0;
};

export const winPCT = (w, l) => {
    return roundToHundredth((w/(w + l))*100);
};

export const lineupEfficiency = (pf, maxPF) => {
    return roundToHundredth((pf/maxPF)*100); 
};

export const getTotalPts = (league, matches, rID, pID) => {
    let historyMaxPts = 0;
    let currentMaxPts = 0;
    let historyPts=0; 
    let currentPts=0;

    if(rID !== undefined && pID !== undefined){
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

        if(matches[0] && matches[0].length>0){
            checkCUndefined = matches && matches.map(m => 
                Object.entries(m.filter(r => r.roster_id === rID)[0]) && 
                    Object.entries(m.filter(r => r.roster_id === rID)[0].players_points)
                        .filter(p => p[0] === pID)[0]).filter(t => t !== undefined).filter(t => t !== [])
        }

        if(checkHUndefined && checkHUndefined[0] && checkHUndefined[0].length > 0 && checkCUndefined.length > 0){
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