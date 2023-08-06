import "./styles/App.css";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AppRouter from "./router/AppRouter";
import SidenavBar from "./layouts/SidenavBar";
import ActivityBar from "./components/ActivityBar";
import {
    findLogo,
    getTotalPts,
    lineupEfficiency,
    toDateTime,
    roundToHundredth,
    winPCT,
} from "./utils";
import {
    findRosterByID,
    findPlayer,
    handleRostersBySzn,
} from "./helpers";

import { 
    useLeagueData,
    useMatches,
    useOwners,
    usePlayers,
    useRosters,
    useTransactions,
} from "./hooks";
import { processMatches } from "./helpers";

function App() {
    const { league, loadLeague } = useLeagueData();
    const { matches, loadMatches } = useMatches();
    const { owners, loadOwners } = useOwners();
    const { players, loadPlayers } = usePlayers();
    const { rosters, loadRosters } = useRosters();
    const { transactions, loadTransactions } = useTransactions();

    const [activityBar, setActivityBar] = useState(false)

    let matchups = processMatches(matches);

    const foundHistory = (rosterID, yr) => {
        if(rosterID !== undefined || null){
            let foundMyMatchups = matchups && matchups.map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                if(team.filter(owner => owner.roster_id === Number(rosterID)).length > 0){
                    return team
                }  
                return acc
            })).map(match => match.sort((a,b) => b.points - a.points))
     
            let foundStats = findRosterByID(rosterID, rosters).settings;

            let findPlayoffs = league.history.map(szn => szn.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)))
            let findRosters = league.history.map(szn => szn.rosters.filter(roster => roster.roster_id === Number(rosterID))[0])
        
            let findMyHistoryMatches = league.history.map(szn => Object.entries(szn.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]))

            // CURRENT SEASON ALL PLAY //
            let allPlayCSzn=[]
            let allPlayCSznWk=[]
            matches.slice(0,14).map(wk => {
                let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                let win = 0
                let opWin = 0
                let oID;
                let t = wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
                    if(myWk.points > t.points){
                        win = +1
                        opWin = 0
                        oID = t.roster_id
                    } else {
                        opWin = +1
                        win = 0
                        oID = t.roster_id
                    }
                    let obj = allPlayCSzn.find(w => w.oID === oID) || false;
                    if(obj){
                        obj.w = obj.w + win
                        obj.oW = obj.oW + opWin
                    } else {
                        allPlayCSzn.push({
                            w: win,
                            oW: opWin,
                            oID: oID
                        })
                    }
                    return {
                        w: win,
                        oW: opWin,
                        oID: oID
                    }
                })
                allPlayCSznWk.push(t)
                return {
                    w: win,
                    oW: opWin,
                    oID: oID
                }
            })
            // SELECT ALL PLAY // 
            let selectPlay = []
            let selectPlayWk = []
            league.history.filter(l => l.year === yr).map(szn => {
                if(Number(yr) > 2020){
                    Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1]).map(wk => {
                        let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                        let win = 0
                        let opWin = 0
                        let oID;
                        let t = wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
                            if(myWk.points > t.points){
                                win = +1
                                opWin = 0
                                oID = t.roster_id
                            } else {
                                opWin = +1
                                win = 0
                                oID = t.roster_id
                            }
                            let obj = selectPlay.find(w => w.oID === oID) || false;
                            if(obj){
                                obj.w = obj.w + win
                                obj.oW = obj.oW + opWin
                            } else {
                                selectPlay.push({
                                    w: win,
                                    oW: opWin,
                                    oID: oID
                                })
                            }
                            return {
                                w: win,
                                oW: opWin,
                                oID: oID
                            }
                        })
                        selectPlayWk.push(t)
                        return {
                            w: win,
                            oW: opWin,
                            oID: oID
                        }
                    })
                } else {
                    // 13 GAME SZN //
                    Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1]).map(wk => {
                        let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                        let win = 0
                        let opWin = 0
                        let oID;
                        let t = wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
                            if(myWk.points > t.points){
                                win = +1
                                opWin = 0
                                oID = t.roster_id
                            } else {
                                opWin = +1
                                win = 0
                                oID = t.roster_id
                            }
                            let obj = selectPlay.find(w => w.oID === oID) || false;
                            if(obj){
                                obj.w = obj.w + win
                                obj.oW = obj.oW + opWin
                            } else {
                                selectPlay.push({
                                    w: win,
                                    oW: opWin,
                                    oID: oID
                                })
                            }
                            return {
                                w: win,
                                oW: opWin,
                                oID: oID
                            }
                        })
                        selectPlayWk.push(t)
                        return {
                            w: win,
                            oW: opWin,
                            oID: oID
                        }
                    })
                }
                return null
            })
            // HISTORY ALL PLAY // 
            let allPlay = []
            league.history.map(szn => {
                if(Number(szn.year) > 2020){
                    Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1]).map(wk => {
                        let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                        let win = 0
                        let opWin = 0
                        let oID;
                        wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
                            if(myWk.points > t.points){
                                win = +1
                                opWin = 0
                                oID = t.roster_id
                            } else {
                                opWin = +1
                                win = 0
                                oID = t.roster_id
                            }
                            let obj = allPlay.find(w => w.oID === oID) || false;
                            if(obj){
                                obj.w = obj.w + win
                                obj.oW = obj.oW + opWin
                            } else {
                                allPlay.push({
                                    w: win,
                                    oW: opWin,
                                    oID: oID
                                })
                            }
                            return {
                                w: win,
                                oW: opWin,
                                oID: oID
                            }
                        })
                        return {
                            w: win,
                            oW: opWin,
                            oID: oID
                        }
                    })
                } else {
                    // 13 GAME SZN
                    Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1]).map(wk => {
                        let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                        let win = 0
                        let opWin = 0
                        let oID;
                        wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
                            if(myWk.points > t.points){
                                win = +1
                                opWin = 0
                                oID = t.roster_id
                            } else {
                                opWin = +1
                                win = 0
                                oID = t.roster_id
                            }
                            let obj = allPlay.find(w => w.oID === oID) || false;
                            if(obj){
                                obj.w = obj.w + win
                                obj.oW = obj.oW + opWin
                            } else {
                                allPlay.push({
                                    w: win,
                                    oW: opWin,
                                    oID: oID
                                })
                            }
                            return {
                                w: win,
                                oW: opWin,
                                oID: oID
                            }
                        })
                        return {
                            w: win,
                            oW: opWin,
                            oID: oID
                        }
                    })
                }
                return null
            })

            // HEAD 2 HEAD :: HISTORY MATCHUPS (Function for Head to Head W-L :: history seasons)
            let myHeadtoHead = []
            let games = []
            league.history.map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                acc[team.matchup_id] = acc[team.matchup_id] || [];
                acc[team.matchup_id].push(team);
                return acc;
            }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                if(team.filter(owner => owner.roster_id === Number(rosterID)).length > 0){
                    return team
                }  
                return acc
            })).map(match => match.sort((a,b) => b.points - a.points)).map(m => {
                let win = 0
                let opWin = 0
                let oID = m.filter(t => t.roster_id !== Number(rosterID))[0].roster_id
                if(
                    m &&
                    m.filter(t => t.roster_id === Number(rosterID))[0] && 
                    m.filter(t => t.roster_id === Number(rosterID))[0].matchup_id !== undefined && 
                    m.filter(t => t.roster_id === Number(rosterID))[0].matchup_id !== null){
                    games.push(m)
                    if(m[0].roster_id === Number(rosterID)){
                        win++
                    } else {
                        opWin++
                    }
                    return {
                        w: win,
                        oW: opWin,
                        oID:oID,
                    }
                } return null              
            }).filter(aaa => aaa !== null).forEach(g => {
                let obj = myHeadtoHead.find(w => w.oID === g.oID) || false;
                if(obj){
                    obj.w = obj.w + g.w
                    obj.oW = obj.oW + g.oW
                } else {
                    myHeadtoHead.push(g)
                }
            })) 
            // CURRENT MATCHUPS (Function for Head to Head W-L :: current season)
            foundMyMatchups.length > 0 ? foundMyMatchups.map(m => {
                let win = 0
                let opWin = 0

                if(
                    m &&
                    m.filter(t => t.roster_id === Number(rosterID))[0] && 
                    m.filter(t => t.roster_id === Number(rosterID))[0].matchup_id !== undefined && 
                    m.filter(t => t.roster_id === Number(rosterID))[0].matchup_id !== null){
                    games.push(m)
                    if(m[0].roster_id === Number(rosterID)){
                        win++
                    } else {
                        opWin++
                    }
                    return {
                        w: win,
                        oW: opWin,
                        oID:m.filter(t => t.roster_id !== Number(rosterID))[0].roster_id
                    }
                } return null              
            }).filter(aaa => aaa !== null).forEach(g => {
                let obj = myHeadtoHead.find(w => w.oID === g.oID) || false;
                if(obj){
                    obj.w = Number(obj.w) + Number(g.w)
                    obj.oW = Number(obj.oW) + Number(g.oW)
                } else {
                    myHeadtoHead.push(g)
                }
            }) :<></>
            let yrTopScore = league.history.filter(szn => szn.year === yr).map(s => Object.entries(s.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)[0].points)[0]
            let cTopScore = foundMyMatchups && foundMyMatchups.map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).sort((a,b) => b.points - a.points)
            let currentTopScore = cTopScore.length > 0 ? cTopScore[0].points : 0
            let historyTopScore = findMyHistoryMatches && findMyHistoryMatches.map(m => m.sort((a, b) => b.points - a.points)[0]).sort((a,b) => b.points - a.points)[0].points
            let currentBracket = league.brackets ? league.brackets.winner.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)) : <></>
            let currentTBracket = league.brackets ? league.brackets.loser.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)) : <></>
            let currentTBracketLs = league.brackets ? currentTBracket.filter(match => match.l === Number(rosterID)) : <></>
            //CURRENT PLAYOFFS
            let playoffHS;
            let playoffPF;
            let playoffPA; 
            if(currentBracket.length > 0 && foundMyMatchups.length > 0){
                if(currentBracket.length === 3){
                    playoffHS = foundMyMatchups.slice(14,17).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]
                    playoffPF = foundMyMatchups.slice(14,17).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})
                    playoffPA = roundToHundredth(foundMyMatchups.slice(14,17).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b}))
                } else if(currentBracket.length === 2){
                    playoffHS = foundMyMatchups.slice(14,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]
                    playoffPF = foundMyMatchups.slice(14,16).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})
                    playoffPA = roundToHundredth(foundMyMatchups.slice(14,16).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b}))

                } else if(currentBracket.length === 1){
                    playoffHS = foundMyMatchups.slice(14,15).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]
                    playoffPF = foundMyMatchups.slice(14,15).map(m => m.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})
                    playoffPA = roundToHundredth(foundMyMatchups.slice(14,15).map(m => m.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b}))
                } 
            }
            //All Time PLAYOFFS
            const allTimePostSzn = () => {
                let PF;
                let PA;
                let HS;
                let Games;

                let TB = league.history && league.history.map(s => { 
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
            
                let playoffSZNs = league.history && league.history.map(s => {
                    if(s.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)).length > 0) {
                        const template =  league.history.filter(szn => szn.year === s.year).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
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
            
                let fTemplate = playoffSZNs.map(s => {
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
                let FinalsW = fTemplate.length > 0 ? fTemplate.map(f => f.w).reduce((a,b) => {return +a + +b}) : 0
                let FinalsL = fTemplate.length > 0 ? fTemplate.map(f => f.l).reduce((a,b) => {return +a + +b}) : 0

                let currentFinalW = 0;
                if(currentBracket.length > 0 && currentBracket[1] && currentBracket[2] && currentBracket[1].w !== undefined && currentBracket[2].w !== undefined){
                    if(currentBracket[1].w === Number(rosterID) && currentBracket[2].w === Number(rosterID)){
                        currentFinalW = 1
                    }
                } else {
                    currentFinalW = 0
                }
                let currentFinalL = 0;
                if(currentBracket.length > 0 && currentBracket[1] && currentBracket[2] && currentBracket[1].w !== undefined && currentBracket[2].w !== undefined){
                    if(currentBracket[1].w === Number(rosterID) && currentBracket[2].l === Number(rosterID)){
                        currentFinalL = 1
                    }
                } else {
                    currentFinalL = 0
                }
                PF = roundToHundredth(playoffSZNs.length > 0 ? playoffSZNs.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})).reduce((a,b) => {return +a + +b}): 0)
                PA = roundToHundredth(playoffSZNs.length > 0 ? playoffSZNs.map(m => m.games.map(g => g.filter(t => t.roster_id !== Number(rosterID))[0]).map(a => a && a.points).reduce((a,b) => {return +a + +b})).reduce((a,b) => {return +a + +b}): 0)
                HS = roundToHundredth(playoffSZNs.length > 0 ? playoffSZNs.map(m => m.games.map(g => g.filter(t => t.roster_id === Number(rosterID))[0]).map(a => a && a.points).sort((a,b) => b - a)[0]).sort((a,b) => b - a)[0] : 0)
                Games = playoffSZNs.length > 0 ? playoffSZNs.map(s => s.bracket.length).reduce((a,b) => {return +a + +b}) : 0
                
                let currentTB = currentTBracket.length > 0 && currentTBracket[2] &&currentTBracket[2].w === Number(rosterID) ? 1 : 0
                return {
                    PF: playoffPF !== undefined ? PF + playoffPF : PF,
                    PA: playoffPA !== undefined ? PA + playoffPA : PA,
                    HS: playoffHS !== undefined ? HS > playoffHS ? HS : playoffHS : HS,
                    Games: Games + currentBracket.length,
                    FinalsW: FinalsW + currentFinalW,
                    FinalsL: FinalsL + currentFinalL,
                    TB: currentTB + TB
                }
            }

            let historyWs = findRosters.reduce((acc, item) =>  acc + item.settings.wins, 0)
            let historyLs = findRosters.reduce((acc, item) =>  acc + item.settings.losses, 0)
            let historyFPTS = findRosters.reduce((acc, item) =>  acc + Number(item.settings.fpts + "." + item.settings.fpts_decimal), 0)
            let historyPPTS = findRosters.reduce((acc, item) =>  acc + Number(item.settings.ppts + "." + item.settings.ppts_decimal), 0)
            let historyPA = findRosters.reduce((acc, item) =>  acc + Number(item.settings.fpts_against + "." + item.settings.fpts_against_decimal), 0)

            let fptsCurrentYR = Number(foundStats.fpts + "." + foundStats.fpts_decimal) || 0
            let pptsCurrentYR = Number(foundStats.ppts + "." + foundStats.ppts_decimal) || 0
            let fpts_againstCurrentYR = Number(foundStats.fpts_against + "." + foundStats.fpts_against_decimal) || 0

            let playoffWs = findPlayoffs.map(szn => szn.filter(match => match.w === Number(rosterID)))
            let playoffLs = findPlayoffs.map(szn => szn.filter(match => match.l === Number(rosterID)))
            
            let currentBracketWs = league.brackets ? currentBracket.filter(match => match.w === Number(rosterID)) : <></>
            let currentBracketLs = league.brackets ? currentBracket.filter(match => match.l === Number(rosterID)) : <></>

            // SELECT YR
            let playoffYR = league.history.filter(szn => szn.year === yr).map(l => l.league.brackets.winner.bracket.filter(m => m.t2 === Number(rosterID) || m.t1 === Number(rosterID)))[0] || 0
            let findHistoryMatchYR = league.history.filter(szn => szn.year === yr).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                acc[team.matchup_id] = acc[team.matchup_id] || [];
                acc[team.matchup_id].push(team);
                return acc;
            }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                if(team.filter(owner => owner.roster_id === Number(rosterID)).length > 0){
                    return team
                }  
                return acc
            })).map(match => match.sort((a,b) => b.points - a.points)))[0]
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
            }
            let leagueAvgPtsS=league && league.history && league.history.filter(szn => szn.year === yr).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                acc[team.matchup_id] = acc[team.matchup_id] || [];
                acc[team.matchup_id].push(team);
                return acc;
            }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(match => match.sort((a,b) => b.points - a.points)).map(m => roundToHundredth(Object.entries(m).map(t => t[1].map(s => s.points).reduce((a,b) => a +b,0)/2).reduce((a,b) => a +b,0)/6)))
            let leagueAVGPtsC=matchups && matchups.map(m => roundToHundredth(Object.entries(m).map(t => t[1].map(s => s.points).reduce((a,b) => a +b,0)/2).reduce((a,b) => a +b,0)/6))
            let bestRecord = findRosters.sort((a,b) => b.settings.wins - a.settings.wins)[0]
            let playoffApp = findPlayoffs.map(p => {if(p.length !== 0){return p}else{return null}}).filter(t=>t!==null)
            return {
                allTime: {    
                    allPlay: allPlay,
                    allPlayRecordW:allPlay.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w,
                    allPlayRecordL:allPlay.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW,
                    percentage: roundToHundredth(((foundStats.wins + historyWs)/(foundStats.wins + historyWs + foundStats.losses + historyLs))*100),
                    w: foundStats.wins + historyWs,
                    l: foundStats.losses + historyLs,
                    fpts: roundToHundredth(fptsCurrentYR + historyFPTS),
                    ppts: roundToHundredth(pptsCurrentYR + historyPPTS),
                    fpts_against: roundToHundredth(fpts_againstCurrentYR + historyPA),
                    highest: historyTopScore > currentTopScore ? historyTopScore : currentTopScore,
                    bestRecord: bestRecord.settings.wins > foundStats.wins ? bestRecord.settings.wins + "-" + bestRecord.settings.losses : foundStats.wins + "-" + foundStats.losses,
                    bestRecordW: bestRecord.settings.wins > foundStats.wins ? bestRecord.settings.wins : foundStats.wins,
                    bestRecordL: bestRecord.settings.wins > foundStats.wins ? bestRecord.settings.losses : foundStats.losses,
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
                playoffs: 
                    currentBracket.length !== 0 || null || undefined ?     
                        { 
                            w: playoffWs.map(szn => szn.length).reduce((acc, n) => acc + n, 0) + currentBracketWs.length || 0,
                            l: playoffLs.map(szn => szn.length).reduce((acc, n) => acc + n, 0) + currentBracketLs.length || 0,
                            a: playoffApp.length + 1 || 0
                        }
                    :
                        {
                            w: playoffWs.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0,
                            l: playoffLs.map(szn => szn.length).reduce((acc, n) => acc + n, 0) || 0,
                            a: playoffApp.length || 0
                        },
                c: {
                    allPlay:allPlayCSzn,
                    allPlayWk:allPlayCSznWk,
                    allPlayRecordW:allPlayCSzn.length > 0? allPlayCSzn.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w : 0,
                    allPlayRecordL:allPlayCSzn.length > 0? allPlayCSzn.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW: 0,
                    highest: currentTopScore,
                    playoff: currentBracket.length > 0 ? true : false,
                    toilet:{
                        l:currentTBracketLs.length || 0

                    },
                    pW:currentBracketWs.length|| 0,
                    pL:currentBracketLs.length|| 0,
                    playoffGames: currentBracket.length || 0,
                    playoffPF:playoffPF || 0,
                    // playoffMaxPF:playoffMaxPF,
                    playoffPA:playoffPA || 0,
                    playoffHS:playoffHS || 0,
                    playoffMatchups:foundMyMatchups !== undefined? foundMyMatchups:[],
                    matchups:foundMyMatchups !== undefined? foundMyMatchups.slice(0,14):[],
                    leagueAvgPts:leagueAVGPtsC !== undefined? leagueAVGPtsC.slice(0,14):[],
                    // w:,
                    // l:
                },
                s:  {
                    allPlay:selectPlay,
                    allPlayWk:selectPlayWk,
                    allPlayRecordW: selectPlay.length > 0 ?selectPlay.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).w : 0,
                    allPlayRecordL: selectPlay.length > 0 ? selectPlay.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}}).oW : 0,
                    highest: yrTopScore,
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
                    leagueAvgPts:leagueAvgPtsS[0]!==undefined?Number(yr) > Number("2020")?leagueAvgPtsS[0].slice(0,14):leagueAvgPtsS[0].slice(0,13):[]
                },
                h2h:myHeadtoHead.sort((a,b) => { if(winPCT(b.w , b.oW) === winPCT(a.w , a.oW)){ return b.w - a.w } else {return winPCT(b.w , b.oW) - winPCT(a.w , a.oW)}}).map((roster, idx) => ({...roster, rank:idx+1})),
                g:games,
                foundMyMatchups:foundMyMatchups
            } 
        }
    }

    return (
        <div className="app">
            <div className="appContainer">
                <SidenavBar/>
                <Router>
                    <AppRouter  
                        activityBar={activityBar}
                        findLogo={findLogo}
                        findPlayer={findPlayer}
                        findRosterByID={findRosterByID}
                        foundHistory={foundHistory}
                        getTotalPts={getTotalPts}
                        handleRostersBySzn={handleRostersBySzn}
                        league={league}
                        lineupEfficiency={lineupEfficiency}
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
                        roundToHundredth={roundToHundredth}
                        setActivityBar={setActivityBar}
                        toDateTime={toDateTime}
                        transactions={transactions}
                        winPCT={winPCT}
                    />          
                </Router>
                <div className="">
                    <ActivityBar
                        activityBar={activityBar}
                        loadLeague={loadLeague}
                        league={league}
                        loadTransactions={loadTransactions}
                        setActivityBar={setActivityBar}
                        toDateTime={toDateTime}
                        transactions={transactions}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;