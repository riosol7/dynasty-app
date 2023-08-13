import React from "react";

import DynastyRankingSlider from "../components/sliders/DynastyRankingSlider";
import LegacyComparisonContainer from "../containers/LegacyComparisonContainer";
import DynastyProfileView from "./DynastyProfileView";

export default function Dynasty({
    id,
    league,
    loadRosters,
    matches,
    processedRosters,
    roster,
    tab,
}) {

    return (
        <div style={{fontSize:"14px"}}>
            <DynastyRankingSlider
                id={id}
                loadRosters={loadRosters}
                processedRosters={processedRosters}
                roster={roster}
            />
            <LegacyComparisonContainer
                id={id}
                loadRosters={loadRosters}
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
