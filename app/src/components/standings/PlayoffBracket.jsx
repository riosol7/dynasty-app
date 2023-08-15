import React from "react";
import { Icon } from "@iconify/react";
import { findHistoryRoster } from "../../helpers";


export default function PlayoffBracket({
    findRosterByID,
    foundHistory,
    handleRostersBySzn,
    league,
    processedRosters,
    selectSzn,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";

    return (
        selectSzn===league.season?
            <div>
                <div className="d-flex align-items-center">
                    <div className="">
                        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                            <div className="p-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{handleRostersBySzn(selectSzn, league, processedRosters)[0].rank}</p>
                                        <div className="mx-2">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${handleRostersBySzn(selectSzn, league, processedRosters)[0].owner.avatar}`}/>
                                        </div>
                                        <p className="m-0 bold" style={{}}>{handleRostersBySzn(selectSzn, league, processedRosters)[0].owner.display_name}</p>
                                    </div>
                                    <p className="m-0" style={{fontWeight:"lighter"}}>BYE</p>
                                </div>
                            </div>
                        </div>
                        {    
                            league.brackets && league.brackets.winner.filter(g=>g.r===1).map((g,q)=>
                                <div key={q} className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                                    <div>
                                    <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                                        {
                                            findRosterByID(g.l) && findRosterByID(g.w).owner?
                                                <div className="p-3">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findRosterByID(g.w).rank}</p>
                                                            <div className="mx-2">
                                                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(g.w).owner.avatar}`}/>
                                                            </div>
                                                            <p className="m-0 bold text-truncate" style={{}}>{findRosterByID(g.w).owner.display_name}</p>
                                                        </div>
                                                        <p className="m-0 bold">{foundHistory(g.w,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.w)[0].points}</p> 
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between pt-3">
                                                        <div className="d-flex align-items-center">
                                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findRosterByID(g.l).rank}</p>
                                                            <div className="mx-2">
                                                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(g.l).owner.avatar}`}/>
                                                            </div>
                                                            <p className="m-0" style={{}}><s>{findRosterByID(g.l).owner.display_name}</s></p>
                                                        </div>
                                                        <p className="m-0">{foundHistory(g.l,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.l)[0].points}</p>
                                                    </div>
                                                </div>
                                            :<></>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div className="my-3" style={{background:"#111111", borderRadius:"4px"}}>
                            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                            <div className="p-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{handleRostersBySzn(selectSzn, league, processedRosters)[2].rank}</p>
                                        <div className="mx-2">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${handleRostersBySzn(selectSzn, league, processedRosters)[2].owner.avatar}`}/>
                                        </div>
                                        <p className="m-0 bold">{handleRostersBySzn(selectSzn, league, processedRosters)[2].owner.display_name}</p>
                                    </div>
                                    <p className="m-0" style={{fontWeight:"lighter"}}>BYE</p>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4">
                        {    
                            league.brackets && league.brackets.winner.filter(g=>g.r===2).map((g,q)=>
                                <div key={q} className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                                    <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>
                                        {
                                            q===2?
                                            "5th Place Match":"Semifinal"
                                        }
                                    </p>
                                    {
                                        findRosterByID(g.l) && findRosterByID(g.w).owner?
                                            <div className="p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findRosterByID(g.w).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(g.w).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0 bold text-truncate" style={{}}>{findRosterByID(g.w).owner.display_name}</p>
                                                    </div>
                                                    <p className="m-0 bold">{
                                                        foundHistory(g.w).c.playoffMatchups[15] && 
                                                        foundHistory(g.w).c.playoffMatchups[15].filter(t=>t.roster_id===g.w)[0].points
                                                    }</p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between pt-3">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findRosterByID(g.l).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(g.l).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0" style={{}}><s>{findRosterByID(g.l).owner.display_name}</s></p>
                                                    </div>
                                                    <p className="m-0">{
                                                            foundHistory(g.l).c.playoffMatchups[15] && 
                                                            foundHistory(g.l).c.playoffMatchups[15].filter(t=>t.roster_id===g.l)[0].points
                                                    }</p>
                                                </div>
                                            </div>
                                        :<></>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className="">
                        {    
                            league.brackets && league.brackets.winner.filter(g=>g.r===3).map((g,q)=>
                                <div key={q} className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                                    <div className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>
                                        {
                                            q===1?
                                                <p className="m-0 d-flex align-items-center justify-content-center">3rd Place Match <Icon icon="noto-v1:3rd-place-medal" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>
                                            :
                                                <p className="m-0 d-flex align-items-center justify-content-center">Final <Icon icon="noto-v1:trophy" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>
                                        }
                                    </div>
                                    {
                                        findRosterByID(g.l) && findRosterByID(g.w).owner?
                                            <div className="p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findRosterByID(g.w).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(g.w).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0 bold text-truncate" style={{}}>{findRosterByID(g.w).owner.display_name}</p>
                                                    </div>
                                                    <p className="m-0 bold">{
                                                            foundHistory(g.w).c.playoffMatchups[16] && 
                                                            foundHistory(g.w).c.playoffMatchups[16].filter(t=>t.roster_id===g.w)[0].points
                                                    }</p>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between pt-3">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findRosterByID(g.l).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findRosterByID(g.l).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0" style={{}}><s>{findRosterByID(g.l).owner.display_name}</s></p>
                                                    </div>
                                                    <p className="m-0">{
                                                     foundHistory(g.l).c.playoffMatchups[16] && 
                                                     foundHistory(g.l).c.playoffMatchups[16].filter(t=>t.roster_id===g.l)[0].points
                                                    }</p>
                                                </div>
                                            </div>
                                        :<></>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        :
            <div>
                <div className="d-flex align-items-center">
                    <div className="">
                        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                            <div className="p-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{handleRostersBySzn(selectSzn, league, processedRosters).filter(r=>r.settings.division===2)[0].rank}</p>
                                        <div className="mx-2">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`https://sleepercdn.com/avatars/thumbs/${handleRostersBySzn(selectSzn, league, processedRosters).filter(r=>r.settings.division===2)[0].owner.avatar}`}/>
                                        </div>
                                        <p className="m-0 bold" style={{}}>{handleRostersBySzn(selectSzn, league, processedRosters).filter(r=>r.settings.division===2)[0].owner.display_name}</p>
                                    </div>
                                    <p className="m-0" style={{fontWeight:"lighter"}}>BYE</p>
                                </div>
                            </div>
                        </div>
                        {    
                            league.history.filter(l=>l.year===selectSzn)[0].league.brackets.winner.bracket.filter(g=>g.r===1).map((g,q)=>
                                <div key={q} className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                                    <div>
                                    <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                                        {
                                            findHistoryRoster(g.l, selectSzn, league, processedRosters).owner && findHistoryRoster(g.w, selectSzn, league, processedRosters).owner?
                                                <div className="p-3">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="d-flex align-items-center">
                                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findHistoryRoster(g.w, selectSzn, league, processedRosters).rank}</p>
                                                            <div className="mx-2">
                                                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findHistoryRoster(g.w, selectSzn, league, processedRosters).owner.avatar}`}/>
                                                            </div>
                                                            <p className="m-0 bold text-truncate" style={{}}>{findHistoryRoster(g.w, selectSzn, league, processedRosters).owner.display_name}</p>
                                                        </div>
                                                        {
                                                            Number(selectSzn) > 2020?
                                                                <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.w)[0].points}</p>
                                                            :
                                                                <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[13].filter(t=>t.roster_id===g.w)[0].points}</p>
                                                        }
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between pt-3">
                                                        <div className="d-flex align-items-center">
                                                            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findHistoryRoster(g.l, selectSzn, league, processedRosters).rank}</p>
                                                            <div className="mx-2">
                                                                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findHistoryRoster(g.l, selectSzn, league, processedRosters).owner.avatar}`}/>
                                                            </div>
                                                            <p className="m-0" style={{}}><s>{findHistoryRoster(g.l, selectSzn, league, processedRosters).owner.display_name}</s></p>
                                                        </div>
                                                        {
                                                            Number(selectSzn) > 2020?
                                                                <p className="m-0">{foundHistory(g.l,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.l)[0].points}</p>
                                                            :
                                                                <p className="m-0">{foundHistory(g.l,selectSzn).s.playoffMatchups[13].filter(t=>t.roster_id===g.l)[0].points}</p>
                                                        }
                                                    </div>
                                                </div>
                                            :<></>
                                        }
                                    </div>
                                </div>
                            )
                        }
                        <div className="my-3" style={{background:"#111111", borderRadius:"4px"}}>
                            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                            <div className="p-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{handleRostersBySzn(selectSzn, league, processedRosters).filter(r=>r.settings.division===1)[0].rank}</p>
                                        <div className="mx-2">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${handleRostersBySzn(selectSzn, league, processedRosters).filter(r=>r.settings.division===1)[0].owner.avatar}`}/>
                                        </div>
                                        <p className="m-0 bold" style={{}}>{handleRostersBySzn(selectSzn, league, processedRosters).filter(r=>r.settings.division===1)[0].owner.display_name}</p>
                                    </div>
                                    <p className="m-0" style={{fontWeight:"lighter"}}>BYE</p>
                               </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4">
                        {    
                            league.history.filter(l=>l.year===selectSzn)[0].league.brackets.winner.bracket.filter(g=>g.r===2).map((g,q)=>
                                <div key={q} className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                                    <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>
                                        {
                                            q===2?
                                            "5th Place Match":"Semifinal"
                                        }
                                    </p>
                                    {
                                        findHistoryRoster(g.l, selectSzn, league, processedRosters).owner && findHistoryRoster(g.w, selectSzn, league, processedRosters).owner?
                                            <div className="p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findHistoryRoster(g.w, selectSzn, league, processedRosters).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findHistoryRoster(g.w, selectSzn, league, processedRosters).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0 bold text-truncate" style={{}}>{findHistoryRoster(g.w, selectSzn, league, processedRosters).owner.display_name}</p>
                                                    </div>
                                                    {
                                                        Number(selectSzn) <= 2020?
                                                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id===g.w || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id===g.w?
                                                                <p className="m-0 bold">{
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[13] &&
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[13].filter(t=>t.roster_id===g.w)[0].points
                                                                }</p>
                                                            :
                                                                <p className="m-0 bold">{
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[14] &&
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.w)[0].points
                                                                }</p>
                                                        : <p className="m-0 bold">{
                                                            foundHistory(g.w,selectSzn).s.playoffMatchups[15] && 
                                                            foundHistory(g.w,selectSzn).s.playoffMatchups[15].filter(t=>t.roster_id===g.w)[0].points
                                                        }</p>
                                                    }
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between pt-3">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findHistoryRoster(g.l, selectSzn, league, processedRosters).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findHistoryRoster(g.l, selectSzn, league, processedRosters).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0" style={{}}><s>{findHistoryRoster(g.l, selectSzn, league, processedRosters).owner.display_name}</s></p>
                                                    </div>
                                                    {
                                                        Number(selectSzn) <= 2020?
                                                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id===g.l || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id===g.l?
                                                                <p className="m-0">{
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[13] &&
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[13].filter(t=>t.roster_id===g.l)[0].points
                                                                }</p>
                                                            :
                                                                <p className="m-0">{
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[14] &&
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.l)[0].points
                                                                }</p>
                                                        : <p className="m-0">{
                                                            foundHistory(g.l,selectSzn).s.playoffMatchups[15] && 
                                                            foundHistory(g.l,selectSzn).s.playoffMatchups[15].filter(t=>t.roster_id===g.l)[0].points
                                                        }</p>
                                                    }
                                                </div>
                                            </div>
                                        :<></>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className="">
                        {    
                            league.history.filter(l=>l.year===selectSzn)[0].league.brackets.winner.bracket.filter(g=>g.r===3).map((g,q)=>
                                <div key={q} className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
                                    <div className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>
                                        {
                                            q===1?
                                                <p className="m-0 d-flex align-items-center justify-content-center">3rd Place Match <Icon icon="noto-v1:3rd-place-medal" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>
                                            :
                                                <p className="m-0 d-flex align-items-center justify-content-center">Final <Icon icon="noto-v1:trophy" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>
                                        }
                                    </div>
                                    {
                                        findHistoryRoster(g.l, selectSzn, league, processedRosters).owner && findHistoryRoster(g.w, selectSzn, league, processedRosters).owner?
                                            <div className="p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findHistoryRoster(g.w, selectSzn, league, processedRosters).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findHistoryRoster(g.w, selectSzn, league, processedRosters).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0 bold text-truncate" style={{}}>{findHistoryRoster(g.w, selectSzn, league, processedRosters).owner.display_name}</p>
                                                    </div>
                                                    {
                                                        Number(selectSzn) <= 2020?
                                                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id===g.w || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id===g.w?
                                                                <p className="m-0 bold">{
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[14] &&
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.w)[0].points
                                                                }</p>
                                                            :
                                                                <p className="m-0 bold">{
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[15] &&
                                                                    foundHistory(g.w,selectSzn).s.playoffMatchups[15].filter(t=>t.roster_id===g.w)[0].points
                                                                }</p>
                                                        : <p className="m-0 bold">{
                                                            foundHistory(g.w,selectSzn).s.playoffMatchups[16] && 
                                                            foundHistory(g.w,selectSzn).s.playoffMatchups[16].filter(t=>t.roster_id===g.w)[0].points
                                                        }</p>
                                                    }
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between pt-3">
                                                    <div className="d-flex align-items-center">
                                                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{findHistoryRoster(g.l, selectSzn, league, processedRosters).rank}</p>
                                                        <div className="mx-2">
                                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${findHistoryRoster(g.l, selectSzn, league, processedRosters).owner.avatar}`}/>
                                                        </div>
                                                        <p className="m-0" style={{}}><s>{findHistoryRoster(g.l, selectSzn, league, processedRosters).owner.display_name}</s></p>
                                                    </div>
                                                    {
                                                        Number(selectSzn) <= 2020?
                                                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id===g.l || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id===g.l?
                                                                <p className="m-0">{
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[14] &&
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[14].filter(t=>t.roster_id===g.l)[0].points
                                                                }</p>
                                                            :
                                                                <p className="m-0">{
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[15] &&
                                                                    foundHistory(g.l,selectSzn).s.playoffMatchups[15].filter(t=>t.roster_id===g.l)[0].points
                                                                }</p>
                                                        : <p className="m-0">{
                                                            foundHistory(g.l,selectSzn).s.playoffMatchups[16] && 
                                                            foundHistory(g.l,selectSzn).s.playoffMatchups[16].filter(t=>t.roster_id===g.l)[0].points
                                                        }</p>
                                                    }
                                                </div>
                                            </div>
                                        :<></>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
                
    )
}
