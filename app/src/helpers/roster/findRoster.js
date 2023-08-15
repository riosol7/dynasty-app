import handleRostersBySzn from "./handleRostersBySzn";

export const findRosterByID = (id, rosters) => {
    return rosters?.find(roster => roster.roster_id === Number(id));
};

export const findRosterByOwnerID = (id, rosters) => {
    return rosters?.find(roster => roster.owner_id === id);
};

export const findHistoryRoster = (id, year, league, rosters) => {
    return findRosterByID(id, handleRostersBySzn(year, league, rosters));
};