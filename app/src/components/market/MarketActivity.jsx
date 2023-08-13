import React from "react";
import { Icon } from "@iconify/react";
import { toDateTime } from "../../utils";

const SELECT_TAG_M={border:"none", background:"inherit",color:"#7d91a6",fontSize:".7rem",fontWeight:"bold"};
const SHOW_TAG_M={
    borderBottom:"none", 
    background:"inherit",
    color:"#e4e1e0",
    fontSize:"13.5px",
    fontWeight:"normal",
    paddingBlock:"3px",
};

export default function MarketActivity ({
    asc,
    currentPage,
    findLogo,
    handleOwner,
    handlePosition,
    handleShowPage,
    handleSort,
    league,
    nextPage,
    owner,
    pageNumbers,
    paginate,
    position,
    prevPage,
    records,
    recordsPerPage,
    setAsc,
    sort,
    waiverBids,
}) {
    const playerBaseURL = process.env.REACT_APP_SLEEPER_PLAYER_THUMBS_BASE_URL || "https://sleepercdn.com/content/nfl/players/thumb/";

    return (
        <div className="pt-4">
            <div className="d-flex align-items-center justify-content-between pb-1">
                <div className="d-flex align-items-center" style={{border:"none", borderRadius:"10px"}}>
                    <div className="" onClick={() => prevPage()} style={{}}>
                        <Icon icon="material-symbols:chevron-left-rounded" style={{fontSize:"1.5em", color:currentPage===1?"#232227":"#a9dfd8"}}/>
                    </div>
                    <div className="mx-2 d-flex align-items-center" style={{fontSize:"12.5px"}}>
                        <select className="bold" onChange={paginate} value={currentPage} style={{background:"none", color:"white", border:"none",}}>
                            {
                                pageNumbers.map((n,i) =>
                                    <option key={i} value={n}>{n}</option>
                                )
                            } 
                        </select>
                    </div>
                    <div className="" onClick={() => nextPage()} style={{}}>
                        <Icon icon="material-symbols:chevron-right-rounded" style={{fontSize:"1.5em", color:waiverBids&&waiverBids.length>recordsPerPage?"#a9dfd8":"#232227"}}/>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center" style={SHOW_TAG_M}>
                        <p className="m-0" style={{}}>Show</p>
                        <select onChange={handleShowPage} value={recordsPerPage} style={{background:"inherit",color:"white",border:"none"}}>
                            <option value={5}>5</option>
                            {
                                waiverBids&&waiverBids.length>5?
                                    <option value={10}>10</option>
                                :<></>
                            }
                            {
                                waiverBids&&waiverBids.length>10?
                                    <option value={15}>15</option>
                                :<></>
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className="">
                <table className="table">
                    <thead>
                        <tr className="py-2" style={{fontSize:".7rem", color:"#7d91a6"}}>
                            <th>
                                {
                                    sort==="PLAYER"?
                                        asc?
                                            <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                <p className="m-0 StandingCell">PLAYER</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>  
                                        :
                                            <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                <p className="m-0 StandingCell">PLAYER</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                    :   <p className="m-0 StandingCell" onClick={() => handleSort("PLAYER")}>PLAYER</p>
                                }
                            </th>
                            <th>
                                {
                                    sort==="AGE"?
                                        asc?
                                            <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                <p className="m-0 StandingCell">AGE</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>  
                                        :
                                            <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                <p className="m-0 StandingCell">AGE</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                    :   <p className="m-0 StandingCell" onClick={() => handleSort("AGE")}>AGE</p>
                                }
                            </th>
                            <th>
                                <select style={SELECT_TAG_M} onChange={handlePosition} value={position}>
                                    <option value={"POSITION"}>POSITION</option>
                                    <option value={"QB"}>QB</option>
                                    <option value={"RB"}>RB</option>
                                    <option value={"WR"}>WR</option>
                                    <option value={"TE"}>TE</option>
                                </select>
                                {/* {
                                    sort==="POSITION"?
                                        asc?
                                            <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                <p className="m-0 StandingCell">POSITION</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>  
                                        :
                                            <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                <p className="m-0 StandingCell">POSITION</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                    :   <p className="m-0 StandingCell" onClick={() => handleSort("POSITION")}>POSITION</p>
                                } */}
                            </th>
                            <th>
                                <select style={SELECT_TAG_M} onChange={handleOwner} value={owner}>
                                    <option value={"OWNER"}>OWNER</option>
                                    {
                                        league.owners&&league.owners.map((o,i)=>
                                            <option key={i} value={o.display_name}>{o.display_name}</option>
                                        )
                                    }
                                </select>
                                {/* {
                                    sort==="OWNER"?
                                        asc?
                                            <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                <p className="m-0 StandingCell">OWNER</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>  
                                        :
                                            <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                <p className="m-0 StandingCell">OWNER</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                    :   <p className="m-0 StandingCell" onClick={() => handleSort("OWNER")}>OWNER</p>
                                } */}
                            </th>
                            <th>
                                {
                                    sort==="BID"?
                                        asc?
                                            <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                <p className="m-0 StandingCell">BID</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>  
                                        :
                                            <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                <p className="m-0 StandingCell">BID</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                    :
                                        <p className="m-0 StandingCell" onClick={() => handleSort("BID")}>BID</p>
                                }
                            </th>
                            <th>
                                {
                                    sort==="DATE"?
                                        asc?
                                            <div className="d-flex align-items-center" onClick={() => setAsc(false)}>
                                                <p className="m-0 StandingCell">DATE</p>
                                                <Icon icon="bi:caret-up-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                            :
                                            <div className="d-flex align-items-center" onClick={() => setAsc(true)}>
                                                <p className="m-0 StandingCell">DATE</p>
                                                <Icon icon="bi:caret-down-fill" style={{color:"#a9dfd8"}}/>
                                            </div>
                                    : <p className="m-0 StandingCell" onClick={() => handleSort("DATE")}>DATE</p>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records?.map((r,i)=>
                                <tr key={i} className="py-2" style={{border:"#2a2c3e", fontSize:"14px",color:"white"}}>
                                    <td className="d-flex align-items-top">
                                        <div className="">
                                            <div className="smallHeadShot"
                                                style={{borderRadius:"5%",width:"40px",height:"55px",backgroundImage: `url(${playerBaseURL}${
                                                    r.player.player_id}.jpg)`,
                                                }}>
                                                    {
                                                        findLogo(r.player.team).l !==""?
                                                            <div className="displayOwnerLogoSM">
                                                                <img style={{width:"2.8em",left:"15px"}} alt="" src={findLogo(r.player.team).l}/>
                                                            </div>
                                                        :<></>
                                                    }
                                            </div> 
                                        </div>
                                        <div className="mx-2" style={{paddingLeft:".5em", }}>
                                            <p className="m-0" style={{color:sort==="PLAYER"?"#a9dfd8":""}}>{r.player.first_name} {r.player.last_name}</p>
                                            <p className="m-0 bold" style={{fontSize:"10px", color:"grey"}}>EXP {r.player.years_exp}</p>
                                        </div>
                                    </td>
                                    <td style={{color:sort==="AGE"?"#a9dfd8":""}}>{r.player.age}</td>
                                    <td style={{color:sort==="POSITION"?"#a9dfd8":""}}>{r.player.position}</td>
                                    <td style={{color:sort==="OWNER"?"#a9dfd8":""}}>{r.creator}</td>
                                    <td style={{color:sort==="BID"?"#a9dfd8":""}}>${r.settings.waiver_bid}</td>
                                    <td><p className="m-0" style={{color:sort==="DATE"?"#a9dfd8":""}}>{toDateTime(r.created)}</p></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}