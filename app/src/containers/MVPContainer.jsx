import React from "react";
import MVPUI from "../ui/MVPUI";
import { processRosters } from "../helpers";

export default function MVPContainer ({
    findLogo,
    getTotalPts,
    league,
    loadLeague,
    loadRosters,
    matches,
    owners,
    players,
    rosters,
}) {
    const processedRosters = processRosters(rosters, players, owners); 
    const getMVP = (display_name) => {
        const foundTeam = processedRosters?.teamRank.find(roster => roster.kct.owner.display_name === display_name)
        const topPlayers = [
            foundTeam.kct.qb.players[0],
            foundTeam.kct.rb.players[0],
            foundTeam.kct.wr.players[0],
            foundTeam.kct.te.players[0]
        ]
        const topPlayer = topPlayers.reduce((prev, current) => 
            prev.rating > current.rating ? prev : current
        )
        return topPlayer
    }
    return (
        <MVPUI
            findLogo={findLogo}
            getMVP={getMVP}
            getTotalPts={getTotalPts}
            league={league}
            loadLeague={loadLeague}
            loadRosters={loadRosters}
            matches={matches}
            processedRosters={processedRosters}
        />
    )
}