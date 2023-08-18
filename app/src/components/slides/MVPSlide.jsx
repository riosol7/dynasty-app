import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import LoadMVP from "../loading/LoadMVP";
import value from "../../assets/images/value.png";
import { findLogo, getTotalPts } from "../../utils";

export default function MVPSlide ({
    getMVP,
    league,
    matches,
    roster,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const playerBaseURL = process.env.REACT_APP_SLEEPER_PLAYER_THUMBS_BASE_URL || "https://sleepercdn.com/content/nfl/players/thumb/";

    const [mvp, setMVP] = useState(null);
    const [loadMVP, setLoadMVP] = useState(true)

    useEffect(() => {
        async function fetchMVP() {
            try {
                const mvpPlayer = await getMVP(roster.roster_id);
                setMVP(mvpPlayer);
                setLoadMVP(false);
            } catch (error) {
                console.error("Error fetching MVP:", error);
            }
        }
        fetchMVP();
    }, [getMVP, mvp, roster.roster_id]);

    const logo = findLogo(mvp?.team);
    const position = mvp?.position?.match(/^[A-Z]+/)[0];

    return ( loadMVP ? <LoadMVP/> :
        <div style={{border:"none", borderRadius:"4px", background:logo.bgColor}}>
            <div className="d-flex" style={{
                backgroundImage: `url(${logo.l}`,
                backgroundRepeat:"no-repeat",
                backgroundPosition:"bottom left",
                backgroundSize:"150px",
            }}>
                <div className="px-1">
                    <div style={{
                        backgroundImage: `url(${playerBaseURL}${mvp.player_id}.jpg)`,
                        backgroundRepeat:"no-repeat",
                        backgroundPosition:"bottom",
                        backgroundSize:"cover",
                        minHeight:"145px",
                        minWidth:"175px"
                    }}>
                    </div> 
                </div>
                <div className="col">
                    <div className="d-flex justify-content-between">
                        <div className="mt-2">
                            <p className="m-0">{mvp.first_name}</p>
                            <p className="m-0 bold" style={{fontSize:"1.3em"}}>{mvp.last_name}</p>
                        </div>
                        <div className="p-2">
                            <img className="ownerLogo" alt="avatar" src={`${avatarBaseURL}${roster.kct.owner.avatar}`}/>
                        </div> 
                    </div>
                    <div className="my-1 d-flex align-items-center">
                        <div className={
                            position === "QB" ? "qbHUD" :
                            position === "RB" ? "rbHUD" :
                            position === "WR" ? "wrHUD" :
                            position === "TE" ? "teHUD" : ""
                        }>
                            <p className="m-0 d-flex align-items-center" style={{fontSize:"12px", paddingInline:"6px"}}>
                                {mvp.position} 
                                <span style={{color:"whitesmoke", fontWeight:"normal", paddingLeft:"12px"}}>
                                    {getTotalPts(league, matches, roster.kct.owner.roster_id, mvp.player_id).pts}
                                    <span style={{color:"lightgray"}}> pts</span>
                                </span>
                            </p> 
                        </div>
                    </div>
                    <div className="d-flex align-items-center mx-2" style={{marginTop:".8em"}}>
                        <div className="d-flex align-items-center" style={{width:"60px"}}>
                            <Icon icon="fa6-solid:ranking-star" style={{fontSize:"22px", color:"#a9dfd8"}}/>
                            <p className="m-0" style={{fontSize:"12px", paddingLeft:"4px"}}>{mvp.rank}</p> 
                        </div>
                        <div className="d-flex align-items-center" style={{}}>
                            <img src={value} alt="value" style={{width:"25px",}}/>
                            <p className="m-0" style={{fontSize:"12px", paddingLeft:"6px"}}>{mvp.rating}</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}