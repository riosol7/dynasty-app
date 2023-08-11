import React from "react";
import { Icon } from '@iconify/react';
import { handleRostersBySzn } from "../../helpers";

const UNDERLINE_TITLE_DIV = {
    width:"205px",
    height:"1.5px",
    background:"linear-gradient(360deg, rgba(116,178,221,1) 0%, rgba(114,202,224,1) 20%, rgba(51,193,189,1) 50%, rgba(80,204,147,1) 100%)",
    borderRadius:"0px 0px 18px 0px",
}

const WEEK_TITLE = {
    fontSize:"11.5px", 
    paddingBottom:"2px"
}

export default function MatchupSlide({
    findLogo,
    findRecord,
    findRosterByID,
    findWeeklyMatchups,
    foundHistory,
    foundMyMatchups,
    foundPlayer,
    foundRoster,
    id,
    idx,
    league,
    m,
    MouseOut,
    MouseOver,
    openModal,
    players,
    processedRosters,
    roundToHundredth,
    weeklyMatch
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const playerBaseURL = process.env.REACT_APP_SLEEPER_PLAYER_THUMBS_BASE_URL || "https://sleepercdn.com/content/nfl/players/thumb/";
    const dummyAvatar = "8fcf0e0e6a75e96a591d2a4a4a400f41";

    const foundCurrentAllPlayRecord = foundHistory(id)?.c?.allPlayWk[idx]?.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}});
    const foundHistoryAllPlayRecord = foundHistory(id, weeklyMatch)?.s?.allPlayWk[idx]?.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}});
    return (
        <div className="my-4"  style={{fontSize:"12px",width:"200px"}}>
            <div style={{position:"absolute", zIndex:"9999", top:"-2px", width:"205px", color:"#e9f0f2"}}>
                {
                    Number(weeklyMatch) > 2020 ?
                        idx === 0 ?
                            <div className="">
                                <p className="m-0" style={WEEK_TITLE}>Regular Season (Wk. 1 - 14)</p>
                                <div style={UNDERLINE_TITLE_DIV}></div>
                            </div>
                        : idx === 14 ?
                            weeklyMatch === league.season ?
                                // Current season, determine whether the team made the playoffs or not
                                foundHistory(id).c.playoff === true ?
                                    <div className="">
                                        <p className="m-0" style={WEEK_TITLE}>Playoffs (Wk. 15 - 17)</p>
                                        <div style={UNDERLINE_TITLE_DIV}></div>
                                    </div> 
                                :
                                    <div className="">
                                        <p className="m-0" style={WEEK_TITLE}>Toilet Bowl (Wk. 15 - 17)</p>
                                        <div style={UNDERLINE_TITLE_DIV}></div>
                                    </div> 
                            :   // Past seasons, determine whether the team made the playoffs or not
                                foundHistory(id, weeklyMatch).s.playoff === true ?
                                    <div className="">
                                        <p className="m-0" style={WEEK_TITLE}>Playoffs (Wk. 15 - 17)</p>
                                        <div style={UNDERLINE_TITLE_DIV}></div>
                                    </div> 
                                :
                                    <div className="">
                                        <p className="m-0" style={WEEK_TITLE}>Toilet Bowl (Wk. 15 - 17)</p>
                                        <div style={UNDERLINE_TITLE_DIV}></div>
                                    </div> 
                        :<></>
                    :   // Seasons before 2020 Wks 1 - 16
                        idx === 0 ?
                            <div className="">
                                <p className="m-0" style={WEEK_TITLE}>Regular Season (Wk. 1 - 13)</p>
                                <div style={UNDERLINE_TITLE_DIV}></div>
                            </div>
                        : idx === 13 ?
                            foundHistory(id, weeklyMatch).s.playoff === true ?
                                <div className="">
                                    <p className="m-0" style={WEEK_TITLE}>Playoffs (Wk. 14 - 16)</p>
                                    <div style={UNDERLINE_TITLE_DIV}></div>
                                </div> 
                            :
                                <div className="">
                                    <p className="m-0" style={WEEK_TITLE}>Toilet Bowl (Wk. 14 - 16)</p>
                                    <div style={UNDERLINE_TITLE_DIV}></div>
                                </div> 
                        :<></>
                }
            </div>
            <div className="" style={{borderRadius:"2px 2px 0xp 0px",border:"none", background:"#0f0f0f"}}>
                {   // Weeks w/ no matchup
                    m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                        <div className="p-2">
                            <div className="mb-2 d-flex align-items-top">
                                <div style={{fontSize:"11.5px"}}>
                                    {   // 18 Game Season
                                        Number(weeklyMatch) > 2020 ?
                                            idx  === 14 ?
                                                weeklyMatch === league.season ?
                                                    foundHistory(id).c.playoff === true ?
                                                        <p className="m-0 bold">Divisional</p>
                                                    : <p className="m-0 bold">Bottom 6</p>
                                                :
                                                    foundHistory(id,weeklyMatch).s.playoff === true ?
                                                        <p className="m-0 bold">Divisional</p>
                                                    : <p className="m-0 bold">Bottom 6</p>
                                            : idx  === 16 ?
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                    <p className="m-0 bold">Finals</p>
                                                : m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                                                    <p className="m-0 bold">Week 17</p>
                                                :  
                                                    <p className="m-0 bold"></p>
                                            :<></>
                                        // 17 Game Season
                                        : idx  === 13 ?
                                            foundHistory(id,weeklyMatch).s.playoff === true ?
                                                <p className="m-0 bold">Divisional</p>
                                            : <p className="m-0 bold">Bottom 6</p>
                                        : idx  === 15 ?
                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                <p className="m-0 bold">Finals</p>
                                            : m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ?
                                                <p className="m-0 bold">Week 17</p>
                                            :  
                                                <p className="m-0 bold"></p>
                                        :<></>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="d-flex align-items-center justify-content-start mb-2">
                                    <div className="d-flex align-items-center mx-2">
                                        <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${
                                            foundRoster?.owner?.avatar ? foundRoster.owner.avatar : dummyAvatar}`}
                                        />
                                    </div>
                                    {   // 18 Game Season
                                        Number(weeklyMatch) > 2020 ?
                                            idx === 14 ?
                                                <p className="m-0" style={{color:"#c9cfd1"}}>BYE Week</p>
                                            : weeklyMatch === league.season ?
                                                foundHistory(id).c.playoff === false ?   
                                                    <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                                : <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                            : foundHistory(id,weeklyMatch).s.playoff === false ?   
                                                <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                            : <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                        // 17 Game Season
                                        : idx === 13 ?
                                            <p className="m-0" style={{color:"#c9cfd1"}}>BYE Week</p>
                                        : foundHistory(id,weeklyMatch).s.playoff === false ?   
                                            <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                        : <p className="m-0" style={{color:"#c9cfd1"}}>Season Over</p>
                                    }
                                </div>
                                {
                                    weeklyMatch === league.season ?
                                        foundHistory(id).c.playoff === true ?
                                            idx === 14 ? 
                                                <p className="m-0">Clinched Division {foundRoster.settings.division} and Bye</p>
                                            :  
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <p className="m-0">{foundRoster.rank}th overall</p>
                                                    <p className="m-0">{foundRoster.settings.wins}-{foundRoster.settings.losses}</p>
                                                </div>
                                        : 
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="m-0">{foundRoster.rank}th overall</p>
                                                <p className="m-0">{foundRoster.settings.wins}-{foundRoster.settings.losses}</p>
                                            </div>
                                    : foundHistory(id, weeklyMatch).s.playoff === true ?
                                        idx === 14 ? 
                                            <p className="m-0">Clinched Division {findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters)).settings.division} and Bye</p>
                                        :  
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="m-0">{findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters)).rank}th overall</p>
                                                <p className="m-0">{findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters)).settings.wins}-{findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters)).settings.losses}</p>
                                            </div>
                                    : 
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="m-0">{findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters))?.rank}th overall</p>
                                            <p className="m-0">{findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters))?.settings.wins}-{findRosterByID(id, handleRostersBySzn(weeklyMatch, league, processedRosters))?.settings.losses}</p>
                                        </div>
                                }
                            </div>
                        </div>
                    :
                        <div>
                            <div className="p-2 d-flex justify-content-between align-items-top">
                                <div style={{fontSize:"11.5px"}}>
                                    {   // 18 Game Season
                                        Number(weeklyMatch) > 2020 ?
                                            idx < 14 ?
                                                <p className="m-0 bold">Week {idx + 1}</p>
                                            : foundHistory(id,weeklyMatch).s.playoff === true || foundHistory(id).c.playoff === true ?
                                                idx  === 14 ?
                                                    <p className="m-0 bold">Divisional</p>
                                                : idx  === 15 ?
                                                    m.filter(t => t.roster_id === Number(id))[0].matchup_id === 3 ?
                                                        <p className="m-0 bold">5th Place Match</p>
                                                    :
                                                        <p className="m-0 bold">Semi Finals</p>
                                                : idx  === 16 ?
                                                    m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                        <p className="m-0 bold">Finals</p>
                                                    : 
                                                        <p className="m-0 bold">3rd Place Match</p>
                                                :<></>
                                            : idx  === 14 ?
                                                <p className="m-0 bold">Bottom 6</p>
                                            : idx  === 15 ?
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 6 ?
                                                    <p className="m-0 bold">7th Place Match</p>
                                                : 
                                                    <p className="m-0 bold">Bottom 4</p>
                                            : idx  === 16 ?
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 4 ?
                                                    <p className="m-0 bold">Toilet Bowl</p>
                                                : 
                                                    <p className="m-0 bold">9th Place Match</p>
                                            :<></>
                                        // 17 Game Season
                                        : idx < 13 ?
                                            <p className="m-0 bold">Week {idx + 1}</p>
                                        : foundHistory(id,weeklyMatch).s.playoff === true ?
                                            idx === 13 ?
                                                <p className="m-0 bold">Divisional</p>
                                            : idx === 14 ?
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 3 ?
                                                    <p className="m-0 bold">5th Place Match</p>
                                                :
                                                    <p className="m-0 bold">Semi Finals</p>
                                            : idx === 15 ?
                                                m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ?
                                                    <p className="m-0 bold">Finals</p>
                                                : 
                                                    <p className="m-0 bold">3rd Place Match</p>
                                            :<></>
                                        : idx  === 13 ?
                                            <p className="m-0 bold">Bottom 6</p>
                                        : idx  === 14 ?
                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 6 ?
                                                <p className="m-0 bold">7th Place Match</p>
                                            : 
                                                <p className="m-0 bold">Bottom 4</p>
                                        : idx  === 15 ?
                                            m.filter(t => t.roster_id === Number(id))[0].matchup_id === 4 ?
                                                <p className="m-0 bold">Toilet Bowl</p>
                                            : 
                                                <p className="m-0 bold">9th Place Match</p>
                                        :<></>
                                    }
                                </div>
                                <Icon icon="ic:outline-more-vert" onMouseOver={MouseOver} onMouseOut={MouseOut} 
                                    onClick={() => openModal("Matchup", m.filter(t => t.roster_id !== Number(id))[0].roster_id, m)}style={{color:"#7f7f7f", fontSize:"1.4em"}}
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-start mb-2 px-2">
                                {
                                    m.filter(team => team.roster_id !== Number(id)).map((o, j) => 
                                        <div key={j}>
                                            <div className="d-flex align-items-center">
                                                <p className="m-0" style={{color:"#c9cfd1"}}>vs</p>
                                                <div className="d-flex align-items-center mx-2">
                                                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={
                                                        `${avatarBaseURL}${findRosterByID(o.roster_id, handleRostersBySzn(weeklyMatch, league, processedRosters))?.owner?.avatar ? 
                                                            findRosterByID(o.roster_id, handleRostersBySzn(weeklyMatch, league, processedRosters)).owner.avatar : dummyAvatar}`
                                                    }/>
                                                </div>
                                                <p className="m-0 text-truncate" style={{maxWidth:"140px"}}>{
                                                    findRosterByID(o.roster_id, handleRostersBySzn(weeklyMatch, league, processedRosters))?.owner?.team_name ?
                                                        findRosterByID(o.roster_id, handleRostersBySzn(weeklyMatch, league, processedRosters)).owner.team_name
                                                    : findRosterByID(o.roster_id, handleRostersBySzn(weeklyMatch, league, processedRosters)).owner?.display_name ?
                                                        findRosterByID(o.roster_id, handleRostersBySzn(weeklyMatch, league, processedRosters)).owner.display_name
                                                    : null
                                                }</p>
                                            </div>
                                            
                                        </div>
                                    )
                                }
                            </div>
                            <div className="m-0 d-flex align-items-center justify-content-between px-2">
                                <div className="d-flex align-items-center justify-content-start">
                                    {
                                        m.map((team, index) => 
                                            <div key={index} className="d-flex">
                                                {
                                                    index === 0 ?
                                                        index === 0 && team.roster_id === Number(id) ?
                                                            <p className="m-0 bold" style={{paddingRight:"6px", color:"#34d367"}}>W</p>
                                                        :
                                                            <p className="m-0 bold" style={{paddingRight:"6px", color:"#cc1d00"}}>L</p>
                                                    :<></>
                                                }
                                                <div className="d-flex align-items-center">
                                                    {
                                                        index === 1 ?
                                                        <span className="mx-1" style={{color:"#698b87"}}> - </span>:<></>
                                                    }
                                                    <p className="m-0">{team.points}</p>
                                                </div>
                                            </div>
                                        )
                                    } 
                                </div>
                                <p className="m-0">
                                    {findRecord(weeklyMatch === league.season ? foundMyMatchups : findWeeklyMatchups(), idx).w}
                                    <span className="" style={{color:"whitesmoke"}}>-</span>
                                    {findRecord(weeklyMatch === league.season ? foundMyMatchups : findWeeklyMatchups(), idx).l}
                                </p>
                            </div>
                            <div className="pt-2">
                                {
                                    m.filter(t => t.roster_id === Number(id)).map((o, j) => 
                                        <div key={j} style={(players.length > 0) ?{background:findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team || "FA").bgColor}:{}}>
                                            <div className="d-flex align-items-center" style={{borderRadius:"0px 0px 2px 2px"}}>
                                                <div style={foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                        {
                                                            width:"65px", height:"50px", 
                                                            backgroundPosition:"center",
                                                            backgroundRepeat:"no-repeat",
                                                            backgroundSize:"40px",
                                                            backgroundImage:`url(${findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                                        }
                                                    :
                                                        {
                                                            width:"65px", height:"50px", 
                                                            backgroundPosition:"left top",
                                                            backgroundRepeat:"no-repeat",
                                                            backgroundSize:"40px",
                                                            backgroundImage:`url(${findLogo(foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                                        }
                                                }>
                                                    {   
                                                        foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                            <></>
                                                        :   // Player Image
                                                            <img src={`${playerBaseURL}${foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).player_id}.jpg`} 
                                                                alt="player" 
                                                                style={{width:"100%", height:"100%", objectFit:"cover"}}
                                                            />
                                                    }
                                                </div>
                                                <div className="mx-1">
                                                    {
                                                        foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                            <div>
                                                                <p className="m-0 bold text-truncate">
                                                                    {foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).first_name} {foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).last_name} 
                                                                </p>
                                                                <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                            </div>
                                                        :
                                                            <div>
                                                                <p className="m-0 bold text-truncate">{foundPlayer(o, o.starters_points.sort((a,b) => b - a)[0]).full_name}</p>
                                                                <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="pt-2" style={{background:"black"}}>
                                {
                                    weeklyMatch === league.season && idx < 14 ? 
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="material-symbols:arrow-drop-up-rounded" style={{color:"#42f3e9",fontSize:"2.5em"}}/>
                                                    <p className="m-0">{foundCurrentAllPlayRecord?.w}</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="material-symbols:arrow-drop-down-rounded" style={{color:"#f85012",fontSize:"2.5em"}}/>
                                                    <p className="m-0">{foundCurrentAllPlayRecord?.oW}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    m.map((team, index) => 
                                                        <div key={index}>
                                                            {
                                                                index === 0 ?
                                                                    index === 0 && team.roster_id === Number(id) ?
                                                                        roundToHundredth(100-(foundCurrentAllPlayRecord?.w/11)*100)!==0?
                                                                            <div className="d-flex align-items-center">
                                                                                <p className="m-0 px-1" style={{}}>
                                                                                    {roundToHundredth(100-(foundCurrentAllPlayRecord?.w/11)*100)}
                                                                                </p>
                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#289a5d"}}/>
                                                                            </div>
                                                                        : <Icon icon="fluent-emoji-flat:crown" style={{fontSize:"14px"}}/>
                                                                            
                                                                    :
                                                                        foundCurrentAllPlayRecord?.oW === 11 ?
                                                                            <Icon icon="emojione-v1:pile-of-poo" style={{fontSize:"16px", color:"#724b21"}}/>
                                                                        :
                                                                            <div className="d-flex align-items-center">
                                                                                <p className="m-0 px-1" style={{}}>
                                                                                    {roundToHundredth(0-(foundCurrentAllPlayRecord?.w/11)*100)}                                                                                                   
                                                                                </p>
                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#dab0af"}}/>
                                                                            </div>   
                                                                :<></>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>                                              
                                    : (Number(weeklyMatch) > 2020 && idx < 14) || (Number(weeklyMatch) <= 2020 && idx < 13) ?
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="material-symbols:arrow-drop-up-rounded" style={{color:"#42f3e9",fontSize:"2.5em"}}/>
                                                    <p className="m-0">{foundHistoryAllPlayRecord?.w}</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Icon icon="material-symbols:arrow-drop-down-rounded" style={{color:"#f85012",fontSize:"2.5em"}}/>
                                                    <p className="m-0">{foundHistoryAllPlayRecord?.oW}</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                {
                                                    m.map((team, index) => 
                                                        <div key={index} className="d-flex align-items-center">
                                                            {
                                                                index === 0 ?
                                                                    index === 0 && team.roster_id === Number(id) ?
                                                                        roundToHundredth(100-(foundHistoryAllPlayRecord?.w/11)*100)!==0?
                                                                            <div className="d-flex align-items-center">
                                                                                <p className="m-0 px-1" style={{}}>
                                                                                    {roundToHundredth(100-(foundHistoryAllPlayRecord?.w/11)*100)}
                                                                                </p>
                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#289a5d"}}/>
                                                                            </div>
                                                                        : <Icon icon="fluent-emoji-flat:crown" style={{fontSize:"16px"}}/>
                                                                    :
                                                                        foundHistoryAllPlayRecord?.oW === 11 ?
                                                                            <Icon icon="emojione-v1:pile-of-poo" style={{fontSize:"16px", color:"#724b21"}}/>
                                                                        :
                                                                            <div className="d-flex align-items-center">
                                                                                <p className="m-0 px-1" style={{}}>
                                                                                    {roundToHundredth(0-(foundHistoryAllPlayRecord?.w/11)*100)}                                                                                                   
                                                                                </p>
                                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#dab0af"}}/>
                                                                            </div>   
                                                                :<></>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    :<></>
                                }
                            </div>
                        </div>
                } 
            </div>
        </div>
    )
}