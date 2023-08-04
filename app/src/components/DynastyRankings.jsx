import React, {useState} from 'react';
import { Icon } from '@iconify/react';

export default function DynastyRankings(props) {
    const rosters=props.rosters
    const loadRosters=props.loadRosters
    // const loadLeague=props.loadLeague
    // const league=props.league
    // const roundToHundredth=props.roundToHundredth


    const [sort, setSort] = useState("")
    const [asc, setAsc] = useState(false)

    const handleSort = (value) => {
        if(value === "RANK"){
          setAsc(false)
          setSort(value)
        } else if(value === "TOTAL"){
          setAsc(true)
          setSort(value)
        } else if(value === "QB"){
          setAsc(true)
          setSort(value)
        } else if(value === "RB"){
          setAsc(true)
          setSort(value)
        } else if(value === "WR"){
          setAsc(true)
          setSort(value)
        } else if(value === "TE"){
            setAsc(true)
            setSort(value)
        } else {
          setSort("")
        }
    }

    const handleRank = (display_name) => {
        let foundTeamRank = rosters.teamRank.filter(roster => roster.kct.owner.display_name === display_name)
        return foundTeamRank[0].rank
    }
    const findEXP = (display_name) => {
        let foundTotalRoster = rosters.totalRoster.filter(roster => roster.owner.display_name === display_name)
        return foundTotalRoster[0].owner.exp
    }

    return (
        <>
        { loadRosters ? <p>Loading </p> :
            <div className="">
                <div className="mt-2">
                    <div className="d-flex py-3" style={{borderBottom:".5px solid #2a2c3e", fontSize:".7rem", color:"#7d91a6"}}>
                        <div className="col-sm-7 d-flex align-items-center"> 
                            <div className="col-sm-1">
                                {
                                    sort === "RANK" ?
                                        asc === false ?
                                            <div className="d-flex align-items-center">
                                                <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RANK</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                        :
                                            <div className="d-flex align-items-center">
                                                <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RANK</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>  
                                    :
                                        <p className="StandingCell m-0" onClick={() => handleSort("RANK")}>RANK</p>

                                }
                            </div>
                            <p className="m-0 StandingCell">TEAM</p>
                        </div>
                        {
                            sort === "TOTAL" ?
                                asc === true ?
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(false)}>TOTAL</p>
                                        <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                                :
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(true)}>TOTAL</p>
                                        <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                            :
                                <div className="col-sm-1">
                                    <p className="m-0 StandingCell" onClick={() => handleSort("TOTAL")}>TOTAL</p>
                                </div>
                        }
                        {
                            sort === "QB" ?
                                asc === true ?
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(false)}>QB</p>
                                        <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                                :
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(true)}>QB</p>
                                        <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                            :
                                <div className="col-sm-1">
                                    <p className="m-0 StandingCell" onClick={() => handleSort("QB")}>QB</p>
                                </div>
                        }
                        {
                            sort === "RB" ?
                                asc === true ?
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(false)}>RB</p>
                                        <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                                :
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(true)}>RB</p>
                                        <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                            :
                                <div className="col-sm-1">
                                    <p className="m-0 StandingCell" onClick={() => handleSort("RB")}>RB</p>
                                </div>
                        }
                        {
                            sort === "WR" ?
                                asc === true ?
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(false)}>WR</p>
                                        <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                                :
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(true)}>WR</p>
                                        <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                            :
                                <div className="col-sm-1">
                                    <p className="m-0 StandingCell" onClick={() => handleSort("WR")}>WR</p>
                                </div>
                        }
                        {
                            sort === "TE" ?
                                asc === true ?
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(false)}>TE</p>
                                        <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                                :
                                    <div className="col-sm-1 d-flex align-items-center">
                                        <p className="m-0 StandingCell" onClick={() => setAsc(true)}>TE</p>
                                        <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                    </div>
                            :
                                <div className="col-sm-1">
                                    <p className="m-0 StandingCell" onClick={() => handleSort("TE")}>TE</p>
                                </div>
                        }
                    </div>
                </div>
                <div>
                    { 
                        sort === "QB" && asc === true ? 
                            rosters.qbRank.sort((a,b) => a.rank - b.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "QB" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>    
                            )
                        : sort === "QB" && asc === false ?
                            rosters.qbRank.sort((a,b) => b.rank - a.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "QB" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>    
                            )            
                        : sort === "RB" && asc === true ? 
                            rosters.rbRank.sort((a,b) => a.rank - b.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                             <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "RB" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>  
                            ) 
                        : sort === "RB" && asc === false ? 
                            rosters.rbRank.sort((a,b) => b.rank - a.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "RB" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>  
                            ) 
                        : sort === "WR" && asc === true ? 
                            rosters.wrRank.sort((a,b) => a.rank - b.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "WR" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>     
                            )
                        : sort === "WR" && asc === false ? 
                            rosters.wrRank.sort((a,b) => b.rank - a.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "WR" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>     
                            )
                        : sort === "TE" && asc === true ? 
                            rosters.teRank.sort((a,b) => a.rank - b.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "TE" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>      
                            ) 
                        : sort === "TE" && asc === false ? 
                            rosters.teRank.sort((a,b) => b.rank - a.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{handleRank(roster.kct.owner.display_name)}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "TE" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>    
                            )
                        : (sort === "TOTAL" && asc === true) || (sort === "RANK" && asc === false) ? 
                            rosters.teamRank.sort((a,b) => a.rank - b.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{roster.rank}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "TOTAL" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>  
                            )
                        : (sort === "TOTAL" && asc === false) || (sort === "RANK" && asc === true) ? 
                            rosters.teamRank.sort((a,b) => b.rank - a.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{roster.rank}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "TOTAL" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>
                            ) 
                        : 
                            rosters.teamRank.sort((a,b) => a.rank - b.rank).map((roster, i) => 
                                <div key={i} className="team d-flex align-items-center py-3" onClick={() => (roster)}>
                                    <div className="col-sm-7 d-flex align-items-center">
                                        <div className="col-sm-1">
                                            <p className="m-0 mx-2 bold" style={{color:"#acb6c3", fontSize:".9rem"}}>{roster.rank}</p>
                                        </div>                                
                                        <div className="">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${
                                                roster.kct.owner ? roster.kct.owner.avatar : "8fcf0e0e6a75e96a591d2a4a4a400f41"}`}/>
                                        </div>
                                        <div className="text-truncate mx-1" style={{width:"100%"}}>
                                            { 
                                                roster.kct.owner.team_name ?
                                                    <p className="m-0 mx-1" style={{fontSize:"14px"}}>{roster.kct.owner.team_name}
                                                        <span className="m-0 mx-1 text-truncate" style={{fontSize:"10px", color:"#cbcbcb"}}>{roster.kct.owner.display_name}</span>
                                                    </p>
                                                :        
                                                    <p className="m-0 text-truncate mx-1" style={{fontSize:"14px"}}>
                                                        <span className="">{roster.kct.owner.display_name}</span>
                                                    </p>
                                            }
                                            <div className="pb-2 mx-1">
                                                <p className="m-0" style={{fontSize:".6rem", color:"#7d91a6"}}>EXP {findEXP(roster.kct.owner.display_name)}</p>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={sort === "TOTAL" ? {fontSize:"12px",color:"#a9dfd8"}:{fontSize:"12px",color:"white"}}>{roster.kct.teamTotal}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.qb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.rb.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.wr.total}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <p className="m-0" style={{fontSize:"12px"}}>{roster.kct.te.total}</p>
                                    </div>
                                </div>  
                            )
                    }    
                </div>  
            </div>
        }
          
        </>
    )
}
