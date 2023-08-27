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
    const allPlayStats = foundHistory(id, selectSzn).allPlay;
    const allTimeStats = foundHistory(id).allTime;
    const allTimeTotalWins = allTimeStats.wins + allTimeStats.playoffs.wins;
    const allTimeTotalLosses = allTimeStats.losses + allTimeStats.playoffs.losses;
    const playoffStats = foundHistory(id, selectSzn).playoffs;

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
                                        <p className="m-0" style={{width:"70px"}}>{allTimeStats.wins}-{allTimeStats.losses}</p>
                                        <p className="d-flex align-items-center m-0" style={{width:"50px"}}>
                                            {winPCT(allTimeStats.wins, allTimeStats.losses)}
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
                                    <p className="m-0">{allTimeStats.playoffs.wins}-{allTimeStats.playoffs.losses}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{playoffStats.wins}-{playoffStats.losses}</p> 
                                :<></>
                                }
                            </div>
                            <div style={{fontWeight:"lighter"}}>
                                <div className="d-flex align-items-center justify-content-between fontHover" style={{borderBottom:"1px dashed #0f0f0f"}}>
                                    {(selectStats === "Season" && selectSzn === "All Time" && allTimeStats.playoffs.appearances > 0) || (selectStats === "Season" && playoffStats.appearance === true) ?
                                        <p className="m-0 py-3">w/ Playoffs</p>   
                                    :<></>
                                    }
                                    {selectStats === "Season" && selectSzn === "All Time" && allTimeStats.playoffs.appearances > 0 ? 
                                        <div className="d-flex align-items-center py-3">
                                            <p className="m-0" style={{width:"70px"}}>{allTimeTotalWins}-{allTimeTotalLosses}</p>
                                            <p className="m-0 d-flex align-items-center" style={{width:"50px"}}> 
                                                {winPCT(allTimeTotalWins, allTimeTotalLosses)}
                                                {winPCT(allTimeTotalWins, allTimeTotalLosses).toString().length === 2 ? ".00" : ""}
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </p>
                                        </div>
                                    : (selectStats === "Season" && playoffStats.appearance === true) ?
                                        <div className="d-flex align-items-center py-3">
                                            <p className="m-0" style={{width:"70px"}}>{foundRoster.settings.wins + playoffStats.wins}-{foundRoster.settings.losses + playoffStats.losses}</p>
                                            <p className="m-0 d-flex align-items-center justify-content-end" style={{width:"50px"}}> 
                                                {winPCT(foundRoster.settings.wins + playoffStats.wins, foundRoster.settings.losses + playoffStats.losses)}
                                                {winPCT(foundRoster.settings.wins + playoffStats.wins, foundRoster.settings.losses + playoffStats.losses).toString().length === 2 ? ".00" : ""}
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </p>
                                        </div>
                                    :<></>
                                    }
                                </div>
                                {selectSzn === "All Time" && selectStats !== "Post Season" ?
                                    <div className="d-flex align-items-center justify-content-between py-3 fontHover" style={{borderBottom:"1px dashed #0f0f0f"}}>
                                        <p className="m-0">Best</p>
                                        <div className="d-flex align-items-center">
                                            <p className="m-0" style={{width:"70px"}}>{allTimeStats.best.record}</p>
                                            <p style={{width:"50px"}} className="m-0 d-flex align-items-center">
                                                {allTimeStats.best.rate}
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
                                                        <p className="m-0" style={{width:"70px"}}>{allTimeStats.allPlay.wins}-{allTimeStats.allPlay.losses}</p>
                                                        <p className="m-0 d-flex align-items-center" style={{width:"50px"}}>{winPCT(allTimeStats.allPlay.wins, allTimeStats.allPlay.losses)}   
                                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                                        </p>
                                                    </div>
                                                </div>
                                            : selectStats === "Season" ?
                                                <div className="d-flex align-items-center mt-3">
                                                    <p className="m-0" style={{width:"70px"}}>{allPlayStats.wins}-{allPlayStats.losses}</p>
                                                    <p className="m-0 d-flex align-items-center justify-content-end" style={{width:"50px"}}>{winPCT(allPlayStats.wins, allPlayStats.losses)}   
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
                                            {winPCT(allTimeStats.playoffs.wins, allTimeStats.playoffs.losses) || 0}
                                            <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                        </p>
                                    : selectStats === "Post Season" ?
                                        foundHistory(id, selectSzn).s.playoff === true ?
                                            <p className="d-flex align-items-center m-0">
                                                {winPCT(playoffStats.wins, playoffStats.losses)}
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
                                                <p className="m-0 text-end">{lineupEfficiency(allTimeStats.fpts, allTimeStats.ppts)}</p>
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
                                                    {roundToHundredth(winPCT(allTimeStats.wins, allTimeStats.losses)-winPCT(allTimeStats.allPlay.wins, allTimeStats.allPlay.losses))}
                                                </p>
                                                <Icon icon="material-symbols:percent" style={{color:"#a9dfd8", fontSize:"1em"}}/>
                                            </div>
                                        : selectStats==="Season"?   
                                            <div className="d-flex align-items-center">
                                                <p className="m-0">
                                                    {roundToHundredth(winPCT(foundRoster.settings.wins, foundRoster.settings.losses)-winPCT(allPlayStats.wins, allPlayStats.losses))}
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
                                        <p className="m-0" style={{color:"whitesmoke"}}>{allTimeStats.toiletBowls}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3" style={{borderBottom:"2px solid #2a2c3e"}}>
                                    <div className="">
                                        <p className="m-0">Playoff Appearances</p>
                                    </div>
                                    <div>
                                        <p className="d-flex align-items-center m-0" style={{color:"whitesmoke"}}>{allTimeStats.playoffs.appearances}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3 pb-3">
                                    <div className="">
                                        <p className="m-0">Finals</p>
                                    </div>
                                    <div>
                                        <p className="d-flex align-items-center m-0" style={{color:"whitesmoke"}}>{allTimeStats.playoffs.finals}</p>
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
                                    <p className="m-0">{totalPtsPerGame(allTimeStats.fpts, "All Time")}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{totalPtsPerGame(Number(foundRoster.settings.fpts + "." + foundRoster.settings.fpts_decimal), selectSzn)}</p>
                                : selectStats === "Post Season" && selectSzn === "All Time" ? 
                                    allTimeStats.playoffs.games > 0 ?
                                        <p className="m-0">{roundToHundredth(allTimeStats.playoffs.fpts / allTimeStats.playoffs.games)}</p>
                                    : 
                                        <p className="m-0">0</p>
                                : selectStats === "Post Season" ?
                                    foundHistory(id, selectSzn).s.playoff === true ?
                                        <p className="m-0">{roundToHundredth(playoffStats.fpts / playoffStats.games)}</p>
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
                                    <p className="m-0">{allTimeStats.best.score}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{foundHistory(id, selectSzn).regularSeason.highestScore}</p>
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{allTimeStats.playoffs.highestScore}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{playoffStats.highestScore}</p>
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
                                    <p className="m-0">{allTimeStats.fpts}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{foundRoster.settings.fpts}.{foundRoster.settings.fpts_decimal}</p>
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{allTimeStats.playoffs.fpts}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{playoffStats.fpts}</p>
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
                                        <p className="m-0">{allTimeStats.ppts}</p>
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
                                    <p className="m-0">{allTimeStats.pa}</p>
                                : selectStats === "Season" ?
                                    <p className="m-0">{foundRoster.settings.fpts_against}.{foundRoster.settings.fpts_against_decimal}</p>   
                                : selectStats === "Post Season" && selectSzn === "All Time" ?
                                    <p className="m-0">{allTimeStats.playoffs.pa}</p>
                                : selectStats === "Post Season" ?
                                    <p className="m-0">{playoffStats.pa || 0}</p>
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