import React from "react";
import MatchupSlider from "../components/sliders/MatchupSlider";
import WeeklyStatsChart from "../components/charts/WeeklyStatsChart";
import { findRosterByID } from "../helpers";

export default function MatchupUI({
    findLogo,
    findRecord,
    findWeeklyMatchups,
    foundHistory,
    handleWeeklyMatch,
    id,
    league,
    openModal,
    players,
    processedRosters,
    weeklyMatch
}) {
    const foundRoster = findRosterByID(id, processedRosters.totalRoster);

    return (
        <div className="my-4">
            <div className="d-flex justify-content-between bold" style={{marginBottom:"8px"}}>
                <p className="m-0" style={{color:"lightgrey"}}>WEEKLY BREAKDOWN</p>
                <select className="" onChange={handleWeeklyMatch} value={weeklyMatch} style={{color:"#fff", background:"inherit", border:"none"}}>
                    <option value={league.season}>{league.season}</option>
                    {league.history.map((l,i) =>
                        <option key={i} value={l.year}>{l.year}</option>
                    )}
                </select>
            </div>
            <MatchupSlider
                findLogo={findLogo}
                findRecord={findRecord}
                findWeeklyMatchups={findWeeklyMatchups}
                foundHistory={foundHistory}
                foundRoster={foundRoster}
                id={id}
                league={league}
                openModal={openModal}
                players={players}
                processedRosters={processedRosters}
                weeklyMatch={weeklyMatch}
            />
            <div className="my-4">
                <WeeklyStatsChart
                    foundHistory={foundHistory}
                    foundRoster={foundRoster}
                    id={id}
                    weeklyMatch={weeklyMatch}
                />
            </div>
        </div>
    )
}