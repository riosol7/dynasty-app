import React from "react";
import OwnerStatsUI from "../ui/OwnerStatsUI";
import { findHistoryRoster } from "../helpers";

export default function OwnerStatsContainer({
    foundHistory,
    handleSelectStats,
    handleSelectSzn,
    handleSzn,
    id,
    league,
    lineupEfficiency,
    processedRosters,
    roundToHundredth,
    selectStats,
    selectSzn,
    tab,
    totalPtsPerGame,
    winPCT
}) {
    const foundRoster = findHistoryRoster(id, selectSzn, league, processedRosters);

    return (
        <OwnerStatsUI
            foundHistory={foundHistory}
            foundRoster={foundRoster}
            handleSelectStats={handleSelectStats}
            handleSelectSzn={handleSelectSzn}
            id={id}
            league={league}
            lineupEfficiency={lineupEfficiency}
            roundToHundredth={roundToHundredth}
            selectStats={selectStats}
            selectSzn={selectSzn}
            tab={tab}
            totalPtsPerGame={totalPtsPerGame}
            winPCT={winPCT}
        />
    )
}
