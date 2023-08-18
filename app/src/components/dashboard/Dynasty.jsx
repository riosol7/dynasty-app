import React from "react";

import DynastyRankingSlider from "../sliders/DynastyRankingSlider";
import LegacyComparisonContainer from "../../containers/LegacyComparisonContainer";
import DynastyProfileView from "./DynastyProfileView";

export default function Dynasty({
    id,
    league,
    matches,
    processedRosters,
    roster,
    tab,
}) {

    return (
        <div style={{fontSize:"14px"}}>
            <DynastyRankingSlider
                id={id}
                processedRosters={processedRosters}
                roster={roster}
            />
            <LegacyComparisonContainer
                id={id}
                processedRosters={processedRosters}
            />
            <DynastyProfileView
                id={id}
                league={league}
                matches={matches}
                processedRosters={processedRosters}
                roster={roster}
                tab={tab}
            />
        </div>
    )
}
