import React from "react";
import { Icon } from "@iconify/react";
import { findHistoryRoster } from "../../helpers";

function QuarterfinalByeWeek({avatarBaseURL, roster}) {
    return (
        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
            <div className="p-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{roster.rank}</p>
                        <div className="mx-2">
                            <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${roster.owner.avatar}`}/>
                        </div>
                        <p className="m-0 bold">{roster.owner.display_name}</p>
                    </div>
                    <p className="m-0" style={{fontWeight:"lighter"}}>BYE</p>
                </div>
            </div>
        </div>
    )
}

function Roster({avatarBaseURL, roster, type}) {
    return (
        <div className="d-flex align-items-center">
            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{roster.rank}</p>
            <div className="mx-2">
                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${roster.owner.avatar}`}/>
            </div>
            {type === "w" ?
                <p className="m-0 bold text-truncate">{roster.owner.display_name}</p>
            :  <p className="m-0"><s>{roster.owner.display_name}</s></p>
            }
        </div>
    )
}

function RoundOneMatchup({avatarBaseURL, foundHistory, g, league, processedRosters, selectSzn,}) {
    return (
        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
            <div>
                <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", borderRadius:"4px 4px 0px 0px"}}>Quarterfinal</p>
                {findHistoryRoster(g.l, selectSzn, league, processedRosters)?.owner && findHistoryRoster(g.w, selectSzn, league, processedRosters)?.owner ?
                    <div className="p-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.w, selectSzn, league, processedRosters)} type={"w"}/>
                            {Number(selectSzn) > 2020 ?
                                <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[14]?.filter(t => t.roster_id === g.w)[0].points}</p>
                            :
                                <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[13]?.filter(t => t.roster_id === g.w)[0].points}</p>
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-between pt-3">
                            <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.l, selectSzn, league, processedRosters)} type={"l"}/>
                            {Number(selectSzn) > 2020 ?
                                <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[14]?.filter(t=> t.roster_id === g.l)[0].points}</p>
                            :
                                <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[13]?.filter(t=> t.roster_id === g.l)[0].points}</p>
                            }
                        </div>
                    </div>
                :<></>
                }
            </div>
        </div>
    )
}

function RoundTwoMatchup({avatarBaseURL, foundHistory, g, handleRostersBySzn, league, matchKey, processedRosters, selectSzn,}) {
    return (
        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", borderRadius:"4px 4px 0px 0px"}}>{matchKey === 2 ? "5th Place Match" : "Semifinal"}</p>
            {findHistoryRoster(g.l, selectSzn, league, processedRosters)?.owner && findHistoryRoster(g.w, selectSzn, league, processedRosters)?.owner ?
                <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.w, selectSzn, league, processedRosters)} type={"w"}/>
                        {Number(selectSzn) <= 2020 ?
                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id === g.w || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id === g.w ?
                                <p className="m-0 bold">{foundHistory(g.w,selectSzn).s.playoffMatchups[13]?.filter(t => t.roster_id === g.w)[0].points}</p>
                            :
                                <p className="m-0 bold">{foundHistory(g.w,selectSzn).s.playoffMatchups[14]?.filter(t => t.roster_id === g.w)[0].points}</p>
                        : <p className="m-0 bold">{foundHistory(g.w,selectSzn).s.playoffMatchups[15]?.filter(t => t.roster_id === g.w)[0].points}</p>
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3">
                        <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.l, selectSzn, league, processedRosters)} type={"l"}/>
                        {Number(selectSzn) <= 2020 ?
                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id === g.l || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id === g.l ?
                                <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[13]?.filter(t => t.roster_id === g.l)[0].points}</p>
                            :
                                <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[14]?.filter(t => t.roster_id === g.l)[0].points}</p>
                        : <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[15]?.filter(t => t.roster_id === g.l)[0].points}</p>
                        }
                    </div>
                </div>
            :<></>
            }
        </div>
    )
}

