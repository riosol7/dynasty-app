import React, { useState } from 'react';
import Matchups from '../Matchups';
import LineChart from '../charts/LineChart';
import PowerRankingsS from '../sliders/PowerRankingsS';
import PowerBarChart from '../charts/PowerBarChart';
import PowerRadarChart from '../charts/PowerRadarChart';
// import LuckyChart from '../charts/LuckyChart';
import PowerScoreStackedChart from '../charts/PowerScoreStackedChart';
// import { Icon } from '@iconify/react';
import OwnerStatsContainer from "../../containers/OwnerStatsContainer";
import RivalryRecordContainer from "../../containers/RivalryRecordContainer";

export default function Power(props) {
    const id=props.id
    const foundMyMatchups=props.foundMyMatchups
    const findRosterByID=props.findRosterByID
    const findRecord=props.findRecord
    const foundHistory=props.foundHistory
    const players=props.players
    const findLogo=props.findLogo
    const handleSzn=props.handleSzn
    const owner=props.owner
    const lineupEfficiency=props.lineupEfficiency
    const totalPtsPerGame=props.totalPtsPerGame
    const roundToHundredth=props.roundToHundredth
    const loadRosters=props.loadRosters
    const rosters=props.rosters
    const findRosterByName=props.findRosterByName
    // const weeklyMatch=props.weeklyMatch
    const loadLeague=props.loadLeague
    const league=props.league
    // const findWeeklyMatchups=props.findWeeklyMatchups
    const openModal=props.openModal
    // const handleWeeklyMatch=props.handleWeeklyMatch 
    const winPCT=props.winPCT
    const tab=props.tab
    const processedRosters=props.processedRosters
    // const handleAllPlay=props.handleAllPlay
    // const vs=props.vs
    // const selectAllPlay=props.selectAllPlay
    // const handleVS=props.handleVS
    const [selectStats,setSelectStats] = useState("Season")
    const [pwrRankSzn, setPwrRankSzn]=useState(foundMyMatchups.length>0?league.season:(Number(league.season)-1).toString())
    const [selectSzn,setSelectSzn] = useState(league.season)
    const [weeklyMatch, setWeeklyMatch] = useState(foundMyMatchups.length>0?league.season:(Number(league.season)-1).toString())
    const [vs, setVS] = useState("All")
    const [selectAllPlay, setSelectAllPlay] = useState(foundMyMatchups.length>0?league.season:(Number(league.season)-1).toString())
    const handlePwrRank=(e)=>{
        setPwrRankSzn(e.target.value)
    }
    const handleSelectStats = () => {
        if(selectStats ==="Post Season"){
            setSelectStats("Season");
        } else {
            setSelectStats("Post Season");
        }
    }
    const handleSelectSzn = (e) => {
        setSelectSzn(e.target.value)
    }
    const handleWeeklyMatch = (e) => {
        setWeeklyMatch(e.target.value)
    }
    const handleAllPlay = (e) => {
        setSelectAllPlay(e.target.value)
    }
    const handleVS = (e) => {
        setVS(e.target.value)
    }
    const findWeeklyMatchups = () => {
        const template = league.history.filter(l => l.year === weeklyMatch).map(szn => Object.entries(szn.matchups).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
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
    const powerRankC=rosters && rosters.totalRoster.map(r => ({
        ...r,
        apW:foundHistory(r.roster_id).c.allPlayRecordW,
        apL:foundHistory(r.roster_id).c.allPlayRecordL,
        apR:winPCT(foundHistory(r.roster_id).c.allPlayRecordW,foundHistory(r.roster_id).c.allPlayRecordL)

    })).sort((a,b) => b.apR - a.apR)
    let powerRankS=league && league.history.filter(l => l.year === pwrRankSzn)[0] !== undefined?
        league.history.filter(l => l.year === pwrRankSzn)[0].rosters.map(r => ({
            ...r,
            apW:foundHistory(r.roster_id,pwrRankSzn).s.allPlayRecordW,
            apL:foundHistory(r.roster_id,pwrRankSzn).s.allPlayRecordL,
            apR:winPCT(foundHistory(r.roster_id,pwrRankSzn).s.allPlayRecordW,foundHistory(r.roster_id,pwrRankSzn).s.allPlayRecordL)
        })).sort((a,b) => b.apR - a.apR)
    :[]
    let pwrRank=powerRankS.length>0?powerRankS:powerRankC
    return (
        <div style={{fontSize:"14px"}}>
            <div className="">
                <div className="my-4">
                    <div className="d-flex justify-content-between">
                        <p className="m-0 bold" style={{color:"lightgrey"}}>POWER RANKING</p>
                        <select className="" onChange={handlePwrRank}  value={pwrRankSzn} style={{color:"#fff", background:"inherit", border:"none"}}>
                            <option value={league.season}>{league.season}</option>
                            {
                                league.history.map((l,i) =>
                                    <option key={i} value={l.year}>{l.year}</option>
                                )
                            }
                        </select>
                    </div>
                    <PowerRankingsS
                        loadRosters={loadRosters}
                        rosters={rosters}
                        foundHistory={foundHistory}
                        selectSzn={pwrRankSzn}
                        winPCT={winPCT}
                        league={league}
                        findRosterByName={findRosterByName}
                        findRosterByID={findRosterByID}
                        owner={owner}
                        pwrRank={pwrRank}
                    />
                    <div className="d-flex align-items-top flex-wrap"> 
                        <div style={{width:"420px"}}>
                            <PowerBarChart
                                pwrRank={pwrRank}
                                lineupEfficiency={lineupEfficiency}
                            />
                        </div>
                        <div>
                            <PowerRadarChart
                                pwrRank={pwrRank}
                                selectSzn={pwrRankSzn}
                                roundToHundredth={roundToHundredth}
                                foundHistory={foundHistory}
                                league={league}
                                owner={owner}
                            />
                        </div>
                        <div>
                            <PowerScoreStackedChart
                                pwrRank={pwrRank}
                                winPCT={winPCT}
                                foundHistory={foundHistory}
                                league={league}
                                roundToHundredth={roundToHundredth}
                                selectSzn={pwrRankSzn}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="d-flex justify-content-between bold" style={{marginBottom:"8px"}}>
                        <p className="m-0" style={{color:"lightgrey"}}>WEEKLY BREAKDOWN</p>
                        <select className="" onChange={handleWeeklyMatch}  value={weeklyMatch} style={{color:"#fff", background:"inherit", border:"none"}}>
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
                <OwnerStatsContainer
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
                <RivalryRecordContainer
                    findRosterByID={findRosterByID}
                    foundHistory={foundHistory}
                    handleAllPlay={handleAllPlay}
                    handleVS={handleVS}
                    id={id}
                    league={league}
                    openModal={openModal}
                    processedRosters={processedRosters}
                    selectAllPlay={selectAllPlay}
                    vs={vs}
                    winPCT={winPCT}
                />
            </div>
        </div>
    )
}
