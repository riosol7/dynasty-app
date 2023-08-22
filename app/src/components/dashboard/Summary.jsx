import React, { useState } from "react";

import MatchupContainer from "../../containers/MatchupContainer";
import OwnerStatsContainer from "../../containers/OwnerStatsContainer";
import RivalryRecordContainer from "../../containers/RivalryRecordContainer";
import RosterContainer from "../../containers/RosterContainer";

export default function Summary({
    findRecord,
    foundHistory,
    id,
    league,
    matches,
    openModal,
    players,
    processedRosters,
    roster,
    tab,
    totalPtsPerGame,
}) {
    const [selectStats, setSelectStats] = useState("Season");
    const [selectSzn, setSelectSzn] = useState("All Time");
    const [vs, setVS] = useState("Head");
    const [selectAllPlay, setSelectAllPlay] = useState("All Time");
  
    const handleAllPlay = (e) => {
        setSelectAllPlay(e.target.value)
    }
    const handleSelectStats = () => {
        if (selectStats ==="Post Season") {
            setSelectStats("Season");
        } else {
            setSelectStats("Post Season");
        }
    }
    const handleSelectSzn = (e) => {
        setSelectSzn(e.target.value);
    }
    const handleVS = (e) => {
        setVS(e.target.value);
    }
      
    return (
        <div style={{fontSize:"14px"}}>
            <MatchupContainer
                findRecord={findRecord}
                foundHistory={foundHistory}
                id={id}
                league={league}
                openModal={openModal}
                players={players}
                processedRosters={processedRosters}
            />
            <OwnerStatsContainer
                foundHistory={foundHistory}
                handleSelectStats={handleSelectStats}
                handleSelectSzn={handleSelectSzn}
                id={id}
                league={league}
                processedRosters={processedRosters}
                selectStats={selectStats}
                selectSzn={selectSzn}
                tab={tab}
                totalPtsPerGame={totalPtsPerGame}
            />
            <RivalryRecordContainer
                foundHistory={foundHistory}
                handleAllPlay={handleAllPlay}
                handleVS={handleVS}
                id={id}
                league={league}
                openModal={openModal}
                processedRosters={processedRosters}
                selectAllPlay={selectAllPlay}
                vs={vs}
            />
            <RosterContainer
                league={league}
                matches={matches}
                processedRosters={processedRosters}
                roster={roster}
                tab={tab}
            />           
        </div>
    )  
}
