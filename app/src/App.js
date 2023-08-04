import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Home from "./pages/Home";
import Owner from "./pages/Owner";
import Tabs from "./components/Tabs";
import ActivityBar from './components/ActivityBar';

import {logos} from "./assets/logos";


function App() {

  const [league, setLeague] = useState({})
  const [loadLeague, setLoadLeague] = useState(true)

  const [rosters, setRosters] = useState([])
  const [loadRosters, setLoadRosters] = useState(true)
  
  const [transactions, setTransactions] = useState([])
  const [loadTransactions, setLoadTransactions] = useState(true)

  const [matches, setMatches] = useState([])
  const [loadMatches, setLoadMatches] = useState(true)

  const [players, setPlayers] = useState([])
  const [loadPlayers, setLoadPlayers] = useState(true)

  const [activityBar, setActivityBar] = useState(false)

  useEffect(() => {
      getRosters();
      getLeague();
      getTransactions();
      getMatches();
      getPlayers();
      // return () => {setRosters([])};
      // eslint-disable-next-line 
  }, [])
  
  const getRosters = async () => {
    try{
      const call = await fetch("http://localhost:5000/player/rosters")
      const parsedRosters = await call.json()
      setRosters(parsedRosters)
      setLoadRosters(false)
      console.log("getRosters:",parsedRosters)
    } catch (err) {
      console.log(err)
    }
  }
  const getLeague = async () => {
      try {
          const call = await fetch(`http://localhost:5000/league`)
          const parsedLeague = await call.json()
          setLeague(parsedLeague)
          setLoadLeague(false)
          console.log("getLeague:",parsedLeague)
      } catch(err) {
          console.log(err)
      }
  }
  const getTransactions = async () => {
      try{
          const call = await fetch(`http://localhost:5000/league/transactions`)
          const parsedTransactions = await call.json()
          setTransactions(parsedTransactions)
          setLoadTransactions(false)
          console.log("getTransactions:",parsedTransactions)
      } catch (err) {
          console.log(err)
      }
  }
  const getMatches = async () => {
    try{
      const call = await fetch(`http://localhost:5000/league/matches`)
      const parsedMatches = await call.json()
      setMatches(parsedMatches)
      setLoadMatches(false)
      console.log("getMatches:",parsedMatches)
    } catch (err) {
      console.log(err)
    }
  }
  const getPlayers = async () => {
    try{
      const call = await fetch(`http://localhost:5000/player`)
      const parsedPlayers = await call.json()
      setPlayers(parsedPlayers)
      setLoadPlayers(false)
      console.log("getPlayers:",parsedPlayers)
    }catch (err) {
      console.log(err)
    }
  }
  let winPCT = (w, l) => {
    return roundToHundredth((w/(w + l))*100)
  }
  const roundToHundredth = (value) => {
    if(value !== undefined){
      return Number(value.toFixed(2));
    } else return 0
  }
  let findLogo = (team) => {
    if(team === null || undefined){
      return "FA"
    } else {
      let foundLogo = logos.filter(logo => logo[team])
      return Object.values(foundLogo[0])[0]
    }
  }
  const findPlayer = (pID) => {
    let foundPlayer = players && players?.filter(p => p.player_id === pID)[0]
    return foundPlayer
  } 
  const getTotalPts = (rID, pID) => {
    let historyMaxPts = 0;
    let currentMaxPts = 0;
    let historyPts=0; 
    let currentPts=0;

    if(rID !== undefined && pID !== undefined){
      historyPts = league && league.history && league.history.map(l => 
        Object.entries(l.matchups)
          .map(g => g[1]
            .filter(t => t.roster_id === rID)[0].starters.find(s => s === pID) !== undefined ? 
              Object.entries(g[1].filter(t => t.roster_id === rID)[0].players_points)
                .filter(p => p[0] === pID)[0][1]
            :0
          ).reduce((partialSum,a) => partialSum + a, 0)
        ).reduce((partialSum,a) => partialSum + a, 0)

      currentPts = matches && matches.map(m => 
        m.filter(r => r.roster_id === rID)[0] &&
        m.filter(r => r.roster_id === rID)[0].starters.find(s => s === pID) !== undefined ?
          Object.entries(m.filter(t => t.roster_id === rID)[0].players_points)
            .filter(p => p[0] === pID)[0][1]
        :0
        ).reduce((partialSum,a) => partialSum + a, 0)

      let checkHUndefined = league && league.history && league.history.map(l => Object.entries(l.matchups)
        .map(g => Object.entries(g[1].filter(t => t.roster_id === rID)[0].players_points)
      .filter(p => p[0] === pID)[0]).filter(t => t !== undefined)).filter(t => t.length > 0)
      
      let checkCUndefined = []

      if(matches[0] && matches[0].length>0){
        checkCUndefined = matches && matches.map(m => 
          Object.entries(m.filter(r => r.roster_id === rID)[0]) && 
            Object.entries(m.filter(r => r.roster_id === rID)[0].players_points)
              .filter(p => p[0] === pID)[0]).filter(t => t !== undefined).filter(t => t !== [])
      }

      if(checkHUndefined && checkHUndefined[0] && checkHUndefined[0].length > 0 && checkCUndefined.length > 0){
        historyMaxPts = checkHUndefined.map(l => l.map(a => a[1]).reduce((partialSum,a) => partialSum + a, 0)).reduce((partialSum,a) => partialSum + a, 0)
        currentMaxPts = checkCUndefined.map((a) => a[1]).reduce((partialSum,a) => partialSum + a, 0)

      } else if(checkHUndefined && checkHUndefined[0] && checkHUndefined[0].length > 0 && checkCUndefined.length === 0){
        historyMaxPts = checkHUndefined.map(l => l.map(a => a[1]).reduce((partialSum,a) => partialSum + a, 0)).reduce((partialSum,a) => partialSum + a, 0)

      } else if(checkCUndefined && checkCUndefined.length > 0){
        currentMaxPts = checkCUndefined.map((a) => a[1]).reduce((partialSum,a) => partialSum + a, 0)
      }
    }
    return {
      pts:roundToHundredth(historyPts + currentPts),
      maxPts:roundToHundredth(historyMaxPts + currentMaxPts)
    }
  }
  const findRosterByName = (dName) => {
    return rosters && rosters.totalRoster.filter(r => r.owner.display_name === dName)[0]&&
    rosters.totalRoster.filter(r => r.owner.display_name === dName)[0].roster_id     
  }
  const findRosterByID = (rID) => {
    return rosters.totalRoster && rosters.totalRoster.map((roster, idx) => ({...roster, rank:idx+1})).find(roster => roster.roster_id === Number(rID))
  }
  const handleRostersBySzn = (yr) => {
    let foundSzn=[]
    if(yr === league.season){
        foundSzn=rosters.totalRoster && rosters.totalRoster.sort((a,b) => {
            if(a.settings.wins === b.settings.wins) {
              return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
            } else {
              return b.settings.wins - a.settings.wins
            }
        }).map((roster, idx) => ({...roster, rank:idx+1}))
    } else {
        foundSzn = league.history.filter(l => l.year === yr).map((l,) => 
        l.rosters.sort((a,b) => {
          if(a.settings.wins === b.settings.wins) {
            return Number(b.settings.fpts + "." + b.settings.fpts_decimal) - Number(a.settings.fpts + "." + a.settings.fpts_decimal);
          } else {
            return b.settings.wins - a.settings.wins
          }
        }).map((roster, idx) => ({...roster, rank:idx+1}))
      )
    }
    return foundSzn 
  }
  let matchups = matches &&  matches[0] && matches[0].length>0? matches.filter(m => m !== null).map(wk => wk.reduce((acc,team) => {
    acc[team.matchup_id] = acc[team.matchup_id] || [];
    acc[team.matchup_id].push(team);
    return acc;
  }, Object.create(null))):[]

    let lineupEfficiency = (pf, maxPF) => {
        return roundToHundredth((pf/maxPF)*100) 
    }

    const foundHistory = (rosterID, yr) => {
        if(rosterID !== undefined || null){
            let foundMyMatchups = matchups && matchups.map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                if(team.filter(owner => owner.roster_id === Number(rosterID)).length > 0){
                    return team
                }  
            return acc
        })).map(match => match.sort((a,b) => b.points - a.points))
     
        let foundStats = rosters.totalRoster && rosters.totalRoster.find(roster => roster.roster_id === Number(rosterID)).settings

        let findPlayoffs = league.history.map(szn => szn.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)))
        let findRosters = league.history.map(szn => szn.rosters.filter(roster => roster.roster_id === Number(rosterID))[0])
        
        let findMyHistoryMatches = league.history.map(szn => Object.entries(szn.matchups).map(g => g[1].filter(m => m.roster_id === Number(rosterID))[0]))
        // // // // // // // // // // 
        // CURRENT SEASON ALL PLAY //
        // // // // // // // // // // 
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
        // // // // // // // // 
        // SELECT ALL PLAY // 
        // // // // // // //  
        let selectPlay = []
        let selectPlayWk = []
        league.history.filter(l => l.year === yr).map(szn => {
            if(Number(yr) > 2020){
                Object.entries(szn.matchups).filter(y => y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1]).map(wk => {
                    let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                    let win = 0
                    let opWin = 0
                    let oID;
                    let t=wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
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
                // 13 GAME SZN
                Object.entries(szn.matchups).filter(y => y[0] !== "wk14" && y[0] !== "wk15" && y[0] !=="wk16" && y[0] !== "wk17").map(g => g[1]).map(wk => {
                    let myWk = wk.filter(t => t.roster_id === Number(rosterID))[0]
                    let win = 0
                    let opWin = 0
                    let oID;
                    let t=wk.filter(t => Number(rosterID) !== t.roster_id).map(t => {
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
        // // // // // // // // // // 
        // // HISTORY ALL PLAY // // 
        // // // // // // // // // 
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
                if(s.league.brackets.winner.bracket.filter(match => match.t1 === Number(rosterID) || match.t2 === Number(rosterID)).length > 0){
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
function toDateTime(secs) {
    var t = Number(secs);
    let dateObj = new Date(t);
    var month = dateObj.toLocaleString('default', { month: 'long' });
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return  month + " " + day + ", " + year
}
  return (
      <div className="App d-flex">
        <div className="tabs">
          <Tabs/>
        </div>
        <Router>
          <Routes>
            <Route 
              exact path={`/Home`} 
              element={ 
                <Home 
                  loadLeague={loadLeague}
                  league={league}
                  loadRosters={loadRosters}
                  rosters={rosters}
                  loadTransactions={loadTransactions}
                  transactions={transactions}
                  loadMatches={loadMatches}
                  matches={matches}
                  activityBar={activityBar}
                  setActivityBar={setActivityBar}
                  findLogo={findLogo}
                  findPlayer={findPlayer}
                  getTotalPts={getTotalPts}
                  findRosterByName={findRosterByName}
                  findRosterByID={findRosterByID}
                  handleRostersBySzn={handleRostersBySzn}
                  foundHistory={foundHistory}
                  roundToHundredth={roundToHundredth}
                  winPCT={winPCT}
                  lineupEfficiency={lineupEfficiency}
                  toDateTime={toDateTime}
                />  
              }>
            </Route>
            <Route 
              exact path={`/Owner/:id`} 
              element={ 
                <Owner 
                  loadLeague={loadLeague}
                  league={league}
                  loadRosters={loadRosters}
                  rosters={rosters}
                  loadTransactions={loadTransactions}
                  transactions={transactions}
                  loadMatches={loadMatches}
                  matches={matches}
                  loadPlayers={loadPlayers}
                  players={players}
                  winPCT={winPCT}
                  roundToHundredth={roundToHundredth}
                  findLogo={findLogo}
                  findPlayer={findPlayer}
                  activityBar={activityBar}
                  setActivityBar={setActivityBar}
                  getTotalPts={getTotalPts}
                  findRosterByName={findRosterByName}
                  findRosterByID={findRosterByID}
                  foundHistory={foundHistory}
                  lineupEfficiency={lineupEfficiency}
                />  
              }>
            </Route>
          </Routes>
        </Router>
        <div className="">
          <ActivityBar
            activityBar={activityBar}
            setActivityBar={setActivityBar}
            loadLeague={loadLeague}
            league={league}
            loadTransactions={loadTransactions}
            transactions={transactions}
            toDateTime={toDateTime}
          />
        </div>
      </div>
  );
}

export default App;
