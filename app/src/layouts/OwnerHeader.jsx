import React from "react";
import { Icon } from "@iconify/react";
import DraftWidget from '../components/DraftWidget';

export default function OwnerHeader({
    league,
    openModal,
    players,
    roster,
    topDraftPick,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";

    return (
        <div className="d-flex align-items-center justify-content-between flex-wrap my-4">
            <div className="d-flex align-items-center">
                <div>
                    <img src={`${avatarBaseURL}${roster.owner.avatar}`} style={{borderRadius:"50%", border:"4px outset #a9dfd8", padding:"4px", background:"black"}} alt="profile"/>
                </div>
                <div className="mx-3">
                    <div className="d-flex align-items-center">
                        <p className="m-0 bold" style={{fontSize:"18px"}}>{roster.owner.team_name ? roster.owner.team_name : roster.owner.display_name}</p>
                        <p style={{color:"#cbcbcb", fontWeight:"lighter", paddingLeft:"6px"}} className="m-0">@{roster.owner.display_name}</p>         
                    </div>
                    <p className="m-0 d-flex align-items-center" style={{fontSize:"14.5px"}}>
                        {roster.settings.wins}
                        <span style={{color:"whitesmoke"}}>-</span>  
                        {roster.settings.losses}
                        <Icon icon="ic:round-circle" className="mx-2" style={{fontSize:".35em", color:"#698b87"}}/>
                        <span className=""style={{color:"whitesmoke"}}>{roster.rank}</span>
                        <span style={{}}>{
                            roster.rank === 1?
                                "st"
                            : roster.rank === 2?
                                "nd"
                            : roster.rank === 3?
                                "rd"
                            : "th"
                        } </span>
                    </p>
                    <p className="m-0 bold" style={{fontSize:"11.5px",color:"#7d91a6"}}>EXP {roster.owner.exp}</p>
                </div>
            </div>
            <DraftWidget
                league={league}
                topDraftPick={topDraftPick}
                openModal={openModal}
                players={players}
            />
        </div>
    )
}