function RoundThreeMatchup({avatarBaseURL, foundHistory, g, handleRostersBySzn, league, matchKey, processedRosters, selectSzn,}) {
    return (
        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
            <div className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", color:"", borderRadius:"4px 4px 0px 0px"}}>
                {matchKey === 1 ?
                    <p className="m-0 d-flex align-items-center justify-content-center">3rd Place Match <Icon icon="noto-v1:3rd-place-medal" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>
                :
                    <p className="m-0 d-flex align-items-center justify-content-center">Final <Icon icon="noto-v1:trophy" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>
                }
            </div>
            {findHistoryRoster(g.l, selectSzn, league, processedRosters)?.owner && findHistoryRoster(g.w, selectSzn, league, processedRosters)?.owner ?
                <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.w, selectSzn, league, processedRosters)} type={"w"}/>
                        {Number(selectSzn) <= 2020 ?
                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id === g.w || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id === g.w ?
                                <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[14]?.filter(t => t.roster_id === g.w)[0].points}</p>
                            :
                                <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[15]?.filter(t => t.roster_id === g.w)[0].points}</p>
                        : <p className="m-0 bold">{foundHistory(g.w, selectSzn).s.playoffMatchups[16]?.filter(t => t.roster_id === g.w)[0].points}</p>
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3">
                        <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.l, selectSzn, league, processedRosters)} type={"l"}/>
                        {Number(selectSzn) <= 2020 ?
                            handleRostersBySzn(selectSzn, league, processedRosters)[0].roster_id === g.l || handleRostersBySzn(selectSzn, league, processedRosters)[2].roster_id === g.l ?
                                <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[14]?.filter(t => t.roster_id ===g.l)[0].points}</p>
                            :
                                <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[15]?.filter(t => t.roster_id === g.l)[0].points}</p>
                        : <p className="m-0">{foundHistory(g.l, selectSzn).s.playoffMatchups[16]?.filter(t => t.roster_id === g.l)[0].points}</p>
                        }
                    </div>
                </div>
            :<></>
            }
        </div>
    )
}

export default function PlayoffBracket({
    foundHistory,
    handleRostersBySzn,
    league,
    processedRosters,
    selectSzn,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL || "https://sleepercdn.com/avatars/thumbs/";
    const matchups = (round) => {
        if (selectSzn === league.season) {
            return league?.brackets?.winner?.filter(g => g.r === round);
        } else {
            return league.history.filter(l => l.year === selectSzn)[0].league.brackets.winner.bracket.filter(g => g.r === round);
        }
    };
    return (
        <div className="d-flex align-items-center">
            <div className="">
                <QuarterfinalByeWeek 
                    avatarBaseURL={avatarBaseURL} 
                    roster={handleRostersBySzn(selectSzn, league, processedRosters).filter(r => r.settings.division === 2)[0]}
                />
                {matchups(1).map((match, i) => (
                    <RoundOneMatchup
                        avatarBaseURL={avatarBaseURL} 
                        foundHistory={foundHistory} 
                        g={match} 
                        key={i}
                        league={league}
                        processedRosters={processedRosters}
                        selectSzn={selectSzn}
                    />
                ))}
                <QuarterfinalByeWeek 
                    avatarBaseURL={avatarBaseURL} 
                    roster={handleRostersBySzn(selectSzn, league, processedRosters).filter(r => r.settings.division === 1)[0]}
                />
            </div>
            <div className="mx-4">
                {matchups(2).map((match, idx) => (
                    <RoundTwoMatchup 
                        avatarBaseURL={avatarBaseURL} 
                        foundHistory={foundHistory} 
                        g={match} 
                        handleRostersBySzn={handleRostersBySzn}
                        key={idx}
                        league={league}
                        matchKey={idx}
                        processedRosters={processedRosters}
                        selectSzn={selectSzn}
                    />
                ))}
            </div>
            <div className="">
                {matchups(3).map((match, x) => (
                    <RoundThreeMatchup 
                        avatarBaseURL={avatarBaseURL} 
                        foundHistory={foundHistory} 
                        g={match} 
                        handleRostersBySzn={handleRostersBySzn}
                        key={x}
                        league={league}
                        matchKey={x}
                        processedRosters={processedRosters}
                        selectSzn={selectSzn}
                    />
                ))}
            </div>
        </div>
    )
}