import "./styles/App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AppLayout from "./layouts/AppLayout";
import AppRouter from "./router/AppRouter";
import SidenavBar from "./components/navigation/SidenavBar";
import {
    getAllPlayStats,
    getHeadToHeadStats,
    getLeagueAveragePts,
    getMatchups,
    getPostSeasonStats,
    roundToHundredth,
    winPCT,
} from "./utils";
import {
    findMatchups,
    findRosterByID,
    processLeague,
    processMatches,
} from "./helpers";
import { 
    // useDynastyProcessData,
    // useFantasyProData,
    useFetchLeague,
    useFetchMatches,
    useFetchOwners,
    useFetchPlayers,
    useFetchRosters,
    useFetchTransactions,
} from "./hooks";

function App() {
    const { league, loadLeague } = useFetchLeague();
    const { matches, loadMatches } = useFetchMatches();
    const { owners, loadOwners } = useFetchOwners();
    const { players, loadPlayers } = useFetchPlayers();
    const { rosters, loadRosters } = useFetchRosters();
    const { transactions, loadTransactions } = useFetchTransactions();
    // const { dpData } = useDynastyProcessData();
    // const { fpData } = useFantasyProData();

    const matchups = processMatches(matches);
    const processedLeague = processLeague(league);

    const foundHistory = (rosterID, yr) => {
        if(rosterID !== undefined || null){
           
            const myMatchups = processedLeague.season === yr ? 
            findMatchups(rosterID, matchups) : processedLeague.history?.filter(szn => szn.year === yr).map(szn => getMatchups(rosterID, szn.matchups))[0];
            const legacyRosters = processedLeague.history?.map(szn => szn.rosters.find(roster => roster.roster_id === Number(rosterID)));
            const historicalMatchData = processedLeague.history?.map(szn => Object.entries(szn.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]));
            const seasonTopScore = processedLeague.history?.filter(szn => szn.year === yr).map(s => Object.entries(s.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0].points)[0];
            const myHeadtoHead = getHeadToHeadStats(rosterID, processedLeague, myMatchups);

            const inSeasonStats = findRosterByID(rosterID, rosters)?.settings;
            const inSeasonHighestScore = myMatchups?.map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0]?.points || 0;
            const inSeasonFPTS = Number(inSeasonStats?.fpts + "." + (inSeasonStats?.fpts_decimal || 0));
            const inSeasonPPTS = Number((inSeasonStats?.ppts || 0) + "." + (inSeasonStats?.ppts_decimal || 0));
            const inSeasonPA = Number((inSeasonStats?.fpts_against || 0) + "." + (inSeasonStats?.fpts_against_decimal || 0));
            
            // ALL TIME STATS
            const historicBestScore = historicalMatchData?.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points > inSeasonHighestScore ? 
            historicalMatchData?.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points : inSeasonHighestScore;
            const bestLegacyRecord = legacyRosters?.sort((a,b) => b.settings.wins - a.settings.wins)[0]?.settings;
            const bestRecord = bestLegacyRecord?.wins === inSeasonStats?.wins ?  bestLegacyRecord?.losses > inSeasonStats?.losses ? inSeasonStats : bestLegacyRecord : bestLegacyRecord?.wins > inSeasonStats?.wins ? bestLegacyRecord : inSeasonStats;
            const allTimeRegularSeasonWins = legacyRosters?.reduce((acc, item) =>  acc + item.settings.wins, 0) + inSeasonStats?.wins;
            const allTimeRegularSeasonLosses = legacyRosters?.reduce((acc, item) =>  acc + item.settings.losses, 0) + inSeasonStats?.losses;
            const allTimeRegularSeasonFPTS = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.fpts + "." + item.settings.fpts_decimal), 0) + inSeasonFPTS);
            const allTimeRegularSeasonPPTS = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.ppts + "." + item.settings.ppts_decimal), 0) + inSeasonPPTS);
            const allTimeRegularSeasonPA = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.fpts_against + "." + item.settings.fpts_against_decimal), 0) + inSeasonPA);
            const postSeasonStats = getPostSeasonStats(rosterID, yr, processedLeague, myMatchups);
            const postSeasonAllTimeStats = getPostSeasonStats(rosterID, "All Time", processedLeague);
            
            return {
                allPlay: {
                    weeklyRecord: getAllPlayStats(rosterID, yr, processedLeague, matches).weeklyRecord,
                    opponents: getAllPlayStats(rosterID, yr, processedLeague, matches).seasonalRecord,
                    wins: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                    losses: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                },
                allTime: {    
                    allPlay: {
                        opponents: getAllPlayStats(rosterID, "All Time", processedLeague, matches).historicalRecord,
                        wins: (getAllPlayStats(rosterID, "All Time", processedLeague, matches)?.historicalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                        losses: (getAllPlayStats(rosterID, "All Time", processedLeague, matches)?.historicalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                    },
                    best: {
                        record: `${bestRecord?.wins}-${bestRecord?.losses}`,
                        score: historicBestScore,
                        // year:,
                        rate: winPCT(bestRecord?.wins, bestRecord?.losses),
                    },
                    percentage: roundToHundredth(((allTimeRegularSeasonWins)/(allTimeRegularSeasonWins + allTimeRegularSeasonLosses))*100),
                    wins: allTimeRegularSeasonWins,
                    losses: allTimeRegularSeasonLosses,
                    fpts: allTimeRegularSeasonFPTS,
                    ppts: allTimeRegularSeasonPPTS,
                    pa: allTimeRegularSeasonPA,
                    playoffs: {
                        appearances: postSeasonAllTimeStats.appearances,
                        wins: postSeasonAllTimeStats.wins,
                        losses: postSeasonAllTimeStats.losses,
                        games: postSeasonAllTimeStats.totalGames,
                        fpts: postSeasonAllTimeStats.pf,
                        // playoffMaxPF:0,
                        pa: postSeasonAllTimeStats.pa,
                        highestScore: postSeasonAllTimeStats.highestScore,
                        finals:(postSeasonAllTimeStats.finals.w + "-" + postSeasonAllTimeStats.finals.l),
                    },
                    toiletBowls: postSeasonAllTimeStats.toiletBowls,
                },
                playoffs: {
                    appearance: postSeasonStats.appearance,
                    bracket: postSeasonStats.bracket,
                    wins: postSeasonStats.wins,
                    losses: postSeasonStats.losses,
                    games: postSeasonStats.totalGames,
                    fpts: postSeasonStats.pf,
                    pa: postSeasonStats.pa,
                    highestScore: postSeasonStats.highestScore, 
                },
                regularSeason: {
                    h2h: {
                        games: myHeadtoHead.games,
                        opponents: myHeadtoHead.h2h.sort((a,b) => winPCT(b.w , b.l) - winPCT(a.w , a.l)).map((roster, idx) => ({...roster, rank:idx+1})),
                    },
                    highestScore: processedLeague.season === yr ? inSeasonHighestScore : seasonTopScore,
                    leagueAvgPts: getLeagueAveragePts(processedLeague, matchups, yr),
                },
                matchups: myMatchups
            } 
        }
    }

    return (
        <AppLayout>
            <SidenavBar/>
            <Router>
                <AppRouter  
                    foundHistory={foundHistory}
                    league={processedLeague}
                    loadLeague={loadLeague}
                    loadMatches={loadMatches}
                    loadOwners={loadOwners}
                    loadPlayers={loadPlayers}
                    loadRosters={loadRosters}
                    loadTransactions={loadTransactions}
                    matches={matches}
                    matchups={matchups}
                    owners={owners}
                    players={players}
                    rosters={rosters}
                    transactions={transactions}
                />          
            </Router>
        </AppLayout>
    );
}

export default App;