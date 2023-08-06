import React from 'react'
import { Icon } from '@iconify/react';

export default function StandingRow({
    division,
    owner,
    selectSzn,
    winPCT,
}) { 
    // const league=props.league
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const dummyAvatar = "8fcf0e0e6a75e96a591d2a4a4a400f41";
    return (
        selectSzn==="All Time"?
            <div className="team d-flex py-3 align-items-center" style={{fontSize:"14px"}}>
                <a href={`/Owner/${owner.roster_id}`} className="cellLink">
                    <div className="col-sm-7 text-truncate">
                        <div className="d-flex align-items-center">
                            <div className="col-sm-1">
                                <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{owner.rank}</p>
                            </div>
                            <div className="">
                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${owner.avatar}`}/>
                            </div>
                            <div className="mx-1">
                                { 
                                    owner.team_name ?
                                        <p className="m-0 mx-1">{owner.team_name} 
                                            <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{owner.display_name}</span>
                                        </p>
                                    :
                                        <p className="m-0 mx-1">{owner.display_name}</p>
                                }
                                <div className="pb-2 mx-1">
                                    <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {owner.percentage}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 text-truncate">
                        <p className="m-0">{owner.record}</p>
                    </div>
                    <div className="col-sm-1">
                        <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.fpts}</p>
                    </div>
                    <div className="col-sm-1">
                        <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.ppts}</p>
                    </div>
                    <div className="col-sm-1">
                        <p className="m-0" style={{fontSize:"12px", color:"white"}}>{owner.fpts_against}</p>
                    </div>
                </a>
            </div>
        :
            <div className="team d-flex py-3 align-items-center">
                <a href={`/Owner/${division.roster_id}`} className="cellLink">
                    <div className="col-sm-7 text-truncate">
                        <div className="d-flex align-items-center">
                            <div className="col-sm-1">
                                <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{division.rank}</p>
                            </div>
                            <div className="">
                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${division?.owner?.avatar? division.owner.avatar : dummyAvatar}`}/>
                            </div>
                            <div className="mx-1">
                                {  
                                    division?.owner?.team_name ?
                                        <p className="m-0 mx-1">{division.owner.team_name} 
                                            <span className="m-0 mx-1" style={{fontSize:"10px", color:"#cbcbcb"}}>{division.owner.display_name}</span>
                                        </p>
                                    :
                                        <p className="m-0 mx-1">{division.owner.display_name}</p>
                                }
                                <div className="pb-2 mx-1">
                                    <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>WIN {winPCT(division.settings.wins, division.settings.losses) || 0}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2 text-truncate">
                        <p className="m-0">{division.settings.wins}-{division.settings.losses}-{division.settings.ties}
                            {  
                                division?.metadata?.streak ?                                        
                                    division.metadata.streak.includes("W") === true ?
                                        <span className="mx-1" style={{fontSize:".6rem"}}>
                                            <Icon icon="bi:caret-up-fill" style={{color:"#368727", fontSize:".7rem"}}/>{division.metadata.streak}
                                        </span>
                                    :
                                        <span className="mx-1" style={{fontSize:".6rem"}}>
                                            <Icon icon="bi:caret-down-fill" style={{color:"#cc1d00", fontSize:".7rem"}}/>{division.metadata.streak}
                                        </span>
                                : <></>
                            } 
                        </p>
                    </div>
                    <div className="col-sm-1">
                        <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts}.{division.settings.fpts_decimal}</p>
                    </div>
                    <div className="col-sm-1">
                        <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.ppts}.{division.settings.ppts_decimal}</p>
                    </div>
                    <div className="col-sm-1">
                        <p className="m-0" style={{fontSize:"12px", color:"white"}}>{division.settings.fpts_against}.{division.settings.fpts_against_decimal}</p>
                    </div>
                </a>
            </div>
    )
}
