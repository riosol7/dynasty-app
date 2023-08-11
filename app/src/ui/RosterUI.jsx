import React from "react";
import { Icon } from "@iconify/react";

export default function RosterUI({
    findLogo,
    findPlayer,
    getTopQB,
    getTopRB,
    getTopTE,
    getTopWR,
    getTotalPts,
    isOdd,
    owner,
    players,
    qbArrow,
    qbRankings,
    rbArrow,
    rbRankings,
    rosters,
    roundToHundredth,
    showMoreQBs,
    showQBs,
    showMoreRBs,
    showRBs,
    showMoreTEs,
    showTEs,
    showMoreWRs,
    showWRs,
    tab,
    teArrow,
    teRankings,
    wrArrow,
    wrRankings
}) {
    // const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const playerBaseURL = process.env.REACT_APP_SLEEPER_PLAYER_THUMBS_BASE_URL || "https://sleepercdn.com/content/nfl/players/thumb/";
    return (
        <div className="py-4" style={{minWidth:"388px"}}>
            <div className="d-flex align-items-center justify-content-between pb-3" style={{borderBottom:"3px solid #2a2c3e"}}>
                <div className="d-flex align-items-center bold" style={{color:"lightgrey"}}>
                    <Icon icon="game-icons:american-football-player"style={{color:"#a9dfd8",fontSize:"24px", marginRight:"4px"}}/>
                    <div className="d-flex align-items-center">
                        <p className="m-0">{owner.kct.qb.players.length + owner.kct.rb.players.length + owner.kct.wr.players.length + owner.kct.te.players.length} </p>
                        <p className="m-0 mx-1">Players</p>
                    </div>
                </div>
                <div className="d-flex align-items-center" style={{fontFamily:"Arial",fontSize:"14.5px",}}>
                    <div className=" d-flex align-items-center" style={{minWidth:"85px"}}>
                        <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8",marginRight:"4px"}}/>
                        <p className="m-0 d-flex align-items-center">
                            { roundToHundredth(roundToHundredth((owner.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.qb.players.length) +
                            roundToHundredth(owner.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.rb.players.length) +
                            roundToHundredth(owner.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.wr.players.length) +
                            roundToHundredth(owner.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.te.players.length))/4
                            )}
                        </p>
                    </div>
                    
                    <div className="d-flex align-items-center" style={{minWidth:"85px"}}>
                        <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                        <p className="m-0">{owner.kct.teamTotal}</p>
                    </div>
                    {
                        tab !== "Dynasty"?
                            <div className="d-flex align-items-center" style={{}}>
                                <p className="m-0">
                                    {   
                                        roundToHundredth(                                
                                            owner.kct.qb.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0) +
                                            owner.kct.rb.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0) +
                                            owner.kct.wr.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0) +
                                            owner.kct.te.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0)
                                        )
                                    }
                                </p>
                                <p className="m-0" style={{color:"#a9dfd8", paddingRight:"4px"}}>pts</p>
                            </div> 
                        :<></>
                    }
                </div>
            </div>
            <div>
                <div className="d-flex flex-wrap">
                    <div className="col">
                        <div className="d-flex align-items-center pt-3">
                            <div className="d-flex align-items-center">
                                {   
                                    qbArrow ?
                                        <Icon
                                            icon='akar-icons:circle-chevron-down'
                                            onClick={() => showMoreQBs()}
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                    :
                                        <Icon
                                            onClick={() => showMoreQBs()}
                                            icon='akar-icons:circle-chevron-up'
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                }
                                <div className="m-0 mx-2 d-flex align-items-center" style={{paddingRight:"1em"}}>
                                    <div className="d-flex align-items-center">
                                        <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                        <p className="m-0">{owner.kct.qb.players.length}</p>
                                    </div>  
                                    <p className="mx-2 m-0"> | </p>
                                    <p className="m-0 bold" style={{fontSize:"16px",color:"#f8296d", marginRight:"6px"}}>QB</p> 
                                    <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{qbRankings(owner)}</p> 
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8",marginRight:"4px"}}/>
                                    <p className="m-0 mx-1 d-flex align-items-center">
                                        {roundToHundredth(owner.kct.qb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.qb.players.length)}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                    <p className="m-0">{owner.kct.qb.total}</p>
                                </div>
                                {
                                    tab !== "Dynasty"?
                                        <div className="d-flex align-items-center" style={{}}>
                                            <p className="m-0">
                                                {roundToHundredth(owner.kct.qb.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0))}
                                            </p>
                                            <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>pts</p>
                                        </div> 
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className="">
                            { 
                                showQBs ? 
                                    owner.kct.qb.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                            <div style={{width:"30px"}} className="text-center">
                                                {   
                                                    i === 0?
                                                        <Icon icon="bxs:star" style={{}} />
                                                    :
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                                }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot" style={{width:"60px",height:"60px",backgroundImage: `url(${playerBaseURL}${player.player_id}.jpg)`}}>
                                                    {
                                                        findLogo(player.team)?.l!==""?
                                                            <div className="displayOwnerLogoSM">
                                                                <img style={{width:"2.8em"}} alt="" src={findLogo(player.team)?.l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div> 
                                            </div>
                                            <div className="col mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id, players).number} {player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(player.player_id, players).years_exp}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                        <span style={{color:"white"}}> -</span>
                                                    </p>
                                                    <p className="m-0" style={{color:"#b0b0b2",width:"60px"}}>
                                                        age <span style={
                                                            player.age < "25" ?
                                                                {color:"#42f3e9"}
                                                            : player.age < "30"?
                                                                {color:"#3cf20a"}
                                                            : player.age < "33"?
                                                                {color:"#f2c306"}
                                                            : player.age < "35"?
                                                                {color:"#f26307"}
                                                            : player.age < "50"?
                                                                {color:"#e9230b"}
                                                            :   {color:"white"} 
                                                        }>{player.age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                        <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                        <p className="m-0 mx-1">{player.rating}</p>
                                                    </div>
                                                    {
                                                        tab !== "Dynasty"?
                                                            <div className="d-flex align-items-center">
                                                                {
                                                                    getTotalPts(owner.roster_id,player.player_id).maxPts === getTotalPts(owner.roster_id,player.player_id).pts?
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                        </span>
                                                                    :
                                                                        <p className="m-0">
                                                                            <span style={{color:"white"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                            </span>
                                                                            <span className="bold"style={{color:"#718396"}}>/</span>
                                                                            <span style={{color:"#c5c5c5"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).maxPts}
                                                                            </span>
                                                                        </p>
                                                            
                                                                }
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                :
                                    <div className="d-flex align-items-center my-4">
                                        <div style={{width:"30px"}} className="text-center">
                                            <Icon icon="bxs:star" style={{}} />
                                        </div>
                                        <div className="mx-2">
                                            <div className="smallHeadShot" style={{width:"60px",height:"60px",backgroundImage: `url(${playerBaseURL}${getTopQB(owner.kct.owner.display_name).player_id}.jpg)`}}>
                                                {
                                                    findLogo(getTopQB(owner.kct.owner.display_name).team).l!==""?
                                                        <div className="displayOwnerLogoSM"> 
                                                            <img style={{width:"2.8em"}} alt="" src={findLogo(getTopQB(owner.kct.owner.display_name).team).l}/>
                                                        </div>
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                        <div className="col mx-2" style={{fontSize:".9rem"}}>
                                            <p className="m-0 bold">{getTopQB(owner.kct.owner.display_name).player}</p>
                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopQB(owner.kct.owner.display_name).player_id, players).number} {getTopQB(owner.kct.owner.display_name).position} - {getTopQB(owner.kct.owner.display_name).team}</p>
                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(getTopQB(owner.kct.owner.display_name).player_id, players).years_exp}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                    <span style={{color:"white"}}> -</span>
                                                </p>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>
                                                    age <span style={
                                                        getTopQB(owner.kct.owner.display_name).age < "25"?
                                                            {color:"#42f3e9"}
                                                        : getTopQB(owner.kct.owner.display_name).age < "30"?
                                                            {color:"#3cf20a"}
                                                        : getTopQB(owner.kct.owner.display_name).age < "33"?
                                                            {color:"#f2c306"}
                                                        : getTopQB(owner.kct.owner.display_name).age < "35"?
                                                            {color:"#f26307"}
                                                        : getTopQB(owner.kct.owner.display_name).age < "50"?
                                                            {color:"#e9230b"}
                                                        :   {color:"white"}
                                                    }>{getTopQB(owner.kct.owner.display_name).age}</span>
                                                </p>
                                                <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                    <p className="m-0 mx-1">{getTopQB(owner.kct.owner.display_name).rating}</p>
                                                </div>
                                                {
                                                    tab !== "Dynasty"?
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                getTotalPts(owner.roster_id,getTopQB(owner.kct.owner.display_name).player_id).maxPts === getTotalPts(owner.roster_id,getTopQB(owner.kct.owner.display_name).player_id).pts?
                                                                    <span style={{color:"white"}}>
                                                                        {getTotalPts(owner.roster_id,getTopQB(owner.kct.owner.display_name).player_id).pts}
                                                                    </span>
                                                                :
                                                                    <p className="m-0">
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,getTopQB(owner.kct.owner.display_name).player_id).pts}
                                                                        </span>
                                                                        <span className="bold"style={{color:"#718396"}}>/</span>
                                                                        <span style={{color:"#c5c5c5"}}>
                                                                            {getTotalPts(owner.roster_id,getTopQB(owner.kct.owner.display_name).player_id).maxPts}
                                                                        </span>
                                                                    </p>
                                                        
                                                            }
                                                            <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                        </div>
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>                          
                    </div>
                    <div className="col">
                        <div className="d-flex align-items-center pt-3" style={{}}>
                            <div className="d-flex align-items-center" style={{}}>
                                { 
                                    rbArrow ?
                                        <Icon
                                            icon='akar-icons:circle-chevron-down'
                                            onClick={() => showMoreRBs()}
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                    :
                                        <Icon
                                            onClick={() => showMoreRBs()}
                                            icon='akar-icons:circle-chevron-up'
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                }
                                <div className="m-0 mx-2 d-flex align-items-center" style={{paddingRight:"1em"}}> 
                                    <div className="d-flex align-items-center">
                                        <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                        <p className="m-0">{owner.kct.rb.players.length}</p>
                                    </div>  
                                    <p className="mx-2 m-0"> | </p>
                                    <p className="m-0 bold" style={{fontSize:"16px",color:"#36ceb8", marginRight:"6px"}}>RB</p> 
                                    <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{rbRankings(owner)}</p> 
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8",marginRight:"4px"}}/>
                                    <p className="m-0 mx-1 d-flex align-items-center">
                                        {roundToHundredth(owner.kct.rb.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.rb.players.length)}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"2px"}}/>
                                    <p className="m-0">{owner.kct.rb.total}</p>
                                </div>
                                {
                                    tab !== "Dynasty"?
                                        <div className="d-flex align-items-center" style={{}}>
                                            <p className="m-0">{roundToHundredth(owner.kct.rb.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0))}</p>
                                            <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>pts</p>
                                        </div> 
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className="">
                            { 
                                showRBs ? 
                                    owner.kct.rb.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                            <div style={{width:"30px"}} className="text-center">
                                                { 
                                                    i === 0?
                                                        <Icon icon="bxs:star" style={{}} />
                                                    :
                                                    <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                                }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot" style={{width:"60px",height:"60px",backgroundImage: `url(${playerBaseURL}${player.player_id}.jpg)`}}>
                                                    {
                                                        findLogo(player.team)?.l !== ""?
                                                            <div className="displayOwnerLogoSM">
                                                                <img style={{width:"2.8em"}} alt="" src={findLogo(player.team)?.l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div> 
                                            </div>
                                            <div className="col mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id, players).number} {player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(player.player_id, players).years_exp}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                        <span style={{color:"white"}}> -</span>
                                                    </p>
                                                    <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>
                                                        age <span style={
                                                            player.age < "24"?
                                                                {color:"#42f3e9"}
                                                            :  player.age < "26"?
                                                                {color:"#3cf20a"}
                                                            : player.age < "27" ?
                                                                {color:"#f2c306"}
                                                            : player.age < "28" ?
                                                                {color:"#f26307"}
                                                            : player.age < "35" ?
                                                                {color:"#e9230b"}
                                                            :   {color:"white"} 
                                                        }>{player.age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                        <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                        <p className="m-0 mx-1">{player.rating}</p>
                                                    </div>
                                                    {
                                                        tab !== "Dynasty"?
                                                            <div className="d-flex align-items-center">
                                                                {
                                                                    getTotalPts(owner.roster_id,player.player_id).maxPts === getTotalPts(owner.roster_id,player.player_id).pts?
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                        </span>
                                                                    :
                                                                        <p className="m-0">
                                                                            <span style={{color:"white"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                            </span>
                                                                            <span className="bold"style={{color:"#718396"}}>/</span>
                                                                            <span style={{color:"#c5c5c5"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).maxPts}
                                                                            </span>
                                                                        </p>
                                                            
                                                                }
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                :
                                    <div className="d-flex align-items-center my-4">
                                        <div style={{width:"30px"}} className="text-center">
                                            <Icon icon="bxs:star" style={{}} />
                                        </div>
                                        <div className="mx-2">
                                            <div className="smallHeadShot"
                                                style={{width:"60px",height:"60px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    getTopRB(owner.kct.owner.display_name).player_id}.jpg)`,
                                                }}>
                                                    {
                                                        findLogo(getTopRB(owner.kct.owner.display_name).team).l!==""?
                                                            <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.8em"}} alt="" src={findLogo(getTopRB(owner.kct.owner.display_name).team).l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                            </div>
                                        </div>
                                        <div className="col mx-2" style={{fontSize:".9rem"}}>
                                            <p className="m-0 bold">{getTopRB(owner.kct.owner.display_name).player}</p>
                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopRB(owner.kct.owner.display_name).player_id, players).number} {getTopRB(owner.kct.owner.display_name).position} - {getTopRB(owner.kct.owner.display_name).team}</p>
                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(getTopRB(owner.kct.owner.display_name).player_id, players).years_exp}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                    <span style={{color:"white"}}> -</span>
                                                </p>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>
                                                    age <span style={
                                                        getTopRB(owner.kct.owner.display_name).age < "24" ?
                                                            {color:"#42f3e9"}
                                                        :  getTopRB(owner.kct.owner.display_name).age < "26" ?
                                                            {color:"#3cf20a"}
                                                        : getTopRB(owner.kct.owner.display_name).age < "27" ?
                                                            {color:"#f2c306"}
                                                        : getTopRB(owner.kct.owner.display_name).age < "28" ?
                                                            {color:"#f26307"}
                                                        : getTopRB(owner.kct.owner.display_name).age < "35" ?
                                                            {color:"#e9230b"}
                                                        :   {color:"#3cf20a"}
                                                    }>{getTopRB(owner.kct.owner.display_name).age}</span>
                                                </p>
                                                <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                    <p className="m-0 mx-1">{getTopRB(owner.kct.owner.display_name).rating}</p>
                                                </div>
                                                {
                                                    tab !== "Dynasty"?
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                getTotalPts(owner.roster_id,getTopRB(owner.kct.owner.display_name).player_id).maxPts === getTotalPts(owner.roster_id,getTopRB(owner.kct.owner.display_name).player_id).pts?
                                                                    <span style={{color:"white"}}>
                                                                        {getTotalPts(owner.roster_id,getTopRB(owner.kct.owner.display_name).player_id).pts}
                                                                    </span>
                                                                :
                                                                    <p className="m-0">
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,getTopRB(owner.kct.owner.display_name).player_id).pts}
                                                                        </span>
                                                                        <span className="bold"style={{color:"#718396"}}>/</span>
                                                                        <span style={{color:"#c5c5c5"}}>
                                                                            {getTotalPts(owner.roster_id,getTopRB(owner.kct.owner.display_name).player_id).maxPts}
                                                                        </span>
                                                                    </p>
                                                        
                                                            }
                                                            <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                        </div>
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                            }   
                        </div>                          
                    </div>
                    <div className="col">
                        <div className="d-flex align-items-center pt-3" style={{}}>
                            <div className="d-flex align-items-center" style={{}}>
                                { 
                                    wrArrow ?
                                        <Icon
                                            icon='akar-icons:circle-chevron-down'
                                            onClick={() => showMoreWRs()}
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                    :
                                        <Icon
                                            onClick={() => showMoreWRs()}
                                            icon='akar-icons:circle-chevron-up'
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                }
                                <div className="m-0 mx-2 d-flex align-items-center" style={{paddingRight:"1em"}}> 
                                    <div className="d-flex align-items-center">
                                        <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                        <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.wr.players.length}</p>
                                    </div>
                                    <p className="mx-2 m-0"> | </p>
                                    <p className="m-0 bold" style={{fontSize:"16px",color:"#58a7ff", marginRight:"6px"}}>WR</p> 
                                    <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{wrRankings(owner)}</p> 
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8",marginRight:"4px"}}/>
                                    <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                        {roundToHundredth(owner.kct.wr.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.wr.players.length)}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                    <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.wr.total}</p>
                                </div>
                                {
                                    tab !== "Dynasty"?
                                        <div className="d-flex align-items-center" style={{}}>
                                            <p className="m-0">{roundToHundredth(owner.kct.wr.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0))}</p>
                                            <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>pts</p>
                                        </div> 
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className="">
                            { 
                                showWRs ? 
                                    owner.kct.wr.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                            <div style={{width:"30px"}} className="text-center">
                                            { i === 0?
                                                <Icon icon="bxs:star" style={{}} />
                                            :
                                                <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                            }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{width:"60px",height:"60px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                }}>
                                                    {
                                                        findLogo(player.team).l !==""?
                                                            <div className="displayOwnerLogoSM">
                                                                <img style={{width:"2.8em"}} alt="" src={findLogo(player.team).l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div> 
                                            </div>
                                            <div className="col mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id, players).number} {player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(player.player_id, players).years_exp}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                        <span style={{color:"white"}}> -</span>
                                                    </p>
                                                    <p className="m-0" style={{color:"#b0b0b2",width:"60px"}}>
                                                        age <span style={
                                                            player.age < "24"?
                                                                {color:"#42f3e9"}
                                                            : player.age < "28"?
                                                                {color:"#3cf20a"}
                                                            : player.age < "29"?
                                                                {color:"#f2c306"}
                                                            : player.age < "30"?
                                                                {color:"#f26307"}
                                                            : player.age < "35"?
                                                                {color:"#e9230b"}
                                                            : {color:"white"}
                                                        }>{player.age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                        <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                        <p className="m-0 mx-1">{player.rating}</p>
                                                    </div>
                                                    {
                                                        tab !== "Dynasty"?
                                                            <div className="d-flex align-items-center">
                                                                {
                                                                    getTotalPts(owner.roster_id,player.player_id).maxPts === getTotalPts(owner.roster_id,player.player_id).pts?
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                        </span>
                                                                    :
                                                                        <p className="m-0">
                                                                            <span style={{color:"white"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                            </span>
                                                                            <span className="bold"style={{color:"#718396"}}>/</span>
                                                                            <span style={{color:"#c5c5c5"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).maxPts}
                                                                            </span>
                                                                        </p>
                                                            
                                                                }
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                :
                                    <div className="d-flex align-items-center my-4">
                                        <div style={{width:"30px"}} className="text-center">
                                            <Icon icon="bxs:star" style={{}} />
                                        </div>
                                        <div className="mx-2">
                                            <div className="smallHeadShot"
                                                style={{width:"60px",height:"60px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    getTopWR(owner.kct.owner.display_name).player_id}.jpg)`,
                                                }}>
                                                    {
                                                        findLogo(getTopWR(owner.kct.owner.display_name).team).l!==""?
                                                            <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.8em"}} alt="" src={findLogo(getTopWR(owner.kct.owner.display_name).team).l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                            </div>
                                        </div>
                                        <div className="col mx-2" style={{fontSize:".9rem"}}>
                                            <p className="m-0 bold">{getTopWR(owner.kct.owner.display_name).player}</p>
                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopWR(owner.kct.owner.display_name).player_id, players).number} {getTopWR(owner.kct.owner.display_name).position} - {getTopWR(owner.kct.owner.display_name).team}</p>
                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(getTopWR(owner.kct.owner.display_name).player_id, players).years_exp}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                    <span style={{color:"white"}}> -</span>
                                                </p>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>
                                                    age <span style={
                                                        getTopWR(owner.kct.owner.display_name).age < "24"?
                                                            {color:"#42f3e9"}
                                                        : getTopWR(owner.kct.owner.display_name).age < "28"?
                                                            {color:"#3cf20a"}
                                                        : getTopWR(owner.kct.owner.display_name).age < "29"?
                                                            {color:"#f2c306"}
                                                        : getTopWR(owner.kct.owner.display_name).age < "30"?
                                                            {color:"#f26307"}
                                                        : getTopWR(owner.kct.owner.display_name).age < "35"?
                                                            {color:"#e9230b"}
                                                        : {color:"white"}
                                                    }>{getTopWR(owner.kct.owner.display_name).age}</span>
                                                </p>
                                                <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                    <p className="m-0 mx-1">{getTopWR(owner.kct.owner.display_name).rating}</p>
                                                </div>
                                                {
                                                    tab !== "Dynasty"?
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                getTotalPts(owner.roster_id,getTopWR(owner.kct.owner.display_name).player_id).maxPts === getTotalPts(owner.roster_id,getTopWR(owner.kct.owner.display_name).player_id).pts?
                                                                    <span style={{color:"white"}}>
                                                                        {getTotalPts(owner.roster_id,getTopWR(owner.kct.owner.display_name).player_id).pts}
                                                                    </span>
                                                                :
                                                                    <p className="m-0">
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,getTopWR(owner.kct.owner.display_name).player_id).pts}
                                                                        </span>
                                                                        <span className="bold"style={{color:"#718396"}}>/</span>
                                                                        <span style={{color:"#c5c5c5"}}>
                                                                            {getTotalPts(owner.roster_id,getTopWR(owner.kct.owner.display_name).player_id).maxPts}
                                                                        </span>
                                                                    </p>
                                                        
                                                            }
                                                            <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                        </div>
                                                    :<></>
                                                }
                                               
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>                          
                    </div>
                    <div className="col">
                        <div className="d-flex align-items-center pt-3">
                            <div className="d-flex align-items-center">
                                { 
                                    teArrow ?
                                        <Icon
                                            icon='akar-icons:circle-chevron-down'
                                            onClick={() => showMoreTEs()}
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                    :
                                        <Icon
                                            onClick={() => showMoreTEs()}
                                            icon='akar-icons:circle-chevron-up'
                                            style={{
                                                fontSize:'1.1rem',
                                                color:"#c9cfd1",
                                                background:"black",
                                                borderRadius:"50%"
                                            }}
                                        />
                                }
                                <div className="m-0 mx-2 d-flex align-items-center" style={{paddingRight:"1em"}}> 
                                    <div className="d-flex align-items-center">
                                        <Icon icon="fluent:people-team-16-filled"style={{color:"#a9dfd8",fontSize:"21px", marginRight:"4px"}}/>
                                        <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.te.players.length}</p>
                                    </div>
                                    <p className="mx-2 m-0"> | </p>
                                    <p className="m-0 bold" style={{fontSize:"16px",color:"#faae58", marginRight:"6px"}}>TE</p> 
                                    <p className="m-0 mx-1"style={{color:"#b0b0b2", fontSize:"14px"}}>{teRankings(owner)}</p> 
                                </div>
                            </div>
                            <div className="d-flex align-items-center" style={{fontFamily:"Arial"}}>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="material-symbols:avg-pace-sharp" style={{fontSize:"24px", color:"#a9dfd8",marginRight:"4px"}}/>
                                    <p className="m-0 mx-1 d-flex align-items-center" style={{fontSize:"14px"}}>
                                        {roundToHundredth(owner.kct.te.players.reduce((r,c) => r + Number(c.age), 0)/ owner.kct.te.players.length)}
                                    </p>
                                </div>
                                <div className="d-flex align-items-center" style={{width:"85px"}}>
                                    <Icon icon="fluent:person-tag-20-regular" style={{fontSize:"24px", color:"#a9dfd8", marginRight:"4px"}}/>
                                    <p className="m-0" style={{fontSize:"14px"}}>{owner.kct.te.total}</p>
                                </div>
                                {
                                    tab !== "Dynasty"?
                                        <div className="d-flex align-items-center" style={{}}>
                                            <p className="m-0">
                                                {
                                                    roundToHundredth(owner.kct.te.players.map((player) => getTotalPts(owner.roster_id,player.player_id).pts).reduce((partialSum,a) => partialSum + a, 0))
                                                }
                                            </p>
                                            <p className="m-0 bold" style={{color:"#a9dfd8", paddingRight:"4px"}}>pts</p>
                                        </div> 
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className="">
                            { 
                                showTEs ? 
                                    owner.kct.te.players.map((player, i) =>
                                        <div key={i} className="d-flex align-items-center py-4" style={isOdd(i) === 1 ? {background:"#0f0f0f"} :{}}>
                                            <div style={{width:"30px"}} className="text-center">
                                            { 
                                                i === 0?
                                                    <Icon icon="bxs:star" style={{}} />
                                                :
                                                    <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{i + 1}</p>
                                            }
                                            </div>
                                            <div className="mx-2">
                                                <div className="smallHeadShot"
                                                    style={{width:"60px",height:"60px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                        player.player_id}.jpg)`,
                                                    }}>
                                                        {
                                                            findLogo(player.team).l !==""?
                                                                <div className="displayOwnerLogoSM">
                                                                    <img style={{width:"2.8em"}} alt="" src={findLogo(player.team).l}/>
                                                                </div>
                                                            :<></>
                                                        }
                                                </div> 
                                            </div>
                                            <div className="col mx-2" style={{fontSize:".9rem"}}>
                                                <p className="m-0 bold">{player.player}</p>
                                                <p className="m-0"style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(player.player_id, players).number} {player.position} - {player.team}</p>
                                                <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(player.player_id, players).years_exp}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                        <span style={{color:"white"}}> -</span>
                                                    </p>
                                                    <p className="m-0" style={{color:"#b0b0b2",width:"60px"}}>
                                                        age <span style={
                                                            player.age < "25"?
                                                                {color:"#42f3e9"}
                                                            : player.age < "28"?
                                                                {color:"#3cf20a"}
                                                            : player.age < "30"?
                                                                {color:"#f2c306"}
                                                            : player.age < "31"?
                                                                {color:"#f26307"}
                                                            : player.age < "37"?
                                                                {color:"#e9230b"}
                                                            :{color:"white"}
                                                        }>{player.age}</span>
                                                    </p>
                                                    <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                        <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                        <p className="m-0 mx-1">{player.rating}</p>
                                                    </div>
                                                    {
                                                        tab !== "Dynasty"?
                                                            <div className="d-flex align-items-center">
                                                                {
                                                                    getTotalPts(owner.roster_id,player.player_id).maxPts === getTotalPts(owner.roster_id,player.player_id).pts?
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                        </span>
                                                                    :
                                                                        <p className="m-0">
                                                                            <span style={{color:"white"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).pts}
                                                                            </span>
                                                                            <span className="bold"style={{color:"#718396"}}>/</span>
                                                                            <span style={{color:"#c5c5c5"}}>
                                                                                {getTotalPts(owner.roster_id,player.player_id).maxPts}
                                                                            </span>
                                                                        </p>
                                                            
                                                                }
                                                                <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                            </div>
                                                        :<></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                :
                                    <div className="d-flex align-items-center my-4">
                                        <div style={{width:"30px"}} className="text-center">
                                            <Icon icon="bxs:star" style={{}} />
                                        </div>
                                        <div className="mx-2">
                                            <div className="smallHeadShot"
                                                style={{width:"60px",height:"60px",backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                    getTopTE(owner.kct.owner.display_name).player_id}.jpg)`,
                                                }}>
                                                    {
                                                        findLogo(getTopTE(owner.kct.owner.display_name).team).l!==""?
                                                            <div className="displayOwnerLogoSM"> 
                                                                <img style={{width:"2.8em"}} alt="" src={findLogo(getTopTE(owner.kct.owner.display_name).team).l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                            </div>
                                        </div>
                                        <div className="col mx-2" style={{fontSize:".9rem"}}>
                                            <p className="m-0 bold">{getTopTE(owner.kct.owner.display_name).player}</p>
                                            <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{findPlayer(getTopTE(owner.kct.owner.display_name).player_id, players).number} {getTopTE(owner.kct.owner.display_name).position} - {getTopTE(owner.kct.owner.display_name).team}</p>
                                            <div className="d-flex align-items-center" style={{fontSize:"12px"}}>
                                                <div className="d-flex align-items-center">
                                                    <p className="m-0 bold" style={{color:"#7c90a5",fontSize:"10px"}}>EXP {findPlayer(getTopTE(owner.kct.owner.display_name).player_id, players).years_exp}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center" style={{fontSize:"11.5px"}}>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>rank 
                                                    <span style={{color:"white"}}> -</span>
                                                </p>
                                                <p className="m-0" style={{color:"#b0b0b2", width:"60px"}}>
                                                    age <span style={
                                                        getTopTE(owner.kct.owner.display_name).age < "25"?
                                                            {color:"#42f3e9"}
                                                        : getTopTE(owner.kct.owner.display_name).age < "28"?
                                                            {color:"#3cf20a"}
                                                        : getTopTE(owner.kct.owner.display_name).age < "30"?
                                                            {color:"#f2c306"}
                                                        : getTopTE(owner.kct.owner.display_name).age < "31"?
                                                            {color:"#f26307"}
                                                        : getTopTE(owner.kct.owner.display_name).age < "37"?
                                                            {color:"#e9230b"}
                                                        : {color:"white"}
                                                    }>{getTopTE(owner.kct.owner.display_name).age}</span>
                                                </p>
                                                <div className="d-flex align-items-center" style={{width:"80px"}}>
                                                    <p className="m-0" style={{color:"#b0b0b2"}}>value</p>
                                                    <p className="m-0 mx-1">{getTopTE(owner.kct.owner.display_name).rating}</p>
                                                </div>
                                                {
                                                    tab !== "Dynasty"?
                                                        <div className="d-flex align-items-center">
                                                            {
                                                                getTotalPts(owner.roster_id,getTopTE(owner.kct.owner.display_name).player_id).maxPts === getTotalPts(owner.roster_id,getTopTE(owner.kct.owner.display_name).player_id).pts?
                                                                    <span style={{color:"white"}}>
                                                                        {getTotalPts(owner.roster_id,getTopTE(owner.kct.owner.display_name).player_id).pts}
                                                                    </span>
                                                                :
                                                                    <p className="m-0">
                                                                        <span style={{color:"white"}}>
                                                                            {getTotalPts(owner.roster_id,getTopTE(owner.kct.owner.display_name).player_id).pts}
                                                                        </span>
                                                                        <span className="bold"style={{color:"#718396"}}>/</span>
                                                                        <span style={{color:"#c5c5c5"}}>
                                                                            {getTotalPts(owner.roster_id,getTopTE(owner.kct.owner.display_name).player_id).maxPts}
                                                                        </span>
                                                                    </p>
                                                        
                                                            }
                                                            <p className="m-0" style={{color:"#b0b0b2"}}>pts</p>
                                                        </div>
                                                    :<></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>                          
                    </div>
                </div>
            </div>
        </div>
    )
}
