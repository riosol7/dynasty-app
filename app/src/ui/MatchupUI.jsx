import React from "react";
import Matchups from "../components/Matchups";

export default function MatchupUI({
    findLogo,
    findRecord,
    findRosterByID,
    findWeeklyMatchups,
    foundHistory,
    foundMyMatchups,
    handleWeeklyMatch,
    id,
    league,
    loadLeague,
    openModal,
    players,
    processedRosters,
    roundToHundredth,
    weeklyMatch
}) {
    return (
        <div className="my-4">
            <div>
                <div className="d-flex justify-content-between bold" style={{marginBottom:"8px"}}>
                    <p className="m-0" style={{color:"lightgrey"}}>WEEKLY BREAKDOWN</p>
                    <select className="" onChange={handleWeeklyMatch} value={weeklyMatch} style={{color:"#fff", background:"inherit", border:"none"}}>
                        <option value={league.season}>{league.season}</option>
                        {
                            league.history.map((l,i) =>
                                <option key={i} value={l.year}>{l.year}</option>
                            )
                        }
                    </select>
                </div>
                <Matchups
                    findLogo={findLogo}
                    findRecord={findRecord}
                    findRosterByID={findRosterByID}
                    findWeeklyMatchups={findWeeklyMatchups}
                    foundHistory={foundHistory}
                    foundMyMatchups={foundMyMatchups}
                    id={id}
                    league={league}
                    loadLeague={loadLeague}
                    openModal={openModal}
                    players={players}
                    processedRosters={processedRosters}
                    roundToHundredth={roundToHundredth}
                    weeklyMatch={weeklyMatch}
                />
            </div>
        </div>
    )
}