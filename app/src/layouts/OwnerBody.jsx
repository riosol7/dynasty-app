import React, { useState } from "react";

import Summary from "./Summary";
import Dynasty from "./Dynasty";
import Power from "./Power";
import { roundToHundredth } from "../utils";

export default function OwnerBody({
    findRecord,
    foundHistory,
    id,
    league,
    matches,
    matchups,
    openModal,
    players,
    processedRosters,
    roster,
}) {

    const [tab, setTab] = useState("Summary");

    const foundMyMatchups = matchups?.map(match => Object.entries(match).map(game => game[1])).map(matchup => matchup.reduce((acc,team) => {
        if (team.filter(owner => owner.roster_id === Number(id)).length > 0) {
            return team;
        };
        return acc;
    })).map(match => match.sort((a,b) => b.points - a.points));

    const foundStats = processedRosters?.totalRoster?.find(roster => roster.roster_id === Number(id)).settings;

    const totalPtsPerGame = (pts ,season) => {
        if (season === "All Time") {
            return roundToHundredth(Number(pts/(foundHistory(id).allTime.w + foundHistory(id).allTime.l)));
        } else if(Number(season) <= 2020){
            return roundToHundredth(Number(pts/13));
        } else if(Number(season) > 2020){
            return roundToHundredth(Number(pts/14));
        } else if(season === league.season){
            return roundToHundredth(Number(pts/(foundStats.losses + foundStats.wins + foundStats.ties)));
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center">
                {
                    tab === "Summary" ?
                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                            <p className="m-0">Summary</p>
                        </div>
                    :
                        <div className="pb-2 px-3" onClick={() => setTab("Summary")}>
                            <p className="m-0">Summary</p>
                        </div>
                }
                {
                    tab === "Dynasty" ?
                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                            <p className="m-0">Dynasty</p>
                        </div>
                    :
                        <div className="pb-2 px-3" onClick={() => setTab("Dynasty")}>
                            <p className="m-0">Dynasty</p>
                        </div>
                }
                {
                    tab === "Power" ?
                        <div className="pb-2 px-3" style={{borderBottom:"2px solid #a9dfd8"}}>
                            <p className="m-0">Power</p>
                        </div>
                    :
                        <div className="pb-2 px-3" onClick={() => setTab("Power")}>
                            <p className="m-0">Power</p>
                        </div>
                }
            </div>
            <div className="">
                {
                    tab === "Summary" ?
                        <Summary
                            findRecord={findRecord}
                            foundHistory={foundHistory}
                            foundMyMatchups={foundMyMatchups}
                            id={id}
                            league={league}
                            matches={matches}
                            openModal={openModal}
                            players={players}
                            processedRosters={processedRosters}
                            roster={roster}
                            tab={tab}
                            totalPtsPerGame={totalPtsPerGame}
                        />
                    : tab === "Dynasty" ?
                        <Dynasty
                            id={id}
                            league={league}
                            matches={matches}
                            processedRosters={processedRosters}
                            roster={roster}
                            tab={tab}
                        />
                    : tab === "Power" ?
                        <Power
                            findRecord={findRecord}
                            foundHistory={foundHistory}
                            foundMyMatchups={foundMyMatchups}
                            id={id}
                            league={league}
                            matches={matches}
                            openModal={openModal}
                            players={players}
                            processedRosters={processedRosters}
                            roster={roster}
                            tab={tab}
                            totalPtsPerGame={totalPtsPerGame}
                        />
                    :<></>
                }
            </div>
        </div>
    )
}