import React from "react";

import DynastyRankingSlider from "../components/sliders/DynastyRankingSlider";
import LegacyComparisonContainer from "../containers/LegacyComparisonContainer";
import DynastyProfileView from "./DynastyProfileView";

export default function Dynasty({
    findLogo,
    findPlayer,
    getTotalPts,
    id,
    isOdd,
    loadRosters,
    owner,
    players,
    processedRosters,
    roundToHundredth,
    tab,
}) {

    return (
        <div style={{fontSize:"14px"}}>
            <DynastyRankingSlider
                id={id}
                loadRosters={loadRosters}
                owner={owner}
                processedRosters={processedRosters}
                roundToHundredth={roundToHundredth}
            />
            <LegacyComparisonContainer
                id={id}
                loadRosters={loadRosters}
                processedRosters={processedRosters}
            />
            <DynastyProfileView
                findLogo={findLogo}
                findPlayer={findPlayer}
                id={id}
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
