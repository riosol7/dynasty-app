import React from "react";
import { Icon } from "@iconify/react";
import { findHistoryRoster } from "../../../helpers";

function Roster({avatarBaseURL, roster, type}) {
    const isWinner = type === "w";
    const ownerDisplayName = isWinner ? roster.owner.display_name : <s>{roster.owner.display_name}</s>;
    return (
        <div className="d-flex align-items-center">
            <p className="m-0 bold" style={{color:"#acb6c3", fontSize:"1em"}}>{roster.rank}</p>
            <div className="mx-2">
                <img className="ownerLogo" style={{width:"24px"}} alt="avatar" src={`${avatarBaseURL}${roster.owner.avatar}`}/>
            </div>
            <p className={`m-0 bold${isWinner ? "" : " text-truncate"}`}>{ownerDisplayName}</p>
        </div>
    )
}
function Bottom6ByeWeek({avatarBaseURL, roster}) {
    return (
        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
            <p className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", borderRadius:"4px 4px 0px 0px"}}>Bottom 6</p>
            <div className="p-3">
                <div className="d-flex align-items-center justify-content-between">
                    <Roster avatarBaseURL={avatarBaseURL} roster={roster} type={"w"}/>
                    <p className="m-0" style={{fontWeight:"lighter"}}>BYE</p>
                </div>
            </div>
        </div>
    )
}
function ToiletMatch({avatarBaseURL, foundHistory, g, handleRostersBySzn, league, matchKey, processedRosters, round, selectSzn,}) {
    const title = round === 1 ? "Bottom 6" : round === 2 && matchKey === 2 ? "7th Place Match" : round === 2 ? "Bottom 4" : round === 3 && matchKey === 1 ?                     
        <p className="m-0">9th Place Match</p>
    :
        <p className="m-0">Toilet Bowl <Icon icon="noto:toilet" style={{fontSize:"1.25em", marginLeft:"4px"}}/></p>

    function score(id) {
        const rostersBySzn = handleRostersBySzn(selectSzn, league, processedRosters).reverse();
        const byeWeek = Number(rostersBySzn[0].roster_id) === Number(id) || Number(rostersBySzn[1].roster_id) === Number(id);
        const myMatchups = foundHistory(id, selectSzn)?.matchups;
        if (round === 1) {
            if(Number(selectSzn) > 2020) {
                return <p className="m-0 bold">{myMatchups[14]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p> 
            } else {
                return <p className="m-0 bold">{myMatchups[13]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            }
        } else if (round === 2) {
            if(Number(selectSzn) > 2020 && byeWeek) {
                return <p className="m-0 bold">{myMatchups[14]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            } else if (Number(selectSzn) > 2020) {
                return <p className="m-0 bold">{myMatchups[15]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            } else if(Number(selectSzn) <= 2020 && byeWeek) {
                return <p className="m-0 bold">{myMatchups[13]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            } else {
                return <p className="m-0 bold">{myMatchups[14]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            }
        } else if (round === 3) {
            if(Number(selectSzn) > 2020 && byeWeek) {
                return <p className="m-0 bold">{myMatchups[15]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            } else if (Number(selectSzn) > 2020) {
                return <p className="m-0 bold">{myMatchups[16]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            } else if(Number(selectSzn) <= 2020 && byeWeek) {
                return <p className="m-0 bold">{myMatchups[14]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            } else {
                return <p className="m-0 bold">{myMatchups[15]?.filter(t => Number(t.roster_id) === Number(id))[0]?.points}</p>
            }
        }
    }    
    return (
        <div className="my-3" style={{background:"#111111", borderRadius:"4px", width:"250px"}}>
            <div className="m-0 py-2 text-center bold" style={{background:"#1c1c1c", borderRadius:"4px 4px 0px 0px"}}>{title}</div>
            {findHistoryRoster(g.l, selectSzn, league, processedRosters)?.owner && findHistoryRoster(g.w, selectSzn, league, processedRosters)?.owner ?
                <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.w, selectSzn, league, processedRosters)} type={"w"}/>
                        {score(g.w)}
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-3">
                        <Roster avatarBaseURL={avatarBaseURL} roster={findHistoryRoster(g.l, selectSzn, league, processedRosters)} type={"l"}/>
                        {score(g.l)}
                    </div>
                </div>
            :<></>
            }
        </div>
    )
}

export default function ToiletBracket({
    foundHistory,
    handleRostersBySzn,
    league,
    processedRosters,
    selectSzn,
}) {
    const avatarBaseURL = process.env.REACT_APP_SLEEPER_AVATAR_THUMBS_BASE_URL;
    const matchups = (round) => {
        if (selectSzn === league.season) {
            return league?.brackets?.loser?.filter(g => g.r === round);
        } else {
            return league.history.filter(l => l.year === selectSzn)[0].league.brackets.loser.bracket.filter(g => Number(g.r) === round);
        }
    };
    const rostersBySzn = handleRostersBySzn(selectSzn, league, processedRosters).reverse();
    const byeWeekTeam1 = rostersBySzn[0];
    const byeWeekTeam2 = rostersBySzn[1];
    return (
        <div className="d-flex align-items-center">
            <div className="">
                <Bottom6ByeWeek 
                    avatarBaseURL={avatarBaseURL} 
                    roster={byeWeekTeam1}
                />
                {matchups(1).slice().map((match, i) => (
                    <ToiletMatch
                        avatarBaseURL={avatarBaseURL} 
                        foundHistory={foundHistory} 
                        g={match} 
                        handleRostersBySzn={handleRostersBySzn}
                        key={i}
                        league={league}
                        processedRosters={processedRosters}
                        round={1}
                        selectSzn={selectSzn}
                    />
                ))}
                <Bottom6ByeWeek
                    avatarBaseURL={avatarBaseURL} 
                    roster={byeWeekTeam2}
                />
            </div>
            <div className="mx-4">
                {matchups(2).slice().map((match, idx) => (
                    <ToiletMatch
                        avatarBaseURL={avatarBaseURL} 
                        foundHistory={foundHistory} 
                        g={match} 
                        handleRostersBySzn={handleRostersBySzn}
                        key={idx}
                        league={league}
                        matchKey={idx}
                        processedRosters={processedRosters}
                        round={2}
                        selectSzn={selectSzn}
                    />
                ))}
            </div>
            <div className="">
                {matchups(3).slice().map((match, x) => (
                    <ToiletMatch
                        avatarBaseURL={avatarBaseURL} 
                        foundHistory={foundHistory} 
                        g={match} 
                        handleRostersBySzn={handleRostersBySzn}
                        key={x}
                        league={league}
                        matchKey={x}
                        processedRosters={processedRosters}
                        round={3}
                        selectSzn={selectSzn}
                    />
                ))}
            </div>
        </div>
    )
};