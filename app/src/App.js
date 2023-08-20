import "./styles/App.css";
import React, { useState } from "react";
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
    useLeagueData,
    useMatches,
    useOwners,
    usePlayers,
    useRosters,
    useTransactions,
} from "./hooks";

function App() {
    const { league, loadLeague } = useLeagueData();
    const { matches, loadMatches } = useMatches();
    const { owners, loadOwners } = useOwners();
    const { players, loadPlayers } = usePlayers();
    const { rosters, loadRosters } = useRosters();
    const { transactions, loadTransactions } = useTransactions();

    const [activityBar, setActivityBar] = useState(false)

    const matchups = processMatches(matches);
    const processedLeague = processLeague(league);

    const foundHistory = (rosterID, yr) => {
        if(rosterID !== undefined || null){
           
            const myMatchups = findMatchups(rosterID, matchups);
            const legacyRosters = processedLeague.history?.map(szn => szn.rosters.find(roster => roster.roster_id === Number(rosterID)));
            const legacyPlayoffs = processedLeague.history?.map(szn => szn.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)));
            const historicalMatchData = processedLeague.history?.map(szn => Object.entries(szn.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]));
            const seasonTopScore = processedLeague.history?.filter(szn => szn.year === yr).map(s => Object.entries(s.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0].points)[0];
            const myHeadtoHead = getHeadToHeadStats(rosterID, processedLeague, myMatchups);

            const inSeasonStats = findRosterByID(rosterID, rosters)?.settings;
            const inSeasonPlayoffs = processedLeague.brackets?.winner?.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID));
            const inSeasonPlayoffAppearance = inSeasonPlayoffs?.length > 0 ? true : false;
            const inSeasonToiletBracket = processedLeague.brackets?.loser?.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID));
            const inSeasonHighestScore = myMatchups?.map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0]?.points || 0;
            const inSeasonToiletBracketLosses = inSeasonToiletBracket?.filter(match => match.l === Number(rosterID)).length || 0;
            const inSeasonPlayoffWins = inSeasonPlayoffs?.filter(match => match.w === Number(rosterID))?.length || 0;
            const inSeasonPlayoffLosses = inSeasonPlayoffs?.filter(match => match.l === Number(rosterID))?.length || 0;
            const inSeasonFPTS = Number(inSeasonStats?.fpts + "." + (inSeasonStats?.fpts_decimal || 0));
            const inSeasonPPTS = Number((inSeasonStats?.ppts || 0) + "." + (inSeasonStats?.ppts_decimal || 0));
            const inSeasonPA = Number((inSeasonStats?.fpts_against || 0) + "." + (inSeasonStats?.fpts_against_decimal || 0));
            
            // ALL TIME STATS
            const historicBestScore = historicalMatchData?.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points > inSeasonHighestScore ? 
            historicalMatchData?.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points : inSeasonHighestScore;

            const bestRecord = legacyRosters?.sort((a,b) => b.settings.wins - a.settings.wins)[0];
            const playoffAppearances = legacyPlayoffs?.map(p => {if(p.length !== 0){ return p } else { return null }})?.filter(t => t !== null) + (inSeasonPlayoffAppearance ? 1 : 0);
            const totalWins = legacyRosters?.reduce((acc, item) =>  acc + item.settings.wins, 0) + inSeasonStats?.wins;
            const totalLosses = legacyRosters?.reduce((acc, item) =>  acc + item.settings.losses, 0) + inSeasonStats?.losses;
            const totalFPTS = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.fpts + "." + item.settings.fpts_decimal), 0) + inSeasonFPTS);
            const totalPPTS = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.ppts + "." + item.settings.ppts_decimal), 0) + inSeasonPPTS);
            const totalPA = roundToHundredth(legacyRosters?.reduce((acc, item) =>  acc + Number(item.settings.fpts_against + "." + item.settings.fpts_against_decimal), 0) + inSeasonPA);
            const totalPlayoffWins = (legacyPlayoffs?.map(szn => szn.filter(match => match.w === Number(rosterID)))?.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0) + inSeasonPlayoffWins; 
            const totalPlayoffLosses = (legacyPlayoffs?.map(szn => szn.filter(match => match.l === Number(rosterID)))?.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0) + inSeasonPlayoffLosses;

    
            //CURRENT PLAYOFFS
            let playoffHS;
            let playoffPF;
            let playoffPA; 
            if(inSeasonPlayoffs?.length > 0 && myMatchups?.length > 0){
                if(inSeasonPlayoffs?.length === 3){
                    playoffHS = myMatchups.slice(14,17).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]
                    playoffPF = myMatchups.slice(14,17).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})
                    playoffPA = roundToHundredth(myMatchups?.slice(14,17).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b}))
                } else if(inSeasonPlayoffs?.length === 2){
                    playoffHS = myMatchups.slice(14,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]
                    playoffPF = myMatchups.slice(14,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})
                    playoffPA = roundToHundredth(myMatchups?.slice(14,16).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b}))

                } else if(inSeasonPlayoffs?.length === 1){
                    playoffHS = myMatchups.slice(14,15).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]
                    playoffPF = myMatchups.slice(14,15).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})
                    playoffPA = roundToHundredth(myMatchups?.slice(14,15).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b}))
                } 
            }
            //All Time PLAYOFFS
            const allTimePostSzn = () => {
                let PF;
                let PA;
                let HS;
                let Games;

                let TB = processedLeague?.history?.map(s => { 
                    let Bowls = 0;
                    let bracket = s.league.brackets.loser.bracket
                        .filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID) || match.t1 === rosterID || match.t2 === rosterID)
                    if(bracket.length === 3){
                        if((bracket[1].w === rosterID || bracket[1].w === Number(rosterID)) && (bracket[2].w === rosterID || bracket[2].w === Number(rosterID))){
                            Bowls ++
                        }
                    } else if(bracket.length === 2){
                        if((bracket[0].w === Number(rosterID) && bracket[1].w === Number(rosterID)) || (bracket[0].w === rosterID && bracket[1].w === rosterID)){
                            Bowls ++
                        }
                    } 
                    return Bowls
                }).reduce((a,b) => {return +a + +b})  
            
                let playoffSZNs = processedLeague?.history?.map(s => {
                    if(s.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)).length > 0) {
                        const template =  processedLeague?.history?.filter(szn => szn.year === s.year).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                            acc[team.matchup_id] = acc[team.matchup_id] || [];
                            acc[team.matchup_id].push(team);
                            return acc;
                        }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                            if(team.filter(owner => owner.roster_id === Number(rosterID)).length > 0){
                                return team
                            }  
                            return acc
                        })).map(match => match.sort((a,b) => b.points - a.points)))[0]
                    
                        return {
                            bracket:s.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)),
                            yr:s.year,
                            games: 
                                s.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)).length === 3 ?
                                    Number(s.year) > 2020 ?
                                        template.slice(14,17)
                                    :
                                        template.slice(13,16) 
                                : 
                                    Number(s.year) > 2020 ?
                                        template.slice(15,17)
                                    :
                                        template.slice(14,16) 
                        }
                    }
                    return null
                }).filter(y => y !== null)
            
                let fTemplate = playoffSZNs?.map(s => {
                    let w = 0;
                    let l = 0;

                    if(s.bracket.length === 3){
                    if(s.bracket[1].w === Number(rosterID) && s.bracket[2].w === Number(rosterID)){
                            w++
                    } else if(s.bracket[1].w === Number(rosterID) && s.bracket[2].l === Number(rosterID)) {
                            l++
                    }
                    } else if(s.bracket.length === 2){
                        if(s.bracket[0].w === Number(rosterID) && s.bracket[1].w === Number(rosterID)){
                            w++
                        } else if(s.bracket[0].w === Number(rosterID) && s.bracket[1].l === Number(rosterID)) {
                            l++
                        }
                    }
                    return {
                        w:w,
                        l:l
                    }
                })
                let FinalsW = fTemplate?.length > 0 ? fTemplate?.map(f => f.w).reduce((a,b) => {return +a + +b}) : 0
                let FinalsL = fTemplate?.length > 0 ? fTemplate?.map(f => f.l).reduce((a,b) => {return +a + +b}) : 0

                let currentFinalW = 0;
                if(inSeasonPlayoffs?.length > 0 && inSeasonPlayoffs[1] && inSeasonPlayoffs[2] && inSeasonPlayoffs[1].w !== undefined && inSeasonPlayoffs[2].w !== undefined){
                    if(inSeasonPlayoffs[1].w === Number(rosterID) && inSeasonPlayoffs[2].w === Number(rosterID)){
                        currentFinalW = 1
                    }
                } else {
                    currentFinalW = 0
                }
                let currentFinalL = 0;
                if(inSeasonPlayoffs?.length > 0 && inSeasonPlayoffs[1] && inSeasonPlayoffs[2] && inSeasonPlayoffs[1].w !== undefined && inSeasonPlayoffs[2].w !== undefined){
                    if(inSeasonPlayoffs[1].w === Number(rosterID) && inSeasonPlayoffs[2].l === Number(rosterID)){
                        currentFinalL = 1
                    }
                } else {
                    currentFinalL = 0
                }
                PF = roundToHundredth(playoffSZNs?.length > 0 ? playoffSZNs.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})).reduce((a,b) => {return +a + +b}): 0)
                PA = roundToHundredth(playoffSZNs?.length > 0 ? playoffSZNs.map(m => m.games.map(g => g.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})).reduce((a,b) => {return +a + +b}): 0)
                HS = roundToHundredth(playoffSZNs?.length > 0 ? playoffSZNs.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]).sort((a,b) => b - a)[0] : 0)
                Games = playoffSZNs?.length > 0 ? playoffSZNs.map(s => s.bracket.length).reduce((a,b) => {return +a + +b}) : 0
                
                let currentTB = inSeasonToiletBracket?.length > 0 && inSeasonToiletBracket[2]?.w === Number(rosterID) ? 1 : 0
                return {
                    PF: playoffPF !== undefined ? PF + playoffPF : PF,
                    PA: playoffPA !== undefined ? PA + playoffPA : PA,
                    HS: playoffHS !== undefined ? HS > playoffHS ? HS : playoffHS : HS,
                    Games: Games + inSeasonPlayoffs?.length,
                    FinalsW: FinalsW + currentFinalW,
                    FinalsL: FinalsL + currentFinalL,
                    TB: currentTB + TB
                }
            }
            // SELECT YR
            let playoffYR = processedLeague.history?.filter(szn => szn.year === yr).map(l => l.league.brackets.winner.bracket.filter(m => m.t2 === Number(rosterID) || m.t1 === Number(rosterID)))[0] || 0
            let findHistoryMatchYR = processedLeague.history?.filter(szn => szn.year === yr).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                acc[team.matchup_id] = acc[team.matchup_id] || [];
                acc[team.matchup_id].push(team);
                return acc;
            }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                if(team.filter(owner => owner.roster_id === Number(rosterID)).length > 0){
                    return team
                }  
                return acc
            })).map(match => match.sort((a,b) => b.points - a.points)))[0];

            let sPlayoffHS;
            let sPlayoffPF;
            let sPlayoffPA;
            if(playoffYR && findHistoryMatchYR && playoffYR.length > 0 && findHistoryMatchYR.length > 0){
                if(playoffYR.length === 3){
                    if(Number(yr) > 2020){
                        sPlayoffHS = roundToHundredth(findHistoryMatchYR.slice(14,17).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).sort((a,b) => b - a)[0])
                        sPlayoffPF = roundToHundredth(findHistoryMatchYR.slice(14,17).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                        sPlayoffPA = roundToHundredth(findHistoryMatchYR.slice(14,17).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                    } else {
                        findHistoryMatchYR = findHistoryMatchYR.filter(m => m.length < 3)
                        sPlayoffHS = roundToHundredth(findHistoryMatchYR.slice(13,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).sort((a,b) => b - a)[0])
                        sPlayoffPF = roundToHundredth(findHistoryMatchYR.slice(13,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                        sPlayoffPA = roundToHundredth(findHistoryMatchYR.slice(13,16).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                    }
                } else if(playoffYR.length === 2){
                    if(Number(yr) > 2020){
                        sPlayoffHS = roundToHundredth(findHistoryMatchYR.slice(14,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).sort((a,b) => b - a)[0])
                        sPlayoffPF = roundToHundredth(findHistoryMatchYR.slice(14,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                        sPlayoffPA = roundToHundredth(findHistoryMatchYR.slice(14,16).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                    } else {
                        findHistoryMatchYR = findHistoryMatchYR.filter(m => m.length < 3)
                        sPlayoffHS = roundToHundredth(findHistoryMatchYR.slice(13,15).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).sort((a,b) => b - a)[0])
                        sPlayoffPF = roundToHundredth(findHistoryMatchYR.slice(13,15).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                        sPlayoffPA = roundToHundredth(findHistoryMatchYR.slice(13,15).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a&&a.points).reduce((a,b) => {return +a + +b}))
                    }
                } 
            };

            
            const selectiveSzn = processedLeague.season === yr ? 
                {
                    allPlay: getAllPlayStats(rosterID, yr, processedLeague, matches).seasonalRecord,
                    allPlayWk: getAllPlayStats(rosterID, yr, processedLeague, matches).weeklyRecord,
                    allPlayRecordW: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                    allPlayRecordL: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                    highest: inSeasonHighestScore,
                    playoff: inSeasonPlayoffAppearance,
                    toilet:{
                        l: inSeasonToiletBracketLosses,

                    },
                    pW: inSeasonPlayoffWins,
                    pL: inSeasonPlayoffLosses,
                    playoffGames: inSeasonPlayoffs?.length || 0,
                    playoffPF:playoffPF || 0,
                    // playoffMaxPF:playoffMaxPF,
                    playoffPA:playoffPA || 0,
                    playoffHS:playoffHS || 0,
                    playoffMatchups:myMatchups !== undefined? myMatchups:[],
                    matchups:myMatchups !== undefined? myMatchups.slice(0,14):[],
                    leagueAvgPts: getLeagueAveragePts(processedLeague, matchups, yr),
                    // w:,
                    // l:
                }
            :   
                {
                    allPlay: getAllPlayStats(rosterID, yr, processedLeague, matches).seasonalRecord,
                    allPlayWk: getAllPlayStats(rosterID, yr, processedLeague, matches).weeklyRecord,
                    allPlayRecordW: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                    allPlayRecordL: (getAllPlayStats(rosterID, yr, processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                    highest: seasonTopScore,
                    playoff: playoffYR.length > 0 ? true : false,
                    pW: playoffYR.length > 0 ? playoffYR.filter(m => m.w === Number(rosterID)).length : 0,
                    pL: playoffYR.length > 0 ? playoffYR.filter(m => m.l === Number(rosterID)).length : 0,
                    playoffGames: playoffYR.length || 0,
                    playoffPF:sPlayoffPF,
                    // playoffMaxPF:playoffMaxPF,
                    playoffPA:sPlayoffPA,
                    playoffHS:sPlayoffHS,
                    playoffMatchups:findHistoryMatchYR !== undefined?findHistoryMatchYR:[],
                    matchups:findHistoryMatchYR !== undefined? Number(yr) > Number("2020")?findHistoryMatchYR.slice(0,14):findHistoryMatchYR.slice(0,13):[],
                    leagueAvgPts: getLeagueAveragePts(processedLeague, matchups, yr),
                }
            
            return {
                allTime: {    
                    allPlay: getAllPlayStats(rosterID, "All Time", processedLeague, matches).historicalRecord,
                    allPlayRecordW: (getAllPlayStats(rosterID, "All Time", processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).w || 0,
                    allPlayRecordL: (getAllPlayStats(rosterID, "All Time", processedLeague, matches)?.seasonalRecord || []).reduce((prev, current) => {return { w: prev.w + current.w, l: prev.l + current.l };}, { w: 0, l: 0 }).l || 0,
                    percentage: roundToHundredth(((totalWins)/(totalWins + totalLosses))*100),
                    w: totalWins,
                    l: totalLosses,
                    fpts: totalFPTS,
                    ppts: totalPPTS,
                    fpts_against: totalPA,
                    highest: historicBestScore,
                    bestRecord: bestRecord?.settings?.wins > inSeasonStats?.wins ? bestRecord?.settings?.wins + "-" + bestRecord?.settings?.losses : inSeasonStats?.wins + "-" + inSeasonStats?.losses,
                    bestRecordW: bestRecord?.settings?.wins > inSeasonStats?.wins ? bestRecord?.settings?.wins : inSeasonStats?.wins,
                    bestRecordL: bestRecord?.settings?.wins > inSeasonStats?.wins ? bestRecord?.settings?.losses : inSeasonStats?.losses,
                    playoffGames:allTimePostSzn().Games || 0,
                    playoffPF:allTimePostSzn().PF || 0,
                    // playoffMaxPF:0,
                    playoffPA:allTimePostSzn().PA || 0,
                    playoffHS:allTimePostSzn().HS || 0,
                    TB:allTimePostSzn().TB,
                    finals:(allTimePostSzn().FinalsW + "-" + allTimePostSzn().FinalsL) || "0-0",
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
                foundMyMatchups:myMatchups
            } 
        }
    }

    return (
        <AppLayout>
            <SidenavBar/>
            <Router>
                <AppRouter  
                    activityBar={activityBar}
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
                    setActivityBar={setActivityBar}
                    transactions={transactions}
                />          
            </Router>
        </AppLayout>
    );
}

export default App;