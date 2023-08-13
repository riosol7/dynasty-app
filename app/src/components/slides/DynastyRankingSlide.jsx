import React from "react";
import { Icon } from "@iconify/react";
import { roundToHundredth } from "../../utils";

export default function DynastyRankingSlide({
    r,
    roster,
}) {
    return (
        <div className="py-4" style={{border:"",background:""}}>
            <a href={`/Owner/${r.kct.owner.roster_id}`} className="cellLink">
                <div className="d-flex align-items-center">
                    {
                        r.kct && r.kct.owner ?
                            <div className="d-flex align-items-center">
                                <div className="" style={{marginRight:".7em"}}>
                                    <img className="ownerLogo" alt="" style={{width:"45px"}} src={`https://sleepercdn.com/avatars/thumbs/${
                                        r.kct.owner.avatar ? r.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        <div className="d-flex justify-content-center align-items-center" 
                                            style={{position:"relative", left:30,bottom:15, background:"black", borderRadius:"50%", width:"20px"}}>
                                            <p className="m-0 bold" style={roster.owner_id.display_name === r.kct.owner.display_name?
                                                {color:"#a9dfd8"}:{color:"#acb6c3"}}>{r.rank}
                                            </p>
                                        </div>
                                </div>
                                <div style={roster.owner_id.display_name === r.kct.owner.display_name?{}:{color:"lightgrey"}}>
                                    {
                                        roster.owner_id.display_name === r.kct.owner.display_name?
                                            <p className="m-0 bold">{r.kct.owner.display_name}</p>
                                        :
                                            <p className="m-0">{r.kct.owner.display_name}</p>
                                    }
                                    <div className="d-flex align-items-center mt-1">
                                        <div className="d-flex align-items-center">
                                            {
                                                roster.owner_id.display_name === r.kct.owner.display_name?
                                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                :
                                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#698b87", marginRight:"4px"}}/>
                                            }
                                            <p className="m-0">{r.kct.teamTotal}</p>
                                        </div>
                                        <div className="d-flex align-items-center" style={{marginLeft:"1.5em"}}>
                                            {
                                                roster.owner_id.display_name === r.kct.owner.display_name?
                                                    <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                                :
                                                    <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#698b87", marginRight:"4px"}}/>
                                            }
                                            <p className="m-0 d-flex align-items-center">
                                                { roundToHundredth(roundToHundredth((r.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.qb.players.length) +
                                                roundToHundredth(r.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.rb.players.length) +
                                                roundToHundredth(r.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.wr.players.length) +
                                                roundToHundredth(r.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ r.kct.te.players.length))/4
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :<></>
                    }
                </div>
            </a>
        </div>
    )
}