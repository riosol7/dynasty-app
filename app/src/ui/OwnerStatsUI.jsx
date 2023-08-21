import React from "react";
import { Icon } from "@iconify/react";
import { lineupEfficiency, roundToHundredth, winPCT } from "../utils";

export default function OwnerStatsUI({
    foundHistory,
    foundRoster,
    handleSelectStats,
    handleSelectSzn,
    id,
    league,
    selectStats,
    selectSzn,
    tab,
    totalPtsPerGame,
}) {

    return (
        <div className="py-4" style={{minWidth:"300px"}}>
            <div className="d-flex align-items-center justify-content-between" style={{marginBottom:"8px"}}>
                <p className="m-0 bold" style={{color:"lightgrey"}}>STATS</p>
                <div className="d-flex align-items-center">
                    <Icon className="mx-3" icon="mdi:bracket" onClick={() => handleSelectStats()} style={ selectStats === "Post Season" ? {fontSize:"1.4em", color:"#a9dfd8"} : {fontSize:"1.4em", color:"#cbcbcb"}}/>
                    <select className="p-2"value={selectSzn} onChange={handleSelectSzn} style={{fontSize:".8em", borderRadius:"25px", border:"2px solid #3bdbba", background:"black", color:"white"}}>
                        {tab === "Summary" ? <option value={"All Time"}>All Time</option> : <></> }
                        {league.history?.slice().reverse().map((season, i) => 
                            <option key={i} value={season.year}>{season.year}</option>
                        )}
                        <option value={league.season}>{league.season}</option>
                    </select>
                </div>
            </div>
            <div className="mt-4">
                <div className="" style={{fontSize:"14px"}}>
                    <div className="d-flex align-items-center justify-content-between pb-3" style={{color:"#7d91a6", fontSize:"12.85px"}}> 
                        <div>
                            {selectStats === "Season" ? <p className="m-0">Regular Season</p> : <p className="m-0">Post Season</p>}
                        </div>
                        {selectStats === "Season" ? <p className="m-0">Rate</p> : <></>}
                    </div>
                    <div className="">
                        <div>
                            <div className="d-flex align-items-center justify-content-between pb-3" style={selectStats === "Season" ? {borderBottom:"2px dashed #0f0f0f"} : {borderBottom:"2px solid #2a2c3e"}}>
                                <p className={selectStats === "Season" ? "m-0 bold" : "m-0"}>Record</p>
                                {selectStats === "Season" && selectSzn === "All Time" ?
                                    <div className="d-flex align-items-center">
                                        <p className="m-0" style={{width:"70px"}}>
                                            {foundHistory(id).allTime.w}-{foundHistory(id).allTime.l}
                                        </p>
                                        <p className="d-flex align-items-center m-0" style={{width:"50px"}}>
                                            {winPCT(foundHistory(id).allTime.w, foundHistory(id).allTime.l)}
                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                        </p>
                                    </div>
                                : selectStats === "Season" ?
                                    <div className="d-flex align-items-center">
                                        <p className="m-0" style={{width:"70px"}}>{foundRoster.settings.wins}-{foundRoster.settings.losses}</p>
                                        <p className="m-0 d-flex align-items-center justify-content-end" style={{width:"50px"}}>
                                            {winPCT(foundRoster.settings.wins, foundRoster.settings.losses)}
                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                        </p>
                                    </div>
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{foundHistory(id).playoffs.w}-{foundHistory(id).playoffs.l}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{foundHistory(id, selectSzn).s.pW}-{foundHistory(id, selectSzn).s.pL}</p> 
                                :<></>
                                }
                            </div>
                            <div style={{fontWeight:"lighter"}}>
                                <div className="d-flex align-items-center justify-content-between fontHover" style={{borderBottom:"1px dashed #0f0f0f"}}>
                                    {(selectStats === "Season" && selectSzn === "All Time" && foundHistory(id).playoffs.a > 0) || (selectStats === "Season" && foundHistory(id, selectSzn).s.playoff === true) ?
                                        <p className="m-0 py-3">w/ Playoffs</p>   
                                    :<></>
                                    }
                                    {selectStats === "Season" && selectSzn === "All Time" && foundHistory(id).playoffs.a > 0 ? 
                                        <div className="d-flex align-items-center py-3">
                                            <p className="m-0" style={{width:"70px"}}>
                                                {foundHistory(id).allTime.w + foundHistory(id).playoffs.w}-{foundHistory(id).allTime.l + foundHistory(id).playoffs.l}
                                            </p>
                                            <p className="m-0 d-flex align-items-center" style={{width:"50px"}}> 
                                                {winPCT(foundHistory(id).allTime.w + foundHistory(id).playoffs.w,foundHistory(id).allTime.l + foundHistory(id).playoffs.l)}
                                                {winPCT(foundHistory(id).allTime.w + foundHistory(id).playoffs.w,foundHistory(id).allTime.l + foundHistory(id).playoffs.l).toString().length === 2 ? ".00" : ""}
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </p>
                                        </div>
                                    : (selectStats === "Season" && foundHistory(id, selectSzn).s.playoff === true) ?
                                        <div className="d-flex align-items-center py-3">
                                            <p className="m-0" style={{width:"70px"}}>{foundRoster.settings.wins + foundHistory(id, selectSzn).s.pW}-{foundRoster.settings.losses + foundHistory(id, selectSzn).s.pL}</p>
                                            <p className="m-0 d-flex align-items-center justify-content-end" style={{width:"50px"}}> 
                                                {winPCT(foundRoster.settings.wins + foundHistory(id, selectSzn).s.pW, foundRoster.settings.losses + foundHistory(id, selectSzn).s.pL)}
                                                {winPCT(foundRoster.settings.wins + foundHistory(id, selectSzn).s.pW, foundRoster.settings.losses + foundHistory(id, selectSzn).s.pL).toString().length === 2 ? ".00" : ""}
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </p>
                                        </div>
                                    :<></>
                                    }
                                </div>
                                {selectSzn === "All Time" && selectStats !=="Post Season" ?
                                    <div className="d-flex align-items-center justify-content-between py-3 fontHover" style={{borderBottom:"1px dashed #0f0f0f"}}>
                                        <p className="m-0">Best</p>
                                        <div className="d-flex align-items-center">
                                            <p className="m-0" style={{width:"70px"}}>{foundHistory(id).allTime.bestRecordW}-{foundHistory(id).allTime.bestRecordL}</p>
                                            <p style={{width:"50px"}} className="m-0 d-flex align-items-center">
                                                {winPCT(foundHistory(id).allTime.bestRecordW, foundHistory(id).allTime.bestRecordL)}
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </p>
                                        </div>
                                    </div>
                                :<></>
                                }
                                {selectStats !== "Post Season"?
                                    <div className="d-flex align-items-center justify-content-between pb-3 fontHover" style={{borderBottom:"2px solid #2a2c3e"}}>
                                        <div className="">
                                            <p className="m-0 mt-3">All Play</p>
                                        </div>
                                        <div className="">
                                            {selectStats === "Season" && selectSzn === "All Time" ?
                                                <div className="mt-3">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0" style={{width:"70px"}}>{foundHistory(id).allTime.allPlayRecordW}-{foundHistory(id).allTime.allPlayRecordL}</p>
                                                        <p className="m-0 d-flex align-items-center" style={{width:"50px"}}>{winPCT(foundHistory(id).allTime.allPlayRecordW, foundHistory(id).allTime.allPlayRecordL)}   
                                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                        </p>
                                                    </div>
                                                </div>
                                            : selectStats === "Season" ?
                                                <div className="d-flex align-items-center mt-3">
                                                    <p className="m-0" style={{width:"70px"}}>{foundHistory(id, selectSzn).s.allPlayRecordW}-{foundHistory(id, selectSzn).s.allPlayRecordL}</p>
                                                    <p className="m-0 d-flex align-items-center justify-content-end" style={{width:"50px"}}>{winPCT(foundHistory(id, selectSzn).s.allPlayRecordW, foundHistory(id, selectSzn).s.allPlayRecordL)}   
                                                        <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                    </p>
                                                </div>
                                            : <p className="m-0">-</p>
                                            }
                                        </div>
                                    </div>
                                :<></>
                                }
                            </div>
                        </div>
                        {selectStats==="Post Season"?
                            <div className="">
                                <div className="d-flex align-items-center justify-content-between py-3" style={selectSzn==="All Time"? {borderBottom:"2px solid #2a2c3e"} : {}}>
                                    <p className="m-0">Win Rate</p> 
                                    {selectSzn==="All Time" ?
                                        <p className="d-flex align-items-center justify-content-end m-0" style={{width:"50px"}}>
                                            {winPCT(foundHistory(id).playoffs.w, foundHistory(id).playoffs.l) || 0}
                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                        </p>
                                    : selectStats === "Post Season" ?
                                        foundHistory(id, selectSzn).s.playoff === true ?
                                            <p className="d-flex align-items-center m-0">
                                                {winPCT(foundHistory(id, selectSzn).s.pW, foundHistory(id, selectSzn).s.pL)}
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </p> 
                                        : <p className="m-0 d-flex align-items-center">0<Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/></p>
                                    : <p className="d-flex align-items-center m-0">-</p>
                                    }
                                </div>
                            </div>
                        :<></>
                        }
                        {selectStats==="Season"?
                            <div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                                    <div>
                                        <p className="m-0">Lineup Efficiency</p>
                                    </div>
                                    <div>
                                        {selectStats === "Season" && selectSzn === "All Time" ?
                                            <div className="d-flex align-items-center">
                                                <p className="m-0 text-end">{lineupEfficiency(foundHistory(id).allTime.fpts, foundHistory(id).allTime.ppts)}</p>
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </div>
                                        : selectStats === "Season" ?   
                                            <div className="d-flex align-items-center">
                                                <p className="m-0">{lineupEfficiency(Number(foundRoster.settings.fpts + "." + foundRoster.settings.fpts_decimal), Number(foundRoster.settings.ppts + "." + foundRoster.settings.ppts_decimal))}</p>
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </div>
                                        :<></>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                                    <div className="">
                                        <p className="m-0">Luck Rate</p>
                                    </div>
                                        {selectStats==="Season" && selectSzn==="All Time" ?
                                            <div className="d-flex align-items-center">
                                                <p className="m-0">
                                                    {roundToHundredth(winPCT(foundHistory(id).allTime.w, foundHistory(id).allTime.l)-winPCT(foundHistory(id).allTime.allPlayRecordW, foundHistory(id).allTime.allPlayRecordL))}
                                                </p>
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </div>
                                        : selectStats==="Season"?   
                                            <div className="d-flex align-items-center">
                                                <p className="m-0">
                                                    {roundToHundredth(winPCT(foundRoster.settings.wins, foundRoster.settings.losses)-winPCT(foundHistory(id,selectSzn).s.allPlayRecordW, foundHistory(id,selectSzn).s.allPlayRecordL))}
                                                </p>
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </div>
                                        : selectStats==="Post Season" && selectSzn==="All Time" ?
                                            <div className="d-flex align-items-center">
                                                <p className="m-0" style={{width:"12px"}}>-</p>
                                            </div>
                                        :<></>
                                        }
                                </div>
                            </div>
                        :<></>
                        }
                        {selectStats === "Post Season" && selectSzn === "All Time" ?
                            <div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                                    <div className="">
                                        <p className="m-0">Toilet Bowl</p>
                                    </div>
                                    <div>
                                        <p className="m-0" style={{color:"whitesmoke"}}>{foundHistory(id).allTime.TB}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                                    <div className="">
                                        <p className="m-0">Playoff Appearances</p>
                                    </div>
                                    <div>
                                        <p className="d-flex align-items-center m-0" style={{color:"whitesmoke"}}>{foundHistory(id).playoffs.a}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                                    <div className="">
                                        <p className="m-0">Finals</p>
                                    </div>
                                    <div>
                                        <p className="d-flex align-items-center m-0" style={{color:"whitesmoke"}}>{foundHistory(id).allTime.finals}</p>
                                    </div>
                                </div>
                            </div>
                        :<></>        
                        }
                        <div className="mt-4 mb-3 d-flex align-items-center justify-content-between" style={{color:"#7d91a6", fontSize:"12.85px"}}>
                            <div>
                                <p className="m-0">Scoring</p>
                            </div> 
                            <div>
                                <p className="m-0">Points</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                            <div className="">
                                <p className="m-0">Total Points Per Game</p>
                            </div>
                            <div>
                                {selectStats === "Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{totalPtsPerGame(foundHistory(id).allTime.fpts, "All Time")}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{totalPtsPerGame(Number(foundRoster.settings.fpts+"."+foundRoster.settings.fpts_decimal), selectSzn)}</p>
                                : selectStats === "Post Season" && selectSzn === "All Time" ? 
                                    foundHistory(id).allTime.playoffGames > 0 ?
                                        <p className="m-0">{roundToHundredth(foundHistory(id).allTime.playoffPF / foundHistory(id).allTime.playoffGames)}</p>
                                    : 
                                        <p className="m-0">0</p>
                                : selectStats === "Post Season" ?
                                    foundHistory(id, selectSzn).s.playoff === true ?
                                        <p className="m-0">{roundToHundredth(foundHistory(id, selectSzn).s.playoffPF / foundHistory(id, selectSzn).s.playoffGames)}</p>
                                    : 
                                        <p className="m-0">0</p>
                                :<></>
                                }
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                            <div className="">
                                <p className="m-0">Highest Score</p>
                            </div>
                            <div>
                                {selectStats === "Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{foundHistory(id).allTime.highest}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{foundHistory(id, selectSzn).s.highest}</p>
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{foundHistory(id).allTime.playoffHS}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{foundHistory(id,selectSzn).s.playoffHS || 0}</p>
                                :<></>
                                }  
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                            <div className="">
                                <p className="m-0">PF</p>
                            </div>
                            <div>
                                {selectStats === "Season" && selectSzn === "All Time" ? 
                                    <p className="m-0">{foundHistory(id).allTime.fpts}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{foundRoster.settings.fpts}.{foundRoster.settings.fpts_decimal}</p>
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{foundHistory(id).allTime.playoffPF}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{foundHistory(id,selectSzn).s.playoffPF || 0}</p>
                                :<></>
                                }
                            </div>
                        </div>
                        {selectStats === "Season" ?
                            <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                                <div className="">
                                    <p className="m-0">MAX PF</p>
                                </div>
                                <div>
                                    { selectStats === "Season" && selectSzn === "All Time" ? 
                                        <p className="m-0">{foundHistory(id).allTime.ppts}</p>
                                    : selectStats === "Season" ?
                                        <p className="m-0">{foundRoster.settings.ppts}.{foundRoster.settings.ppts_decimal}</p>  
                                    :<></>
                                    }
                                </div>
                            </div>
                        :<></>
                        }
                        <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                            <div className="">
                                <p className="m-0">PA</p>
                            </div>
                            <div>
                                {selectStats === "Season" && selectSzn === "All Time" ? 
                                    <p className="m-0">{foundHistory(id).allTime.fpts_against}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{foundRoster.settings.fpts_against}.{foundRoster.settings.fpts_against_decimal}</p>   
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{roundToHundredth(foundHistory(id).allTime.playoffPA)}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{foundHistory(id, selectSzn).s.playoffPA || 0}</p>
                                :<></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}