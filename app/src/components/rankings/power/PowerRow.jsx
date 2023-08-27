import React from "react";
import { roundToHundredth } from "../../../utils";

export default function PowerRow({r, winPCT}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL;
    const dummyAvatar = process.env.REACT_APP_DUMMY_AVATAR;
    return (
        <div className="team py-3" style={{fontSize:"14px"}}>
            <a href={`/Owner/${r.roster_id}`} className="cellLink">
                <div className="col-sm-7 d-flex align-items-center">
                    <div className="col-sm-1">
                        <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{r.rank}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="">
                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${r.owner ? r.owner.avatar : dummyAvatar}`}/>
                        </div>
                        <div className="mx-1">
                            {r.owner?.team_name ?
                                <p className="m-0 mx-1">{r.owner.team_name}<span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{r.owner.display_name}</span></p>
                            : <p className="m-0 mx-1">{r.owner.display_name}</p>
                            }
                            <div className="pb-2 mx-1">
                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {r.apR || 0}%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5 d-flex align-items-center justify-content-end">
                    <p className="col-sm-1 m-0">{r.apW}</p>  
                    <p className="col-sm-1 m-0">{r.apL}</p>  
                    <p className="col-sm-1 m-0">{roundToHundredth(winPCT(r.settings.wins,r.settings.losses)-r.apR) || 0}</p>  
                </div>
            </a>
        </div>
    )
}