import React from 'react';
import { Icon } from '@iconify/react';

export default function LeagueWidget(props) {
    const loadLeague = props.loadLeague
    const league = props.league
    const activityBar=props.activityBar
    const setActivityBar=props.setActivityBar
    return (
        <>
        {
            loadLeague ? <p>Loading </p> :
            <>
                <div className="d-flex align-items-top justify-content-between">
                    <div className="d-flex align-items-center flex-wrap">
                        <a href={`/Home`} className="cellLink" style={{width:"270px"}}>
                            <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-center" style={{marginRight:"1em"}}>
                                    <img className="leagueLogo rounded" style={{width:"36px"}} alt="avatar" src={
                                        `https://sleepercdn.com/avatars/thumbs/${
                                            league.avatar
                                    }`}/> 
                                </div>
                                <p className="bold m-0" style={{fontSize:"1.2rem"}}>{league.name}</p>
                                {/* <p className="m-0 mx-2 bold" style={{color:"#b0b0b2"}}>{league.season} {league.status === "pre_draft" ? "Pre-Draft" : ""}</p> */}
                            </div>
                        </a>
                        <div className="d-flex align-items-center" style={{fontSize:"12.5px", color:"grey",marginLeft:"4.2em"}}>
                            <div style={{}}>
                                {
                                    league.status==="pre_draft"?
                                        <p className="m-0">Pre Draft <span style={{color:"whitesmoke", marginLeft:"2px"}}>{league.season}</span></p>
                                    : league.status==="complete"? 
                                        <p className="m-0">Post Season <span style={{color:"whitesmoke", marginLeft:"2px"}}>{league.season}</span></p>
                                    : <></>
                                }
                            </div>
                            {
                                league && league.settings ?
                                    <div className="d-flex align-items-center">
                                        <p className="m-0 mx-4">Division <span style={{color:"whitesmoke", marginLeft:"2px"}}>{league.settings.divisions}</span></p>
                                        <p className="m-0">Roster <span style={{color:"whitesmoke", marginLeft:"2px"}}>{league.total_rosters}</span></p>
                                    </div>
                                :<></>
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center p-2" style={{background:"#0f0f0f", borderRadius:"25%",width:"42px",height:"42px"}}>
                        <Icon icon="ion:search-outline" className="" style={{fontSize:"18px"}}/>
                    </div>
                    <div id="LA" className="p-2">
                        <Icon onClick={() => setActivityBar(!activityBar)} icon="fe:activity" style={{color:"#a9dfd8",fontSize:"1.5em"}}/>
                    </div>
                </div>
                
            </>
        }
        </>
    )
}
