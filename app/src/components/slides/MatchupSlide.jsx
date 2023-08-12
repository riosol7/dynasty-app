import React from "react";
import { Icon } from '@iconify/react';
import { findHistoryRoster, handleRostersBySzn } from "../../helpers";

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
    findPlayerByPts,
    findRecord,
    findWeeklyMatchups,
    foundHistory,
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
    weeklyMatch,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const playerBaseURL = process.env.REACT_APP_SLEEPER_PLAYER_THUMBS_BASE_URL || "https://sleepercdn.com/content/nfl/players/thumb/";
    const dummyAvatar = "8fcf0e0e6a75e96a591d2a4a4a400f41";

    const is18GameSeason = Number(weeklyMatch) > 2020;
    const history = foundHistory(id, weeklyMatch);
    const playoffLabel = history.s.playoff ? "Playoffs" : "Toilet Bowl";
    const weekLabel = is18GameSeason ? "Wk. 1 - 14" : "Wk. 1 - 13";
    const playoffWeekLabel = is18GameSeason ? "Wk. 15 - 17" : "Wk. 14 - 16";

    const foundAllPlayRecord = history?.s?.allPlayWk[idx]?.reduce((prev, current) => {return {w:prev.w + current.w, oW:prev.oW + current.oW}});

    const getTitle = () => {
        if (idx === 0) {
            return `Regular Season (${weekLabel})`;
        } else if ((idx === 14 && is18GameSeason) || (idx === 13 && !is18GameSeason)) {
            return `${playoffLabel} (${playoffWeekLabel})`;
        }
        return "";
    };

    const title = getTitle();
    const finals = m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 ? true : false;
    const semiFinals = m.filter(t => t.roster_id === Number(id))[0].matchup_id === 1 || m.filter(t => t.roster_id === Number(id))[0].matchup_id === 2 ? true : false;
    const seventhPlace = m.filter(t => t.roster_id === Number(id))[0].matchup_id === 6 ? true : false;
    const toiletBowl = m.filter(t => t.roster_id === Number(id))[0].matchup_id === 4 ? true : false;
    const exceptionCurrentOwnerAllPlayTotalRosters = handleRostersBySzn(weeklyMatch, league, processedRosters).length - 1;

    return (
        <div className="my-4"  style={{fontSize:"12px",width:"200px"}}>
            <div style={{position:"absolute", zIndex:"9999", top:"-2px", width:"205px", color:"#e9f0f2"}}>
                {title && (
                    <div className="">
                        <p className="m-0" style={WEEK_TITLE}>{title}</p>
                        <div style={UNDERLINE_TITLE_DIV}></div>
                    </div>
                )}
            </div>
            <div className="" style={{borderRadius:"2px 2px 0xp 0px",border:"none", background:"#0f0f0f"}}>
                {m.filter(t => t.roster_id === Number(id))[0].matchup_id === null ? // Weeks w/ no matchup
                    <div className="p-2">
                        <div className="mb-2 d-flex align-items-top bold" style={{fontSize:"11.5px"}}>
                            {(is18GameSeason && idx === 14 && playoffLabel === "Playoffs") || (!is18GameSeason && idx === 13 && playoffLabel === "Playoffs") ?
                                <p className="m-0">Divisional</p>
                            : (is18GameSeason && idx === 14 && playoffLabel === "Toilet Bowl") || (!is18GameSeason && idx === 13 && playoffLabel === "Toilet Bowl") ?
                                <p className="m-0">Bottom 6</p>
                            : is18GameSeason && idx === 16 ?
                                <p className="m-0">Week 17</p>
                            : !is18GameSeason && idx === 15 ?
                                <p className="m-0">Week 16</p>
                            :<></>
                            }
                        </div>
                        <div>
                            <div className="d-flex align-items-center justify-content-start mb-2">
                                <div className="d-flex align-items-center mx-2">
                                    <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${
                                        foundRoster?.owner?.avatar ? foundRoster.owner.avatar : dummyAvatar}`}
                                    />
                                </div>
                                <div style={{color:"#c9cfd1"}}> 
                                    {(is18GameSeason && idx === 14) || (!is18GameSeason && idx === 13) ?
                                        <p className="m-0">BYE Week</p>
                                    :
                                        <p className="m-0">Season Over</p>    
                                    }
                                </div>
                            </div>
                            {(playoffLabel === "Playoffs" && is18GameSeason && idx === 14) || (playoffLabel === "Playoffs" && !is18GameSeason && idx === 13) ?
                                <p className="m-0">Clinched Division {findHistoryRoster(id, weeklyMatch, league, processedRosters).settings.division} and Bye</p>            
                            :  
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="m-0">{findHistoryRoster(id, weeklyMatch, league, processedRosters)?.rank}
                                        {findHistoryRoster(id, weeklyMatch, league, processedRosters)?.rank === 1 ?
                                            <span>st </span>
                                        : findHistoryRoster(id, weeklyMatch, league, processedRosters)?.rank === 2 ?
                                            <span>nd </span>
                                        : findHistoryRoster(id, weeklyMatch, league, processedRosters)?.rank === 3 ?
                                            <span>rd </span>
                                        : <span>th </span>
                                        }overall
                                    </p>                                                    
                                    <p className="m-0">{findHistoryRoster(id, weeklyMatch, league, processedRosters).settings.wins}-{findHistoryRoster(id, weeklyMatch, league, processedRosters).settings.losses}</p>
                                </div>
                            }
                        </div>
                    </div>
                : // Matchup
                    <div>
                        <div className="p-2 d-flex justify-content-between align-items-top">
                            <div className="bold" style={{fontSize:"11.5px"}}>
                                {(is18GameSeason && idx < 14) || (!is18GameSeason && idx < 13) ?
                                    <p className="m-0">Week {idx + 1}</p>
                                : (is18GameSeason && idx === 14 && playoffLabel === "Playoffs") || (!is18GameSeason && idx === 13 && playoffLabel === "Playoffs") ?
                                    <p className="m-0">Divisional</p>
                                : (is18GameSeason && idx === 14 && playoffLabel === "Toilet Bowl") || (!is18GameSeason && idx === 13 && playoffLabel === "Toilet Bowl") ?
                                    <p className="m-0">Bottom 6</p>
                                : (is18GameSeason && idx === 15 && playoffLabel === "Playoffs" && semiFinals) || (!is18GameSeason && idx === 14 && playoffLabel === "Playoffs" && semiFinals) ?
                                    <p className="m-0">Semi Finals</p>
                                : (is18GameSeason && idx === 15 && playoffLabel === "Playoffs" && !semiFinals) || (!is18GameSeason && idx === 14 && playoffLabel === "Playoffs" && !semiFinals) ?
                                    <p className="m-0">5th Place Match</p>
                                : (is18GameSeason && idx === 15 && playoffLabel === "Toilet Bowl" && seventhPlace) || (!is18GameSeason && idx === 14 && playoffLabel === "Toilet Bowl" && seventhPlace) ?
                                    <p className="m-0">7th Place Match</p>
                                : (is18GameSeason && idx === 15 && playoffLabel === "Toilet Bowl" && !seventhPlace) || (!is18GameSeason && idx === 14 && playoffLabel === "Toilet Bowl" && !seventhPlace) ?
                                    <p className="m-0">Bottom 4</p>
                                : (is18GameSeason && idx === 16 && playoffLabel === "Playoffs" && finals) || (!is18GameSeason && idx === 15 && playoffLabel === "Playoffs" && finals) ?
                                    <p className="m-0">Finals</p>
                                : (is18GameSeason && idx === 16 && playoffLabel === "Playoffs" && !finals) || (!is18GameSeason && idx === 15 && playoffLabel === "Playoffs" && !finals) ?
                                    <p className="m-0">3rd Place Match</p>
                                : (is18GameSeason && idx === 16 && playoffLabel === "Toilet Bowl" && toiletBowl) || (!is18GameSeason && idx === 15 && playoffLabel === "Toilet Bowl" && toiletBowl) ?
                                    <p className="m-0">Finals</p>
                                : (is18GameSeason && idx === 16 && playoffLabel === "Toilet Bowl" && !toiletBowl) || (!is18GameSeason && idx === 15 && playoffLabel === "Toilet Bowl" && !toiletBowl) ?
                                    <p className="m-0">9th Place Match</p>
                                :<></>
                                }
                            </div>
                            <Icon icon="ic:outline-more-vert" onMouseOver={MouseOver} onMouseOut={MouseOut} 
                                onClick={() => openModal("Matchup", m.filter(t => t.roster_id !== Number(id))[0].roster_id, m)}style={{color:"#7f7f7f", fontSize:"1.4em"}}
                            />
                        </div>
                        <div className="d-flex align-items-center justify-content-start mb-2 px-2">
                            {m.filter(team => team.roster_id !== Number(id)).map((o, j) => 
                                <div key={j}>
                                    <div className="d-flex align-items-center">
                                        <p className="m-0" style={{color:"#c9cfd1"}}>vs</p>
                                        <div className="d-flex align-items-center mx-2">
                                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={
                                                `${avatarBaseURL}${findHistoryRoster(o.roster_id, weeklyMatch, league, processedRosters)?.owner?.avatar ? 
                                                    findHistoryRoster(o.roster_id, weeklyMatch, league, processedRosters).owner.avatar : dummyAvatar}`
                                            }/>
                                        </div>
                                        <p className="m-0 text-truncate" style={{maxWidth:"140px"}}>
                                        {findHistoryRoster(o.roster_id, weeklyMatch, league, processedRosters)?.owner?.team_name ?
                                            findHistoryRoster(o.roster_id, weeklyMatch, league, processedRosters).owner.team_name
                                        : findHistoryRoster(o.roster_id, weeklyMatch, league, processedRosters).owner?.display_name ?
                                            findHistoryRoster(o.roster_id, weeklyMatch, league, processedRosters).owner.display_name
                                        : null
                                        }</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="m-0 d-flex align-items-center justify-content-between px-2">
                            <div className="d-flex align-items-center justify-content-start">
                                {m[0].points === 0 && m[1].points === 0 ?
                                    <div>
                                        <p className="m-0"><span style={{color:"lightgray", fontWeight:"bold", paddingRight:"6px",}}>TBD</span>0<span className="mx-1" style={{color:"#698b87"}}>-</span>0</p>
                                    </div>
                                : m.map((team, index) => 
                                    <div key={index} className="d-flex">
                                        {index === 0 ?
                                            index === 0 && team.roster_id === Number(id) ?
                                                <p className="m-0 bold" style={{paddingRight:"6px", color:"#34d367"}}>W</p>
                                            :
                                                <p className="m-0 bold" style={{paddingRight:"6px", color:"#cc1d00"}}>L</p>
                                        :<></>
                                        }
                                        <div className="d-flex align-items-center">
                                            { index === 1 ? <span className="mx-1" style={{color:"#698b87"}}> - </span> : <></> }
                                            <p className="m-0">{team.points}</p>
                                        </div>
                                    </div>
                                )} 
                            </div>
                            <p className="m-0">
                                {findRecord(findWeeklyMatchups(), idx).w}
                                <span className="" style={{color:"whitesmoke"}}>-</span>
                                {findRecord(findWeeklyMatchups(), idx).l}
                            </p>
                        </div>
                        <div className="pt-2">
                            {m[0].points === 0 && m[1].points === 0 ?
                                <></>
                            : m.filter(t => t.roster_id === Number(id)).map((o, j) => 
                                <div key={j} style={(players.length > 0) ? {background:findLogo(findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).team || "FA").bgColor}:{}}>
                                    <div className="d-flex align-items-center" style={{borderRadius:"0px 0px 2px 2px"}}>
                                        <div style={findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                            {
                                                width:"65px", height:"50px", 
                                                backgroundPosition:"center",
                                                backgroundRepeat:"no-repeat",
                                                backgroundSize:"40px",
                                                backgroundImage:`url(${findLogo(findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                            }
                                        :
                                            {
                                                width:"65px", height:"50px", 
                                                backgroundPosition:"left top",
                                                backgroundRepeat:"no-repeat",
                                                backgroundSize:"40px",
                                                backgroundImage:`url(${findLogo(findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).team).l})`
                                            }
                                        }>
                                            {findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                <></>
                                            :   // Player Image
                                                <img src={`${playerBaseURL}${findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).player_id}.jpg`} 
                                                    alt="player" 
                                                    style={{width:"100%", height:"100%", objectFit:"cover"}}
                                                />
                                            }
                                        </div>
                                        <div className="mx-1">
                                            {findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).position === "DEF" ?
                                                <div>
                                                    <p className="m-0 bold text-truncate">
                                                        {findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).first_name} {findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).last_name} 
                                                    </p>
                                                    <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                </div>
                                            :
                                                <div>
                                                    <p className="m-0 bold text-truncate">{findPlayerByPts(o, o.starters_points.sort((a,b) => b - a)[0]).full_name}</p>
                                                    <p className="m-0" style={{fontSize:"11.5px"}}>scored {o.starters_points.sort((a,b) => b - a)[0]}pts</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="pt-2" style={{background:"black"}}>
                            {m[0].points === 0 && m[1].points === 0 ?
                                <></>
                            : (is18GameSeason && idx < 14) || (!is18GameSeason && idx < 13) ?
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex align-items-center">
                                            <Icon icon="material-symbols:arrow-drop-up-rounded" style={{color:"#42f3e9",fontSize:"2.5em"}}/>
                                            <p className="m-0">{foundAllPlayRecord?.w}</p>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Icon icon="material-symbols:arrow-drop-down-rounded" style={{color:"#f85012",fontSize:"2.5em"}}/>
                                            <p className="m-0">{foundAllPlayRecord?.oW}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        {m.map((team, index) => 
                                            <div key={index} className="d-flex align-items-center">
                                                {index === 0 ?
                                                    index === 0 && team.roster_id === Number(id) ?
                                                        roundToHundredth(100-(foundAllPlayRecord?.w/exceptionCurrentOwnerAllPlayTotalRosters)*100) !== 0 ?
                                                            <div className="d-flex align-items-center">
                                                                <p className="m-0 px-1">{roundToHundredth(100-(foundAllPlayRecord?.w/exceptionCurrentOwnerAllPlayTotalRosters)*100)}</p>
                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#289a5d"}}/>
                                                            </div>
                                                        : <Icon icon="fluent-emoji-flat:crown" style={{fontSize:"16px"}}/>
                                                    :
                                                        foundAllPlayRecord?.oW === exceptionCurrentOwnerAllPlayTotalRosters ?
                                                            <Icon icon="emojione-v1:pile-of-poo" style={{fontSize:"16px", color:"#724b21"}}/>
                                                        :
                                                            <div className="d-flex align-items-center">
                                                                <p className="m-0 px-1">{roundToHundredth(0-(foundAllPlayRecord?.w/exceptionCurrentOwnerAllPlayTotalRosters)*100)}</p>
                                                                <Icon icon="emojione-monotone:four-leaf-clover" style={{fontSize:"14px", color:"#dab0af"}}/>
                                                            </div>   
                                                :<></>
                                                }
                                            </div>
                                        )}
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