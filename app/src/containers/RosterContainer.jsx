import React, { useState } from "react";
import RosterUI from "../ui/RosterUI";
import {
    getTopQB,
    getTopRB,
    getTopTE,
    getTopWR,
} from "../helpers";

export default function RosterContainer({
    league,
    matches,
    processedRosters,
    roster,
    tab,
}) {
    const [showQBs, setShowQBs] = useState(true)
    const [qbArrow, setQbArrow] = useState(false)
    const [showRBs, setShowRBs] = useState(true)
    const [rbArrow, setRbArrow] = useState(false)
    const [showWRs, setShowWRs] = useState(true)
    const [wrArrow, setWrArrow] = useState(false)
    const [showTEs, setShowTEs] = useState(true)
    const [teArrow, setTeArrow] = useState(false)

    const topQB = getTopQB(roster.owner.display_name, processedRosters);
    const topRB = getTopRB(roster.owner.display_name, processedRosters);
    const topWR = getTopWR(roster.owner.display_name, processedRosters);
    const topTE = getTopTE(roster.owner.display_name, processedRosters);

    const showMoreQBs = () => {
        setShowQBs(!showQBs);
        setQbArrow(!qbArrow);
    };
    const showMoreRBs = () => {
        setShowRBs(!showRBs);
        setRbArrow(!rbArrow);
    };
    const showMoreWRs = () => {
        setShowWRs(!showWRs);
        setWrArrow(!wrArrow);
    };
    const showMoreTEs = () => {
        setShowTEs(!showTEs);
        setTeArrow(!teArrow);
    };
 
    function qbRankings (roster) {
        let rank = 0;
        if (roster !== undefined) {
            const foundTeam = processedRosters?.qbRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name);
            foundTeam?.rank === 1 ?
                rank = foundTeam.rank + "st"
            : foundTeam?.rank === 2 ?
                rank = foundTeam.rank + "nd"
            : foundTeam?.rank === 3 ?
                rank = foundTeam.rank + "rd"
            : rank = foundTeam.rank + "th"    
        }
        return rank;
    }
    function rbRankings (roster) {
        let rank = 0;
        const foundTeam = processedRosters?.rbRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name);
        foundTeam.rank === 1 ?
            rank = foundTeam.rank + "st"
        : foundTeam.rank === 2 ?
            rank = foundTeam.rank + "nd"
        : foundTeam.rank === 3 ?
            rank = foundTeam.rank + "rd"
        : rank = foundTeam.rank + "th"
        return rank;
    }
    function wrRankings (roster) {
        let rank = 0;
        const foundTeam = processedRosters?.wrRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name);
        foundTeam.rank === 1 ?
            rank = foundTeam.rank + "st"
        : foundTeam.rank === 2 ?
            rank = foundTeam.rank + "nd"
        : foundTeam.rank === 3 ?
            rank = foundTeam.rank + "rd"
        : rank = foundTeam.rank + "th"
        return rank;
    }
    function teRankings (roster) {
        let rank = 0;
        const foundTeam = processedRosters?.teRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        foundTeam.rank === 1 ?
            rank = foundTeam.rank + "st"
        : foundTeam.rank === 2 ?
            rank = foundTeam.rank + "nd"
        : foundTeam.rank === 3 ?
            rank = foundTeam.rank + "rd"
        : rank = foundTeam.rank + "th"
        return rank;
    }

    return (
        <RosterUI
            league={league}
            matches={matches}
            qbArrow={qbArrow}
            qbRankings={qbRankings}
            rbArrow={rbArrow}
            rbRankings={rbRankings}
            roster={roster}
            showMoreQBs={showMoreQBs}
            showQBs={showQBs}
            showMoreRBs={showMoreRBs}
            showRBs={showRBs}
            showMoreTEs={showMoreTEs}
            showTEs={showTEs}
            showMoreWRs={showMoreWRs}
            showWRs={showWRs}
            tab={tab}
            teArrow={teArrow}
            teRankings={teRankings}
            topQB={topQB}
            topRB={topRB}
            topTE={topTE}
            topWR={topWR}
            wrArrow={wrArrow}
            wrRankings={wrRankings}
        />
    )
}
