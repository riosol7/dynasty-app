import React from "react";
import LegacyComparisonUI from "../ui/LegacyComparisonUI";

export default function LegacyComparisonContainer({
    id,
    processedRosters
}) {
    return (
        <LegacyComparisonUI
            id={id}
            processedRosters={processedRosters}
        />
    )
}