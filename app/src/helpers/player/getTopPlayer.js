export const getTopQB = (display_name, rosters) => {
    const foundTeam = rosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name);
    const topQB = foundTeam.kct.qb.players[0];
    return topQB;
}
export const getTopRB = (display_name, rosters) => {
    const foundTeam = rosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name);
    const topRB = foundTeam.kct.rb.players[0];
    return topRB;
}
export const getTopWR = (display_name, rosters) => {
    const foundTeam = rosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name);
    const topWR = foundTeam.kct.wr.players[0];
    return topWR;
}
export const getTopTE = (display_name, rosters) => {
    const foundTeam = rosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name);
    const topTE = foundTeam.kct.te.players[0];
    return topTE;
}