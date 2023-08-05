export const findRosterByOwnerID = (id, rosters) => {
    return rosters?.find(roster => roster.owner_id === id);
};

export const findRosterByID = (id, rosters) => {
    return rosters?.find(roster => roster.roster_id === Number(id));
};