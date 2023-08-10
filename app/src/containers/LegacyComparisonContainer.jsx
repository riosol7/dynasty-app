import React from "react";
import LegacyComparisonUI from "../ui/LegacyComparisonUI";

export default function LegacyComparisonContainer({
    id,
    loadRosters,
    processedRosters
}) {
    return (
        <LegacyComparisonUI
            id={id}
            loadRosters={loadRosters}
            processedRosters={processedRosters}
        />
    )
}