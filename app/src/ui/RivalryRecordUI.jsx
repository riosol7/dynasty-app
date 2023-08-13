import React from "react";
import { Icon } from "@iconify/react";
import { winPCT } from "../utils";
import { findRosterByID } from "../helpers";

export default function RivalryRecordUI({
    foundHistory,
    handleAllPlay,
    handleVS,
    id,
    league,
    MouseOut,
    MouseOver,
    openModal,
    processedRosters,
    selectAllPlay,
    vs,
}) {   
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const dummyAvatar = "8fcf0e0e6a75e96a591d2a4a4a400f41";

    const recordRow = (team, vs) => (
        <div className="d-flex align-items-center">
            <div className="" style={{width:"40px"}}>
                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{team.rank}</p>
            </div>
            <div className="col d-flex align-items-center" style={{minWidth:"230px"}}>
                <div>
                    <img style={{width:"48px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(team.oID, processedRosters.totalRoster)?.owner?.avatar ? 
                        findRosterByID(team.oID, processedRosters.totalRoster).owner.avatar : dummyAvatar}`}
                    />
                </div>
                <div className="" style={{marginLeft:"14px"}}>
                    {findRosterByID(team.oID, processedRosters.totalRoster)?.owner?.team_name ?
                        <div className="">
                            <p className="m-0">{findRosterByID(team.oID, processedRosters.totalRoster).owner.display_name}</p>
                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findRosterByID(team.oID, processedRosters.totalRoster).owner.team_name}</p>
                        </div>
                    : <p className="m-0">{findRosterByID(team.oID, processedRosters.totalRoster).owner.display_name}</p>
                    }
                </div>
            </div>
            <div className="" style={{minWidth:"50px"}}>
                <p className="m-0">{team.w}</p>
            </div>
            <div className="" style={{minWidth:"50px"}}>
                <p className="m-0">{team.oW}</p>
            </div>
            <div className="" style={{minWidth:"50px"}}>
                <p className="m-0">{winPCT(team.w, team.oW)}</p>
            </div>
            {vs === "Head" ?
                <div className="d-flex align-items-center justify-content-between" style={{minWidth:"50px"}}>
                    <p className="m-0">{team.w + team.oW}</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <Icon onClick={() => openModal("Matchup", team.oID)}onMouseOver={MouseOver} onMouseOut={MouseOut} icon="ic:outline-more-vert" style={{fontSize:"1.5em",background:"none", color:"#7f7f7f"}}/>
                    </div>
                </div>
            :<></>
            }
        </div>
    )

    return (
        <div className="py-4" style={{minWidth:"388px"}}>
            <div className="d-flex align-items-top justify-content-between pb-3">
                <select className="bold" value={vs} onChange={handleVS} style={{color:"lightgrey", background:"inherit", border:"none" }}>
                    <option value={"Head"}>Head to Head</option>
                    <option value={"All"}>All Play</option>
                </select>
                {vs === "All" ? 
                    <select value={selectAllPlay} onChange={handleAllPlay} style={{color:"lightgrey", background:"inherit", border:"none" }}>
                        <option value={"All Time"}>All Time</option>
                        <option value={league.season}>{league.season}</option>
                        {league.history.map((l,i) => 
                            <option key={i} value={l.year}>{l.year}</option>
                        )}
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
                {vs === "All"?
                    <></>
                :
                    <div className="" style={{minWidth:"50px"}}>
                        <p className="m-0">GP</p>
                    </div>
                }
            </div>
            <div>
                {vs === "Head" ?
                    foundHistory(id).h2h.map((t, k) => 
                        <div key={k} className="py-3" style={k === foundHistory(id).h2h.length - 1 ? {} : {borderBottom:"1px solid #2a2c3e"}}>
                            {recordRow(t, vs)}
                        </div>
                    )
                : vs === "All" && selectAllPlay === "All Time" ?
                    foundHistory(id).allTime.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx + 1})).map((o,q) => 
                        <div key={q} className="py-3" style={q === foundHistory(id).allTime.allPlay.length - 1 ? {} : {borderBottom:"1px solid #2a2c3e"}}>
                            {recordRow(o, vs)}
                        </div>
                    )                     
                : vs === "All" ?
                    foundHistory(id, selectAllPlay).s.allPlay.sort((a,b) =>  b.w - a.w).map((roster, idx) => ({...roster, rank:idx + 1})).map((o,q) => 
                        <div key={q} className="py-3" style={q === foundHistory(id, selectAllPlay).s.allPlay.length - 1 ? {} : {borderBottom:"1px solid #2a2c3e"}}>
                            {recordRow(o, vs)}
                        </div>
                    )
                :<></>
                }
            </div>
        </div>
    )
}