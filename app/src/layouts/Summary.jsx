import React, { useState } from "react";

import MatchupContainer from "../containers/MatchupContainer";
import OwnerStatsContainer from "../containers/OwnerStatsContainer";
import RivalryRecordContainer from "../containers/RivalryRecordContainer";
import RosterContainer from "../containers/RosterContainer";

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
            <RosterContainer
                findLogo={findLogo}
                findPlayer={findPlayer}
                isOdd={isOdd}
                getTotalPts={getTotalPts}
                owner={owner}
                players={players}
                processedRosters={processedRosters}
                roundToHundredth={roundToHundredth}
                tab={tab}
            />           
        </div>
    )  
}
