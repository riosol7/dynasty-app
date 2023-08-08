import React, {useState} from 'react'
import Stats from '../components/Stats';
import Roster from '../components/Roster';
import VS from '../components/VS';
import LineChart from '../components/charts/LineChart';

import MatchupContainer from "../containers/MatchupContainer";

export default function Summary({
    findLogo,
    findPlayer,
    findRecord,
    findRosterByID,
    foundHistory,
    foundMyMatchups,
    getTotalPts,
    handleSzn,
    id,
    isOdd,
    league,
    lineupEfficiency,
    loadLeague,
    loadRosters,
    openModal,
    owner,
    players,
    processedRosters,
    rosters,
    roundToHundredth,
    tab,
    totalPtsPerGame,
    winPCT,
}) {
    
    const [selectStats, setSelectStats] = useState("Season")
    const [selectSzn, setSelectSzn] = useState("All Time")
    const [vs, setVS] = useState("Head")
    const [selectAllPlay, setSelectAllPlay] = useState("All Time")

  
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
      
    return (
        <div style={{fontSize:"14px"}}>
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
            {/* <div className="my-4">
                <div className="col">
                    <LineChart
                        id={id}
                        findRosterByID={findRosterByID}
                        foundHistory={foundHistory}
                        loadRosters={loadRosters}
                        processedRosters={processedRosters}
                        rosters={rosters}
                        weeklyMatch={weeklyMatch}
                    />
                </div>
            </div> */}
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
                    findLogo={findLogo}
                    findPlayer={findPlayer}
                    isOdd={isOdd}
                    getTotalPts={getTotalPts}
                    owner={owner}
                    players={players}
                    rosters={processedRosters}
                    roundToHundredth={roundToHundredth}
                    tab={tab}
                />
            </div>
        </div>
    )  
}
