export const findRosterByID = (id, rosters) => {
    if (rosters?.length > 1) {
        return rosters.find(roster => roster.roster_id === Number(id));
    }
    return {}
};

export const findRosterByOwnerID = (id, rosters) => {
    return rosters?.find(roster => roster.owner_id === id);
};