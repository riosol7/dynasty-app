export const findRosterByName = (dName, rosters) => {
    return rosters && rosters.totalRoster.filter(r => r.owner.display_name === dName)[0]&&
    rosters.totalRoster.filter(r => r.owner.display_name === dName)[0].roster_id     
};

export const findRosterByID = (rID, rosters) => {
    return rosters.totalRoster && rosters.totalRoster.map((roster, idx) => ({...roster, rank:idx+1})).find(roster => roster.roster_id === Number(rID))
};