import React from "react";
import { Icon } from "@iconify/react";
import PowerRow from "../components/rankings/power/PowerRow";

export default function PowerRankingsUI({
    asc,
    handleSort,
    pwrRank,
    setAsc,
    sort,
    winPCT,
}) {
    return (
        <div>
            <div>
                <div className="mt-2">
                    <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                        <div className="col-sm-7 d-flex align-items-center">
                            {sort === "RANK" ?
                                asc === false ?
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                                        <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                                :
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                                        <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                    </div>  
                            :
                                <p className="col-sm-1 StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>
                            }
                            <div className="">
                                <p className="m-0 StandingCell">TEAM</p>
                            </div>
                        </div>
                        <div className="col-sm-5 d-flex align-items-center justify-content-end">
                            <p className="col-sm-1 m-0 StandingCell">W</p>
                            <p className="col-sm-1 m-0 StandingCell">L</p>
                            <p className="col-sm-1 m-0 StandingCell"><Icon icon="emojione-monotone:four-leaf-clover"style={{fontSize:"13.2px", color:"#289a5d"}}/> Rate</p>
                        </div>
                    </div>
                </div>
            </div>
            {pwrRank?.map((r,i) => 
                <PowerRow key={i} r={r} winPCT={winPCT}/>
            )}
        </div>
    )
}
