import React, { useState } from "react";
import MatchupUI from "../ui/MatchupUI";
import { findLogo } from "../utils";

export default function MatchupContainer({
    findRecord,
    foundHistory,
    id,
    league,
    openModal,
    players,
    processedRosters,
}) {
    const thisSeasonSchedule = foundHistory(id, league.season)?.myMatchups;
    const season = thisSeasonSchedule.length > 0 ? league.season : (Number(league.season) - 1).toString();

    const [weeklyMatch, setWeeklyMatch] = useState(season)

    function compareWeeks(weekA, weekB) {
        const numericPartA = parseInt(weekA[0].slice(2), 10);
        const numericPartB = parseInt(weekB[0].slice(2), 10);
        return numericPartA - numericPartB;
    }

    // NEEDS TO BE UPDATED **
    const findWeeklyMatchups = () => {
        if (league.season === weeklyMatch) {
            return thisSeasonSchedule;
        
        } else {
            const template = league.history.filter(l => l.year === weeklyMatch)
                .map(szn => Object.entries(szn.matchups).slice().sort(compareWeeks).map(g => g[1]).map(wk => wk.reduce((acc,team) => {
                    acc[team.matchup_id] = acc[team.matchup_id] || [];
                    acc[team.matchup_id].push(team);
                    return acc;
            }, Object.create(null))).map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
                if(team.filter(owner => owner.roster_id === Number(id)).length > 0){
                    return team
                }  
                return acc
            })).map(match => match.sort((a,b) => b.points - a.points)))[0];
            
            if (Number(weeklyMatch) > 2020) {
                return template
            } else {
                return template.slice(0,16)
            }
        }
    }

    const handleWeeklyMatch = (e) => {
        setWeeklyMatch(e.target.value)
    }
    return (
        <MatchupUI
            findLogo={findLogo}
            findRecord={findRecord}
            findWeeklyMatchups={findWeeklyMatchups}
            foundHistory={foundHistory}
            handleWeeklyMatch={handleWeeklyMatch}
            id={id}
            league={league}
            openModal={openModal}
            players={players}
            processedRosters={processedRosters}
            weeklyMatch={weeklyMatch}
        />
    )
}