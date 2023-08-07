import React from 'react'
import { Icon } from '@iconify/react';

export default function DraftWidget({
    findPlayer,
    findLogo,
    league,
    openModal,
    players,
    topDraftPick,
}) {
    const firstDraftPick = findPlayer(topDraftPick.player_id, players);
  
    function MouseOver(event) {
        event.target.style.color="#a9dfd8";
    }
    function MouseOut(event){
        event.target.style.color="#7f7f7f";
    }
    const playerBaseURL = process.env.REACT_APP_SLEEPER_PLAYER_THUMBS_BASE_URL || "https://sleepercdn.com/content/nfl/players/thumb/";

    return (
        <div className=""style={{fontSize:"14px", width:"420px",height:"166px"}}>
            {
                league.draft && topDraftPick? 
                    <div className="" style={{background:"linear-gradient(49deg, rgba(15,15,15,1) 0%, rgba(17,17,17,1) 100%)", color:"white"}}>
                        <div className="d-flex justify-content-between">
                            <div className="pt-3" style={{paddingLeft:"1.5em"}}>
                                <div style={{}}>
                                    <p className="m-0"style={{fontSize:"1.3em"}}>{firstDraftPick.first_name}</p>
                                    <p className="m-0 bold" style={{fontSize:"1.7em"}}>{firstDraftPick.last_name}</p>
                                </div>
                                <div className="d-flex align-items-center pt-2" style={{}}> 
                                    <div>
                                        <p className="m-0 text-center bold py-1" style={{
                                            width:"85px",
                                            color:findLogo(firstDraftPick.team).color,
                                            background:findLogo(firstDraftPick.team).bgColor2
                                        }}>#{firstDraftPick.number} {firstDraftPick.position}</p>
                                        <div className="d-flex align-items-center mt-2">
                                            <p className="m-0"style={{}}>round {topDraftPick.round}</p>
                                            <p className="m-0"style={{paddingLeft:"1em"}}>pick {topDraftPick.pick_no}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="" style={{
                                backgroundImage:`url(${findLogo(firstDraftPick.team).l})`,
                                backgroundPosition:"left",
                                backgroundSize:"100%",
                                backgroundRepeat:"no-repeat",
                            }}>
                                <img src={`${playerBaseURL}${firstDraftPick.player_id}.jpg`} alt="player" 
                                    style={{maxWidth:"232.57px",height:"166px",objectFit:"cover", objectPosition:"center"}}
                                />
                            </div>
                            <div className="pt-2"onClick={() => openModal("Draft")}>
                                <Icon onMouseOver={MouseOver} onMouseOut={MouseOut} icon="ic:outline-more-vert" style={{fontSize:"2em",background:"none",color:"#7f7f7f"}}/>
                            </div>
                        </div>
                    </div>
                :<></>
            }  
            {/* <div className="py-3" style={{border:"2px solid red"}}>
                <div className="d-flex justify-content-between">
                    <div>   
                        <p className="m-0">Showcase Most Recent Top Pick</p>
                    </div>
                    <div className="">
                        <p className="m-0">Showcase Top Scorer</p>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <div>   
                        <p className="m-0">Awards / medals / championships / toilet bowls</p>
                    </div>
                    <div>
                        <p className="m-0"></p>
                    </div>
                </div> 
            </div> */}

            
        </div>
    )
}
