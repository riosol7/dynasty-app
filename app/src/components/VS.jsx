import React from 'react'
import { Icon } from '@iconify/react';

export default function VS({
    findRosterByID,
    foundHistory,
    handleAllPlay,
    handleVS,
    id,
    league,
    openModal,
    processedRosters,
    selectAllPlay,
    vs,
    winPCT,
}) {   
    function MouseOver(event) {
        event.target.style.color="#a9dfd8";
    }
    function MouseOut(event){
        event.target.style.color="#7f7f7f";
    }
    return (
        <div className="col" style={{minWidth:"388px",background:"black"}}>
            <div className="d-flex align-items-top justify-content-between pb-3">
                <select className="bold" value={vs} onChange={handleVS} style={{color:"lightgrey", background:"inherit", border:"none" }}>
                    <option value={"Head"}>Head to Head</option>
                    <option value={"All"}>All Play</option>
                </select>
                {
                    vs === "All" ? 
                        <select value={selectAllPlay} onChange={handleAllPlay} style={{color:"lightgrey", background:"inherit", border:"none" }}>
                            <option value={"All Time"}>All Time</option>
                            <option value={league.season}>{league.season}</option>
                            {
                                league.history.map((l,i) => 
                                    <option key={i} value={l.year}>{l.year}</option>
                                )
                            }
                        </select>
                    :<></>
                }
            </div>
            <div className="d-flex align-items-center py-2" style={{borderBottom:"0px solid #2a2c3e", color:"#7d91a6", fontSize:"12.85px"}}>
                <div className="" style={{width:"40px"}}>
                    <p className="m-0">#</p>
                </div>
                <div className="col" style={{minWidth:"230px"}}>
                    <p className="m-0">Opponent</p>
                </div>
                <div className="" style={{minWidth:"50px"}}>
                    <p className="m-0">W</p>
                </div>
                <div className="" style={{minWidth:"50px"}}>
                    <p className="m-0">L</p>
                </div>
                <div className="" style={{minWidth:"50px"}}>
                    <p className="m-0">PCT</p>
                </div>
                {
                    vs === "All"?
                    <></>
                    :
                        <div className="" style={{minWidth:"50px"}}>
                            <p className="m-0">GP</p>
                        </div>
                }
            </div>
            <div>
                <div>
                    {
                        vs === "Head" ?
                            foundHistory(id).h2h.map((t, k) => 
                                <div key={k} className="py-3" style={k === foundHistory(id).h2h.length - 1 ?{}:{borderBottom:"1px solid #2a2c3e"}}>
                                    <div className="d-flex align-items-center">
                                        <div className="" style={{width:"40px"}}>
                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{t.rank}</p>
                                        </div>
                                        <div className="col" style={{minWidth:"230px"}}>
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                        findRosterByID(t.oID, processedRosters.totalRoster).owner ? 
                                                            findRosterByID(t.oID, processedRosters.totalRoster).owner.avatar 
                                                        : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                                </div>
                                                <div className="" style={{marginLeft:"14px"}}>
                                                    {
                                                        findRosterByID(t.oID, processedRosters.totalRoster).owner ?
                                                        findRosterByID(t.oID, processedRosters.totalRoster).owner.team_name ?
                                                            <div className="">
                                                                <p className="m-0">{findRosterByID(t.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                                <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(t.oID, processedRosters.totalRoster).owner.team_name}</p>
                                                            </div>
                                                        :<p className="m-0">{findRosterByID(t.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                        :<></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="" style={{minWidth:"50px"}}>
                                            <p className="m-0">{t.w}</p>
                                        </div>
                                        <div className="" style={{minWidth:"50px"}}>
                                            <p className="m-0">{t.oW}</p>
                                        </div>
                                        <div className="" style={{minWidth:"50px"}}>
                                            <p className="m-0">{winPCT(t.w , t.oW)}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between" style={{minWidth:"50px"}}>
                                            <p className="m-0">{t.w + t.oW}</p>
                                            <div className="d-flex justify-content-center align-items-center" style={{}}>
                                                <Icon onClick={() => openModal("Matchup", t.oID)}onMouseOver={MouseOver} onMouseOut={MouseOut} icon="ic:outline-more-vert" style={{fontSize:"1.5em",background:"none", color:"#7f7f7f"}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        : vs === "All" && selectAllPlay === "All Time" ?
                            foundHistory(id).allTime.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx+1})).map((o,q) => 
                                <div key={q} className="py-3" style={q === foundHistory(id).allTime.allPlay.length -1 ?{}:{borderBottom:"1px solid #2a2c3e"}}>
                                    <div className="d-flex align-items-center">
                                        <div className="" style={{width:"40px"}}>
                                            <p className="m-0">{o.rank}</p>
                                        </div>
                                        <div className="col d-flex align-items-center" style={{minWidth:"230px"}}>
                                            <div>
                                                <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                    findRosterByID(o.oID, processedRosters.totalRoster)?.owner?.avatar ? findRosterByID(o.oID, processedRosters.totalRoster).owner.avatar 
                                                    : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                            </div>
                                            <div className="" style={{marginLeft:"14px"}}>
                                                {
                                                    findRosterByID(o.oID, processedRosters.totalRoster).owner ?
                                                    findRosterByID(o.oID, processedRosters.totalRoster).owner.team_name ?
                                                        <>
                                                            <p className="m-0">{findRosterByID(o.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(o.oID, processedRosters.totalRoster).owner.team_name}</p>
                                                        </>
                                                    :<p className="m-0">{findRosterByID(o.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                        <div className="" style={{width:"50px"}}>
                                            <p className="m-0">{o.w}</p>
                                        </div>
                                        <div className="" style={{width:"50px"}}>
                                            <p className="m-0">{o.oW}</p>
                                        </div>
                                        <div className="" style={{width:"50px"}}>
                                            <p className="m-0">{winPCT(o.w , o.oW)}</p>
                                        </div>
                                    </div>
                                </div>
                            )                     
                        : vs === "All" && selectAllPlay === league.season ?
                            foundHistory(id).c.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx+1})).map((o,q) => 
                                <div key={q} className="py-3" style={q ===  foundHistory(id).c.allPlay.length -1?{}:{borderBottom:"1px solid #2a2c3e"}}>
                                    <div className="d-flex align-items-center">
                                        <div className="" style={{width:"40px"}}>
                                            <p className="m-0">{o.rank}</p>
                                        </div>
                                        <div className="col d-flex align-items-center" style={{minWidth:"230px"}}>
                                            <div>
                                                <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                    findRosterByID(o.oID, processedRosters.totalRoster).owner ? findRosterByID(o.oID, processedRosters.totalRoster).owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                            </div>
                                            <div className="" style={{marginLeft:"14px"}}>
                                                {
                                                    findRosterByID(o.oID, processedRosters.totalRoster).owner ?
                                                    findRosterByID(o.oID, processedRosters.totalRoster).owner.team_name ?
                                                        <>
                                                            <p className="m-0">{findRosterByID(o.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(o.oID, processedRosters.totalRoster).owner.team_name}</p>
                                                        </>
                                                    :<p className="m-0">{findRosterByID(o.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                        <div className="" style={{width:"50px"}}>
                                            <p className="m-0">{o.w}</p>
                                        </div>
                                        <div className="" style={{width:"50px"}}>
                                            <p className="m-0">{o.oW}</p>
                                        </div>
                                        <div className="" style={{width:"50px"}}>
                                            <p className="m-0">{winPCT(o.w , o.oW)}</p>
                                        </div>
                                    </div>
                                </div>
                            )  
                        : foundHistory(id, selectAllPlay).s.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx+1})).map((o,q) => 
                            <div key={q} className="py-3" style={q === foundHistory(id, selectAllPlay).s.allPlay.length -1?{}:{borderBottom:"1px solid #2a2c3e"}}>
                                <div className="d-flex align-items-center">
                                    <div className="" style={{width:"40px"}}>
                                        <p className="m-0">{o.rank}</p>
                                    </div>
                                    <div className="col d-flex align-items-center" style={{minWidth:"230px"}}>
                                        <div>
                                            <img style={{width:"48px", borderRadius:"0%"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                findRosterByID(o.oID, processedRosters.totalRoster).owner ? findRosterByID(o.oID, processedRosters.totalRoster).owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="" style={{marginLeft:"14px"}}>
                                            {
                                                findRosterByID(o.oID, processedRosters.totalRoster).owner ?
                                                findRosterByID(o.oID, processedRosters.totalRoster).owner.team_name ?
                                                    <>
                                                        <p className="m-0">{findRosterByID(o.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(o.oID, processedRosters.totalRoster).owner.team_name}</p>
                                                    </>
                                                :<p className="m-0">{findRosterByID(o.oID, processedRosters.totalRoster).owner.display_name}</p>
                                                :<></>
                                            }
                                        </div>
                                    </div>
                                    <div className="" style={{width:"50px"}}>
                                        <p className="m-0">{o.w}</p>
                                    </div>
                                    <div className="" style={{width:"50px"}}>
                                        <p className="m-0">{o.oW}</p>
                                    </div>
                                    <div className="" style={{width:"50px"}}>
                                        <p className="m-0">{winPCT(o.w , o.oW)}</p>
                                    </div>
                                </div>
                            </div>
                        )  
                    }
                </div>
            </div>
        </div>
    )
}
