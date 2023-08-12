import React from "react";

import DynastyRankingSlider from "../components/sliders/DynastyRankingSlider";
import LegacyComparisonContainer from "../containers/LegacyComparisonContainer";
import DynastyProfileView from "./DynastyProfileView";

export default function Dynasty({
    findPlayer,
    id,
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
                findPlayer={findPlayer}
                id={id}
                owner={owner}
                players={players}
                processedRosters={processedRosters}
                roundToHundredth={roundToHundredth}
                tab={tab}
            />
        </div>
    )
}
