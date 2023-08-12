import React,{ useState } from "react";
import RosterUI from "../ui/RosterUI";
import { 
    findLogo,
    getTotalPts, 
    isOdd, 
} from '../utils';

export default function RosterContainer({
    findPlayer,
    league,
    matches,
    owner,
    players,
    processedRosters,
    roundToHundredth,
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

    const showMoreQBs = () => {
        setShowQBs(!showQBs)
        setQbArrow(!qbArrow)
    }
    const showMoreRBs = () => {
        setShowRBs(!showRBs)
        setRbArrow(!rbArrow)
    }
    const showMoreWRs = () => {
        setShowWRs(!showWRs)
        setWrArrow(!wrArrow)
    }
    const showMoreTEs = () => {
        setShowTEs(!showTEs)
        setTeArrow(!teArrow)
    }
 
    function qbRankings (roster) {
        let rank = 0;
        if (roster !== undefined) {
            let foundTeam = processedRosters?.qbRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name);
            foundTeam?.rank === 1?
                rank = foundTeam.rank + "st"
            : foundTeam?.rank === 2?
                rank = foundTeam.rank + "nd"
            : foundTeam?.rank === 3?
                rank = foundTeam.rank + "rd"
            : rank = foundTeam.rank + "th"    
        }
        return rank
    }
    function rbRankings (roster) {
        let foundTeam = processedRosters?.rbRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function wrRankings (roster) {
        let foundTeam = processedRosters?.wrRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function teRankings (roster) {
        let foundTeam = processedRosters?.teRank?.find(team => team.kct.owner.display_name === roster.kct.owner.display_name)
        let rank = 0
        foundTeam.rank === 1?
        rank = foundTeam.rank + "st"
        :
        foundTeam.rank === 2?
        rank = foundTeam.rank + "nd"
        :
        foundTeam.rank === 3?
        rank = foundTeam.rank + "rd"
        :
        rank = foundTeam.rank + "th"
        return rank
    }
    function getTopQB(display_name){
        let foundTeam = processedRosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topQB = foundTeam.kct.qb.players[0]
        return topQB
    }
    function getTopRB(display_name){
        let foundTeam = processedRosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topRB = foundTeam.kct.rb.players[0]
        return topRB
    }
    function getTopWR(display_name){
        let foundTeam = processedRosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topWR = foundTeam.kct.wr.players[0]
        return topWR
    }
    function getTopTE(display_name){
        let foundTeam = processedRosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        let topTE = foundTeam.kct.te.players[0]
        return topTE
    }

    return (
        <RosterUI
            findLogo={findLogo}
            findPlayer={findPlayer}
            getTopQB={getTopQB}
            getTopRB={getTopRB}
            getTopTE={getTopTE}
            getTopWR={getTopWR}
            getTotalPts={getTotalPts}
            isOdd={isOdd}
            league={league}
            matches={matches}
            owner={owner}
            players={players}
            qbArrow={qbArrow}
            qbRankings={qbRankings}
            rbArrow={rbArrow}
            rbRankings={rbRankings}
            rosters={processedRosters}
            roundToHundredth={roundToHundredth}
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
            wrArrow={wrArrow}
            wrRankings={wrRankings}
        />
    )
}
