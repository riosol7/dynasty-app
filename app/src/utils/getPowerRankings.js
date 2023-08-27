import { winPCT } from "./stats/pointCalculations";

const getPowerRank = (season, league, rosters, foundHistory) => {
    if (season === league.season) {
        return rosters?.totalRoster?.map(r => ({
            ...r,
            apW:foundHistory(r.roster_id, season).allPlay.wins,
            apL:foundHistory(r.roster_id, season).allPlay.losses,
            apR:winPCT(foundHistory(r.roster_id, season).allPlay.wins, foundHistory(r.roster_id, season).allPlay.losses)
        })).sort((a,b) => b.apR - a.apR);
    
    } else if (league?.history?.filter(l => l.year === season)[0] !== undefined) {
        return league.history.filter(l => l.year === season)[0].rosters.map(r => ({
            ...r,
            apW:foundHistory(r.roster_id, season).allPlay.wins,
            apL:foundHistory(r.roster_id, season).allPlay.losses,
            apR:winPCT(foundHistory(r.roster_id, season).allPlay.wins,foundHistory(r.roster_id, season).allPlay.losses)
        })).sort((a,b) => b.apR - a.apR).map((roster, idx) => ({...roster, rank:idx + 1}));
    };
};

export default getPowerRank;