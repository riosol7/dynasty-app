import React from "react";
import { Icon } from "@iconify/react";
import { roundToHundredth } from "../utils";
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
                <div>
                    <div className="mt-2">
                        <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                            <div className="d-flex align-items-center" style={{width:"100%"}}> 
                                <div className="" style={{minWidth:"60px"}}>
                                    {
                                        sort === "RANK" ?
                                            asc === false ?
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                                                    <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                                </div>
                                            :
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                                                    <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                                </div>  
                                        :
                                            <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>

                                    }
                                </div>
                                <div style={{minWidth:"260px", width:"100%"}}>
                                    <p className="m-0 StandingCell" style={{maxWidth:"40px"}}>TEAM</p>
                                </div>
                                <p className="m-0 StandingCell" style={{minWidth:"60px"}}>W</p>
                                <p className="m-0 StandingCell" style={{minWidth:"60px"}}>L</p>
                                <p className="m-0 StandingCell" style={{minWidth:"60px"}}> 
                                    <Icon icon="emojione-monotone:four-leaf-clover"style={{fontSize:"13.2px", color:"#289a5d"}}/> Rate
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    pwrRank && pwrRank.map((roster, idx) => ({...roster, rank:idx+1})).map((r,i) => 
                        <div key={i} className="team py-3" style={{fontSize:"14px"}}>
                            <a href={`/Owner/${r.roster_id}`} className="cellLink" style={{}}>
                                <div className="d-flex align-items-center" style={{width:"100%"}}>
                                    <div style={{minWidth:"60px"}}>
                                        <p className="m-0 mx-1 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{r.rank}</p>
                                    </div>
                                    <div className="d-flex align-items-center" style={{minWidth:"260px", width:"100%"}}>
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                r.owner ? r.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="mx-1">
                                            {  
                                                r.owner ? 
                                                r.owner.team_name ?
                                                    <p className="m-0 mx-1">{r.owner.team_name} 
                                                    <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{r.owner.display_name}</span>
                                                    </p>
                                                :
                                                    <p className="m-0 mx-1">{r.owner.display_name}</p>
                                                :<></>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {r.apR || 0}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{minWidth:"60px"}}>
                                        <p className="m-0">{r.apW}</p>  
                                    </div>
                                    <div style={{minWidth:"60px"}}>
                                        <p className="m-0">{r.apL}</p>  
                                    </div>
                                    <div style={{minWidth:"60px"}}>
                                        <p className="m-0">{roundToHundredth(winPCT(r.settings.wins,r.settings.losses)-r.apR) || 0}</p>  
                                    </div> 
                                </div>
                            </a>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
