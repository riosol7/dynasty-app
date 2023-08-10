import React, { useState } from 'react';
import PowerBarChart from '../components/charts/PowerBarChart';
import PowerRadarChart from '../components/charts/PowerRadarChart';
// import LuckyChart from '../charts/LuckyChart';
import PowerScoreStackedChart from '../components/charts/PowerScoreStackedChart';
import MatchupContainer from "../containers/MatchupContainer";
import PowerRankingSlider from "../components/sliders/PowerRankingSlider";
import OwnerStatsContainer from "../containers/OwnerStatsContainer";
import RivalryRecordContainer from "../containers/RivalryRecordContainer";

export default function Power({
    findLogo,
    findRecord,
    findRosterByID,
    foundHistory,
    foundMyMatchups,
    handleSzn,
    id,
    league,
    lineupEfficiency,
    loadLeague,
    loadRosters,
    openModal,
    owner,
    players,
    processedRosters,
    tab,
    totalPtsPerGame,
    roundToHundredth,
    winPCT,
}) {

    const [selectStats,setSelectStats] = useState("Season")
    const [pwrRankSzn, setPwrRankSzn]=useState(foundMyMatchups.length>0?league.season:(Number(league.season)-1).toString())
    const [selectSzn,setSelectSzn] = useState(league.season)
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
 
    const handleAllPlay = (e) => {
        setSelectAllPlay(e.target.value)
    }
    const handleVS = (e) => {
        setVS(e.target.value)
    }
    const powerRankC= processedRosters?.totalRoster?.map(r => ({
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
            <PowerRankingSlider
                handlePwrRank={handlePwrRank}
                league={league}
                owner={owner}
                pwrRank={pwrRank}
                pwrRankSzn={pwrRankSzn}
            />
                    {/* <div className="d-flex align-items-top flex-wrap"> 
                        <div style={{width:"420px"}}>
                            <PowerBarChart
                                pwrRank={pwrRank}
                                lineupEfficiency={lineupEfficiency}
                            />
                        </div>
                        <div>
                            <PowerRadarChart
                                foundHistory={foundHistory}
                                league={league}
                                owner={owner}
                                pwrRank={pwrRank}
                                roundToHundredth={roundToHundredth}
                                selectSzn={pwrRankSzn}
                            />
                        </div>
                        <div>
                            <PowerScoreStackedChart
                                foundHistory={foundHistory}
                                league={league}
                                pwrRank={pwrRank}
                                roundToHundredth={roundToHundredth}
                                selectSzn={pwrRankSzn}
                                winPCT={winPCT}

                            />
                        </div>
                    </div> */}
            <MatchupContainer
                findLogo={findLogo}
                findRecord={findRecord}
                findRosterByID={findRosterByID}
                foundHistory={foundHistory}
                foundMyMatchups={foundMyMatchups}
                id={id}
                league={league}
                loadLeague={loadLeague}
                openModal={openModal}
                players={players}
                processedRosters={processedRosters}
                roundToHundredth={roundToHundredth}
            />
            <OwnerStatsContainer
                foundHistory={foundHistory}
                handleSelectStats={handleSelectStats}
                handleSelectSzn={handleSelectSzn}
                handleSzn={handleSzn}
                id={id}
                league={league}
                lineupEfficiency={lineupEfficiency}
                owner={owner}
                roundToHundredth={roundToHundredth}
                selectStats={selectStats}  
                selectSzn={selectSzn}
                tab={tab}
                totalPtsPerGame={totalPtsPerGame}
                winPCT={winPCT}

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
    )
}
