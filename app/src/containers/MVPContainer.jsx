import React from "react";
import MVPUI from "../ui/MVPUI";
import { findRosterByID } from "../helpers";

export default function MVPContainer ({
    league,
    matches,
    processedRosters
}) {
    const getMVP = async (rID) => {
        try {
            const foundTeam = await findRosterByID(rID, processedRosters?.teamRank);
            const topPlayers = [
                foundTeam?.kct.qb.players[0],
                foundTeam?.kct.rb.players[0],
                foundTeam?.kct.wr.players[0],
                foundTeam?.kct.te.players[0]
            ];
            const topPlayer = topPlayers.reduce((prev, current) => (prev?.value > current?.value ? prev : current));
            return topPlayer;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };
    return (
        <MVPUI
            getMVP={getMVP}
            league={league}
            matches={matches}
            processedRosters={processedRosters}
        />
    )
}