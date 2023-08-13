import React from "react";

import RosterContainer from "../containers/RosterContainer";
import DynastyAgeBarChart from "../components/charts/DynastyAgeBarChart";
import DynastyRadarInsights from "../components/charts/DynastyRadarInsights";

export default function DynastyProfileView({
    id,
    league,
    matches,
    processedRosters,
    roster,
    tab,
}) {
    return (
        <div className="d-flex align-items-center flex-wrap">
            <div className="d-flex my-4" style={{}}>
                <div>
                    <div className="sticky-top" style={{background:"#0f0f0f", borderRadius:"4px", marginRight:"3em"}}>
                        <div className="">
                            <div className="d-flex justify-content-center" style={{minWidth:"300px"}}>
                                <DynastyAgeBarChart 
                                    id={id}
                                    processedRosters={processedRosters}
                                    roster={roster} 
                                />
                            </div> 
                        </div>
                        <div>
                            <div style={{background:"",borderTop:""}}>
                                <DynastyRadarInsights 
                                    id={id}
                                    processedRosters={processedRosters}
                                    roster={roster} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <RosterContainer
                    league={league}
                    matches={matches}
                    processedRosters={processedRosters}
                    roster={roster}
                    tab={tab}
                />      
            </div>
        </div>
    )
}