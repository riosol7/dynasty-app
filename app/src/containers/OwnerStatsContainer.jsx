import React from "react";
import OwnerStatsUI from "../ui/OwnerStatsUI";

export default function OwnerStatsContainer({
    foundHistory,
    handleSelectStats,
    handleSelectSzn,
    handleSzn,
    id,
    league,
    lineupEfficiency,
    owner,
    roundToHundredth,
    selectStats,
    selectSzn,
    tab,
    totalPtsPerGame,
    winPCT
}) {

    return (
        <OwnerStatsUI
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
    )
}
