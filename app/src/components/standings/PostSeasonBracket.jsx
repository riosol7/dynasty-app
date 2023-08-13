import React from "react";
import PlayoffBracket from "./PlayoffBracket";
import ToiletBracket from "./ToiletBracket";
import { findRosterByID } from "../../helpers";

export default function PostSeasonBracket({
    findRosterBySzn,
    foundHistory,
    handleRostersBySzn,
    league,
    processedRosters,
    selectSzn,
}) {

    return (
        <div className="d-flex justify-content-center">
            <div className="">
                <div>
                    <p className="m-0 my-5" style={{fontSize:"13.5px", color:"lightgrey"}}>PLAYOFFS</p>
                    <div className="d-flex align-items-center" style={{fontSize:"12.5px",color:"#7d91a6"}}>
                        <div style={{width:"250px"}}>
                            <p className="m-0 text-center">{Number(selectSzn) <= 2020?"Week 14":"Week 15"}</p>
                        </div>
                        <div className="mx-4" style={{width:"250px"}}>
                            <p className="m-0 text-center">{Number(selectSzn) <= 2020?"Week 15":"Week 16"}</p>
                        </div>
                        <div style={{width:"250px"}}>
                            <p className="m-0 text-center">{Number(selectSzn) <= 2020?"Week 16":"Week 17"}</p>
                        </div>
                    </div>
                    <div className="" style={{}}>
                        <PlayoffBracket
                            findRosterByID={findRosterByID}
                            findRosterBySzn={findRosterBySzn}
                            foundHistory={foundHistory}
                            handleRostersBySzn={handleRostersBySzn}
                            league={league}
                            processedRosters={processedRosters}
                            selectSzn={selectSzn} 
                        />
                    </div> 
                </div>
                <div>
                    <p className="m-0 my-5" style={{fontSize:"13.5px", color:"lightgrey"}}>TOILET BOWL</p>
                    <div className="d-flex align-items-center" style={{fontSize:"12.5px",color:"#7d91a6"}}>
                        <div style={{width:"250px"}}>
                            <p className="m-0 text-center">{Number(selectSzn) <= 2020?"Week 14":"Week 15"}</p>
                        </div>
                        <div className="mx-4" style={{width:"250px"}}>
                            <p className="m-0 text-center">{Number(selectSzn) <= 2020?"Week 15":"Week 16"}</p>
                        </div>
                        <div style={{width:"250px"}}>
                            <p className="m-0 text-center">{Number(selectSzn) <= 2020?"Week 16":"Week 17"}</p>
                        </div>
                    </div>
                    <div className="" style={{}}>
                        <ToiletBracket
                            findRosterByID={findRosterByID}
                            findRosterBySzn={findRosterBySzn}
                            foundHistory={foundHistory}
                            handleRostersBySzn={handleRostersBySzn}
                            league={league}
                            processedRosters={processedRosters}
                            selectSzn={selectSzn} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
