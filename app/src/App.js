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

    // STILL NEEDS TO BE UPDATED ## the allTime and s bracket can be reduced.
    const foundHistory = (rosterID, yr) => {
        if(rosterID !== undefined || null){
           
            const myMatchups = processedLeague.season === yr ? 
            findMatchups(rosterID, matchups) : processedLeague.history?.filter(szn => szn.year === yr).map(szn => getMatchups(rosterID, szn.matchups))[0];
            const legacyRosters = processedLeague.history?.map(szn => szn.rosters.find(roster => roster.roster_id === Number(rosterID)));
            const legacyPlayoffs = processedLeague.history?.map(szn => szn.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)));
            const historicalMatchData = processedLeague.history?.map(szn => Object.entries(szn.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]));
            const seasonTopScore = processedLeague.history?.filter(szn => szn.year === yr).map(s => Object.entries(s.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0].points)[0];
            const myHeadtoHead = getHeadToHeadStats(rosterID, processedLeague, myMatchups);

            const inSeasonStats = findRosterByID(rosterID, rosters)?.settings;
            const inSeasonPlayoffBracket = processedLeague.brackets?.winner?.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID));
            const inSeasonPlayoffAppearance = inSeasonPlayoffBracket?.length > 0 ? true : false;
            // const inSeasonToiletBracket = processedLeague.brackets?.loser?.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID));
            const inSeasonHighestScore = myMatchups?.map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0]?.points || 0;
            // const inSeasonToiletBracketLosses = inSeasonToiletBracket?.filter(match => match.l === Number(rosterID)).length || 0;
            const inSeasonPlayoffWins = inSeasonPlayoffBracket?.filter(match => match.w === Number(rosterID))?.length || 0;
            const inSeasonPlayoffLosses = inSeasonPlayoffBracket?.filter(match => match.l === Number(rosterID))?.length || 0;
            const inSeasonFPTS = Number(inSeasonStats?.fpts + "." + (inSeasonStats?.fpts_decimal || 0));
            const inSeasonPPTS = Number((inSeasonStats?.ppts || 0) + "." + (inSeasonStats?.ppts_decimal || 0));
            const inSeasonPA = Number((inSeasonStats?.fpts_against || 0) + "." + (inSeasonStats?.fpts_against_decimal || 0));
            
            // ALL TIME STATS
            const historicBestScore = historicalMatchData?.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points > inSeasonHighestScore ? 
            historicalMatchData?.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points : inSeasonHighestScore;
            const bestLegacyRecord = legacyRosters?.sort((a,b) => b.settings.wins - a.settings.wins)[0]?.settings;
            const bestRecord = bestLegacyRecord?.wins === inSeasonStats?.wins ?  bestLegacyRecord?.losses > inSeasonStats?.losses ? inSeasonStats : bestLegacyRecord : bestLegacyRecord?.wins > inSeasonStats?.wins ? bestLegacyRecord : inSeasonStats;
            const playoffAppearances = (legacyPlayoffs?.filter(p => p.length !== 0).length + (inSeasonPlayoffAppearance ? 1 : 0));            
            const totalWins = legacyRosters?.reduce((acc, item) =>  acc + item.settings.wins, 0) + inSeasonStats?.wins;
            const totalLosses = legacyRosters?.reduce((acc, item) =>  acc + item.settings.losses, 0) + inSeasonStats?.losses;
            const totalFPTS = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.fpts + "." + item.settings.fpts_decimal), 0) + inSeasonFPTS);
            const totalPPTS = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.ppts + "." + item.settings.ppts_decimal), 0) + inSeasonPPTS);
            const totalPA = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.fpts_against + "." + item.settings.fpts_against_decimal), 0) + inSeasonPA);
            const totalPlayoffWins = (legacyPlayoffs?.map(szn => szn.filter(match => match.w === Number(rosterID)))?.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0) + inSeasonPlayoffWins; 
            const totalPlayoffLosses = (legacyPlayoffs?.map(szn => szn.filter(match => match.l === Number(rosterID)))?.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0) + inSeasonPlayoffLosses;
            const postSeasonStats = getPostSeasonStats(rosterID, yr, processedLeague, myMatchups);
            const postSeasonAllTimeStats = getPostSeasonStats(rosterID, "All Time", processedLeague);

            const selectiveSzn =  {
                allPlay: getAllPlayStats(rosterID, yr, processedLeague, matches).seasonalRecord,
                allPlayWk: getAllPlayStats(rosterID, yr, processedLeague, matches).weeklyRecord,
                allPlayRecordW: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                allPlayRecordL: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                highest: processedLeague.season === yr ? inSeasonHighestScore : seasonTopScore,
                playoff: postSeasonStats.appearance,
                pW: postSeasonStats.wins,
                pL: postSeasonStats.losses,
                playoffGames: postSeasonStats.totalGames,
                playoffPF: postSeasonStats.pf,
                playoffPA: postSeasonStats.pa,
                playoffHS: postSeasonStats.highestScore,
                matchups: myMatchups !== undefined? Number(yr) > 2020 ? myMatchups.slice(0,14) : myMatchups.slice(0,13):[],
                leagueAvgPts: getLeagueAveragePts(processedLeague, matchups, yr),
            }
            
            return {
                allTime: {    
                    allPlay: getAllPlayStats(rosterID, "All Time", processedLeague, matches).historicalRecord,
                    allPlayRecordW: (getAllPlayStats(rosterID, "All Time", processedLeague, matches)?.historicalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                    allPlayRecordL: (getAllPlayStats(rosterID, "All Time", processedLeague, matches)?.historicalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                    percentage: roundToHundredth(((totalWins)/(totalWins + totalLosses))*100),
                    w: totalWins,
                    l: totalLosses,
                    fpts: totalFPTS,
                    ppts: totalPPTS,
                    fpts_against: totalPA,
                    highest: historicBestScore,
                    bestRecordW: bestRecord?.wins,
                    bestRecordL: bestRecord?.losses,
                    playoffGames: postSeasonAllTimeStats.totalGames,
                    playoffPF: postSeasonAllTimeStats.pf,
                    // playoffMaxPF:0,
                    playoffPA: postSeasonAllTimeStats.pa,
                    playoffHS: postSeasonAllTimeStats.highestScore,
                    TB: postSeasonAllTimeStats.toiletBowls,
                    finals:(postSeasonAllTimeStats.finals.w + "-" + postSeasonAllTimeStats.finals.l) || "0-0",
                    // bestYr:,
                    // bestRate:
                },
                playoffs: { 
                    w: totalPlayoffWins,
                    l: totalPlayoffLosses,
                    a: playoffAppearances
                },
                s: selectiveSzn,
                h2h: myHeadtoHead.h2h.sort((a,b) => winPCT(b.w , b.l) - winPCT(a.w , a.l)).map((roster, idx) => ({...roster, rank:idx+1})),
                g: myHeadtoHead.games,
                myMatchups:myMatchups
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