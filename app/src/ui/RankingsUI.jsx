import React from "react";
import { Icon } from "@iconify/react";
import StandingsContainer from "../containers/StandingsContainer";
import DynastyRankingsContainer from "../containers/DynastyRankingsContainer";
import PowerRankingsContainer from "../containers/PowerRankingsContainer";

export default function RankingsUI({
    findRosterByID,
    foundHistory,
    handlePlayoffs,
    handleRankings,
    handleRostersBySzn,
    handleSelectSzn,
    league,
    lineupEfficiency,
    loadLeague,
    loadRosters,
    playoffs,
    processedRosters,
    rankings,
    rosters,
    roundToHundredth,
    selectSzn,
    winPCT,
}) {


  return (
    <div>
        { loadRosters && loadLeague ? <p>Loading </p> :
        <div className="">
            <div className="d-flex align-items-center justify-content-between sticky-top pt-3 pb-2" style={{background:"black"}}>
            <div className="d-flex align-items-center">
                <Icon icon="icon-park-outline:ranking" style={{color:"#a9dfd8",fontSize:"1.1rem"}}/>
                <select className="m-0 mx-1 bold" onChange={handleRankings} value={rankings} style={{background:"black", color:"white", border:"none"}}>
                <option value={"Dynasty"}>Dynasty</option>
                <option value={"Power"}>Power</option>
                <option value={"Standings"}>Standings</option>
                </select>
            </div>
            {
                rankings === "Standings" || rankings==="Power"?
                <div className="d-flex align-items-center">
                    {
                    selectSzn !== "All Time" && rankings !== "Power" ?
                        <div className="mx-4">
                        <Icon icon="mdi:bracket" onClick={() => handlePlayoffs()} style={ playoffs ? {fontSize:"1.4rem", color:"#a9dfd8"} : {fontSize:"1.4rem", color:"#cbcbcb"}}/>
                        </div>
                    :<></>
                    }
                    <div className="d-flex align-items-center">
                    <select className="p-2" onChange={handleSelectSzn} value={selectSzn} style={{fontSize:".8em", borderRadius:"25px", border:"2px solid #3bdbba", background:"black", color:"white"}}>
                        <option value={league.season}>{league.season}</option>
                        {
                            league.history ? 
                            league.history.map((l, i) => 
                                <option key={i} value={l.year}>{l.year}</option>
                            )
                            :<></>
                        }
                        {
                            rankings ==="Standings" && playoffs===false?
                            <option value="All Time">All Time</option>
                            :<></>
                        }
                    </select>
                    </div>
                </div>
                :  
                <div className="d-flex align-items-center">
                    <select className="p-2" style={{fontSize:".8em", borderRadius:"25px", border:"2px solid #3bdbba", background:"black", color:"white"}}>
                    <option value={"KCT"}>kct</option>
                    </select>
                </div>
            } 
            </div>
            <div className="">
                { 
                    rankings==="Standings"? 
                        <StandingsContainer
                            findRosterByID={findRosterByID}
                            foundHistory={foundHistory}
                            handleRostersBySzn={handleRostersBySzn}
                            league={league}
                            playoffs={playoffs}
                            processedRosters={processedRosters}
                            rosters={rosters}
                            roundToHundredth={roundToHundredth}
                            selectSzn={selectSzn}
                            winPCT={winPCT}
                        />
                    : rankings==="Dynasty"?
                        <DynastyRankingsContainer
                            loadRosters={loadRosters}
                            processedRosters={processedRosters}
                        />
                    : rankings==="Power"?
                        <PowerRankingsContainer
                            foundHistory={foundHistory}
                            league={league}
                            lineupEfficiency={lineupEfficiency}
                            processedRosters={processedRosters}
                            roundToHundredth={roundToHundredth}
                            selectSzn={selectSzn}
                            winPCT={winPCT}

                        />
                    :<></>
                }
            </div>
        </div>
        }
    </div>
  )
}
