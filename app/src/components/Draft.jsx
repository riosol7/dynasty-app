import React from 'react'

export default function Draft(props) {
    const id=props.id
    const handleDraftClass=props.handleDraftClass
    const league=props.league
    const draftClass=props.draftClass !== undefined ? props.draftClass : "2020"
    const myDraftPicks=props.myDraftPicks
    const isOdd=props.isOdd
    const findLogo=props.findLogo
    const findPlayer=props.findPlayer
    return (
        <>
            <div className="col" id="scrollBar" style={{overflow:"auto", height:"855px", minHeight:"670px",fontSize:"14.5px"}}>
                <div className="d-flex align-items-top justify-content-between pt-3 mx-3">
                    <div className="d-flex align-items-center">
                        <p className="m-0">9 Picks</p>   
                    </div>
                    <p className="m-0">Skill -</p> 
                </div>
                <div className="my-3 mx-3 d-flex align-items-center">
                    <div className="">
                        <p className="m-0 pb-1">2023</p>
                        <p className="m-0">1.08 <span style={{fontSize:"12.5px", color:"#a5acaf"}}>riosol</span></p>
                        <p className="m-0">3.02 <span style={{fontSize:"12.5px", color:"#a5acaf"}}>riosol</span></p>
                        <p className="m-0">3.03 <span style={{fontSize:"12.5px", color:"#a5acaf"}}>GalatisMan</span></p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="mb-5 px-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="m-0" style={{ color:"lightgrey"}}>Needs</p>
                            </div>
                            <div className="mt-2" style={{fontSize:"13px"}}>
                                <p className="m-0 mx-2" style={{fontSize:"12.5px"}}>Position: RB</p>
                                <p className="m-0 mt-1 mx-2">- Lack of quality depth & youth. D.Henry is nearing the age of 30.</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between px-3" style={{color:"lightgrey"}}> 
                            <select className="" onChange={handleDraftClass} style={{background:"inherit", color:"whitesmoke", border:"none"}}>
                                {
                                    league.history ? 
                                        league.history.map((l,j) => 
                                            <option key={j} value={l.year}>Class {l.year}</option>
                                        )
                                    :<></>
                                }
                                <option value={league.season}>Class {league.season}</option>
                            </select>
                            {
                                draftClass === league.season ?
                                    <div className="d-flex align-items-center">
                                        {
                                            myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "QB").length > 0 ?
                                                <div className="mx-1 d-flex align-items-center"> 
                                                    <p className="m-0 bold" style={{color:"#f8296d"}}>QB
                                                        <span style={{color:"white",  marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "QB").length}</span>
                                                    </p>
                                                </div>
                                            : <></>
                                        }
                                        {
                                            myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "RB").length > 0 ?
                                                <div className="mx-1 d-flex align-items-center"> 
                                                    <p className="m-0 bold" style={{color:"#36ceb8"}}>RB
                                                        <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "RB").length}</span>
                                                    </p>
                                                </div>
                                            : <></>
                                        }
                                        {
                                            myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "WR").length > 0 ?
                                                <div className="mx-1 d-flex align-items-center"> 
                                                    <p className="m-0 bold" style={{color:"#58a7ff"}}>WR
                                                        <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "WR").length}</span>
                                                    </p>
                                                </div>
                                            : <></>
                                        }
                                        {
                                            myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "TE").length > 0 ?
                                                <div className="mx-1 d-flex align-items-center"> 
                                                    <p className="m-0 bold" style={{color:"#faae58"}}>TE
                                                        <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "TE").length}</span>
                                                    </p>
                                                </div>
                                            : <></>
                                        }
                                        {
                                            myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "K").length > 0 ?
                                                <div className="mx-1 d-flex align-items-center"> 
                                                    <p className="m-0 bold" style={{color:"#bd66ff"}}>K
                                                        <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,league.season).filter(pick => pick.metadata.position === "K").length}</span>
                                                    </p>
                                                </div>
                                            : <></>
                                        }
                                    </div>
                                :
                                    <div className="d-flex align-items-center">
                                        {
                                            myDraftPicks(id,draftClass) !== undefined ?
                                                myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "QB").length > 0 ?
                                                    <div className="mx-1 d-flex align-items-center"> 
                                                        <p className="m-0 bold" style={{color:"#f8296d"}}>QB
                                                            <span style={{color:"white",  marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "QB").length}</span>
                                                        </p>
                                                    </div>
                                                : <></>
                                            :<></>
                                        }
                                        {
                                            myDraftPicks(id,draftClass) !== undefined ?
                                                myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "RB").length > 0 ?
                                                    <div className="mx-1 d-flex align-items-center"> 
                                                        <p className="m-0 bold" style={{color:"#36ceb8"}}>RB
                                                            <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "RB").length}</span>
                                                        </p>
                                                    </div>
                                                : <></>
                                            :<></>
                                        }
                                        {
                                            myDraftPicks(id,draftClass) !== undefined ?
                                                myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "WR").length > 0 ?
                                                    <div className="mx-1 d-flex align-items-center"> 
                                                        <p className="m-0 bold" style={{color:"#58a7ff"}}>WR
                                                            <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "WR").length}</span>
                                                        </p>
                                                    </div>
                                                : <></>
                                            :<></>
                                        }
                                        {
                                            myDraftPicks(id,draftClass) !== undefined ?
                                                myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "TE").length > 0 ?
                                                    <div className="mx-1 d-flex align-items-center"> 
                                                        <p className="m-0 bold" style={{color:"#faae58"}}>TE
                                                            <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "TE").length}</span>
                                                        </p>
                                                    </div>
                                                : <></>
                                            :<></>
                                        }
                                        {
                                            myDraftPicks(id,draftClass) !== undefined ?
                                                myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "K").length > 0 ?
                                                    <div className="mx-1 d-flex align-items-center"> 
                                                        <p className="m-0 bold" style={{color:"#bd66ff"}}>K
                                                            <span style={{color:"white", marginLeft:"3px", fontWeight:"normal"}}>{myDraftPicks(id,draftClass).filter(pick => pick.metadata.position === "K").length}</span>
                                                        </p>
                                                    </div>
                                                : <></>
                                            :<></>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="d-flex align-items-center pb-2 mt-3" style={{fontSize:"11.5px", color:"#b0b0b2", borderBottom:"2px solid #2a2c3e"}}>
                        <div className="d-flex align-items-center col">
                            <div style={{width:"100px"}} className="">
                                <p className="bold m-0 text-center">PICK (OVR)</p>
                            </div>
                            <div className="col"style={{minWidth:"245px"}}>
                                <p className='bold m-0'>PLAYER</p>
                            </div>
                            <div style={{width:"100px"}} className="">
                                <p className='bold m-0 text-center'>GRADE</p>
                            </div>    
                        </div>
                    </div>
                    <div>
                        {
                            draftClass === league.season ?
                                myDraftPicks(id, league.season) !== undefined ?
                                    myDraftPicks(id, league.season).map((pick, idx) => 
                                        <div key={idx} className="py-3" style={isOdd(idx) === 1 ? {background:"#0f0f0f"}:{background:"inherit"}}>
                                            <div className="d-flex align-items-center col">
                                                <div style={{width:"100px"}} className="">
                                                    <p className="m-0 text-center">{pick.round} ({pick.pick_no})</p>
                                                </div>
                                                <div className="d-flex align-items-center col" style={{minWidth:"245px"}}>
                                                    <div className="smallHeadShot"
                                                        style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                            pick.player_id}.jpg)`,
                                                        }}>
                                                        { 
                                                            pick.metadata.status === "Inactive" || pick.metadata.team === "" ?
                                                            <></>
                                                            :
                                                                <div className="displayOwnerLogoSM"> 
                                                                    <img style={{width:"2.5em"}} alt="avatar" src={findLogo(pick.metadata.team).l || "FA"}/>
                                                                </div>
                                                        }              
                                                    </div>
                                                    <div className="mx-3">
                                                        <p className="m-0 bold" style={{fontSize:""}}>{pick.metadata.first_name} {pick.metadata.last_name}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{pick.metadata.number} {pick.metadata.position} - {pick.metadata.team}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{findPlayer(pick.player_id).college}</p>
                                                    </div>
                                                </div>
                                                <div className="" style={{width:"100px"}}>
                                                    <p className="m-0 text-center">-</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                :<></>
                            : 
                                myDraftPicks(id, draftClass) !== undefined ?
                                    myDraftPicks(id, draftClass).map((pick, idx) => 
                                        <div key={idx} className="py-3" style={isOdd(idx) === 1 ? {background:"#0f0f0f"}:{background:"inherit"}}>
                                            <div className="d-flex align-items-center col">
                                                <div style={{width:"100px"}} className="">
                                                    <p className="m-0 text-center">{pick.round} ({pick.pick_no})</p>
                                                </div>
                                                <div className="d-flex align-items-center col" style={{minWidth:"245px"}}>
                                                    <div className="smallHeadShot"
                                                        style={{backgroundImage: `url(https://sleepercdn.com/content/nfl/players/thumb/${
                                                            pick.player_id}.jpg)`,
                                                        }}>
                                                        { 
                                                            pick.metadata.status === "Inactive" || pick.metadata.team === "" ?
                                                            <></>
                                                            :
                                                                <div className="displayOwnerLogoSM"> 
                                                                    <img style={{width:"2.5em"}} alt="avatar" src={findLogo(pick.metadata.team).l || "FA"}/>
                                                                </div>
                                                        }                    
                                                    </div>
                                                    <div className="mx-3">
                                                        <p className="m-0 bold" style={{fontSize:""}}>{pick.metadata.first_name} {pick.metadata.last_name}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>#{pick.metadata.number} {pick.metadata.position} - {pick.metadata.team}</p>
                                                        <p className="m-0" style={{fontSize:"10px", color:"#cbcbcb"}}>{
                                                            pick.metadata.position === "DEF" ?
                                                                <></>
                                                            : findPlayer(pick.player_id).college 
                                                        }</p>
                                                    </div>
                                                </div>
                                                <div className="" style={{width:"100px"}}>
                                                    <p className="m-0 bold text-center">-</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                :<></>
                        }
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end py-4">
                <div className="d-flex align-items-center" style={{width:"179px"}}>
                    <p className="m-0 bold"  style={{color:"lightgrey"}}>Overall Grade</p>
                    <p className="m-0 bold"  style={{color:"", paddingLeft:"15px"}}>-</p>
                </div>
            </div>
        </>
    )
}
