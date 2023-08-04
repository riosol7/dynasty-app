import React, {useState} from 'react'
import Matchups from "../../components/Matchups";
import Stats from '../Stats';
import Roster from '../Roster';
import VS from '../VS';
import LineChart from '../charts/LineChart';
// import Draft from '../Draft';
// import age from "../../assets/age.png";
// import { Icon } from '@iconify/react';

export default function Summary(props) {
    const id = props.id
    const loadLeague = props.loadLeague
    const league = props.league
    const foundMyMatchups = props.foundMyMatchups
    const players = props.players
    const rosters = props.rosters
    const loadRosters=props.loadRosters
    const foundHistory = props.foundHistory
    const owner = props.owner
    const handleSzn = props.handleSzn
    const lineupEfficiency = props.lineupEfficiency
    const totalPtsPerGame = props.totalPtsPerGame
    const findLogo = props.findLogo
    const findRosterByID = props.findRosterByID
    const findRecord = props.findRecord
    const winPCT = props.winPCT
    const roundToHundredth = props.roundToHundredth
    const findPlayer = props.findPlayer
    const isOdd = props.isOdd
    const openModal=props.openModal
    const tab=props.tab
    const getTotalPts=props.getTotalPts
    // const findWeeklyMatchups=props.findWeeklyMatchups
    // const setWeeklyMatch=props.setWeeklyMatch
    // const weeklyMatch=props.weeklyMatch
    // const handleWeeklyMatch=props.handleWeeklyMatch
    // const vs=props.vs
    // const handleAllPlay=props.handleAllPlay
    // const handleVS=props.handleVS
    // const selectAllPlay=props.selectAllPlay
    const [weeklyMatch, setWeeklyMatch] = useState(foundMyMatchups.length>0?league.season:(Number(league.season)-1).toString())
    const [selectStats, setSelectStats] = useState("Season")
    const [selectSzn, setSelectSzn] = useState("All Time")
    // const [draftClass, setDraftClass] = useState(league.season)
    const [vs, setVS] = useState("Head")
    const [selectAllPlay, setSelectAllPlay] = useState("All Time")
    // const [showQBs, setShowQBs] = useState(false)
    // const [qbArrow, setQbArrow] = useState(true)
    // const [showRBs, setShowRBs] = useState(false)
    // const [rbArrow, setRbArrow] = useState(true)
    // const [showWRs, setShowWRs] = useState(false)
    // const [wrArrow, setWrArrow] = useState(true)
    // const [showTEs, setShowTEs] = useState(false)
    // const [teArrow, setTeArrow] = useState(true)

    const handleWeeklyMatch = (e) => {
        setWeeklyMatch(e.target.value)
    }
    const handleAllPlay = (e) => {
        setSelectAllPlay(e.target.value)
    }
    const handleSelectStats = () => {
        if(selectStats ==="Post Season"){
            setSelectStats("Season");
        } else {
            setSelectStats("Post Season");
        }
    }
    const handleSelectSzn = (e) => {
        setSelectSzn(e.target.value);
    }
    const handleVS = (e) => {
        setVS(e.target.value)
    }
    // const handleDraftClass = (e) => {
    //     setDraftClass(e.target.value)
    // }
    // const showMoreQBs = () => {
    //     setShowQBs(!showQBs)
    //     setQbArrow(!qbArrow)
    // }
    // const showMoreRBs = () => {
    //     setShowRBs(!showRBs)
    //     setRbArrow(!rbArrow)
    // }
    // const showMoreWRs = () => {
    //     setShowWRs(!showWRs)
    //     setWrArrow(!wrArrow)
    // }
    // const showMoreTEs = () => {
    //     setShowTEs(!showTEs)
    //     setTeArrow(!teArrow)
    // }
    // function qbRankings (roster) {
    //     let foundTeam = rosters.qbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
    //     let rank = 0
    //     foundTeam.rank === 1?
    //     rank = foundTeam.rank + "st"
    //     :
    //     foundTeam.rank === 2?
    //     rank = foundTeam.rank + "nd"
    //     :
    //     foundTeam.rank === 3?
    //     rank = foundTeam.rank + "rd"
    //     :
    //     rank = foundTeam.rank + "th"
    //     return rank
    // }
    // function rbRankings (roster) {
    //     let foundTeam = rosters.rbRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
    //     let rank = 0
    //     foundTeam.rank === 1?
    //     rank = foundTeam.rank + "st"
    //     :
    //     foundTeam.rank === 2?
    //     rank = foundTeam.rank + "nd"
    //     :
    //     foundTeam.rank === 3?
    //     rank = foundTeam.rank + "rd"
    //     :
    //     rank = foundTeam.rank + "th"
    //     return rank
    // }
    // function wrRankings (roster) {
    //     let foundTeam = rosters.wrRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
    //     let rank = 0
    //     foundTeam.rank === 1?
    //     rank = foundTeam.rank + "st"
    //     :
    //     foundTeam.rank === 2?
    //     rank = foundTeam.rank + "nd"
    //     :
    //     foundTeam.rank === 3?
    //     rank = foundTeam.rank + "rd"
    //     :
    //     rank = foundTeam.rank + "th"
    //     return rank
    // }
    // function teRankings (roster) {
    //     let foundTeam = rosters.teRank.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
    //     let rank = 0
    //     foundTeam.rank === 1?
    //     rank = foundTeam.rank + "st"
    //     :
    //     foundTeam.rank === 2?
    //     rank = foundTeam.rank + "nd"
    //     :
    //     foundTeam.rank === 3?
    //     rank = foundTeam.rank + "rd"
    //     :
    //     rank = foundTeam.rank + "th"
    //     return rank
    // }
    // function getTopQB(display_name){
    //     let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
    //     let topQB = foundTeam.kct.qb.players[0]
    //     return topQB
    // }
    // function getTopRB(display_name){
    //     let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
    //     let topRB = foundTeam.kct.rb.players[0]
    //     return topRB
    // }
    // function getTopWR(display_name){
    //     let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
    //     let topWR = foundTeam.kct.wr.players[0]
    //     return topWR
    // }
    // function getTopTE(display_name){
    //     let foundTeam = rosters.teamRank.find(roster => roster.kct.owner.display_name === display_name)
    //     let topTE = foundTeam.kct.te.players[0]
    //     return topTE
    // }  
    // const myDraftPicks = (id, yr) => {
    //     let picks;
    //     if((id !== null || undefined) && yr === league.season){
    //         picks = league.draft && league.draft.picks.filter(p => p.roster_id === Number(id))
    //         return picks
    //     } 
    //     picks = league.history && league.history.filter(l => l.year === yr)[0].league.draft.picks.filter(p => p.roster_id === Number(id))
    //     return picks
    // }
    const findWeeklyMatchups = () => {
        const template = league.history.filter(l => l.year === weeklyMatch)
            .map(szn => Object.entries(szn.matchups).slice().sort(compareWeeks).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                acc[team.matchup_id] = acc[team.matchup_id] || [];
                acc[team.matchup_id].push(team);
                return acc;
        }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
            if(team.filter(owner => owner.roster_id === Number(id)).length > 0){
                return team
            }  
            return acc
        })).map(match => match.sort((a,b) => b.points - a.points)))[0]
        if(Number(weeklyMatch) > 2020){
            return template
        } else {
            return template.slice(0,16)
        }
    }

    function compareWeeks(weekA, weekB) {
        const numericPartA = parseInt(weekA[0].slice(2), 10);
        const numericPartB = parseInt(weekB[0].slice(2), 10);
        return numericPartA - numericPartB;
    }
      
    return (
        <div style={{fontSize:"14px"}}>
            <div className="my-4">
                <div>
                    <div className="d-flex justify-content-between bold" style={{marginBottom:"8px"}}>
                        <p className="m-0" style={{color:"lightgrey"}}>WEEKLY BREAKDOWN</p>
                        <select className="" onChange={handleWeeklyMatch} value={weeklyMatch} style={{color:"#fff", background:"inherit", border:"none"}}>
                            <option value={league.season}>{league.season}</option>
                            {
                                league.history.map((l,i) =>
                                    <option key={i} value={l.year}>{l.year}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="">
                        <Matchups
                            id={id}
                            foundMyMatchups={foundMyMatchups}
                            findRosterByID={findRosterByID}
                            findRecord={findRecord}
                            foundHistory={foundHistory}
                            players={players}
                            findLogo={findLogo}
                            weeklyMatch={weeklyMatch}
                            loadLeague={loadLeague}
                            league={league}
                            findWeeklyMatchups={findWeeklyMatchups}
                            openModal={openModal}
                            roundToHundredth={roundToHundredth}
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <div className="col">
                    <LineChart
                        id={id}
                        loadRosters={loadRosters}
                        rosters={rosters}
                        weeklyMatch={weeklyMatch}
                        foundHistory={foundHistory}
                        findRosterByID={findRosterByID}
                    />
                </div>
            </div>
            <div className="py-4">
                <Stats
                    id={id}
                    foundHistory={foundHistory}
                    league={league}
                    owner={owner}
                    selectStats={selectStats}
                    handleSelectStats={handleSelectStats}
                    selectSzn={selectSzn}
                    handleSelectSzn={handleSelectSzn}
                    handleSzn={handleSzn}
                    winPCT={winPCT}
                    roundToHundredth={roundToHundredth}
                    lineupEfficiency={lineupEfficiency}
                    totalPtsPerGame={totalPtsPerGame}
                    tab={tab}
                />
            </div>
            <div className="py-4">
                <VS
                    id={id}
                    findRosterByID={findRosterByID}
                    foundHistory={foundHistory}
                    handleVS={handleVS}
                    vs={vs}
                    selectAllPlay={selectAllPlay}
                    league={league}
                    handleAllPlay={handleAllPlay}
                    winPCT={winPCT}
                    openModal={openModal}
                />
            </div>
            {/* <div className="py-4">
                <Draft
                    id={id}
                    handleDraftClass={handleDraftClass}
                    league={league}
                    draftClass={draftClass}
                    myDraftPicks={myDraftPicks}
                    isOdd={isOdd}
                    findLogo={findLogo}
                    findPlayer={findPlayer}
                />
            </div> */}
            <div className="py-4">
                <Roster
                    owner={owner}
                    rosters={rosters}
                    roundToHundredth={roundToHundredth}
                    findLogo={findLogo}
                    findPlayer={findPlayer}
                    isOdd={isOdd}
                    tab={tab}
                    getTotalPts={getTotalPts}
                />
            </div>
            <div>
                {/* <div className="bold" style={{marginBottom:"8px"}}>
                    <p className="m-0" style={{color:"lightgrey"}}>STATS</p>
                </div> */}

                {/* <div className="mt-4 d-flex align-items-top flex-wrap p-2" style={{background:"#0f0f0f"}}>
                    <div className="col" style={{minWidth:"388px", height:"600px", background:"#000000"}}>
                        <div className="p-3" style={{fontSize:"14.5px"}}>
                            <div className="d-flex justify-content-between pb-3" style={{borderBottom:"3px solid #2a2c3e"}}> 
                                <div>
                                    <select value={selectStats} onChange={handleSelectStats} className="bold" style={{background:"inherit", color:"lightgrey", border:"none"}}>
                                        <option value={"Season"}>Season</option>
                                        <option value={"Post Season"}>Post Season</option>
                                    </select>
                                </div>
                                <div>
                                    <select value={selectSzn} onChange={handleSelectSzn} style={{background:"inherit", color:"lightgrey", border:"none"}}>
                                        <option value={"All Time"}>All Time</option>
                                        {
                                            league.history ? 
                                                league.history.map((l, i) => 
                                                    <option key={i} value={l.year}>{l.year}</option>
                                                )
                                            :<></>
                                        }
                                        <option value={league.season}>{league.season}</option>
                                    </select>
                                </div>
                            </div>
                            <div id="scrollBar" className=""style={{maxHeight:"500px", maxWidth:"100%", overflow:"auto"}}>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                    <div className="">
                                        <p className="m-0">Record</p>
                                        {
                                            selectStats === "Season" && selectSzn === "All Time" ?
                                                foundHistory(id).playoffs.a > 0 ?
                                                    <div className="mt-2">
                                                        <p className="m-0" style={{color:"#7d91a6", fontSize:"12.85px"}}>w/ playoffs</p> 
                                                        <p className="m-0 mt-2" style={{fontSize:"12.85px"}}>Best Record</p>
                                                    </div>
                                                :
                                                    <p className="m-0 mt-2" style={{fontSize:"12.85px"}}>Best Record</p>
                                            : selectStats === "Season" && selectSzn === league.season && foundHistory(id).c.playoff === true ? 
                                                <div className="mt-2">
                                                    <p className="m-0" style={{color:"#7d91a6", fontSize:"12.85px"}}>w/ playoffs</p> 
                                                </div>
                                            : selectStats === "Season" && foundHistory(id, selectSzn).s.playoff === true ? 
                                                <div className="mt-2">
                                                    <p className="m-0" style={{color:"#7d91a6", fontSize:"12.85px"}}>w/ playoffs</p> 
                                                </div>
                                            :<></>
                                        }
                                    </div>
                                    <div>
                                        {
                                            selectStats === "Season" && selectSzn === "All Time" ?
                                                <>
                                                    <p className="m-0">
                                                        {foundHistory(id).allTime.w}-{foundHistory(id).allTime.l} 
                                                    </p>
                                                    {
                                                        foundHistory(id).playoffs.a > 0 ?
                                                            <> 
                                                                <div className="d-flex align-items-center mt-2">
                                                                    <p className="m-0" style={{fontWeight:"lighter"}}>
                                                                        {foundHistory(id).allTime.w + foundHistory(id).playoffs.w}-{foundHistory(id).allTime.l + foundHistory(id).playoffs.l}
                                                                    </p>
                                                                </div>
                                                            </>
                                                        : <></>
                                                    }
                                                    <p className="m-0 mt-2 d-flex justify-content-end">{foundHistory(id).allTime.bestRecord}</p>
                                                </>
                                            : selectStats === "Season" && selectSzn === league.season ?
                                                <>
                                                    <p className="m-0">
                                                        {owner.settings.wins}-{owner.settings.losses}
                                                    </p>
                                                    {
                                                        foundHistory(id).c.playoff === true ?
                                                            <p className="m-0 mt-2" style={{fontWeight:"lighter"}}>{owner.settings.wins + foundHistory(id).c.pW}-{owner.settings.losses + foundHistory(id).c.pL}</p>
                                                        :<></>
                                                    }
                                                </>
                                            : selectStats === "Season" ?
                                                handleSzn(selectSzn).map((o,index) =>
                                                    <div key={index}>
                                                        <p className="m-0">
                                                            {o.settings.wins}-{o.settings.losses}
                                                        </p>
                                                        {
                                                            foundHistory(id, selectSzn).s.playoff === true ?
                                                                <div className="d-flex align-items-center mt-2">
                                                                    <p className="m-0" style={{fontWeight:"lighter"}}>
                                                                        {o.settings.wins + foundHistory(id,selectSzn).s.pW}-{o.settings.losses + foundHistory(id, selectSzn).s.pL}
                                                                    </p>
                                                                </div>
                                                            :<></>
                                                        }
                                                    </div>
                                                )
                                            : selectStats === "Post Season" && selectSzn === "All Time" ?
                                                <p className="m-0" style={{}}>
                                                    {foundHistory(id).playoffs.w}-{foundHistory(id).playoffs.l}
                                                </p>
                                            : selectStats === "Post Season" && selectSzn === league.season ?
                                                <p className="m-0" style={{}}>
                                                    {foundHistory(id).c.pW}-{foundHistory(id).c.pL}
                                                </p>  
                                            : selectStats === "Post Season" ?
                                                <p className="m-0" style={{}}>
                                                    {foundHistory(id,selectSzn).s.pW}-{foundHistory(id,selectSzn).s.pL}
                                                </p>  
                                            : <p className="m-0">-</p>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                    <div className="">
                                        <p className="m-0">Win Rate</p>
                                            {
                                                selectStats === "Season" && selectSzn === "All Time" ?
                                                    foundHistory(id).playoffs.a > 0 ?
                                                        <div className="mt-2">
                                                            <p className="m-0" style={{color:"#7d91a6", fontSize:"12.85px"}}>w/ playoffs</p> 
                                                            <p className="m-0 mt-2" style={{fontSize:"12.85px"}}>Best Win Rate</p> 
                                                        </div>
                                                    : <p className="m-0 mt-2" style={{fontSize:"12.85px"}}>Best Win Rate</p> 
                                                : selectStats === "Season" && selectSzn === league.season && foundHistory(id).c.playoff === true ? 
                                                    <div className="mt-2">
                                                        <p className="m-0" style={{color:"#7d91a6", fontSize:"12.85px"}}>w/ playoffs</p> 
                                                    </div>
                                                : selectStats === "Season" && foundHistory(id, selectSzn).s.playoff === true ? 
                                                    <div className="mt-2">
                                                        <p className="m-0" style={{color:"#7d91a6", fontSize:"12.85px"}}>w/ playoffs</p> 
                                                    </div>
                                                :  <></>
                                            }
                                    </div>
                                    <div>
                                        {
                                            selectStats === "Season" && selectSzn === "All Time" ?
                                                <>
                                                    <p className="d-flex align-items-center m-0">
                                                        {winPCT(foundHistory(id).allTime.w,foundHistory(id).allTime.l)}
                                                        <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                    </p>
                                                    {
                                                        foundHistory(id).playoffs.a > 0 ?
                                                            <div className="d-flex align-items-center justify-content-end mt-2">
                                                                <p className="d-flex align-items-center m-0" style={{color:"whitesmoke",fontSize:"14.5px", fontWeight:"lighter"}}> 
                                                                    {winPCT(foundHistory(id).allTime.w + foundHistory(id).playoffs.w,foundHistory(id).allTime.l + foundHistory(id).playoffs.l)}
                                                                    <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                                </p>
                                                            </div>
                                                        :<></>
                                                    }
                                                    <div>
                                                        <p className="d-flex align-items-center m-0 mt-2">
                                                            {winPCT(foundHistory(id).allTime.bestRecordW,foundHistory(id).allTime.bestRecordL)}
                                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                        </p>
                                                    </div>
                                                </>
                                            : selectStats === "Season" && selectSzn === league.season ?
                                                <>
                                                    <p className="d-flex align-items-center m-0">
                                                        {winPCT(owner.settings.wins, owner.settings.losses)}
                                                        <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                    </p>
                                                    {
                                                        foundHistory(id).c.playoff === true ?
                                                            <p className="m-0 mt-2 d-flex align-items-center" style={{fontWeight:"lighter"}}>
                                                                {winPCT(owner.settings.wins + foundHistory(id).c.pW, owner.settings.losses + foundHistory(id).c.pL)}
                                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                            </p>
                                                        :<></>
                                                    }
                                                </>
                                            : selectStats === "Season" ?
                                                handleSzn(selectSzn).map((o,index) =>
                                                    <div key={index}>
                                                        <p className="m-0">
                                                            {winPCT(o.settings.wins,o.settings.losses)}
                                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                        </p>
                                                        {
                                                            foundHistory(id,selectSzn).s.playoff === true ?
                                                                <div className="d-flex align-items-center justify-content-end mt-2">
                                                                    <p className="d-flex align-items-center m-0" style={{color:"whitesmoke",fontSize:"14.5px", fontWeight:"lighter"}}> 
                                                                        {winPCT(o.settings.wins + foundHistory(id,selectSzn).s.pW,o.settings.losses + foundHistory(id,selectSzn).s.pL)}
                                                                        <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                                    </p>
                                                                </div>
                                                            :<></>
                                                        }
                                                    </div>
                                                )
                                            : selectStats === "Post Season" && selectSzn === "All Time" ?
                                                foundHistory(id).allTime.playoffGames > 0 ?
                                                    <p className="d-flex align-items-center m-0">
                                                        {winPCT(foundHistory(id).playoffs.w,foundHistory(id).playoffs.l)}
                                                        <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                    </p>
                                                : 
                                                    <p className="d-flex align-items-center m-0">0<Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/></p>
                                            : selectStats === "Post Season" && selectSzn === league.season ?
                                                    foundHistory(id).c.playoff === true ?
                                                        <p className="d-flex align-items-center m-0">
                                                            {winPCT(foundHistory(id).c.pW,foundHistory(id).c.pL)}
                                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                        </p> 
                                                    : 
                                                        <p className="d-flex align-items-center m-0">0<Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                        </p> 
                                            : selectStats === "Post Season" ?
                                                foundHistory(id,selectSzn).s.playoff === true ?
                                                    <p className="d-flex align-items-center m-0">
                                                        {winPCT(foundHistory(id,selectSzn).s.pW,foundHistory(id,selectSzn).s.pL)}
                                                        <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                    </p> 
                                                : <p className="m-0 d-flex align-items-center">0<Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/></p>
                                            : <p className="d-flex align-items-center m-0">-</p>
                                        }
                                    </div>
                                </div>
                                {
                                    selectStats === "Season" ?
                                        <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                            <div>
                                                <p className="m-0">Lineup Efficiency</p>
                                            </div>
                                            <div>
                                                {
                                                    selectStats === "Season" && selectSzn === "All Time" ?
                                                        <p className="m-0">{lineupEfficiency(foundHistory(id).allTime.fpts, foundHistory(id).allTime.ppts)}</p>
                                                    :selectStats === "Season" && selectSzn === league.season ?
                                                        <p className="m-0">{lineupEfficiency(Number(owner.settings.fpts + "." + owner.settings.fpts_decimal), Number(owner.settings.ppts + "." + owner.settings.ppts_decimal))}</p>
                                                    : selectStats === "Season" ?
                                                        handleSzn(selectSzn).map((o,index) =>
                                                            <div key={index}>
                                                                <p className="m-0">{lineupEfficiency(Number(o.settings.fpts + "." + o.settings.fpts_decimal), Number(o.settings.ppts + "." + o.settings.ppts_decimal))}</p>
                                                            </div>
                                                        )
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                    :<></>
                                }
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                    <div className="">
                                        <p className="m-0">Total Points Per Game</p>
                                    </div>
                                    <div>
                                        {
                                            selectStats === "Season" && selectSzn === "All Time" ?
                                                <p className="m-0">{totalPtsPerGame(foundHistory(id).allTime.fpts, "All Time")}</p>
                                            : selectStats === "Season" && selectSzn === league.season ?
                                                <p className="m-0">{totalPtsPerGame(Number(owner.settings.fpts+"."+owner.settings.fpts_decimal), league.season)}</p>
                                            : selectStats === "Season" ?
                                                handleSzn(selectSzn).map((o,index) =>
                                                    <div key={index}>
                                                        <p className="m-0">{totalPtsPerGame(Number(o.settings.fpts+"."+o.settings.fpts_decimal), selectSzn)}</p>
                                                    </div>
                                                )
                                            : selectStats === "Post Season" && selectSzn === "All Time" ? 
                                                foundHistory(id).allTime.playoffGames > 0 ?
                                                    <p className="m-0">{roundToHundredth(foundHistory(id).allTime.playoffPF/foundHistory(id).allTime.playoffGames)}</p>
                                                : <p className="m-0">0</p>
                                            : selectStats === "Post Season" && selectSzn === league.season ?
                                                foundHistory(id).c.playoff === true ?
                                                    <p className="m-0">{roundToHundredth(foundHistory(id).c.playoffPF/foundHistory(id).c.playoffGames)}</p>
                                                : <p className="m-0">0</p>
                                            : selectStats === "Post Season" ?
                                                foundHistory(id,selectSzn).s.playoff === true ?
                                                    <p className="m-0">{roundToHundredth(foundHistory(id,selectSzn).s.playoffPF/foundHistory(id,selectSzn).s.playoffGames)}</p>
                                                : <p className="m-0">0</p>
                                            :<></>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                    <div className="">
                                        <p className="m-0">Highest Score</p>
                                    </div>
                                    <div>
                                        {
                                            selectStats === "Season" && selectSzn === "All Time" ?
                                                <p className="m-0">{foundHistory(id).allTime.highest}</p>
                                            : selectStats === "Season" && selectSzn === league.season ?
                                                <p className="m-0">{foundHistory(id).c.highest}</p>
                                            : selectStats === "Season" ?
                                                <p className="m-0">{foundHistory(id, selectSzn).s.highest}</p>
                                            : selectStats === "Post Season" && selectSzn === "All Time" ?
                                                <p className="m-0">{foundHistory(id).allTime.playoffHS}</p>
                                            : selectStats === "Post Season" && selectSzn === league.season ?
                                                <p className="m-0">{foundHistory(id).c.playoffHS}</p>
                                            : selectStats === "Post Season" ?
                                                <p className="m-0">{foundHistory(id,selectSzn).s.playoffHS || 0}</p>
                                            :<></>
                                        }  
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                    <div className="">
                                        <p className="m-0">PF</p>
                                    </div>
                                    <div>
                                        {
                                            selectStats === "Season" && selectSzn === "All Time" ? 
                                                <p className="m-0">{foundHistory(id).allTime.fpts}</p>
                                            : selectStats === "Season" && selectSzn === league.season ?
                                                <p className="m-0">{owner.settings.fpts}.{owner.settings.fpts_decimal}</p>
                                            : selectStats === "Season" ?
                                                handleSzn(selectSzn).map((o,index) =>
                                                    <div key={index}>
                                                        <p className="m-0">{o.settings.fpts}.{o.settings.fpts_decimal}</p>
                                                    </div>
                                                )
                                            : selectStats === "Post Season" && selectSzn === "All Time" ?
                                                <p className="m-0">{foundHistory(id).allTime.playoffPF}</p>
                                            : selectStats === "Post Season" && selectSzn === league.season ?
                                                <p className="m-0">{foundHistory(id).c.playoffPF}</p>
                                            : selectStats === "Post Season" ?
                                                <p className="m-0">{foundHistory(id,selectSzn).s.playoffPF || 0}</p>
                                            :<></>
                                        }
                                    </div>
                                </div>
                                {
                                    selectStats === "Season" ?
                                        <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                            <div className="">
                                                <p className="m-0">MAX PF</p>
                                            </div>
                                            <div>
                                                {
                                                    selectStats === "Season" && selectSzn === "All Time" ? 
                                                        <p className="m-0">{foundHistory(id).allTime.ppts}</p>
                                                    : selectStats === "Season" && selectSzn === league.season ?
                                                        <p className="m-0">{owner.settings.ppts}.{owner.settings.ppts_decimal}</p>
                                                    : selectStats === "Season" ?
                                                        handleSzn(selectSzn).map((o,index) =>
                                                            <div key={index}>
                                                                <p className="m-0">{o.settings.ppts}.{o.settings.ppts_decimal}</p>
                                                            </div>
                                                        )
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                    :<></>
                                }
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                    <div className="">
                                        <p className="m-0">PA</p>
                                    </div>
                                    <div>
                                        {
                                            selectStats === "Season" && selectSzn === league.season ?
                                                <p className="m-0">{owner.settings.fpts_against}.{owner.settings.fpts_against_decimal}</p>
                                            : selectStats === "Season" && selectSzn === "All Time" ? 
                                                <p className="m-0">{foundHistory(id).allTime.fpts_against}</p>
                                            : selectStats === "Season" ?
                                                handleSzn(selectSzn).map((o,index) =>
                                                    <div key={index}>
                                                        <p className="m-0">{o.settings.fpts_against}.{o.settings.fpts_against_decimal}</p>
                                                    </div>
                                                )
                                            : selectStats === "Post Season" && selectSzn === "All Time" ?
                                                <p className="m-0">{roundToHundredth(foundHistory(id).allTime.playoffPA)}</p>
                                            : selectStats === "Post Season" && selectSzn === league.season ?
                                                <p className="m-0">{foundHistory(id).c.playoffPA}</p>
                                            : selectStats === "Post Season" ?
                                                <p className="m-0">{foundHistory(id,selectSzn).s.playoffPA || 0}</p>
                                            :<></>
                                        }
                                    </div>
                                </div>
                                {
                                    selectStats === "Season" ?
                                        <>
                                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                                <div className="">
                                                    <p className="m-0">Luck Rate</p>
                                                </div>
                                                <div>

                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                                <div className="">
                                                    <p className="m-0">All Play Record</p>
                                                </div>
                                                <div>
                                                    {
                                                        selectSzn === "All Time" ?
                                                            <p className="m-0">{foundHistory(id).allTime.allPlayRecordW}-{foundHistory(id).allTime.allPlayRecordL}</p>
                                                        : selectSzn === league.season ?
                                                            <p className="m-0">{foundHistory(id).c.allPlayRecordW}-{foundHistory(id).c.allPlayRecordL}</p>
                                                        :   <p className="m-0">{foundHistory(id, selectSzn).s.allPlayRecordW}-{foundHistory(id, selectSzn).s.allPlayRecordL}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{paddingRight:".4em"}}>
                                                <div className="">
                                                    <p className="m-0">All Play Win Rate</p>
                                                </div>
                                                <div>
                                                    {
                                                        selectSzn === "All Time" ?
                                                            <p className="m-0 d-flex align-items-center">
                                                                {winPCT(foundHistory(id).allTime.allPlayRecordW,foundHistory(id).allTime.allPlayRecordL)}
                                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                            </p>
                                                        : selectSzn === league.season ?
                                                            <p className="m-0 d-flex align-items-center">
                                                                {winPCT(foundHistory(id).c.allPlayRecordW,foundHistory(id).c.allPlayRecordL)}
                                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                            </p>
                                                        :
                                                            <p className="m-0 d-flex align-items-center">
                                                                {winPCT(foundHistory(id, selectSzn).s.allPlayRecordW,foundHistory(id,selectSzn).s.allPlayRecordL)}
                                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                            </p>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    : selectStats === "Post Season" && selectSzn === "All Time" ?
                                        <>
                                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                                <div className="">
                                                    <p className="m-0">Toilet Bowl</p>
                                                </div>
                                                <div>
                                                    <p className="m-0" style={{color:"whitesmoke"}}>{foundHistory(id).allTime.TB}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"1px solid #2a2c3e", paddingRight:".4em"}}>
                                                <div className="">
                                                    <p className="m-0">Playoff Appearances</p>
                                                </div>
                                                <div>
                                                    <p className="d-flex align-items-center m-0" style={{color:"whitesmoke"}}>{foundHistory(id).playoffs.a}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{paddingRight:".4em"}}>
                                                <div className="">
                                                    <p className="m-0">Finals</p>
                                                </div>
                                                <div>
                                                    <p className="d-flex align-items-center m-0" style={{color:"whitesmoke"}}>{foundHistory(id).allTime.finals}</p>
                                                </div>
                                            </div>
                                        </>
                                    :<></>
                                        
                                }
                            </div>
                        </div>
                    </div>
                                
                    <div className="col p-3" style={{minWidth:"388px", height:"600px", background:"black"}}>
                        <div className="d-flex align-items-center justify-content-between pb-3" style={{borderBottom:"3px solid #2a2c3e"}}>
                            <div className="d-flex align-items-center bold" style={{color:"lightgrey"}}>
                                <Icon icon="game-icons:american-football-player"style={{color:"#a9dfd8",fontSize:"36px", marginRight:"4px",position:"absolute", zIndex:"1"}}/>
                                <div className="d-flex align-items-center" style={{marginLeft:"3em"}}>
                                    <p className="m-0">{owner.kct.qb.players.length + owner.kct.rb.players.length + owner.kct.wr.players.length + owner.kct.te.players.length} </p>
                                    <p className="m-0 mx-1">Players</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{fontFamily:"Arial",fontSize:"14.5px",}}>
                                <div className=" d-flex align-items-center" style={{minWidth:"85px"}}>
                                    <div style={{}}>
                                        <img src={age} alt="age" style={{marginRight:"4px", maxWidth:"100%"}}/>
                                    </div>
                                    <p className="m-0 d-flex align-items-center">
                                        { roundToHundredth(roundToHundredth((owner.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.qb.players.length) +
                                        roundToHundredth(owner.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.rb.players.length) +
                                        roundToHundredth(owner.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.wr.players.length) +
                                        roundToHundredth(owner.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.te.players.length))/4
                                        )}
                                    </p>
                                </div>
                              
                                <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                    <p className="m-0">{owner.kct.teamTotal}</p>
                                </div>
                                <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                                    <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>PTS</p>
                                    <p className="m-0">5500</p>
                                </div> 
                            </div>
                        </div>
                        <div>
                            <div id="scrollBar" style={{height:"527px", width:"100%", overflow:"auto", background:"black"}}>
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between mt-3">
                                        <div className="d-flex align-items-center">
                                            {   
                                                qbArrow ?
                                                    <Icon
                                                        icon='akar-icons:circle-chevron-down'
                                                        onClick={() => showMoreQBs()}
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                                :
                                                    <Icon
                                                        onClick={() => showMoreQBs()}
                                                        icon='akar-icons:circle-chevron-up'
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                            }
                                            <div className="m-0 mx-2 d-flex align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                    <p className="m-0">{owner.kct.qb.players.length}</p>
                                                </div>  
                                                <p className="mx-2 m-0"> | </p>
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#f8296d", marginRight:"6px"}}>QB</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{qbRankings(owner)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"2px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center">
                                                    {roundToHundredth(owner.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.qb.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                <p className="m-0">{owner.kct.qb.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>PTS</p>
                                                <p className="m-0">5500</p>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="">
                                        { 
                                            showQBs ? 
                                                owner.kct.qb.players.map((player, i) =>
                                                    <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                                        <div style={{width:"30px"}} className="text-center">
                                                            {   
                                                                i === 0?
                                                                    <Icon icon="bxs:star" style={{}} />
                                                                :
                                                                    <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                                            }
                                                        </div>
                                                        <div className="mx-2">
                                                            <div className="smallHeadShot"
                                                                style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                    player.player_id}.jpg)`,
                                                                }}>
                                                                    <div className="displayOwnerLogoSM">
                                                                    <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/></div>
                                                            </div> 
                                                        </div>
                                                        <div className="mx-2" style={{fontSize:".9rem"}}>
                                                            <p className="m-0 bold">{player.player}</p>
                                                            <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                    age <span style={
                                                                        player.age < "25" ?
                                                                            {color:"#42f3e9"}
                                                                        : player.age < "30"?
                                                                            {color:"#3cf20a"}
                                                                        : player.age < "33"?
                                                                            {color:"#f2c306"}
                                                                        : player.age < "35"?
                                                                            {color:"#f26307"}
                                                                        : player.age < "50"?
                                                                            {color:"#e9230b"}
                                                                        :   {color:"white"} 
                                                                    }>{player.age}</span>
                                                                </p>
                                                                <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                    <p className="m-0 mx-1">{player.rating}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                    <p className="m-0 mx-1">428</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                                <div className="d-flex align-items-center my-4">
                                                    <div style={{width:"30px"}} className="text-center">
                                                        <Icon icon="bxs:star" style={{}} />
                                                    </div>
                                                    <div className="mx-2">
                                                        <div className="smallHeadShot"
                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                getTopQB(owner.kct.owner.display_name).player_id}.jpg)`,
                                                            }}>
                                                                <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopQB(owner.kct.owner.display_name).team).l}/></div>
                                                        </div>
                                                    </div>
                                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                                        <p className="m-0 bold">{getTopQB(owner.kct.owner.display_name).player}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopQB(owner.kct.owner.display_name).player_id).number} {getTopQB(owner.kct.owner.display_name).position} - {getTopQB(owner.kct.owner.display_name).team}</p>
                                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                age <span style={
                                                                    getTopQB(owner.kct.owner.display_name).age < "25"?
                                                                        {color:"#42f3e9"}
                                                                    : getTopQB(owner.kct.owner.display_name).age < "30"?
                                                                        {color:"#3cf20a"}
                                                                    : getTopQB(owner.kct.owner.display_name).age < "33"?
                                                                        {color:"#f2c306"}
                                                                    : getTopQB(owner.kct.owner.display_name).age < "35"?
                                                                        {color:"#f26307"}
                                                                    : getTopQB(owner.kct.owner.display_name).age < "50"?
                                                                        {color:"#e9230b"}
                                                                    :   {color:"white"}
                                                                }>{getTopQB(owner.kct.owner.display_name).age}</span>
                                                            </p>
                                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                <p className="m-0 mx-1">{getTopQB(owner.kct.owner.display_name).rating}</p>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                <p className="m-0 mx-1">428</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>                          
                                </div>
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between pt-2" style={{}}>
                                        <div className="d-flex align-items-center" style={{}}>
                                            { 
                                                rbArrow ?
                                                    <Icon
                                                        icon='akar-icons:circle-chevron-down'
                                                        onClick={() => showMoreRBs()}
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                                :
                                                    <Icon
                                                        onClick={() => showMoreRBs()}
                                                        icon='akar-icons:circle-chevron-up'
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                            }
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                    <p className="m-0">{owner.kct.rb.players.length}</p>
                                                </div>  
                                                <p className="mx-2 m-0"> | </p>
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#36ceb8", marginRight:"6px"}}>RB</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{rbRankings(owner)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"2px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center">
                                                    {roundToHundredth(owner.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.rb.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"2px"}}/>
                                                <p className="m-0">{owner.kct.rb.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>PTS</p>
                                                <p className="m-0">5500</p>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="">
                                        { 
                                            showRBs ? 
                                                owner.kct.rb.players.map((player, i) =>
                                                    <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                                        <div style={{width:"30px"}} className="text-center">
                                                            { 
                                                                i === 0?
                                                                    <Icon icon="bxs:star" style={{}} />
                                                                :
                                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                                            }
                                                        </div>
                                                        <div className="mx-2">
                                                            <div className="smallHeadShot"
                                                                style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                    player.player_id}.jpg)`,
                                                                }}>
                                                                <div className="displayOwnerLogoSM">
                                                                    <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/>
                                                                </div>
                                                            </div> 
                                                        </div>
                                                        <div className="mx-2" style={{fontSize:".9rem"}}>
                                                            <p className="m-0 bold">{player.player}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                    age <span style={
                                                                        player.age < "24"?
                                                                            {color:"#42f3e9"}
                                                                        :  player.age < "26"?
                                                                            {color:"#3cf20a"}
                                                                        : player.age < "27" ?
                                                                            {color:"#f2c306"}
                                                                        : player.age < "28" ?
                                                                            {color:"#f26307"}
                                                                        : player.age < "35" ?
                                                                            {color:"#e9230b"}
                                                                        :   {color:"white"} 
                                                                    }>{player.age}</span>
                                                                </p>
                                                                <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                    <p className="m-0 mx-1">{player.rating}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                    <p className="m-0 mx-1">428</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                                <div className="d-flex align-items-center my-4">
                                                    <div style={{width:"30px"}} className="text-center">
                                                        <Icon icon="bxs:star" style={{}} />
                                                    </div>
                                                    <div className="mx-2">
                                                        <div className="smallHeadShot"
                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                getTopRB(owner.kct.owner.display_name).player_id}.jpg)`,
                                                            }}>
                                                                <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopRB(owner.kct.owner.display_name).team).l}/></div>
                                                        </div>
                                                    </div>
                                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                                        <p className="m-0 bold">{getTopRB(owner.kct.owner.display_name).player}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopRB(owner.kct.owner.display_name).player_id).number} {getTopRB(owner.kct.owner.display_name).position} - {getTopRB(owner.kct.owner.display_name).team}</p>
                                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                age <span style={
                                                                    getTopRB(owner.kct.owner.display_name).age < "24" ?
                                                                        {color:"#42f3e9"}
                                                                    :  getTopRB(owner.kct.owner.display_name).age < "26" ?
                                                                        {color:"#3cf20a"}
                                                                    : getTopRB(owner.kct.owner.display_name).age < "27" ?
                                                                        {color:"#f2c306"}
                                                                    : getTopRB(owner.kct.owner.display_name).age < "28" ?
                                                                        {color:"#f26307"}
                                                                    : getTopRB(owner.kct.owner.display_name).age < "35" ?
                                                                        {color:"#e9230b"}
                                                                    :   {color:"#3cf20a"}
                                                                }>{getTopRB(owner.kct.owner.display_name).age}</span>
                                                            </p>
                                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                <p className="m-0 mx-1">{getTopRB(owner.kct.owner.display_name).rating}</p>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                <p className="m-0 mx-1">428</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }   
                                    </div>                          
                                </div>
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between pt-2" style={{}}>
                                        <div className="d-flex align-items-center" style={{}}>
                                            { 
                                                wrArrow ?
                                                    <Icon
                                                        icon='akar-icons:circle-chevron-down'
                                                        onClick={() => showMoreWRs()}
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                                :
                                                    <Icon
                                                        onClick={() => showMoreWRs()}
                                                        icon='akar-icons:circle-chevron-up'
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                            }
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                    <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.wr.players.length}</p>
                                                </div>
                                                <p className="mx-2 m-0"> | </p>
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#58a7ff", marginRight:"6px"}}>WR</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{wrRankings(owner)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"2px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                                    {roundToHundredth(owner.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.wr.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.wr.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>PTS</p>
                                                <p className="m-0">5500</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        { 
                                            showWRs ? 
                                                owner.kct.wr.players.map((player, i) =>
                                                    <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                                        <div style={{width:"30px"}} className="text-center">
                                                        { i === 0?
                                                            <Icon icon="bxs:star" style={{}} />
                                                        :
                                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                                        }
                                                        </div>
                                                        <div className="mx-2">
                                                            <div className="smallHeadShot"
                                                                style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                    player.player_id}.jpg)`,
                                                                }}>
                                                                    <div className="displayOwnerLogoSM">
                                                                    <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/></div>
                                                            </div> 
                                                        </div>
                                                        <div className="mx-2" style={{fontSize:".9rem"}}>
                                                            <p className="m-0 bold">{player.player}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                    age <span style={
                                                                        player.age < "24"?
                                                                            {color:"#42f3e9"}
                                                                        : player.age < "28"?
                                                                            {color:"#3cf20a"}
                                                                        : player.age < "29"?
                                                                            {color:"#f2c306"}
                                                                        : player.age < "30"?
                                                                            {color:"#f26307"}
                                                                        : player.age < "35"?
                                                                            {color:"#e9230b"}
                                                                        : {color:"white"}
                                                                    }>{player.age}</span>
                                                                </p>
                                                                <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                    <p className="m-0 mx-1">{player.rating}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                    <p className="m-0 mx-1">428</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                                <div className="d-flex align-items-center my-4">
                                                    <div style={{width:"30px"}} className="text-center">
                                                        <Icon icon="bxs:star" style={{}} />
                                                    </div>
                                                    <div className="mx-2">
                                                        <div className="smallHeadShot"
                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                getTopWR(owner.kct.owner.display_name).player_id}.jpg)`,
                                                            }}>
                                                                <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopWR(owner.kct.owner.display_name).team).l}/></div>
                                                        </div>
                                                    </div>
                                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                                        <p className="m-0 bold">{getTopWR(owner.kct.owner.display_name).player}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopWR(owner.kct.owner.display_name).player_id).number} {getTopWR(owner.kct.owner.display_name).position} - {getTopWR(owner.kct.owner.display_name).team}</p>
                                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                age <span style={
                                                                    getTopWR(owner.kct.owner.display_name).age < "24"?
                                                                        {color:"#42f3e9"}
                                                                    : getTopWR(owner.kct.owner.display_name).age < "28"?
                                                                        {color:"#3cf20a"}
                                                                    : getTopWR(owner.kct.owner.display_name).age < "29"?
                                                                        {color:"#f2c306"}
                                                                    : getTopWR(owner.kct.owner.display_name).age < "30"?
                                                                        {color:"#f26307"}
                                                                    : getTopWR(owner.kct.owner.display_name).age < "35"?
                                                                        {color:"#e9230b"}
                                                                    : {color:"white"}
                                                                }>{getTopWR(owner.kct.owner.display_name).age}</span>
                                                            </p>
                                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                <p className="m-0 mx-1">{getTopWR(owner.kct.owner.display_name).rating}</p>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                <p className="m-0 mx-1">428</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>                          
                                </div>
                                <div className="">
                                    <div className="d-flex align-items-center justify-content-between pt-2">
                                        <div className="d-flex align-items-center">
                                            { 
                                                teArrow ?
                                                    <Icon
                                                        icon='akar-icons:circle-chevron-down'
                                                        onClick={() => showMoreTEs()}
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                                :
                                                    <Icon
                                                        onClick={() => showMoreTEs()}
                                                        icon='akar-icons:circle-chevron-up'
                                                        style={{
                                                            fontSize:'1.1rem',
                                                            color:"#c9cfd1",
                                                            background:"black",
                                                            borderRadius:"50%"
                                                        }}
                                                    />
                                            }
                                            <div className="m-0 mx-2 d-flex align-items-center"> 
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                                    <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.te.players.length}</p>
                                                </div>
                                                <p className="mx-2 m-0"> | </p>
                                                <p className="m-0 bold" style={{fontSize:"16px",color:"#faae58", marginRight:"6px"}}>TE</p> 
                                                <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{teRankings(owner)}</p> 
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <div style={{}}>
                                                    <img src={age} alt="age" style={{marginRight:"4px"}}/>
                                                </div>
                                                <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                                    {roundToHundredth(owner.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.te.players.length)}
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"85px"}}>
                                                <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.te.total}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>PTS</p>
                                                <p className="m-0">5500</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        { 
                                            showTEs ? 
                                                owner.kct.te.players.map((player, i) =>
                                                    <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                                        <div style={{width:"30px"}} className="text-center">
                                                        { 
                                                            i === 0?
                                                                <Icon icon="bxs:star" style={{}} />
                                                            :
                                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                                        }
                                                        </div>
                                                        <div className="mx-2">
                                                            <div className="smallHeadShot"
                                                                style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                    player.player_id}.jpg)`,
                                                                }}>
                                                                    <div className="displayOwnerLogoSM">
                                                                    <img style={{width:"2.5em"}} alt="avatar" src={findLogo(player.team).l}/></div>
                                                            </div> 
                                                        </div>
                                                        <div className="mx-2" style={{fontSize:".9rem"}}>
                                                            <p className="m-0 bold">{player.player}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id).number} {player.position} - {player.team}</p>
                                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                                <p className="m-0" style={{color:"#b0b0b2" , width:"65px"}}>
                                                                    age <span style={
                                                                        player.age < "25"?
                                                                            {color:"#42f3e9"}
                                                                        : player.age < "28"?
                                                                            {color:"#3cf20a"}
                                                                        : player.age < "30"?
                                                                            {color:"#f2c306"}
                                                                        : player.age < "31"?
                                                                            {color:"#f26307"}
                                                                        : player.age < "37"?
                                                                            {color:"#e9230b"}
                                                                        :{color:"white"}}>{player.age}</span>
                                                                </p>
                                                                <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                    <p className="m-0 mx-1">{player.rating}</p>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                    <p className="m-0 mx-1">428</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            :
                                                <div className="d-flex align-items-center my-4">
                                                    <div style={{width:"30px"}} className="text-center">
                                                        <Icon icon="bxs:star" style={{}} />
                                                    </div>
                                                    <div className="mx-2">
                                                        <div className="smallHeadShot"
                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                getTopTE(owner.kct.owner.display_name).player_id}.jpg)`,
                                                            }}>
                                                                <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.5em"}} alt="avatar" src={findLogo(getTopTE(owner.kct.owner.display_name).team).l}/></div>
                                                        </div>
                                                    </div>
                                                    <div className="mx-2" style={{fontSize:".9rem"}}>
                                                        <p className="m-0 bold">{getTopTE(owner.kct.owner.display_name).player}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopTE(owner.kct.owner.display_name).player_id).number} {getTopTE(owner.kct.owner.display_name).position} - {getTopTE(owner.kct.owner.display_name).team}</p>
                                                        <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"55px"}}>rank -</p>
                                                            <p className="m-0" style={{color:"#b0b0b2", width:"65px"}}>
                                                                age <span style={
                                                                    getTopTE(owner.kct.owner.display_name).age < "25"?
                                                                        {color:"#42f3e9"}
                                                                    : getTopTE(owner.kct.owner.display_name).age < "28"?
                                                                        {color:"#3cf20a"}
                                                                    : getTopTE(owner.kct.owner.display_name).age < "30"?
                                                                        {color:"#f2c306"}
                                                                    : getTopTE(owner.kct.owner.display_name).age < "31"?
                                                                        {color:"#f26307"}
                                                                    : getTopTE(owner.kct.owner.display_name).age < "37"?
                                                                        {color:"#e9230b"}
                                                                    : {color:"white"}
                                                                }>{getTopTE(owner.kct.owner.display_name).age}</span>    
                                                            </p>
                                                            <div className="d-flex align-items-center" style={{width:"90px"}}>
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                                <p className="m-0 mx-1">{getTopTE(owner.kct.owner.display_name).rating}</p>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                                <p className="m-0 mx-1">428</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>                          
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col p-3" style={{minWidth:"388px", height:"600px", background:"black"}}>
                        <div className="d-flex align-items-top justify-content-between pb-3" style={{borderBottom:"3px solid #2a2c3e"}}>
                            <p className="m-0 bold" style={{color:"lightgrey"}}>Draft</p>
                            <div className="d-flex align-items-center ">
                                <p className="m-0 mx-3">Skill -</p> 
                                <p className="m-0">9 Picks</p>   
                            </div>
                        </div>
                        <div id="scrollBar" style={{height:"527px", width:"100%", overflow:"auto", background:"black"}}>
                            <div>
                                <div className="mt-3 mb-5">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="m-0" style={{ color:"lightgrey"}}>Needs</p>
                                        <p className="m-0 mx-2" style={{fontSize:"12.5px"}}>Position: RB</p>
                                    </div>
                                    <div className="mt-2" style={{fontSize:"13px"}}>
                                        <p className="m-0 mt-1 mx-2">- Lack of RB quality depth & youth. D.Henry is nearing the age of 30.</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between" style={{color:"lightgrey"}}> 
                                    <select className="" onChange={handleDraftClass} style={{background:"inherit", color:"whitesmoke", border:"none"}}>
                                        {
                                            league.history ? 
                                                league.history.map((l,j) => 
                                                    <option key={j} value={l.year}>Class {l.year}</option>
                                                )
                                            :<></>
                                        }
                                        <option value={league.season}>Class {league.season}</option>
                                    </select>
                                    {
                                        draftClass === league.season ?
                                            <div className="d-flex align-items-center">
                                                {
                                                    myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "QB").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#f8296d"}}>QB
                                                                <span style={{color:"white",  marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "QB").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "RB").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#36ceb8"}}>RB
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "RB").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "WR").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#58a7ff"}}>WR
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "WR").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "TE").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#faae58"}}>TE
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "TE").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "K").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#bd66ff"}}>K
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "K").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                            </div>
                                        :
                                            <div className="d-flex align-items-center">
                                                {
                                                    myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "QB").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#f8296d"}}>QB
                                                                <span style={{color:"white",  marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "QB").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "RB").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#36ceb8"}}>RB
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "RB").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "WR").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#58a7ff"}}>WR
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "WR").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "TE").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#faae58"}}>TE
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "TE").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                                {
                                                    myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "K").length > 0 ?
                                                        <div className="mx-1 d-flex align-items-center"> 
                                                            <p className="m-0 bold" style={{color:"#bd66ff"}}>K
                                                                <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "K").length}</span>
                                                            </p>
                                                        </div>
                                                    : <></>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="d-flex align-items-center pb-1 mt-3" style={{fontSize:"11.5px", color:"#b0b0b2", borderBottom:"2px solid #2a2c3e"}}>
                                <div className="d-flex align-items-center">
                                    <div style={{width:"100px"}} className="">
                                        <p className="bold m-0 text-center">PICK (OVR)</p>
                                    </div>
                                    <div style={{width:"245px"}} className="">
                                        <p className='bold m-0'>PLAYER</p>
                                    </div>
                                    <div style={{}} className="">
                                        <p className='bold m-0'>GRADE</p>
                                    </div>    
                                </div>
                            </div>
                            <div>
                                {
                                    draftClass === league.season ?
                                        myDraftPicks(id, league.season).map((pick, idx) => 
                                            <div key={idx} className="py-3" style={isOdd(idx) === 1 ? {background:"#0f0f0f"}:{background:"black"}}>
                                                <div className="d-flex align-items-center">
                                                    <div style={{width:"100px"}} className="">
                                                        <p className="m-0 text-center">{pick.round} ({pick.pick_no})</p>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{width:"245px"}}>
                                                        <div className="smallHeadShot"
                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                pick.player_id}.jpg)`,
                                                            }}>
                                                            { 
                                                                pick.metadata.status === "Inactive" || pick.metadata.team === "" ?
                                                                <></>
                                                                :
                                                                    <div className="displayOwnerLogoSM"> 
                                                                        <img style={{width:"2.5em"}} alt="avatar" src={findLogo(pick.metadata.team).l || "FA"}/>
                                                                    </div>
                                                            }              
                                                        </div>
                                                        <div className="mx-3">
                                                            <p className="m-0 bold" style={{fontSize:""}}>{pick.metadata.first_name} {pick.metadata.last_name}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{pick.metadata.number} {pick.metadata.position} - {pick.metadata.team}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findPlayer(pick.player_id).college}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="m-0">-</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    : 
                                        myDraftPicks(id, draftClass).map((pick, idx) => 
                                            <div key={idx} className="py-3" style={isOdd(idx) === 1 ? {background:"#0f0f0f"}:{background:"black"}}>
                                                <div className="d-flex align-items-center">
                                                    <div style={{width:"100px"}} className="">
                                                        <p className="m-0 text-center">{pick.round} ({pick.pick_no})</p>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{width:"245px"}}>
                                                        <div className="smallHeadShot"
                                                            style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                                pick.player_id}.jpg)`,
                                                            }}>
                                                            { 
                                                                pick.metadata.status === "Inactive" || pick.metadata.team === "" ?
                                                                <></>
                                                                :
                                                                    <div className="displayOwnerLogoSM"> 
                                                                        <img style={{width:"2.5em"}} alt="avatar" src={findLogo(pick.metadata.team).l || "FA"}/>
                                                                    </div>
                                                            }                    
                                                        </div>
                                                        <div className="mx-3">
                                                            <p className="m-0 bold" style={{fontSize:""}}>{pick.metadata.first_name} {pick.metadata.last_name}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{pick.metadata.number} {pick.metadata.position} - {pick.metadata.team}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{
                                                                pick.metadata.position === "DEF" ?
                                                                    <></>
                                                                : findPlayer(pick.player_id).college 
                                                            }</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="m-0">-</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col p-3" style={{minWidth:"388px", height:"600px", background:"black"}}>
                        <div className="d-flex align-items-top justify-content-between pb-3" style={{borderBottom:"3px solid #2a2c3e"}}>
                            <select className="bold" onChange={handleVS} style={{color:"lightgrey", background:"inherit", border:"none" }}>
                                <option value={"Head"}>Head to Head</option>
                                <option value={"All"}>All Play</option>
                            </select>
                            {
                                vs === "All" ? 
                                    <select value={selectAllPlay} onChange={handleAllPlay} style={{color:"lightgrey", background:"inherit", border:"none" }}>
                                        <option value={"All Time"}>All Time</option>
                                        <option value={league.season}>{league.season}</option>
                                        {
                                            league.history.map((l,i) => 
                                                <option key={i} value={l.year}>{l.year}</option>
                                            )
                                        }
                                    </select>
                                :<></>
                            }
                        </div>
                        <div>
                            <div className="d-flex align-items-center py-2" style={{borderBottom:"1px solid #2a2c3e"}}>
                                <div className="" style={{width:"40px"}}>
                                    <p className="m-0">#</p>
                                </div>
                                <div className="" style={{minWidth:"230px"}}>
                                    <p className="m-0">Opponent</p>
                                </div>
                                <div className="" style={{minWidth:"50px"}}>
                                    <p className="m-0">W</p>
                                </div>
                                <div className="" style={{minWidth:"50px"}}>
                                    <p className="m-0">L</p>
                                </div>
                                <div className="" style={{minWidth:"50px"}}>
                                    <p className="m-0">PCT</p>
                                </div>
                            </div>
                            <div id="scrollBar" style={{height:"482px", width:"100%", overflow:"auto", background:"black"}}>
                                {
                                    vs === "Head" ?
                                        foundHistory(id).h2h.sort((a,b) => { if(winPCT(b.w , b.oW) === winPCT(a.w , a.oW)){ return b.w - a.w } else {return winPCT(b.w , b.oW) - winPCT(a.w , a.oW)}}).map((roster, idx) => ({...roster, rank:idx+1})).map((t, k) => 
                                            <div key={k} className="py-3" style={{borderBottom:"1px solid #2a2c3e"}}>
                                                <div className="d-flex align-items-center">
                                                    <div className="" style={{width:"40px"}}>
                                                        <p className="m-0">{t.rank}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{width:"230px"}}>
                                                        <div>
                                                            <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                findRosterByID(t.oID).owner_id ? findRosterByID(t.oID).owner_id.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                        </div>
                                                        <div className="" style={{marginLeft:"14px"}}>
                                                            {
                                                                findRosterByID(t.oID).owner_id ?
                                                                findRosterByID(t.oID).owner_id.team_name ?
                                                                    <div className="">
                                                                        <p className="m-0">{findRosterByID(t.oID).owner_id.display_name}</p>
                                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(t.oID).owner_id.team_name}</p>
                                                                    </div>
                                                                :<p className="m-0">{findRosterByID(t.oID).owner_id.display_name}</p>
                                                                :<></>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="" style={{minWidth:"50px"}}>
                                                        <p className="m-0">{t.w}</p>
                                                    </div>
                                                    <div className="" style={{minWidth:"50px"}}>
                                                        <p className="m-0">{t.oW}</p>
                                                    </div>
                                                    <div className="" style={{minWidth:"50px"}}>
                                                        <p className="m-0">{winPCT(t.w , t.oW)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    : vs === "All" && selectAllPlay === "All Time" ?
                                        foundHistory(id).allTime.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx+1})).map((o,q) => 
                                            <div key={q} className="py-3" style={{borderBottom:"1px solid #2a2c3e"}}>
                                                <div className="d-flex align-items-center">
                                                    <div className="" style={{width:"40px"}}>
                                                        <p className="m-0">{o.rank}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{width:"230px"}}>
                                                        <div>
                                                            <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                findRosterByID(o.oID).owner_id ? findRosterByID(o.oID).owner_id.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                        </div>
                                                        <div className="" style={{marginLeft:"14px"}}>
                                                            {
                                                                findRosterByID(o.oID).owner_id ?
                                                                findRosterByID(o.oID).owner_id.team_name ?
                                                                    <>
                                                                        <p className="m-0">{findRosterByID(o.oID).owner_id.display_name}</p>
                                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(o.oID).owner_id.team_name}</p>
                                                                    </>
                                                                :<p className="m-0">{findRosterByID(o.oID).owner_id.display_name}</p>
                                                                :<></>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="" style={{width:"50px"}}>
                                                        <p className="m-0">{o.w}</p>
                                                    </div>
                                                    <div className="" style={{width:"50px"}}>
                                                        <p className="m-0">{o.oW}</p>
                                                    </div>
                                                    <div className="" style={{width:"50px"}}>
                                                        <p className="m-0">{winPCT(o.w , o.oW)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )                     
                                    : vs === "All" && selectAllPlay === league.season ?
                                        foundHistory(id).c.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx+1})).map((o,q) => 
                                            <div key={q} className="py-3" style={{borderBottom:"1px solid #2a2c3e"}}>
                                                <div className="d-flex align-items-center">
                                                    <div className="" style={{width:"40px"}}>
                                                        <p className="m-0">{o.rank}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center" style={{width:"230px"}}>
                                                        <div>
                                                            <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                                findRosterByID(o.oID).owner_id ? findRosterByID(o.oID).owner_id.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                        </div>
                                                        <div className="" style={{marginLeft:"14px"}}>
                                                            {
                                                                findRosterByID(o.oID).owner_id ?
                                                                findRosterByID(o.oID).owner_id.team_name ?
                                                                    <>
                                                                        <p className="m-0">{findRosterByID(o.oID).owner_id.display_name}</p>
                                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(o.oID).owner_id.team_name}</p>
                                                                    </>
                                                                :<p className="m-0">{findRosterByID(o.oID).owner_id.display_name}</p>
                                                                :<></>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="" style={{width:"50px"}}>
                                                        <p className="m-0">{o.w}</p>
                                                    </div>
                                                    <div className="" style={{width:"50px"}}>
                                                        <p className="m-0">{o.oW}</p>
                                                    </div>
                                                    <div className="" style={{width:"50px"}}>
                                                        <p className="m-0">{winPCT(o.w , o.oW)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )  
                                    : foundHistory(id, selectAllPlay).s.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx+1})).map((o,q) => 
                                        <div key={q} className="py-3" style={{borderBottom:"1px solid #2a2c3e"}}>
                                            <div className="d-flex align-items-center">
                                                <div className="" style={{width:"40px"}}>
                                                    <p className="m-0">{o.rank}</p>
                                                </div>
                                                <div className="d-flex align-items-center" style={{width:"230px"}}>
                                                    <div>
                                                        <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                            findRosterByID(o.oID).owner_id ? findRosterByID(o.oID).owner_id.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                    </div>
                                                    <div className="" style={{marginLeft:"14px"}}>
                                                        {
                                                            findRosterByID(o.oID).owner_id ?
                                                            findRosterByID(o.oID).owner_id.team_name ?
                                                                <>
                                                                    <p className="m-0">{findRosterByID(o.oID).owner_id.display_name}</p>
                                                                    <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(o.oID).owner_id.team_name}</p>
                                                                </>
                                                            :<p className="m-0">{findRosterByID(o.oID).owner_id.display_name}</p>
                                                            :<></>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="" style={{width:"50px"}}>
                                                    <p className="m-0">{o.w}</p>
                                                </div>
                                                <div className="" style={{width:"50px"}}>
                                                    <p className="m-0">{o.oW}</p>
                                                </div>
                                                <div className="" style={{width:"50px"}}>
                                                    <p className="m-0">{winPCT(o.w , o.oW)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )  
                                }
                            </div>
                        </div>
                    </div>


                </div> */}
            </div>
        </div>
    )  
}
