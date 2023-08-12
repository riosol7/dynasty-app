import React from "react";

import RosterContainer from "../containers/RosterContainer";
import DynastyAgeBarChart from "../components/charts/DynastyAgeBarChart";
import DynastyRadarInsights from "../components/charts/DynastyRadarInsights";

export default function DynastyProfileView({
    findPlayer,
    id,
    owner,
    players,
    processedRosters,
    roundToHundredth,
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
                                    roster={owner} 
                                />
                            </div> 
                        </div>
                        <div>
                            <div style={{background:"",borderTop:""}}>
                                <DynastyRadarInsights 
                                    id={id}
                                    processedRosters={processedRosters}
                                    roster={owner} 
                                    roundToHundredth={roundToHundredth}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <RosterContainer
                    findPlayer={findPlayer}
                    owner={owner}
                    players={players}
                    processedRosters={processedRosters}
                    roundToHundredth={roundToHundredth}
                    tab={tab}
                />      
            </div>
        </div>
    )
}