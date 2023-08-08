import React from "react";
import { Icon } from "@iconify/react";
import DraftWidget from '../components/DraftWidget';

export default function OwnerHeader({
    findLogo,
    findPlayer,
    league,
    openModal,
    owner,
    players,
    topDraftPick
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";

    return (
        <div className="d-flex align-items-center justify-content-between flex-wrap my-4">
            <div className="d-flex align-items-center">
                <div>
                    <img src={`${avatarBaseURL}${owner.owner.avatar}`} style={{borderRadius:"50%", border:"4px outset #a9dfd8", padding:"4px", background:"black"}} alt="profile"/>
                </div>
                <div className="mx-3">
                    <div className="d-flex align-items-center">
                        <p className="m-0 bold" style={{fontSize:"18px"}}>
                            {
                                owner.owner.team_name ?
                                    owner.owner.team_name
                                :
                                    owner.owner.display_name
                            }
                        </p>
                        <div>
                            <p style={{color:"#cbcbcb", fontWeight:"lighter", paddingLeft:"6px"}} className="m-0">@{owner.owner.display_name}</p>         
                        </div>
                    </div>
                    <div className="d-flex align-items-center">

                    </div>

                    <p className="m-0 d-flex align-items-center" style={{fontSize:"14.5px"}}>
                        {owner.settings.wins}
                        <span className="" style={{color:"whitesmoke"}}>-</span>  
                        {owner.settings.losses}
                        <Icon icon="ic:round-circle" className="mx-2" style={{fontSize:".35em", color:"#698b87"}}/>
                        <span className=""style={{color:"whitesmoke"}}>{owner.rank}</span>
                        <span style={{}}>{
                            owner.rank === 1?
                                "st"
                            : owner.rank === 2?
                                "nd"
                            : owner.rank === 3?
                                "rd"
                            : "th"
                        } </span>
                    </p>
                    <p className="m-0 bold" style={{fontSize:"11.5px",color:"#7d91a6"}}>
                        <span className="">EXP</span> {owner.owner.exp}
                    </p>
                </div>
            </div>
            <div className="">
                <DraftWidget
                    league={league}
                    topDraftPick={topDraftPick}
                    findPlayer={findPlayer}
                    findLogo={findLogo}
                    openModal={openModal}
                    players={players}
                />
            </div>
        </div>
    )
}