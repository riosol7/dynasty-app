import React from "react";
import OwnerStatsUI from "../ui/OwnerStatsUI";
import { findHistoryRoster } from "../helpers";

export default function OwnerStatsContainer({
    foundHistory,
    handleSelectStats,
    handleSelectSzn,
    id,
    league,
    processedRosters,
    selectStats,
    selectSzn,
    tab,
    totalPtsPerGame,
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
            selectStats={selectStats}
            selectSzn={selectSzn}
            tab={tab}
            totalPtsPerGame={totalPtsPerGame}
        />
    )
}
